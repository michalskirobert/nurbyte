import type { Technology } from "./types";

export default function TechInspector({
  technology,
}: {
  technology: Technology;
}) {
  return (
    <aside className="tech-inspector" aria-live="polite">
      <span className="tech-inspector-kicker">SELECTED TECHNOLOGY</span>
      <div className="tech-inspector-icon">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote SimpleIcons URL is dynamic and intentionally lazy-loaded. */}
        <img
          src={`https://cdn.simpleicons.org/${technology.icon}/${technology.color}`}
          alt=""
          width={32}
          height={32}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3>{technology.name.toUpperCase()}</h3>
      <span>{technology.role}</span>
      <p>{technology.description}</p>
      <div className="tech-signal">
        <span>PROFILE</span>
        <b>● FRONTEND / CROSS-PLATFORM</b>
      </div>
    </aside>
  );
}
