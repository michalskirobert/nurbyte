"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Sun } from "lucide-react";
import HeaderLady from "./HeaderLady";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

type DisplayMode = "light" | "contrast";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("light");

  useEffect(() => {
    const saved = localStorage.getItem(
      "nurbyte-display-mode",
    ) as DisplayMode | null;
    if (saved === "contrast") setDisplayMode("contrast");
  }, []);
  useEffect(() => {
    document.documentElement.dataset.displayMode = displayMode;
    localStorage.setItem("nurbyte-display-mode", displayMode);
  }, [displayMode]);

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
        <a className="brand" href="#home" aria-label="NurByte home">
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
          <HeaderLady menuOpen={open} />
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
              onClick={() => setDisplayMode("light")}
            >
              <Sun />
            </button>
            <button
              className={displayMode === "contrast" ? "active" : ""}
              aria-pressed={displayMode === "contrast"}
              aria-label="High contrast"
              title="High contrast"
              onClick={() => setDisplayMode("contrast")}
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
        onDisplayModeChange={setDisplayMode}
      />
    </>
  );
}
