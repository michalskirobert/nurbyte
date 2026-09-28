"use client";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
type Step =
  "name" | "category" | "email" | "message" | "review" | "sending" | "done";
type Tone = "command" | "success" | "error" | "muted" | "warning";
type Line = { text: string; tone?: Tone };
const categories = [
  {
    value: "project",
    label: "Project inquiry",
    help: "I have a project idea or need help",
  },
  {
    value: "collaboration",
    label: "Collaboration",
    help: "Partnership, freelance or business",
  },
  { value: "hello", label: "Hello", help: "I just want to say hi" },
] as const;
type Category = (typeof categories)[number]["value"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [step, setStep] = useState<Step>("name");
  const [lines, setLines] = useState<Line[]>([
    { text: "nurbyte@dev:~$ contact --start", tone: "command" },
    { text: "✓ Contact form ready", tone: "success" },
    {
      text: "Tell me a little about yourself — I'll guide you step by step.",
      tone: "muted",
    },
    { text: "", tone: "muted" },
    { text: "First, what's your name?", tone: "warning" },
  ]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("project");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const append = (...x: Line[]) => setLines((v) => [...v, ...x]);
  const command = (x: string) =>
    append({ text: `nurbyte@dev:~$ ${x}`, tone: "command" });
  const fail = (x: string, h?: string) =>
    append(
      { text: `✗ ${x}`, tone: "error" },
      ...(h ? [{ text: `  ${h}`, tone: "muted" as Tone }] : []),
    );
  useEffect(() => {
    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines, step, progress]);
  useEffect(() => {
    const target = step === "message" ? messageRef.current : inputRef.current;
    target?.focus({ preventScroll: true });
  }, [step]);
  const choose = (v: Category) => {
    const item = categories.find((x) => x.value === v)!;
    setCategory(v);
    command(`contact topic ${v}`);
    append(
      { text: `✓ Topic selected: ${item.label}`, tone: "success" },
      { text: "What email can I reply to?", tone: "warning" },
    );
    setStep("email");
    setValue("");
  };
  const run = () => {
    const clean = value.trim();
    if (step === "name") {
      if (clean.length < 2) {
        fail(
          "That name looks too short.",
          "Please enter at least 2 characters.",
        );
        setValue("");
        return;
      }
      setName(clean);
      command(`contact name "${clean}"`);
      append(
        { text: `Nice to meet you, ${clean}!`, tone: "success" },
        { text: "What would you like to talk about?", tone: "warning" },
      );
      setStep("category");
      setValue("");
      return;
    }
    if (step === "category") {
      const n = Number(clean);
      const selected =
        Number.isInteger(n) && n >= 1 && n <= 3
          ? categories[n - 1]
          : categories.find((x) => x.value === clean.toLowerCase());
      if (!selected) {
        fail(
          "I don't recognize that option.",
          "Choose 1, 2 or 3 — or click one.",
        );
        setValue("");
        return;
      }
      choose(selected.value);
      return;
    }
    if (step === "email") {
      if (!emailPattern.test(clean)) {
        command(`contact email ${clean || "(empty)"}`);
        fail(
          `That email doesn't look right: "${clean || "(empty)"}"`,
          `Try something like: name@example.com`,
        );
        setValue("");
        return;
      }
      setEmail(clean);
      command(`contact email ${clean}`);
      append(
        { text: "Checking email...", tone: "muted" },
        { text: "✓ Email looks good", tone: "success" },
        { text: "", tone: "muted" },
        {
          text: "Now write your message below. Press Ctrl/⌘ + Enter when you're finished.",
          tone: "warning",
        },
      );
      setStep("message");
      setValue("");
    }
  };
  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    if (step === "category") {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCategoryIndex((i) => (i + 1) % 3);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCategoryIndex((i) => (i + 2) % 3);
        return;
      }
      if (e.key === "Enter" && !value.trim()) {
        e.preventDefault();
        choose(categories[categoryIndex].value);
        return;
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      run();
    }
  };
  const saveMessage = () => {
    const clean = message.trim();
    if (clean.length < 10) {
      fail(
        "Your message is a little too short.",
        "Please write at least 10 characters.",
      );
      return;
    }
    setMessage(clean);
    command(`contact message --save`);
    append(
      { text: `✓ Message saved (${clean.length} characters)`, tone: "success" },
      {
        text: "Review complete. Press Enter or click SEND MESSAGE.",
        tone: "warning",
      },
    );
    setStep("review");
  };
  const messageKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveMessage();
    }
  };
  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    if (step !== "review") return;
    command("contact send");
    append({ text: "Validating form data...", tone: "muted" });
    setStep("sending");
    setProgress(18);
    await new Promise((resolve) => setTimeout(resolve, 220));
    append(
      { text: "✓ Form data validated", tone: "success" },
      { text: "Connecting to NurByte mail service...", tone: "muted" },
    );
    setProgress(48);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, category, message }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || !result.ok)
        throw new Error(result.error || "Mail service rejected the message.");
      setProgress(100);
      append(
        { text: "✓ Message delivered", tone: "success" },
        { text: `✓ Confirmation sent to ${email}`, tone: "success" },
        {
          text: "Thank you — I'll get back to you as soon as possible.",
          tone: "success",
        },
        { text: "nurbyte@dev:~$ _", tone: "command" },
      );
      setStep("done");
    } catch (error) {
      setProgress(0);
      append(
        {
          text: `✗ SEND_FAILED: ${error instanceof Error ? error.message : "Unknown mail error"}`,
          tone: "error",
        },
        {
          text: "Your message was not marked as sent. You can try again.",
          tone: "warning",
        },
      );
      setStep("review");
    }
  };
  return (
    <form className="contact-terminal contact-cli" onSubmit={send}>
      <div className="term-bar">
        <i />
        <i />
        <i />
        <span>nurbyte@dev: ~/contact — zsh</span>
      </div>
      <div
        ref={viewportRef}
        className="cli-screen"
        aria-live="polite"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          step === "message"
            ? messageRef.current?.focus()
            : inputRef.current?.focus();
        }}
      >
        <div className="cli-history">
          {lines.map((l, i) => (
            <div key={i} className={`cli-${l.tone ?? "muted"}`}>
              {l.text || "\u00a0"}
            </div>
          ))}
        </div>
        {["name", "category", "email"].includes(step) && (
          <div className="cli-live-prompt">
            <span className="cli-shell">nurbyte@dev:~$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={key}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        )}
        {step === "category" && (
          <div className="cli-category-select">
            <div className="cli-category-help">
              Choose 1–3, ↑/↓ + Enter, or click:
            </div>
            {categories.map((x, i) => (
              <button
                key={x.value}
                type="button"
                className={i === categoryIndex ? "selected" : ""}
                onMouseEnter={() => setCategoryIndex(i)}
                onClick={() => choose(x.value)}
              >
                <b>{i === categoryIndex ? "›" : " "}</b>
                <span>
                  [{i + 1}] {x.label}
                </span>
                <small>{x.help}</small>
              </button>
            ))}
          </div>
        )}
        {step === "message" && (
          <div className="cli-message-compose">
            <div className="cli-compose-command">
              nurbyte@dev:~$ contact message
            </div>
            <div className="cli-message-prompt">
              <span>&gt;</span>
              <textarea
                ref={messageRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={messageKey}
                maxLength={250}
                placeholder="Type your message here…"
              />
            </div>
            <div className="cli-compose-help">
              <span>{message.length}/250</span>
              <span>Ctrl/⌘ + Enter to continue</span>
              <button type="button" onClick={saveMessage}>
                CONTINUE ↵
              </button>
            </div>
          </div>
        )}
        {step === "review" && (
          <div className="cli-review">
            <div>READY TO SEND</div>
            <div className="cli-rule">────────────────────────────────────</div>
            <p>
              <span>name</span>
              {name}
            </p>
            <p>
              <span>topic</span>
              {category}
            </p>
            <p>
              <span>email</span>
              {email}
            </p>
            <p>
              <span>message</span>
              {message.length} characters
            </p>
            <div className="cli-rule">────────────────────────────────────</div>
            <button type="submit" className="terminal-command">
              nurbyte@dev:~$ contact send <b>↵</b>
            </button>
          </div>
        )}
        {step === "sending" && (
          <div className="cli-progress">
            <div>
              <span>sending message</span>
              <b>{progress}%</b>
            </div>
            <div className="cli-progress-track">
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        {step === "done" && (
          <div className="cli-done">
            session complete <span className="cursor">█</span>
          </div>
        )}
      </div>
    </form>
  );
}
