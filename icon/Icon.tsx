import { useEffect, useMemo, useState } from 'react';
import type { IconPack, IconProps, IconSize, IconVariant } from './Icon.types';
import { classNames } from '../utils';
import './icon.css';

const DEFAULT_SIZE: IconSize = 24;
const DEFAULT_VARIANT: IconVariant = 'outline';
const DEFAULT_PACK: IconPack = 'web2';

const ICON_IMPORTERS = {
  ...(import.meta.glob('../icons/web2/*/size-*-style-*.svg', {
    import: 'default'
  }) as Record<string, () => Promise<string>>),
  ...(import.meta.glob('../icons/interface/*/size-*-style-*.svg', {
    import: 'default'
  }) as Record<string, () => Promise<string>>),
  ...(import.meta.glob('../icons/interface-documents/*/size-*-style-*.svg', {
    import: 'default'
  }) as Record<string, () => Promise<string>>)
} as Record<string, () => Promise<string>>;

const urlCache = new Map<string, string>();
const pendingCache = new Map<string, Promise<string | null>>();
const resolvedKeyCache = new Map<string, string | null>();

const STYLE_ELEMENT_ID = 'granat-icon-styles';
// Track what URL was last written for a given class, so we can safely update on hot reload
// or in edge cases where URL state changes.
const insertedRules = new Map<string, string>();

function ensureMaskRule(className: string, url: string) {
  if (typeof document === 'undefined') return;
  const existing = insertedRules.get(className);
  if (existing === url) return;

  let styleEl = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ELEMENT_ID;
    document.head.appendChild(styleEl);
  }

  // Avoid CSSOM insertRule edge cases; plain text is enough here.
  const escaped = typeof CSS !== 'undefined' && 'escape' in CSS ? CSS.escape(className) : className;
  styleEl.appendChild(
    document.createTextNode(
      `.${escaped}{-webkit-mask-image:url("${url}");mask-image:url("${url}");}\n`
    )
  );

  insertedRules.set(className, url);
}

function sanitizeClassPart(input: string) {
  // Keep it readable, but safe for CSS class names. Important for icons like "player-speed-x1.5".
  return input.replace(/[^a-z0-9_-]/gi, '_');
}

function pickBestCandidate(candidates: string[], preferredVariant: IconVariant) {
  if (!candidates.length) return null;
  // Prefer "status-100" if present (battery-like icons), otherwise stable first (sorted).
  const status100 = candidates.find((k) => k.includes('status-100'));
  if (status100) return status100;
  const charging = candidates.find((k) => k.includes('status-charging'));
  if (charging) return charging;
  // If still multiple, pick lexicographically so it stays stable.
  const sorted = [...candidates].sort((a, b) => a.localeCompare(b));
  // Prefer the pure outline/fill file if it exists among candidates.
  const exact = sorted.find((k) => k.endsWith(`style-${preferredVariant}.svg`));
  return exact ?? sorted[0];
}

function resolveImporterKey(pack: IconPack, name: string, size: IconSize, variant: IconVariant) {
  const cacheKey = `${pack}|${name}|${size}|${variant}`;
  const cached = resolvedKeyCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const desired = `../icons/${pack}/${name}/size-${size}-style-${variant}.svg`;
  if (desired in ICON_IMPORTERS) {
    resolvedKeyCache.set(cacheKey, desired);
    return desired;
  }

  const exactSizePrefix = `../icons/${pack}/${name}/size-${size}-style-${variant}`;
  const exactSizeCandidates = Object.keys(ICON_IMPORTERS).filter(
    (k) => k.startsWith(exactSizePrefix) && k.endsWith('.svg')
  );
  const exactSizePick = pickBestCandidate(exactSizeCandidates, variant);
  if (exactSizePick) {
    resolvedKeyCache.set(cacheKey, exactSizePick);
    return exactSizePick;
  }

  // Fallback: icons might not have the requested size. Pick closest available size for the same pack/name/style.
  const anySizeCandidates = Object.keys(ICON_IMPORTERS).filter((k) => {
    if (!k.startsWith(`../icons/${pack}/${name}/size-`)) return false;
    return k.includes(`-style-${variant}`) && k.endsWith('.svg');
  });

  type Parsed = { key: string; size: number };
  const parsed: Parsed[] = anySizeCandidates
    .map((key) => {
      const m = key.match(/\/size-(\d+)-style-/);
      const parsedSize = m ? Number(m[1]) : NaN;
      return { key, size: parsedSize };
    })
    .filter((p) => Number.isFinite(p.size));

  if (!parsed.length) {
    resolvedKeyCache.set(cacheKey, null);
    return null;
  }

  const target = size;
  parsed.sort((a, b) => {
    const da = Math.abs(a.size - target);
    const db = Math.abs(b.size - target);
    if (da !== db) return da - db;
    return a.size - b.size;
  });

  const closestSize = parsed[0].size;
  const closestCandidates = parsed.filter((p) => p.size === closestSize).map((p) => p.key);
  const closestPick = pickBestCandidate(closestCandidates, variant);
  resolvedKeyCache.set(cacheKey, closestPick);
  return closestPick;
}

async function loadIconUrl(key: string) {
  const cached = urlCache.get(key);
  if (cached) return cached;

  const pending = pendingCache.get(key);
  if (pending) return pending;

  const importer = ICON_IMPORTERS[key];
  if (!importer) return null;

  const promise = importer()
    .then((url) => {
      urlCache.set(key, url);
      pendingCache.delete(key);
      return url;
    })
    .catch(() => {
      pendingCache.delete(key);
      return null;
    });

  pendingCache.set(key, promise);
  return promise;
}

export function Icon({
  name,
  pack = DEFAULT_PACK,
  size = DEFAULT_SIZE,
  variant = DEFAULT_VARIANT,
  ariaLabel,
  className,
  ...rest
}: IconProps) {
  const key = useMemo(
    () => resolveImporterKey(pack, name, size, variant),
    [pack, name, size, variant]
  );
  const resolvedClass = `gr-icon--${sanitizeClassPart(pack)}-${sanitizeClassPart(name)}-${size}-${variant}`;
  const [url, setUrl] = useState<string | null>(() => (key ? urlCache.get(key) ?? null : null));

  useEffect(() => {
    let mounted = true;
    // Prevent stale URL from being used for a new icon key.
    setUrl(key ? urlCache.get(key) ?? null : null);
    if (!key) return () => {
      mounted = false;
    };
    void loadIconUrl(key).then((next) => {
      if (!mounted) return;
      setUrl(next);
    });
    return () => {
      mounted = false;
    };
  }, [key]);

  if (url) ensureMaskRule(resolvedClass, url);

  return (
    <span
      className={classNames(
        'gr-icon',
        `gr-icon--${size}`,
        url ? resolvedClass : null,
        className
      )}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      {...rest}
    />
  );
}
