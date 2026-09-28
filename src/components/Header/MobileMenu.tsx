import { navigation } from "./Navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  onTheme: () => void;
};

export default function MobileMenu({ open, onClose, onTheme }: Props) {
  return (
    <div className={`mobile-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button onClick={onClose} aria-label="Close menu">×</button>
      {navigation.map(([icon, label, id]) => (
        <a key={id} href={`#${id}`} onClick={onClose}>{icon} {label}</a>
      ))}
      <div className="drawer-status">
        <span className="online"><i /> ONLINE</span>
        <button className="icon-btn drawer-theme" onClick={onTheme}>☀ ◐</button>
      </div>
    </div>
  );
}
