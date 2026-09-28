import type { Technology } from "./types";

export const technologies: Technology[] = [
  ["TypeScript","CORE / LANGUAGE","typescript","3178C6","The common foundation across my web, mobile and desktop application work."],
  ["React","WEB / CORE","react","61DAFB","Production interfaces, reusable component systems and scalable frontend architecture."],
  ["Next.js","WEB / FRAMEWORK","nextdotjs","FFFFFF","Fast, maintainable React products with routing, rendering and server capabilities."],
  ["React Native","MOBILE / CROSS-PLATFORM","react","61DAFB","Cross-platform mobile applications built with the React and TypeScript ecosystem."],
  ["Electron","DESKTOP / CROSS-PLATFORM","electron","47848F","Desktop applications that bring web engineering workflows to macOS, Windows and Linux."],
  ["Redux Toolkit","STATE / DATA","redux","764ABC","Predictable client state and RTK Query data flows in larger applications."],
  ["React Query","DATA / ASYNC","reactquery","FF4154","Server-state synchronization, caching and resilient asynchronous UX."],
  ["React Hook Form","FORMS / UI","reacthookform","EC5990","Performant, maintainable forms and validation-heavy product flows."],
  ["Zod","VALIDATION / TYPES","zod","3E67B1","Runtime validation that keeps application boundaries aligned with TypeScript types."],
  ["Tailwind CSS","UI / STYLING","tailwindcss","06B6D4","Responsive product UI and consistent styling systems."],
  ["MUI","UI / COMPONENTS","mui","007FFF","Accessible component systems for complex business applications."],
  ["Node.js","BACKEND / SUPPORTING","nodedotjs","5FA04E","Backend-related tasks, APIs, tooling and personal products when the project requires it."],
  ["Express","BACKEND / API","express","FFFFFF","Focused Node.js APIs and server-side application endpoints."],
  ["Prisma","DATA / ORM","prisma","FFFFFF","Typed data access and maintainable application data models."],
  ["PostgreSQL","DATA / DATABASE","postgresql","4169E1","Relational persistence for SaaS and production application data."],
  ["MongoDB","DATA / DATABASE","mongodb","47A248","Document-oriented persistence used in Node.js application work."],
  ["Vite","BUILD / TOOLING","vite","646CFF","Fast frontend and Electron development workflows."],
  ["Docker","DEVOPS / TOOLING","docker","2496ED","Repeatable development and deployment environments."],
  ["Git","WORKFLOW / VCS","git","F05032","Versioned delivery, collaboration and reliable release workflows."],
  ["Yarn","TOOLING / PACKAGE MANAGER","yarn","2C8EBB","Modern dependency and workspace management, including Yarn Berry workflows."],
].map(([name, role, icon, color, description]) => ({ name, role, icon, color, description }));
