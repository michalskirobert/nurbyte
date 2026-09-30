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
        Software engineering, web development and web design for modern
        websites, SaaS products and developer tools. Built in Poland for clients
        and users across Europe and Asia.
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
