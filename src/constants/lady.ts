export type LadyMood = "idle" | "question" | "love" | "woof";

export const LADY_ASSETS = {
  header: {
    idle: "/assets/characters/lady/header/idle.webp",
    question: "/assets/characters/lady/header/idle.webp",
    love: "/assets/characters/lady/shared/wave.webp",
    woof: "/assets/characters/lady/shared/howl.webp",
  },
  projects: {
    idle: "/assets/characters/lady/shared/idle.webp",
    question: "/assets/characters/lady/shared/question.webp",
    love: "/assets/characters/lady/shared/wave.webp",
    woof: "/assets/characters/lady/shared/howl.webp",
  },
  contact: {
    idle: "toy.webp",
    question: "question.webp",
    love: "idle.webp",
    woof: "howl.webp",
  },
} as const satisfies Record<string, Record<LadyMood, string>>;

export const LADY_TIMINGS = {
  loveToWoof: 850,
  headerReset: 1850,
  projectsReset: 1750,
  contactReset: 2100,
} as const;

export const LADY_LABELS = {
  projects: {
    idle: "SELECT!",
    question: "?",
    love: "",
    woof: "WOOF!",
  },
  contact: {
    idle: "NEED A DEVELOPER?",
    question: "?",
    love: "",
    woof: "WOOF!",
  },
} as const satisfies Record<string, Record<LadyMood, string>>;
