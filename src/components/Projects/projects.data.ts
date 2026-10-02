import type { Project } from "./types";
export const projects: Project[] = [
  {
    id: "docflow",
    name: "DOCFLOW",
    type: "WEB APP / SAAS",
    status: "● ACTIVE",
    description:
      "Document workflow software for reusable templates, document generation, email preparation and invoicing in one focused workspace.",
    details:
      "DocFlow is a document productivity workspace for building reusable templates, generating documents, preparing email content and managing invoicing workflows from one application.",
    image: "/assets/projects/docflow-dashboard.webp",
    tech: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "POSTGRESQL"],
    url: "/docflow",
    actionLabel: "DETAILS",
    external: false,
    secondaryUrl: "https://docflow.nurbyte.dev",
    secondaryActionLabel: "OPEN APP",
    secondaryExternal: true,
  },
  {
    id: "hosts-editor",
    name: "HOSTS EDITOR",
    type: "DESKTOP / DEV TOOL",
    status: "● ACTIVE",
    description:
      "A free cross-platform hosts file editor for macOS, Windows and Linux with profiles, backups and safe apply flows.",
    details:
      "A free cross-platform developer utility for managing hosts entries in isolated tabs, keeping manual backups and safely applying profiles to the system hosts file on macOS, Windows and Linux.",
    image: "/assets/projects/hosts-editor-settings.webp",
    tech: ["ELECTRON", "REACT", "TYPESCRIPT", "VITE"],
    url: "/hosts-editor",
    actionLabel: "HOSTS EDITOR DETAILS",
    external: false,
  },
  {
    id: "locked",
    name: "???",
    type: "LOCKED SLOT",
    status: "LOCKED",
    description:
      "A new project will unlock here. The final slot always stays open for the next build.",
    image: null,
    tech: ["COMING SOON"],
    url: null,
    locked: true,
  },
];
