"use client";
import { useEffect, useRef, useState } from "react";
const sequence = [
  "nurbyte@dev:~$ git pull",
  "Fetching origin...",
  "remote: Enumerating objects: 42, done.",
  "remote: Total 42 (delta 10), reused 24",
  "Updating portfolio...",
  "Fast-forward",
  "3 files changed, 120 insertions(+)",
  "✓ Successfully updated!",
  "",
  "nurbyte@dev:~$ npm run build",
  "> nurbyte@portfolio build",
  "✓ Compiled successfully",
  "✓ Static pages generated",
  "✓ Ready",
];
export default function HeroTerminal() {
  const [text, setText] = useState("");
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    viewport.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });
  }, [text]);
  useEffect(() => {
    let cancelled = false,
      line = 0,
      char = 0;
    const schedule = (fn: () => void, d: number) => {
      const id = setTimeout(() => {
        timers.current.delete(id);
        fn();
      }, d);
      timers.current.add(id);
    };
    const type = () => {
      if (cancelled) return;
      if (line >= sequence.length) {
        schedule(() => {
          if (!cancelled) {
            setText((v) => v + "\nnurbyte@dev:~$ ");
          }
        }, 1800);
        return;
      }
      const current = sequence[line];
      if (char < current.length) {
        const next = current.charAt(char++);
        setText((v) => v + next);
        schedule(type, line === 0 ? 42 : 14);
        return;
      }
      setText((v) => v + "\n");
      line++;
      char = 0;
      schedule(type, current === "" ? 90 : 190);
    };
    schedule(type, 650);
    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, []);
  return (
    <div className="terminal reveal visible">
      <div className="term-bar">
        <i />
        <i />
        <i />
        <span>nurbyte — terminal</span>
      </div>
      <div ref={viewport} className="terminal-viewport">
        <pre>
          {text}
          <span className="cursor">█</span>
        </pre>
      </div>
    </div>
  );
}
