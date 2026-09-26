export const siteConfig = {
  name: "NurByte Software Lab",
  shortName: "NurByte",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurbyte.dev",
  description:
    "Independent software lab building developer tools and document workflow software — crafted between Europe and Southeast Asia.",
  email: "hello@nurbyte.dev",
  links: {
    docflow: "https://docflow.nurbyte.dev",
    github: "https://github.com/",
  },
} as const;
