"use client";

import { Heart } from "lucide-react";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Mood = "idle" | "question" | "love" | "woof";

const frames: Record<Mood, string> = {
  idle: "/assets/characters/lady/accepted/idle.png",
  question: "/assets/characters/lady/accepted/question.png",
  love: "/assets/characters/lady/accepted/wave.png",
  woof: "/assets/characters/lady/accepted/howl.png",
};

export default function ProjectsLady() {
  const [mood, setMood] = useState<Mood>("idle");
  const [label, setLabel] = useState("SELECT!");
  const [sequence, setSequence] = useState(false);
  const [heartsKey, setHeartsKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const startSequence = () => {
    clearTimers();
    setSequence(true);
    setMood("love");
    setLabel("");
    setHeartsKey((key) => key + 1);

    timers.current.push(
      setTimeout(() => {
        setMood("woof");
        setLabel("WOOF!");
      }, 850),
      setTimeout(() => {
        setMood("idle");
        setLabel("SELECT!");
        setSequence(false);
      }, 1750),
    );
  };

  return (
    <button
      type="button"
      className={`projects-lady projects-lady-button projects-lady-${mood}`}
      onClick={startSequence}
      onMouseEnter={() => {
        if (!sequence) {
          setMood("question");
          setLabel("?");
        }
      }}
      onMouseLeave={() => {
        if (!sequence) {
          setMood("idle");
          setLabel("SELECT!");
        }
      }}
      aria-label="Lady. select a project"
    >
      <span className="projects-lady-sprite">
        <Image
          src={frames[mood]}
          alt="Lady"
          width={180}
          height={180}
          priority={false}
        />
      </span>
      {mood !== "question" && mood !== "love" && (
        <span className="projects-lady-bubble">{label}</span>
      )}
      {mood === "love" && (
        <span
          key={heartsKey}
          className="projects-lady-hearts"
          aria-hidden="true"
        >
          <i>
            <Heart aria-hidden="true" />
          </i>
          <i>
            <Heart aria-hidden="true" />
          </i>
          <i>
            <Heart aria-hidden="true" />
          </i>
        </span>
      )}
    </button>
  );
}
