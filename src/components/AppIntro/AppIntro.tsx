"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./AppIntro.module.scss";

const MIN_INTRO_MS = 2200;
const MAX_INTRO_MS = 5000;

export default function AppIntro() {
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    let heroReady =
      pathname !== "/" || document.documentElement.dataset.heroReady === "true";
    let minimumElapsed = false;
    let finished = false;
    let exitTimer: number | undefined;

    const finish = () => {
      if (finished || !minimumElapsed || !heroReady) return;
      finished = true;
      setLeaving(true);
      exitTimer = window.setTimeout(() => setVisible(false), 420);
    };

    const onHeroReady = () => {
      heroReady = true;
      finish();
    };

    if (pathname === "/") {
      window.addEventListener("nurbyte:hero-ready", onHeroReady, {
        once: true,
      });
    }

    const minTimer = window.setTimeout(
      () => {
        minimumElapsed = true;
        finish();
      },
      Math.max(0, MIN_INTRO_MS - (performance.now() - startedAt)),
    );

    const maxTimer = window.setTimeout(() => {
      if (finished) return;
      finished = true;
      setLeaving(true);
      exitTimer = window.setTimeout(() => setVisible(false), 420);
    }, MAX_INTRO_MS);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      window.removeEventListener("nurbyte:hero-ready", onHeroReady);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.intro} ${leaving ? styles.leaving : ""}`}
      role="status"
      aria-live="polite"
      aria-label="NurByte is loading"
    >
      <div className={styles.skyGlow} aria-hidden="true" />
      <div className={styles.pixelGrid} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />

      <div className={styles.bootCard}>
        <div className={styles.logoLockup} aria-hidden="true">
          <Image
            className={styles.mark}
            src="/assets/brand/nurbyte-mark.png"
            alt=""
            width={58}
            height={58}
            priority
          />
          <div className={styles.wordmark}>
            <span>
              <b>Nur</b>Byte
            </span>
            <small>Software Lab &lt;/&gt;</small>
          </div>
        </div>

        <div className={styles.arcadeTitle} aria-hidden="true">
          <span className={styles.kicker}>WELCOME TO</span>
          <strong>NURBYTE WORLD</strong>
          <span className={styles.subtitle}>
            CREATING DIGITAL THINGS SINCE 2025
          </span>
        </div>

        <div className={styles.boot} aria-hidden="true">
          <p className={styles.line1}>
            <span>WORLD</span>
            <b>READY</b>
          </p>
          <p className={styles.line2}>
            <span>PROJECTS</span>
            <b>READY</b>
          </p>
          <p className={styles.line3}>
            <span>CREW</span>
            <b>READY</b>
          </p>
          <p className={styles.line4}>
            <span>LADY</span>
            <b>WOOF!</b>
          </p>
        </div>

        <div className={styles.loader} aria-hidden="true">
          <span className={styles.loaderFill} />
        </div>

        <div className={styles.ready} aria-hidden="true">
          <span>LOADING ADVENTURE</span>
          <b>
            SYSTEM READY<span className={styles.cursor}>_</span>
          </b>
        </div>
      </div>

      <div className={styles.cornerTop} aria-hidden="true">
        NURBYTE // 2026
      </div>
      <div className={styles.cornerBottom} aria-hidden="true">
        PLAYER 01 · ONLINE
      </div>
    </div>
  );
}
