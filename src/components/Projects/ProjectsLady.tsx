"use client";

import { Heart } from "lucide-react";
import {
  LADY_ASSETS,
  LADY_LABELS,
  LADY_TIMINGS,
  type LadyMood,
} from "@/constants/lady";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const frames = LADY_ASSETS.projects;

export default function ProjectsLady() {
  const [mood, setMood] = useState<LadyMood>("idle");
  const [label, setLabel] = useState<string>(LADY_LABELS.projects.idle);
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
        setLabel(LADY_LABELS.projects.woof);
      }, LADY_TIMINGS.loveToWoof),
      setTimeout(() => {
        setMood("idle");
        setLabel(LADY_LABELS.projects.idle);
        setSequence(false);
      }, LADY_TIMINGS.projectsReset),
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
          setLabel(LADY_LABELS.projects.question);
        }
      }}
      onMouseLeave={() => {
        if (!sequence) {
          setMood("idle");
          setLabel(LADY_LABELS.projects.idle);
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
