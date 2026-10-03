"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, Sun } from "lucide-react";
import HeaderLady from "./HeaderLady";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

type DisplayMode = "light" | "contrast";

const DISPLAY_MODE_EVENT = "nurbyte-display-mode-change";

const subscribeToDisplayMode = (callback: () => void) => {
  window.addEventListener(DISPLAY_MODE_EVENT, callback);
  return () => window.removeEventListener(DISPLAY_MODE_EVENT, callback);
};

const getDisplayMode = (): DisplayMode =>
  document.documentElement.dataset.displayMode === "contrast"
    ? "contrast"
    : "light";

const getServerDisplayMode = (): DisplayMode => "light";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const displayMode = useSyncExternalStore(
    subscribeToDisplayMode,
    getDisplayMode,
    getServerDisplayMode,
  );
  const [brandHovered, setBrandHovered] = useState(false);

  const changeDisplayMode = (mode: DisplayMode) => {
    document.documentElement.dataset.displayMode = mode;
    localStorage.setItem("nurbyte-display-mode", mode);
    window.dispatchEvent(new Event(DISPLAY_MODE_EVENT));
  };

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main section[id]"),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { threshold: 0.55 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="hud">
        <a
          className="brand"
          href="#home"
          aria-label="NurByte home"
          onMouseEnter={() => setBrandHovered(true)}
          onMouseLeave={() => setBrandHovered(false)}
          onFocus={() => setBrandHovered(true)}
          onBlur={() => setBrandHovered(false)}
        >
          <Image
            className="brand-mark"
            src="/assets/brand/nurbyte-mark.png"
            alt=""
            width={34}
            height={34}
            priority
          />
          <span>
            <b>Nur</b>Byte<small>Software Lab &lt;/&gt;</small>
          </span>
          <HeaderLady menuOpen={open} brandHovered={brandHovered} />
        </a>
        <Navigation active={active} />
        <div className="hud-actions">
          <span className="online">
            <i /> ONLINE
          </span>
          <div
            className="display-toggle"
            role="group"
            aria-label="Display mode"
          >
            <button
              className={displayMode === "light" ? "active" : ""}
              aria-pressed={displayMode === "light"}
              aria-label="Normal display"
              title="Normal display"
              onClick={() => changeDisplayMode("light")}
            >
              <Sun />
            </button>
            <button
              className={displayMode === "contrast" ? "active" : ""}
              aria-pressed={displayMode === "contrast"}
              aria-label="High contrast"
              title="High contrast"
              onClick={() => changeDisplayMode("contrast")}
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
          <button
            className="menu-btn"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        displayMode={displayMode}
        onDisplayModeChange={changeDisplayMode}
      />
    </>
  );
}
