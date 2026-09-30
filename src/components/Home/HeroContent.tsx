import { ArrowRight } from "lucide-react";
export default function HeroContent() {
  return (
    <div className="hero-copy reveal visible">
      <p className="eyebrow">// CODE · CREATE · EXPLORE</p>
      <h1>
        DIGITAL
        <br />
        SOLUTIONS
        <br />
        <em>
          WITH
          <br />
          PURPOSE.
        </em>
      </h1>
      <p className="lede">
        Web apps, developer tools and digital experiences inspired by real
        engineering, curiosity and the world between Poland and Indonesia.
      </p>
      <div className="actions">
        <a
          className="btn primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
          href="#projects"
        >
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 shrink-0 stroke-[2.25]"
          />{" "}
          VIEW PROJECTS
        </a>
        <a
          className="btn ghost inline-flex items-center justify-center gap-2 whitespace-nowrap"
          href="#about"
        >
          LEARN MORE
        </a>
      </div>
    </div>
  );
}
