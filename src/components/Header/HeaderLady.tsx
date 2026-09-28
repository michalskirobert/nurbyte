"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const frames = {
  idle: "/assets/characters/lady/nav-idle.png",
  happy: "/assets/characters/lady/nav-happy.png",
  heart: "/assets/characters/lady/nav-heart.png",
  question: "/assets/characters/lady/nav-question.png",
  surprised: "/assets/characters/lady/nav-surprised.png",
  love: "/assets/characters/lady/nav-love.png",
} as const;

type Mood = keyof typeof frames;

export default function HeaderLady({ menuOpen }: { menuOpen: boolean }) {
  const [mood, setMood] = useState<Mood>("idle");
  const [bubble, setBubble] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (next: Mood, text = "", ms = 1400) => {
    if (timer.current) clearTimeout(timer.current);
    setMood(next);
    setBubble(text);
    timer.current = setTimeout(() => {
      setMood("idle");
      setBubble("");
    }, ms);
  };

  useEffect(() => {
    if (menuOpen) show("question", "Menu opened!", 1400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [menuOpen]);

  return (
    <span
      className="brand-lady"
      onMouseEnter={() => show("happy", "", 1000)}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        show("heart", "Woof! 👋", 1500);
      }}
    >
      <Image
        src={frames[mood]}
        alt="Lady"
        width={84}
        height={84}
        style={{ width: "auto", height: "auto" }}
        priority
      />
      <span className={`lady-bubble ${bubble ? "show" : ""}`} aria-live="polite">
        {bubble}
      </span>
    </span>
  );
}
