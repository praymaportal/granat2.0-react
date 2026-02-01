import { useMemo, useState } from 'react';

type NavItem = {
  id: string;
  label: string;
  children?: NavItem[];
};

type SidebarProps = {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ items, activeId, onSelect }: SidebarProps) {
  const groupIds = useMemo(() => items.map((item) => item.id), [items]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(groupIds)
  );

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <aside className="sb-sidebar">
      <div className="sb-sidebar__header">
        <div className="sb-sidebar__brand">granat2.0-react</div>
        <div className="sb-sidebar__title">storybook</div>
      </div>
      <nav className="sb-sidebar__nav">
        {items.map((item) => {
          if (!item.children?.length) {
            return (
              <button
                key={item.id}
                type="button"
                className={`sb-sidebar__link ${item.id === activeId ? 'sb-sidebar__link--active' : ''}`}
                onClick={() => onSelect(item.id)}
              >
                {item.label}
              </button>
            );
          }

          const isExpanded = expandedGroups.has(item.id);

          return (
            <div key={item.id} className="sb-sidebar__group">
              <button
                type="button"
                className="sb-sidebar__group-toggle"
                onClick={() => toggleGroup(item.id)}
              >
                <span
                  className={`sb-sidebar__caret ${
                    isExpanded ? 'sb-sidebar__caret--open' : ''
                  }`}
                  aria-hidden="true"
                />
                <span className="sb-sidebar__group-label">{item.label}</span>
              </button>
              {isExpanded ? (
                <div className="sb-sidebar__subnav">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      className={`sb-sidebar__sublink ${
                        child.id === activeId ? 'sb-sidebar__sublink--active' : ''
                      }`}
                      onClick={() => onSelect(child.id)}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
