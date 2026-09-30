import Image from "next/image";
import type { LadyMood } from "./types";

const sprites: Record<LadyMood, string> = {
  idle: "/assets/characters/lady/nav-idle.png",
  happy: "/assets/characters/lady/nav-happy.png",
  heart: "/assets/characters/lady/nav-heart.png",
  question: "/assets/characters/lady/nav-question.png",
  surprised: "/assets/characters/lady/nav-surprised.png",
  love: "/assets/characters/lady/nav-love.png",
};

type LadyProps = {
  mood?: LadyMood;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function Lady({
  mood = "idle",
  alt = "Lady",
  className = "",
  width = 96,
  height = 96,
}: LadyProps) {
  return (
    <Image
      src={sprites[mood]}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="eager"
      priority
      style={{ width: "auto", height: "auto" }}
    />
  );
}
