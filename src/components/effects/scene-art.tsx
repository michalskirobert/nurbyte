"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function SceneArt({
  variant,
}: {
  variant: "hero" | "projects" | "tech" | "about" | "contact";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.07, 1.13]);
  return (
    <div
      ref={ref}
      className={`scene-art scene-art--${variant}`}
      aria-hidden="true"
    >
      <motion.div className="scene-art__image" style={{ y, scale }} />
      <div className="scene-art__shade" />
      <div className="scene-art__scanlines" />
      <div className="scene-art__pixels" />
    </div>
  );
}
