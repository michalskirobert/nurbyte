export const navigation = [
  { label: "HOME", id: "home" },
  { label: "PROJECTS", id: "projects" },
  { label: "ABOUT", id: "about" },
  { label: "TECH", id: "tech" },
  { label: "CONTACT", id: "contact" },
] as const;
export type NavigationId = (typeof navigation)[number]["id"];
