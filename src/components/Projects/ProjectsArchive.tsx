import { X } from "lucide-react";
import { projects } from "./projects.data";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
};

export default function ProjectsArchive({ open, onClose, onSelect }: Props) {
  return (
    <div
      className="project-grid-modal"
      hidden={!open}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div
        className="project-grid-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="allProjectsTitle"
      >
        <header>
          <div>
            <span>PROJECT ARCHIVE</span>
            <h3 id="allProjectsTitle">ALL PROJECTS</h3>
          </div>
          <button type="button" aria-label="Close" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>
        <div className="project-grid">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={`grid-project${project.locked ? " locked" : ""}`}
              onClick={() => onSelect(index)}
            >
              <b>
                {String(index + 1).padStart(2, "0")} // {project.name}
              </b>
              <span>{project.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
