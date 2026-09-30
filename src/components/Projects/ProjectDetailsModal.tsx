"use client";

import { Download, X, ExternalLink, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "./types";

export default function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
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
  if (!project || typeof document === "undefined") return null;
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
            <X aria-hidden="true" className="h-5 w-5 stroke-2" />
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
                  className="btn primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  href={project.url}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noreferrer" : undefined}
                >
                  <>
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
                  </>
                </a>
              ) : (
                <span className="btn ghost disabled-action">
                  <LockKeyhole
                    aria-hidden="true"
                    className="h-[1em] w-[1em] shrink-0 self-center stroke-[2.25]"
                  />{" "}
                  LOCKED
                </span>
              )}
              <button
                className="btn ghost inline-flex items-center justify-center gap-2 whitespace-nowrap"
                onClick={onClose}
              >
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
