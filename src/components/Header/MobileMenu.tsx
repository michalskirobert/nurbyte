import { Sun } from "lucide-react";
import { navigation } from "./navigationItems";

type DisplayMode = "light" | "contrast";

type Props = {
  open: boolean;
  onClose: () => void;
  displayMode: DisplayMode;
  onDisplayModeChange: (mode: DisplayMode) => void;
};

export default function MobileMenu({
  open,
  onClose,
  displayMode,
  onDisplayModeChange,
}: Props) {
  return (
    <div className={`mobile-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button
        className="drawer-close"
        onClick={onClose}
        aria-label="Close menu"
      >
        ×
      </button>

      <div className="drawer-heading">MENU // NAVIGATION</div>
      <nav className="drawer-navigation" aria-label="Mobile navigation">
        {navigation.map(({ label, id }) => (
          <a key={id} href={`#${id}`} onClick={onClose}>
            {label}
          </a>
        ))}
      </nav>

      <div className="drawer-controls">
        <span className="online">
          <i /> ONLINE
        </span>
        <div className="drawer-display">
          <span>DISPLAY</span>
          <div
            className="display-toggle"
            role="group"
            aria-label="Display mode"
          >
            <button
              className={displayMode === "light" ? "active" : ""}
              aria-pressed={displayMode === "light"}
              aria-label="Normal display"
              onClick={() => onDisplayModeChange("light")}
            >
              <Sun />
            </button>
            <button
              className={displayMode === "contrast" ? "active" : ""}
              aria-pressed={displayMode === "contrast"}
              aria-label="High contrast"
              onClick={() => onDisplayModeChange("contrast")}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M12 3a9 9 0 0 0 0 18V3Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </button>
            <span className={`display-toggle-indicator ${displayMode}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
