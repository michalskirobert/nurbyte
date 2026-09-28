import {
  Code2,
  FolderKanban,
  Home,
  Mail,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { navigation, type NavigationId } from "./navigation";

const icons: Record<NavigationId, LucideIcon> = {
  home: Home,
  projects: FolderKanban,
  about: UserRound,
  tech: Code2,
  contact: Mail,
};

export default function Navigation({ active }: { active: string }) {
  return (
    <nav className="nav" aria-label="Main navigation">
      {navigation.map(({ label, id }) => {
        const Icon = icons[id];
        return (
          <a key={id} className={active === id ? "active" : ""} href={`#${id}`}>
            <Icon className="nav-icon" aria-hidden="true" />
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
