"use client";

import { Heart } from "lucide-react";
import { LADY_ASSETS, LADY_TIMINGS, type LadyMood } from "@/constants/lady";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const frames = LADY_ASSETS.header;

export default function HeaderLady({
  menuOpen,
  brandHovered,
}: {
  menuOpen: boolean;
  brandHovered: boolean;
}) {
  const [mood, setMood] = useState<LadyMood>("idle");
  const [heartBurst, setHeartBurst] = useState(0);
  const [ladyHovered, setLadyHovered] = useState(false);
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
      setTimeout(() => setMood("woof"), LADY_TIMINGS.loveToWoof),
      setTimeout(() => setMood("idle"), LADY_TIMINGS.headerReset),
    );
  };

  useEffect(() => clearTimers, []);

  const displayedMood: LadyMood =
    mood === "idle" && (menuOpen || brandHovered) ? "question" : mood;

  return (
    <button
      type="button"
      className={`brand-lady brand-lady-${displayedMood}`}
      aria-label="Say hello to Lady"
      onMouseEnter={() => {
        setLadyHovered(true);
        if (mood !== "idle") return;
        clearTimers();
        setMood("question");
      }}
      onMouseLeave={() => {
        setLadyHovered(false);
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
      <span className="brand-lady-stage" aria-hidden="true">
        {[...new Set(Object.values(frames))].map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={160}
            height={160}
            sizes="48px"
            priority={src === frames.idle}
            className={`brand-lady-frame ${frames[displayedMood] === src ? "is-active" : ""}`}
          />
        ))}
        <span
          key={`${displayedMood}-${heartBurst}`}
          className="brand-lady-pixels"
        >
          <i />
          <i />
          <i />
          <i />
        </span>
      </span>

      <span
        className={`lady-bubble ${displayedMood === "question" || displayedMood === "woof" ? "show" : ""}`}
        aria-live="polite"
      >
        {displayedMood === "woof"
          ? "WOOF!"
          : displayedMood === "question"
            ? brandHovered && !ladyHovered
              ? "HOME"
              : "?"
            : ""}
      </span>

      {mood === "love" && (
        <span
          key={heartBurst}
          className="brand-lady-hearts is-active"
          aria-hidden="true"
        >
          <span>
            <Heart aria-hidden="true" />
          </span>
          <span>
            <Heart aria-hidden="true" />
          </span>
          <span>
            <Heart aria-hidden="true" />
          </span>
        </span>
      )}
    </button>
  );
}
