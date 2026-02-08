import { useMemo, useState } from 'react';
import { Icon } from '../../icon';
import type { IconPack } from '../../icon';
import StorySection from '../storybook/components/StorySection';
import TokenSearch from '../storybook/components/TokenSearch';

type IconEntry = {
  pack: IconPack;
  name: string;
  hasOutline: boolean;
  hasFill: boolean;
};

const WEB2_FILES = import.meta.glob('../../icons/web2/*/size-*-style-*.svg');
const INTERFACE_FILES = import.meta.glob('../../icons/interface/*/size-*-style-*.svg');
const INTERFACE_DOCUMENTS_FILES = import.meta.glob('../../icons/interface-documents/*/size-*-style-*.svg');

function parseIconPath(path: string): {
  pack: IconPack;
  name: string;
  size: number;
  variant: 'outline' | 'fill' | string;
} | null {
  const match = path.match(/\/icons\/([^/]+)\/([^/]+)\/size-(\d+)-style-([^.]+)\.svg$/);
  if (!match) return null;
  const pack = match[1] as IconPack;
  const name = match[2];
  const size = Number(match[3]);
  const variant = match[4];
  if (!Number.isFinite(size)) return null;
  return { pack, name, size, variant };
}

function collectIcons(): IconEntry[] {
  const allPaths = [
    ...Object.keys(WEB2_FILES),
    ...Object.keys(INTERFACE_FILES),
    ...Object.keys(INTERFACE_DOCUMENTS_FILES)
  ];

  const map = new Map<string, IconEntry>();
  for (const path of allPaths) {
    const parsed = parseIconPath(path);
    if (!parsed) continue;
    const key = `${parsed.pack}/${parsed.name}`;
    const prev = map.get(key);
    const next: IconEntry = prev ?? {
      pack: parsed.pack,
      name: parsed.name,
      hasOutline: false,
      hasFill: false
    };
    // Some icons have extra suffixes (e.g. "outline-status-100"). Treat them as outline/fill capable.
    if (parsed.variant === 'outline' || parsed.variant.startsWith('outline-')) next.hasOutline = true;
    if (parsed.variant === 'fill' || parsed.variant.startsWith('fill-')) next.hasFill = true;
    map.set(key, next);
  }

  return Array.from(map.values()).sort((a, b) => {
    if (a.pack !== b.pack) return a.pack.localeCompare(b.pack);
    return a.name.localeCompare(b.name);
  });
}

export default function TokensIconsStory() {
  const icons = useMemo(() => collectIcons(), []);
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return icons;
    return icons.filter((i) => {
      const hay = `${i.pack}/${i.name}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [icons, normalizedQuery]);

  const grouped = useMemo(() => {
    const next = new Map<IconPack, IconEntry[]>();
    for (const item of filtered) {
      const list = next.get(item.pack) ?? [];
      list.push(item);
      next.set(item.pack, list);
    }
    return next;
  }, [filtered]);

  return (
    <StorySection
      id="tokens-icons"
      kicker="tokens"
      title="icons"
      description="Все иконки, доступные в библиотеке (имя = имя папки в icons/<pack>/<name>/...)."
    >
      <TokenSearch
        value={query}
        onChange={setQuery}
        count={filtered.length}
        placeholder="Search icons (e.g. cross, warning-circle, interface/...)"
      />
      <div className="sb-token-stack">
        {Array.from(grouped.entries()).map(([pack, packIcons]) => (
          <section key={pack} className="sb-token-block">
            <h3 className="sb-token-block__title">{pack}</h3>
            <div className="sb-icon-grid">
              {packIcons.map((icon) => (
                <div key={`${icon.pack}/${icon.name}`} className="sb-icon-tile">
                  <div className="sb-icon-tile__preview">
                    <Icon
                      pack={icon.pack}
                      name={icon.name}
                      size={24}
                      variant={icon.hasOutline ? 'outline' : 'fill'}
                    />
                  </div>
                  <div className="sb-icon-tile__name">{icon.name}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </StorySection>
  );
}
