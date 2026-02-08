type TokenSearchProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  count?: number;
};

export default function TokenSearch({ value, onChange, placeholder, count }: TokenSearchProps) {
  return (
    <div className="sb-token-search">
      <input
        className="sb-token-search__input"
        value={value}
        placeholder={placeholder ?? 'Search'}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      {typeof count === 'number' ? (
        <div className="sb-token-search__count" aria-label="Results count">
          {count}
        </div>
      ) : null}
    </div>
  );
}

