import { Download, ExternalLink, LockKeyhole } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
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
            <span className="project-open disabled inline-flex items-center justify-center gap-2 whitespace-nowrap">
              <LockKeyhole
                aria-hidden="true"
                className="h-[1em] w-[1em] shrink-0 self-center stroke-[2.25]"
              />{" "}
              LOCKED
            </span>
          ) : project.url ? (
            project.external ? (
              <a
                className="project-open inline-flex items-center justify-center gap-2 whitespace-nowrap"
                href={project.url}
                aria-label={`${project.actionLabel ?? "Open project"}: ${project.name}`}
                target="_blank"
                rel="noreferrer"
              >
                {project.actionLabel?.includes("DOWNLOAD") ? (
                  <Download
                    aria-hidden="true"
                    className="h-[1em] w-[1em] shrink-0 self-center stroke-[2.25]"
                  />
                ) : (
                  <ExternalLink
                    aria-hidden="true"
                    className="h-[1em] w-[1em] shrink-0 self-center stroke-[2.25]"
                  />
                )}{" "}
                {project.actionLabel ?? "OPEN PROJECT"}
              </a>
            ) : (
              <Link
                className="project-open inline-flex items-center justify-center gap-2 whitespace-nowrap"
                href={project.url as Route}
                aria-label={`${project.actionLabel ?? "Open project"}: ${project.name}`}
              >
                <ExternalLink
                  aria-hidden="true"
                  className="h-[1em] w-[1em] shrink-0 self-center stroke-[2.25]"
                />
                {project.actionLabel ?? "OPEN PROJECT"}
              </Link>
            )
          ) : null}
          {project.secondaryUrl ? (
            project.secondaryExternal ? (
              <a
                className="project-open inline-flex items-center justify-center gap-2 whitespace-nowrap"
                href={project.secondaryUrl}
                aria-label={`${project.secondaryActionLabel ?? "Open app"}: ${project.name}`}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink
                  aria-hidden="true"
                  className="h-[1em] w-[1em] shrink-0 self-center stroke-[2.25]"
                />
                {project.secondaryActionLabel ?? "OPEN APP"}
              </a>
            ) : (
              <Link
                className="project-open inline-flex items-center justify-center gap-2 whitespace-nowrap"
                href={project.secondaryUrl as Route}
                aria-label={`${project.secondaryActionLabel ?? "Open"}: ${project.name}`}
              >
                <ExternalLink
                  aria-hidden="true"
                  className="h-[1em] w-[1em] shrink-0 self-center stroke-[2.25]"
                />
                {project.secondaryActionLabel ?? "OPEN"}
              </Link>
            )
          ) : null}
        </div>
      </div>
    </article>
  );
}
