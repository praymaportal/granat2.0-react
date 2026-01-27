type IconSize = 16 | 24;

type IconProps = {
  name: 'plus';
  size: IconSize;
};

export default function Icon({ name, size }: IconProps) {
  return <span className={`sb-icon sb-icon--${name}-${size}`} aria-hidden="true" />;
}
