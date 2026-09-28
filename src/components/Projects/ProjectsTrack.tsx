"use client";
import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "./projects.data";
export default function ProjectsTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const wheel = (event: WheelEvent) => {
      if (track.scrollWidth <= track.clientWidth + 2) return;
      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (!delta) return;
      event.preventDefault();
      event.stopPropagation();
      track.scrollLeft += delta;
    };
    track.addEventListener("wheel", wheel, { passive: false });
    return () => track.removeEventListener("wheel", wheel);
  }, []);
  return (
    <div ref={trackRef} className="projects-track" aria-label="Projects">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
