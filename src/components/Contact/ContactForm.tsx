"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Step = "name" | "category" | "email" | "message" | "review" | "done";
type Tone = "command" | "success" | "error" | "muted" | "warning";
type Line = { text: string; tone?: Tone };

const categories = ["project", "collaboration", "hello"] as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [step, setStep] = useState<Step>("name");
  const [lines, setLines] = useState<Line[]>([
    { text: "nurbyte@dev:~$ contact --start", tone: "command" },
    { text: "✓ Contact form ready", tone: "success" },
    { text: "Tell me a little about yourself — I'll guide you step by step.", tone: "muted" },
    { text: "", tone: "muted" },
    { text: "First, what's your name?", tone: "warning" },
  ]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("project");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const append = (...next: Line[]) => setLines(current => [...current, ...next]);

  useEffect(() => {
    const el = viewportRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines, step]);

  useEffect(() => {
    if (step === "message") textareaRef.current?.focus();
    else inputRef.current?.focus();
  }, [step]);

  const command = (text: string) => append({ text: `nurbyte@dev:~$ ${text}`, tone: "command" });
  const fail = (text: string, hint?: string) => {
    append(
      { text: `✗ ${text}`, tone: "error" },
      ...(hint ? [{ text: `  ${hint}`, tone: "muted" as Tone }] : []),
    );
  };

  const runInput = () => {
    const clean = value.trim();

    if (step === "name") {
      if (clean.length < 2) {
        fail("That name looks a little too short.", "Please enter at least 2 characters.");
        setValue(""); return;
      }
      setName(clean);
      command(`contact name "${clean}"`);
      append({ text: `Nice to meet you, ${clean}!`, tone: "success" }, { text: "What would you like to talk about?", tone: "warning" });
      setStep("category"); setValue(""); return;
    }

    if (step === "category") {
      const normalized = clean.toLowerCase();
      if (!categories.includes(normalized as typeof categories[number])) {
        fail("I don’t recognize that option.", "Type: project, collaboration or hello.");
        setValue(""); return;
      }
      setCategory(normalized as typeof categories[number]);
      command(`contact topic ${normalized}`);
      append({ text: `✓ Topic selected: ${normalized}`, tone: "success" }, { text: "What email can I reply to?", tone: "warning" });
      setStep("email"); setValue(""); return;
    }

    if (step === "email") {
      if (!emailPattern.test(clean)) {
        command(`contact email ${clean || "(empty)"}`);
        fail(`That email doesn’t look right: "${clean || "(empty)"}"`, "Try something like: name@example.com");
        setValue(""); return;
      }
      setEmail(clean);
      command(`contact email ${clean}`);
      append(
        { text: "Checking email...", tone: "muted" },
        { text: "✓ Email looks good", tone: "success" },
        { text: "", tone: "muted" },
        { text: "nurbyte@dev:~$ contact message", tone: "command" },
        { text: "Tell me what you need — project idea, question or just hello.", tone: "warning" },
      );
      setStep("message"); setValue("");
    }
  };

  const onInputKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runInput();
    }
  };

  const saveMessage = () => {
    const clean = message.trim();
    if (clean.length < 10) {
      fail("Your message is a little too short.", "Please write at least 10 characters.");
      return;
    }
    append(
      { text: `✓ Message saved (${clean.length} bytes)`, tone: "success" },
      { text: "", tone: "muted" },
      { text: "nurbyte@dev:~$ contact review", tone: "command" },
    );
    setMessage(clean);
    setStep("review");
  };

  const onMessageKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      saveMessage();
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (step !== "review") return;
    command("contact send");
    append(
      { text: "Checking your message... OK", tone: "success" },
      { text: "Preparing message...", tone: "muted" },
      { text: "⚠ Demo mode: sending will be connected next.", tone: "warning" },
      { text: "nurbyte@dev:~$ _", tone: "command" },
    );
    setStep("done");
  };

  return (
    <form className="contact-terminal contact-cli" onSubmit={submit}>
      <div className="term-bar"><i/><i/><i/><span>nurbyte@dev: ~/contact — zsh</span></div>
      <div
        ref={viewportRef}
        className="cli-screen"
        aria-live="polite"
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("button")) return;
          if (step === "message") textareaRef.current?.focus();
          else inputRef.current?.focus();
        }}
      >
        <div className="cli-history">
          {lines.map((line, index) => (
            <div key={index} className={`cli-${line.tone ?? "muted"}`}>{line.text || "\u00a0"}</div>
          ))}
        </div>

        {["name","category","email"].includes(step) && (
          <div className="cli-live-prompt">
            <span className="cli-shell">nurbyte@dev:~$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={onInputKey}
              spellCheck={false}
              autoComplete="off"
              aria-label={`Terminal input: ${step}`}
            />
          </div>
        )}

        {step === "category" && (
          <div className="cli-hint">project | collaboration | hello  — type one and press Enter</div>
        )}

        {step === "message" && (
          <div className="cli-editor">
            <div className="cli-editor-bar">GNU nano 8.1 &nbsp; /tmp/nurbyte-contact-message</div>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={onMessageKey}
              maxLength={250}
              spellCheck
              aria-label="Message editor"
            />
            <div className="cli-editor-footer">
              <span>^X Exit</span><span>^O Write Out</span>
              <span>{message.length.toString().padStart(3,"0")} / 250 bytes</span>
              <span>Ctrl/⌘+Enter Save</span>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="cli-review">
            <div>CONTACT PAYLOAD</div>
            <div className="cli-rule">────────────────────────────────────</div>
            <p><span>name</span>{name}</p>
            <p><span>category</span>{category}</p>
            <p><span>email</span>{email}</p>
            <p><span>message</span>{message.length} bytes</p>
            <div className="cli-rule">────────────────────────────────────</div>
            <button type="submit" className="terminal-command">nurbyte@dev:~$ contact send <b>↵</b></button>
          </div>
        )}

        {step === "done" && <div className="cli-done">session idle <span className="cursor">█</span></div>}
      </div>
    </form>
  );
}
