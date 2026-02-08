import { useEffect, useMemo, useState } from 'react';
import StorySection from '../storybook/components/StorySection';
import TokenSearch from '../storybook/components/TokenSearch';
import typographyCss from '../../resources/core/build/typography.css?raw';

type FontRow = {
  className: string;
  group: string;
};

type FontMeta = {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
};

function extractTypographyClasses(cssText: string): FontRow[] {
  const set = new Set<string>();
  const re = /\.mtsds-[a-z0-9-]+/gi;
  let match: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((match = re.exec(cssText))) {
    const raw = match[0].slice(1);
    set.add(raw);
  }

  return Array.from(set)
    .map((className) => {
      const rest = className.replace(/^mtsds-/, '');
      const group = rest.split('-')[0] || 'other';
      return { className, group };
    })
    .sort((a, b) => {
      if (a.group !== b.group) return a.group.localeCompare(b.group);
      return a.className.localeCompare(b.className);
    });
}

export default function TokensFontsStory() {
  const rows = useMemo(() => extractTypographyClasses(typographyCss), []);
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const [meta, setMeta] = useState<Record<string, FontMeta>>({});

  const filtered = useMemo(() => {
    if (!normalizedQuery) return rows;
    return rows.filter((r) => r.className.toLowerCase().includes(normalizedQuery));
  }, [rows, normalizedQuery]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const next: Record<string, FontMeta> = {};
    const samples = document.querySelectorAll<HTMLElement>('[data-typography-class]');
    for (const el of samples) {
      const cls = el.getAttribute('data-typography-class');
      if (!cls) continue;
      const cs = getComputedStyle(el);
      next[cls] = {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing
      };
    }
    setMeta(next);
  }, [filtered]);

  const grouped = useMemo(() => {
    const map = new Map<string, FontRow[]>();
    for (const row of filtered) {
      const list = map.get(row.group) ?? [];
      list.push(row);
      map.set(row.group, list);
    }
    return map;
  }, [filtered]);

  return (
    <StorySection
      id="tokens-fonts"
      kicker="tokens"
      title="fonts"
      description="Типографические utility-классы (.mtsds-*) из typography.css."
    >
      <TokenSearch
        value={query}
        onChange={setQuery}
        count={filtered.length}
        placeholder="Search typography classes (e.g. p4-regular, h1-wide, c1-...)"
      />
      <div className="sb-token-stack">
        {Array.from(grouped.entries()).map(([group, groupRows]) => (
          <section key={group} className="sb-token-block">
            <h3 className="sb-token-block__title">{group}</h3>
            <div className="sb-font-list">
              {groupRows.map((row) => {
                const m = meta[row.className];
                return (
                  <div key={row.className} className="sb-font-row">
                    <div className="sb-font-meta">
                      <div className="sb-font-name">{row.className}</div>
                      <div className="sb-font-props">
                        {m
                          ? `${m.fontSize} / ${m.lineHeight} · ${m.fontWeight} · ${m.letterSpacing} · ${m.fontFamily}`
                          : '\u00A0'}
                      </div>
                    </div>
                    <div
                      className={`sb-font-sample ${row.className}`}
                      data-typography-class={row.className}
                    >
                      The quick brown fox jumps over 1234 (RU: Съешь еще этих мягких французских булок)
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </StorySection>
  );
}
