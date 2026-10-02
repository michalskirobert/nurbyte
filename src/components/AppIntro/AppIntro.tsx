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
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.frame}>
        <div
          className={`${styles.batikRail} ${styles.batikLeft}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.batikRail} ${styles.batikRight}`}
          aria-hidden="true"
        />
        <i
          className={`${styles.corner} ${styles.cornerTl}`}
          aria-hidden="true"
        />
        <i
          className={`${styles.corner} ${styles.cornerTr}`}
          aria-hidden="true"
        />
        <i
          className={`${styles.corner} ${styles.cornerBl}`}
          aria-hidden="true"
        />
        <i
          className={`${styles.corner} ${styles.cornerBr}`}
          aria-hidden="true"
        />

        <div className={styles.content}>
          <div className={styles.logoLockup} aria-hidden="true">
            <Image
              className={styles.mark}
              src="/assets/brand/nurbyte-mark.png"
              alt=""
              width={64}
              height={64}
              priority
            />
            <div className={styles.brandText}>
              <span>
                <b>Nur</b>Byte
              </span>
              <small>Software Lab &lt;/&gt;</small>
            </div>
          </div>

          <div className={styles.title} aria-hidden="true">
            <span>AKHIRNYA...</span>
            <strong>NURBYTE.DEV</strong>
            <small>
              POLAND <b>×</b> INDONESIA
            </small>
          </div>

          <div className={styles.loaderBlock} aria-hidden="true">
            <div className={styles.loaderHeader}>
              <span>LOADING SOMETHING AWESOME...</span>
              <b className={styles.percent}>100%</b>
            </div>
            <div className={styles.loader}>
              <span className={styles.loaderFill} />
            </div>
          </div>

          <div className={styles.ladyLine} aria-hidden="true">
            <span className={styles.paw}>◆</span>
            <span>LADY.EXE</span>
            <i>...</i>
            <b>WOOF!</b>
          </div>

          <div className={styles.ready} aria-hidden="true">
            <strong>SIAP!</strong>
            <span>
              NURBYTE.DEV IS READY<span className={styles.cursor}>_</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
