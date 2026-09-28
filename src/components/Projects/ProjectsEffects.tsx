"use client";

import { useEffect } from "react";

export default function ProjectsEffects() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("#projects");

    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const update = () => {
      const rect = section.getBoundingClientRect();

      const progress = Math.max(
        -1,
        Math.min(
          1,
          (window.innerHeight / 2 - (rect.top + rect.height / 2)) /
            window.innerHeight,
        ),
      );

      section.style.setProperty(
        "--projectScroll",
        `${(progress * 22).toFixed(1)}px`,
      );
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      section.style.removeProperty("--projectScroll");
    };
  }, []);

  return null;
}
