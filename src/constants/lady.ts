export type LadyMood = "idle" | "question" | "love" | "woof";

export const LADY_ASSETS = {
  header: {
    idle: "/assets/characters/lady/accepted/header-small.webp",
    question: "/assets/characters/lady/accepted/header-small.webp",
    love: "/assets/characters/lady/accepted/wave.png",
    woof: "/assets/characters/lady/accepted/howl.png",
  },
  projects: {
    idle: "/assets/characters/lady/accepted/idle.png",
    question: "/assets/characters/lady/accepted/question.png",
    love: "/assets/characters/lady/accepted/wave.png",
    woof: "/assets/characters/lady/accepted/howl.png",
  },
  contact: {
    idle: "toy.png",
    question: "question.png",
    love: "idle.png",
    woof: "howl.png",
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
