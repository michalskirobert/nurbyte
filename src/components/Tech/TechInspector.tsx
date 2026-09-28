import type { Technology } from "./types";

export default function TechInspector({ technology }: { technology: Technology }) {
  return (
    <aside className="tech-inspector" aria-live="polite">
      <span className="tech-inspector-kicker">SELECTED TECHNOLOGY</span>
      <div className="tech-inspector-icon">
        <img src={`https://cdn.simpleicons.org/${technology.icon}/${technology.color}`} alt="" />
      </div>
      <h3>{technology.name.toUpperCase()}</h3>
      <span>{technology.role}</span>
      <p>{technology.description}</p>
      <div className="tech-signal"><span>PROFILE</span><b>● FRONTEND / CROSS-PLATFORM</b></div>
    </aside>
  );
}
