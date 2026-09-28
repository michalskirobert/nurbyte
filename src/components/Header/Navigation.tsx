export const navigation = [
  ["⌂", "HOME", "home"],
  ["◇", "PROJECTS", "projects"],
  ["♙", "ABOUT", "about"],
  ["▱", "TECH", "tech"],
  ["✉", "CONTACT", "contact"],
] as const;

type Props = { active: string };

export default function Navigation({ active }: Props) {
  return (
    <nav className="nav" aria-label="Main navigation">
      {navigation.map(([icon, label, id]) => (
        <a key={id} className={active === id ? "active" : ""} href={`#${id}`}>
          {icon} <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
