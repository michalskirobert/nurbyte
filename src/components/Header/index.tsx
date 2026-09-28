"use client";

import { useEffect, useState } from "react";
import HeaderLady from "./HeaderLady";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const toggleTheme = () => document.body.classList.toggle("light");

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main section[id]"),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
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
          <span>
            <b>Nur</b>Byte
            <small>Software Lab &lt;/&gt;</small>
          </span>
          <HeaderLady menuOpen={open} />
        </a>

        <Navigation active={active} />

        <div className="hud-actions">
          <span className="online">
            <i /> ONLINE
          </span>
          <button
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            ☀ ◐
          </button>
          <button
            className="menu-btn"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        onTheme={toggleTheme}
      />
    </>
  );
}
