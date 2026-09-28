"use client";
import { useEffect } from "react";

export default function SectionReveal() {
  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>(
        "main > section[id]:not(#home)",
      ),
    ];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((s) => s.classList.add("section-entered"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("section-entered");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return null;
}
