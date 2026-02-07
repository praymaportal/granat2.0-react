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
  styleEl.appendChild(
    document.createTextNode(
      `.${className}{-webkit-mask-image:url("${url}");mask-image:url("${url}");}\n`
    )
  );

  insertedRules.set(className, url);
}

function resolveIconKey(pack: IconPack, name: string, size: IconSize, variant: IconVariant) {
  return `../icons/${pack}/${name}/size-${size}-style-${variant}.svg`;
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
    () => resolveIconKey(pack, name, size, variant),
    [pack, name, size, variant]
  );
  const resolvedClass = `gr-icon--${pack}-${name}-${size}-${variant}`;
  const [url, setUrl] = useState<string | null>(() => urlCache.get(key) ?? null);

  useEffect(() => {
    let mounted = true;
    // Prevent stale URL from being used for a new icon key.
    setUrl(urlCache.get(key) ?? null);
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
