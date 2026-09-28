"use client";
import { useEffect } from "react";
export default function SceneParallax({ selector }: { selector: string }) {
  useEffect(() => {
    const scene = document.querySelector<HTMLElement>(selector);
    if (!scene) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    let raf = 0,
      mx = 0,
      my = 0,
      sy = 0;
    const paint = () => {
      raf = 0;
      scene.style.setProperty("--mx", `${mx}px`);
      scene.style.setProperty("--my", `${my}px`);
      scene.style.setProperty("--sy", `${sy}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const pointer = (e: PointerEvent) => {
      if (reduced || coarse) return;
      const r = scene.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 54;
      my = ((e.clientY - r.top) / r.height - 0.5) * 38;
      queue();
    };
    const leave = () => {
      mx = 0;
      my = 0;
      queue();
    };
    const scroll = () => {
      if (reduced) return;
      const r = scene.getBoundingClientRect();
      const p = Math.max(
        -1,
        Math.min(1, (innerHeight / 2 - (r.top + r.height / 2)) / innerHeight),
      );
      sy = p * 72;
      queue();
    };
    scene.addEventListener("pointermove", pointer);
    scene.addEventListener("pointerleave", leave);
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    scroll();
    return () => {
      cancelAnimationFrame(raf);
      scene.removeEventListener("pointermove", pointer);
      scene.removeEventListener("pointerleave", leave);
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
    };
  }, [selector]);
  return null;
}
