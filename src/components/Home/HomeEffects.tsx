"use client";

import { useEffect } from "react";

export default function HomeEffects() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>("#home");
    const field = home?.querySelector<HTMLElement>(".fireflies");

    if (!home) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const fireflies: HTMLElement[] = [];

    if (field) {
      for (let index = 0; index < 13; index += 1) {
        const firefly = document.createElement("i");

        firefly.className = "firefly";
        firefly.style.left = `${18 + Math.random() * 72}%`;
        firefly.style.top = `${25 + Math.random() * 55}%`;
        firefly.style.setProperty("--dur", `${3.5 + Math.random() * 4}s`);
        firefly.style.setProperty("--delay", `${-Math.random() * 6}s`);
        firefly.style.setProperty(
          "--dx",
          `${Math.trunc(-18 + Math.random() * 36)}px`,
        );

        field.appendChild(firefly);
        fireflies.push(firefly);
      }
    }

    if (reducedMotion) {
      return () => {
        fireflies.forEach((firefly) => firefly.remove());
      };
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = home.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      home.style.setProperty("--px", `${(x * 14).toFixed(2)}px`);
      home.style.setProperty("--py", `${(y * 10).toFixed(2)}px`);
    };

    const handlePointerLeave = () => {
      home.style.setProperty("--px", "0px");
      home.style.setProperty("--py", "0px");
    };

    const handleScroll = () => {
      const rect = home.getBoundingClientRect();
      const scrollY = Math.max(
        0,
        Math.min(window.innerHeight, -rect.top),
      );

      home.style.setProperty("--scrollY", `${scrollY}px`);

      const leave = Math.max(
        0,
        Math.min(
          1,
          (-rect.top - window.innerHeight * 0.55) /
            (window.innerHeight * 0.35),
        ),
      );

      home.style.setProperty("--leave", leave.toFixed(3));
      home.classList.toggle("is-leaving", leave > 0);
    };

    home.addEventListener("pointermove", handlePointerMove);
    home.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      home.removeEventListener("pointermove", handlePointerMove);
      home.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);

      home.style.setProperty("--px", "0px");
      home.style.setProperty("--py", "0px");
      home.style.setProperty("--scrollY", "0px");
      home.style.setProperty("--leave", "0");
      home.classList.remove("is-leaving");

      fireflies.forEach((firefly) => firefly.remove());
    };
  }, []);

  return null;
}
