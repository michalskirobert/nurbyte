"use client";
import { useEffect } from "react";

export default function SceneParallax({ selector }: { selector: string }) {
  useEffect(() => {
    const scene = document.querySelector<HTMLElement>(selector);
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let frame = 0;
    let pointerX = 0,
      pointerY = 0;

    const update = () => {
      frame = 0;
      const rect = scene.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (window.innerHeight / 2 - center) /
            Math.max(window.innerHeight, rect.height * 0.72),
        ),
      );
      const scrollPx = progress * (coarse ? 104 : 76);

      // Final values are px strings so iOS Safari/Brave do not need CSS calc multiplication.
      scene.style.setProperty("--p-bg-x", `${coarse ? 0 : -pointerX * 0.72}px`);
      scene.style.setProperty(
        "--p-bg-y",
        `${(-pointerY * 0.58 - scrollPx * 0.52).toFixed(2)}px`,
      );
      scene.style.setProperty(
        "--p-world-x",
        `${coarse ? 0 : -pointerX * 0.24}px`,
      );
      scene.style.setProperty(
        "--p-world-y",
        `${(-scrollPx * 0.22).toFixed(2)}px`,
      );
      scene.style.setProperty(
        "--p-content-x",
        `${coarse ? 0 : pointerX * 0.1}px`,
      );
      scene.style.setProperty(
        "--p-content-y",
        `${(pointerY * 0.07 + scrollPx * 0.035).toFixed(2)}px`,
      );
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const pointer = (e: PointerEvent) => {
      if (coarse) return;
      const rect = scene.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 54;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 38;
      queue();
    };
    const leave = () => {
      pointerX = 0;
      pointerY = 0;
      queue();
    };

    scene.addEventListener("pointermove", pointer, { passive: true });
    scene.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    window.addEventListener("orientationchange", queue, { passive: true });
    queue();

    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", pointer);
      scene.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      window.removeEventListener("orientationchange", queue);
    };
  }, [selector]);
  return null;
}
