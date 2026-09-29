"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Mood = "idle" | "question" | "love" | "woof";

const frames: Record<Mood, string> = {
  idle: "/assets/characters/lady/accepted/header.png",
  question: "/assets/characters/lady/accepted/header.png",
  love: "/assets/characters/lady/accepted/wave.png",
  woof: "/assets/characters/lady/accepted/howl.png",
};

export default function HeaderLady({ menuOpen }: { menuOpen: boolean }) {
  const [mood, setMood] = useState<Mood>("idle");
  const [heartBurst, setHeartBurst] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runClickSequence = () => {
    clearTimers();
    setMood("love");
    setHeartBurst((value) => value + 1);

    timers.current.push(
      setTimeout(() => setMood("woof"), 850),
      setTimeout(() => setMood("idle"), 1850),
    );
  };

  useEffect(() => {
    if (!menuOpen) return;
    clearTimers();
    setMood("question");
    timers.current.push(setTimeout(() => setMood("idle"), 1200));
  }, [menuOpen]);

  useEffect(() => clearTimers, []);

  return (
    <button
      type="button"
      className={`brand-lady brand-lady-${mood}`}
      aria-label="Say hello to Lady"
      onMouseEnter={() => {
        if (mood !== "idle") return;
        clearTimers();
        setMood("question");
      }}
      onMouseLeave={() => {
        if (mood === "question") setMood("idle");
      }}
      onFocus={() => {
        if (mood !== "idle") return;
        clearTimers();
        setMood("question");
      }}
      onBlur={() => {
        if (mood === "question") setMood("idle");
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        runClickSequence();
      }}
    >
      <Image src={frames[mood]} alt="Lady" width={160} height={160} priority />

      <span
        className={`lady-bubble ${mood === "question" || mood === "woof" ? "show" : ""}`}
        aria-live="polite"
      >
        {mood === "question" ? "?" : mood === "woof" ? "WOOF!" : ""}
      </span>

      {mood === "love" && (
        <span
          key={heartBurst}
          className="brand-lady-hearts is-active"
          aria-hidden="true"
        >
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
        </span>
      )}
    </button>
  );
}
