import type { Metadata, Viewport } from "next";
import { Pixelify_Sans, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import "../styles/master.scss";
import AppIntro from "@/components/AppIntro/AppIntro";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixelify",
  display: "swap",
});
const press = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press",
  display: "swap",
});
const terminal = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-terminal",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nurbyte.dev";

const DISPLAY_MODE_INIT = `
  try {
    var mode = localStorage.getItem("nurbyte-display-mode");
    document.documentElement.dataset.displayMode = mode === "contrast" ? "contrast" : "light";
  } catch (_) {
    document.documentElement.dataset.displayMode = "light";
  }
`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06131d",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NurByte Software Lab | Software Engineering & Web Development",
    template: "%s | NurByte Software Lab",
  },
  description:
    "Software engineering, web development, web design, SaaS and developer tools by NurByte Software Lab. Building modern websites and web apps for clients in Poland, Europe and Asia.",
  applicationName: "NurByte Software Lab",
  authors: [{ name: "NurByte Software Lab", url: siteUrl }],
  creator: "NurByte Software Lab",
  publisher: "NurByte Software Lab",
  category: "technology",
  keywords: [
    "software engineering",
    "software development",
    "web development",
    "web developer",
    "web design",
    "website development",
    "website creation",
    "frontend development",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "SaaS development",
    "custom web applications",
    "developer tools",
    "DocFlow",
    "document workflow software",
    "Hosts Editor",
    "hosts file editor",
    "free hosts editor",
    "NurByte",
    "NurByte Software Lab",
    "Poland",
    "European Union",
    "Indonesia",
    "Singapore",
    "Malaysia",
    "Japan",
    "South Korea",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "NurByte Software Lab",
    title: "NurByte Software Lab | Software Engineering & Web Development",
    description:
      "Custom websites, web applications, SaaS products and developer tools built with modern software engineering.",
    images: [
      {
        url: "/social-preview.jpeg",
        width: 1200,
        height: 630,
        alt: "NurByte Software Lab portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NurByte Software Lab | Software Engineering & Web Development",
    description:
      "Software engineering, web development, SaaS products and developer tools by NurByte Software Lab.",
    images: ["/social-preview.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "NurByte Software Lab",
      description:
        "Web applications, SaaS products and cross-platform developer tools.",
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NurByte Software Lab",
      url: siteUrl,
      logo: `${siteUrl}/icon-192.png`,
      description:
        "Software engineering studio building websites, custom web applications, SaaS products and developer tools.",
      areaServed: [
        { "@type": "Country", name: "Poland" },
        { "@type": "AdministrativeArea", name: "European Union" },
        { "@type": "Country", name: "Indonesia" },
        { "@type": "Country", name: "Singapore" },
        { "@type": "Country", name: "Malaysia" },
        { "@type": "Country", name: "Japan" },
        { "@type": "Country", name: "South Korea" },
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Electron",
        "Frontend Engineering",
        "SaaS",
        "Developer Tools",
        "Web Development",
        "Web Design",
        "Website Development",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description:
              "Custom websites and web applications built with React, Next.js and TypeScript.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software Engineering",
            description:
              "Custom software, SaaS products, frontend engineering and developer tooling.",
          },
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "DocFlow",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${siteUrl}/docflow`,
      sameAs: "https://docflow.nurbyte.dev",
      description:
        "Document workflow software for reusable templates, document generation, email preparation and invoicing.",
      creator: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Hosts Editor",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Windows, Linux",
      description:
        "Free cross-platform hosts file editor with profiles, backups and safe apply flows.",
      creator: { "@id": `${siteUrl}/#organization` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: DISPLAY_MODE_INIT }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${pixelify.variable} ${press.variable} ${terminal.variable}`}
      >
        <AppIntro />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
