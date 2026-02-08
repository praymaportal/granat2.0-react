import { useEffect, useMemo, useState } from 'react';
import StorySection from '../storybook/components/StorySection';
import TokenSearch from '../storybook/components/TokenSearch';
import themeTokensCss from '../../resources/core/build/theme-tokens.css?raw';

type ColorVar = {
  name: string;
  group: string;
};

const STYLE_ID = 'sb-token-colors-styles';

function ensureColorStyles(vars: ColorVar[]) {
  if (typeof document === 'undefined') return;
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }

  // Re-generate entirely; this is a dev-only page and it's cheap enough.
  styleEl.textContent = vars
    .map(
      (v) =>
        `.sb-color-row[data-var="${v.name}"] .sb-color-swatch{background:var(${v.name});}`
    )
    .join('\n');
}

function extractColorVars(cssText: string): ColorVar[] {
  const set = new Set<string>();
  const re = /--color-[a-z0-9-]+/gi;
  let match: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((match = re.exec(cssText))) {
    set.add(match[0]);
  }

  const vars = Array.from(set);
  return vars
    .map((name) => {
      const withoutPrefix = name.replace(/^--color-/, '');
      const group = withoutPrefix.split('-')[0] || 'other';
      return { name, group };
    })
    .sort((a, b) => {
      if (a.group !== b.group) return a.group.localeCompare(b.group);
      return a.name.localeCompare(b.name);
    });
}

export default function TokensColorsStory() {
  const vars = useMemo(() => extractColorVars(themeTokensCss), []);
  const [values, setValues] = useState<Record<string, string>>({});
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    ensureColorStyles(vars);
  }, [vars]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const cs = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const v of vars) {
      next[v.name] = cs.getPropertyValue(v.name).trim();
    }
    setValues(next);
  }, [vars]);

  const filtered = useMemo(() => {
    if (!normalizedQuery) return vars;
    return vars.filter((v) => v.name.toLowerCase().includes(normalizedQuery));
  }, [vars, normalizedQuery]);

  const grouped = useMemo(() => {
    const map = new Map<string, ColorVar[]>();
    for (const v of filtered) {
      const list = map.get(v.group) ?? [];
      list.push(v);
      map.set(v.group, list);
    }
    return map;
  }, [filtered]);

  return (
    <StorySection
      id="tokens-colors"
      kicker="tokens"
      title="colors"
      description="Список CSS variables из theme-tokens.css (значения показываются для активной темы)."
    >
      <TokenSearch
        value={query}
        onChange={setQuery}
        count={filtered.length}
        placeholder="Search colors (e.g. --color-text-primary, icon-secondary, background-...)"
      />
      <div className="sb-token-stack">
        {Array.from(grouped.entries()).map(([group, groupVars]) => (
          <section key={group} className="sb-token-block">
            <h3 className="sb-token-block__title">{group}</h3>
            <div className="sb-color-list">
              {groupVars.map((v) => (
                <div key={v.name} className="sb-color-row" data-var={v.name}>
                  <div className="sb-color-swatch" aria-hidden="true" />
                  <div className="sb-color-meta">
                    <div className="sb-color-name">{v.name}</div>
                    <div className="sb-color-value">{values[v.name] || '\u00A0'}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </StorySection>
  );
}
