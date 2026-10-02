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

const frames = LADY_ASSETS.contact;
const labels = LADY_LABELS.contact;

const uniqueFrames = [...new Set(Object.values(frames))];

export default function ContactLady() {
  const [mood, setMood] = useState<LadyMood>("idle");
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
    setHeartsKey((key) => key + 1);

    timers.current.push(
      setTimeout(() => setMood("woof"), LADY_TIMINGS.loveToWoof),
      setTimeout(() => {
        setMood("idle");
        setSequence(false);
      }, LADY_TIMINGS.contactReset),
    );
  };

  return (
    <button
      type="button"
      className={`contact-lady contact-lady-${mood}`}
      onClick={startSequence}
      onMouseEnter={() => {
        if (!sequence) setMood("question");
      }}
      onMouseLeave={() => {
        if (!sequence) setMood("idle");
      }}
      onFocus={() => {
        if (!sequence) setMood("question");
      }}
      onBlur={() => {
        if (!sequence) setMood("idle");
      }}
      aria-label="Say hello to Lady"
    >
      <span className="contact-lady-stage" aria-hidden="true">
        <span className="contact-lady-sprites">
          {uniqueFrames.map((frame) => (
            <Image
              key={frame}
              src={`/assets/characters/lady/contact/${frame}`}
              alt=""
              width={520}
              height={560}
              sizes="(max-width: 760px) 170px, 260px"
              className={`contact-lady-image ${frames[mood] === frame ? "is-active" : ""}`}
            />
          ))}
        </span>
        {mood !== "question" && mood !== "love" && (
          <span className="contact-lady-bubble" aria-live="polite">
            {labels[mood]}
          </span>
        )}
        {mood === "love" && (
          <span
            key={heartsKey}
            className="contact-lady-hearts"
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
      </span>
    </button>
  );
}
