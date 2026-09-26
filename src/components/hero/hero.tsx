"use client";
import { motion } from "framer-motion";
import { PixelButton } from "@/components/ui/pixel-button";
import { LiveTerminal } from "@/components/effects/live-terminal";
import { SceneArt } from "@/components/effects/scene-art";

export function Hero() {
  return (
    <main className="game-section game-section--hero" id="home">
      <SceneArt variant="hero" />
      <div className="game-section__inner hero-v4">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="hero__content"
        >
          <p className="hero__code">// CODE · CREATE · EXPLORE</p>
          <h1>
            DIGITAL
            <br />
            SOLUTIONS <span>WITH PURPOSE.</span>
          </h1>
          <p className="hero__lead">
            Web apps, developer tools and digital experiences inspired by real
            engineering, curiosity and the world between Poland and Indonesia.
          </p>
          <div className="hero__actions">
            <PixelButton href="#projects">▶ VIEW PROJECTS</PixelButton>
            <PixelButton href="#about" variant="ghost">
              LEARN MORE
            </PixelButton>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 44 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="hero__terminal"
        >
          <LiveTerminal />
        </motion.div>
        <motion.div
          className="hero__features"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <span>
            <b>&lt;/&gt;</b>
            <i>
              WEB APPLICATIONS<small>SaaS & tools</small>
            </i>
          </span>
          <span>
            <b>▱</b>
            <i>
              MODERN STACK<small>Next.js · React · TypeScript</small>
            </i>
          </span>
          <span>
            <b>♡</b>
            <i>
              BUILT WITH INTENTION<small>Useful · simple · reliable</small>
            </i>
          </span>
          <span>
            <b>◎</b>
            <i>
              GLOBAL PERSPECTIVE<small>PL / EN / ID</small>
            </i>
          </span>
        </motion.div>
      </div>
    </main>
  );
}
