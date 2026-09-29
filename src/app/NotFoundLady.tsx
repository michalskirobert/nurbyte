"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LadyState = "search" | "question" | "love" | "toy";

const ladyState = {
  search: {
    src: "/assets/characters/lady/accepted/sniff.png",
    width: 502,
    height: 400,
    bubble: "NOT FOUND...",
  },
  question: {
    src: "/assets/characters/lady/accepted/question.png",
    width: 119,
    height: 201,
    bubble: "?",
  },
  love: {
    src: "/assets/characters/lady/accepted/idle.png",
    width: 155,
    height: 200,
    bubble: "WOOF! ♥",
  },
  toy: {
    src: "/assets/characters/lady/accepted/toy.png",
    width: 254,
    height: 192,
    bubble: "LET'S PLAY!",
  },
} as const;

export default function NotFoundLady() {
  const [state, setState] = useState<LadyState>("search");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const play = () => {
    if (state === "love" || state === "toy") return;
    clearTimers();
    setState("love");
    timers.current.push(setTimeout(() => setState("toy"), 900));
    timers.current.push(setTimeout(() => setState("search"), 2900));
  };

  const current = ladyState[state];

  return (
    <button
      type="button"
      className={`not-found-lady-v36 is-${state}`}
      aria-label="Interact with Lady"
      onMouseEnter={() => state === "search" && setState("question")}
      onMouseLeave={() => state === "question" && setState("search")}
      onFocus={() => state === "search" && setState("question")}
      onBlur={() => state === "question" && setState("search")}
      onClick={play}
    >
      <span className="not-found-lady-v36-bubble" aria-hidden="true">
        {current.bubble}
      </span>
      <span className="not-found-lady-v36-stage" aria-hidden="true">
        <Image
          key={state}
          src={current.src}
          alt=""
          width={current.width}
          height={current.height}
          priority={state === "search"}
        />
      </span>
      {state === "love" && (
        <span className="not-found-lady-v36-hearts" aria-hidden="true">
          <i>♥</i>
          <i>♥</i>
          <i>♥</i>
        </span>
      )}
    </button>
  );
}
