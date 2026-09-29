"use client";

import { useEffect, useState } from "react";

const assets = [
  "/assets/backgrounds/home.webp",
  "/assets/backgrounds/about.webp",
  "/assets/backgrounds/projects.webp",
  "/assets/backgrounds/tech.webp",
  "/assets/backgrounds/contact.webp",
  "/assets/brand/nurbyte-mark.png",
  "/assets/projects/docflow-dashboard.webp",
  "/assets/projects/hosts-editor-settings.webp",
  "/assets/characters/lady/accepted/sniff.png",
  "/assets/characters/lady/accepted/question.png",
  "/assets/characters/lady/accepted/idle.png",
  "/assets/characters/lady/accepted/toy.png",
  "/assets/characters/lady/accepted/header.png",
  "/assets/characters/lady/accepted/contact.png",
];

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
    if (image.complete) resolve();
  });
}

export default function AppPreloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const prepare = async () => {
      await Promise.all([
        ...assets.map(loadImage),
        document.fonts?.ready ?? Promise.resolve(),
      ]);

      if (cancelled) return;
      setLeaving(true);
      window.setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, 320);
    };

    void prepare();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`app-preloader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading NurByte"
    >
      <div className="app-preloader-content">
        <div className="app-preloader-brand">
          <img
            src="/assets/brand/nurbyte-mark.png"
            alt=""
            width="54"
            height="54"
          />
          <div>
            <strong>
              <b>Nur</b>Byte
            </strong>
            <small>Software Lab &lt;/&gt;</small>
          </div>
        </div>
        <div className="app-preloader-line">
          <span />
        </div>
        <p>LOADING WORLD...</p>
      </div>
    </div>
  );
}
