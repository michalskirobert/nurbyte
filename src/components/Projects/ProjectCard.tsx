import Image from "next/image";
import type { Project } from "./types";
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className={`project-rail-card${project.locked ? " locked" : ""}`}
      data-project={project.id}
    >
      <div className="project-rail-art">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width:760px) 82vw,820px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="locked-art">
            <b>?</b>
            <span>PROJECT LOCKED</span>
          </div>
        )}
        <span className="rail-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="project-rail-info">
        <div className="project-meta">
          <span>{project.type}</span>
          <i>{project.status}</i>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.tech.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className="project-actions">
          {project.locked ? (
            <span className="project-open disabled">◆ LOCKED</span>
          ) : project.url ? (
            <a
              className="project-open"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {project.actionLabel ?? "▶ OPEN PROJECT"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
