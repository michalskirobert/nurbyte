"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "./types";

export default function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!project) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", key);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", key);
      document.body.style.overflow = previous;
    };
  }, [project, onClose]);
  if (!mounted || !project) return null;
  return createPortal(
    <div
      className="arcade-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="arcade-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projectModalTitle"
      >
        <div className="modal-corner modal-corner-tl" />
        <div className="modal-corner modal-corner-tr" />
        <div className="modal-corner modal-corner-bl" />
        <div className="modal-corner modal-corner-br" />
        <div className="arcade-modal-bar">
          <span>
            <i>●</i> PROJECT_DATA.EXE
          </span>
          <b>PROJECT DATABASE // NURBYTE</b>
          <button onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="arcade-modal-scroll">
          {project.image && (
            <div className="arcade-modal-art">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width:760px) 94vw,900px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div className="arcade-modal-body">
            <div className="modal-system-line">
              PROJECT RECORD LOADED <span>READY</span>
            </div>
            <div className="project-meta">
              <span>{project.type}</span>
              <i>{project.status}</i>
            </div>
            <h3 id="projectModalTitle">{project.name}</h3>
            <p>{project.details ?? project.description}</p>
            <div className="project-tech">
              {project.tech.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <div className="arcade-modal-actions">
              {project.url ? (
                <a
                  className="btn primary"
                  href={project.url}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noreferrer" : undefined}
                >
                  {project.actionLabel ?? "▶ OPEN PROJECT"}
                </a>
              ) : (
                <span className="btn ghost disabled-action">◆ LOCKED</span>
              )}
              <button className="btn ghost" onClick={onClose}>
                ESC / CLOSE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
