type NavItem = {
  id: string;
  label: string;
};

type SidebarProps = {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ items, activeId, onSelect }: SidebarProps) {
  return (
    <aside className="sb-sidebar">
      <div className="sb-sidebar__header">
        <div className="sb-sidebar__brand">granat2.0-react</div>
        <div className="sb-sidebar__title">storybook</div>
      </div>
      <nav className="sb-sidebar__nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sb-sidebar__link ${item.id === activeId ? 'sb-sidebar__link--active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
