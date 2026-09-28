"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Mood = "sit" | "question" | "heart" | "happy";

const frames: Record<Mood, string> = {
  sit: "contact-idle-full.png",
  question: "contact-question-full.png",
  heart: "contact-heart-full.png",
  happy: "contact-happy-full.png",
};

const labels: Record<Mood, string> = {
  sit: "NEED A DEVELOPER?",
  question: "HELLO?",
  heart: "WOOF! ♥",
  happy: "LET'S BUILD!",
};

export default function ContactLady() {
  const [mood, setMood] = useState<Mood>("sit");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const resetLater = (next: Mood, delay: number) => {
    if (timer.current) clearTimeout(timer.current);
    setMood(next);
    timer.current = setTimeout(() => setMood("sit"), delay);
  };

  return (
    <button
      type="button"
      className="contact-lady"
      onMouseEnter={() => mood === "sit" && setMood("question")}
      onMouseLeave={() => mood === "question" && setMood("sit")}
      onFocus={() => mood === "sit" && setMood("question")}
      onBlur={() => mood === "question" && setMood("sit")}
      onClick={() => {
        if (timer.current) clearTimeout(timer.current);
        setMood("heart");
        timer.current = setTimeout(() => {
          setMood("happy");
          timer.current = setTimeout(() => setMood("sit"), 850);
        }, 800);
      }}
      aria-label="Say hello to Lady"
    >
      <span className="contact-lady-character">
        <span className="contact-lady-bubble" aria-live="polite">
          <span className="contact-lady-bubble-text">{labels[mood]}</span>
        </span>

        <span className="contact-lady-stage" aria-hidden="true">
          <Image
            key={mood}
            src={`/assets/characters/lady/${frames[mood]}`}
            alt=""
            width={320}
            height={360}
            sizes="(max-width: 760px) 150px, 220px"
            className="contact-lady-image"
          />
        </span>
      </span>
    </button>
  );
}
