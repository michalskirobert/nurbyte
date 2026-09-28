import type { Metadata, Viewport } from "next";
import { Pixelify_Sans, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import "./master.css";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06131d",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "NurByte Software Lab | Web Apps, Developer Tools & Digital Products",
    template: "%s | NurByte Software Lab",
  },
  description:
    "NurByte Software Lab builds fast, maintainable web applications, SaaS products and cross-platform developer tools with React, Next.js, TypeScript and Electron.",
  applicationName: "NurByte Software Lab",
  authors: [{ name: "NurByte Software Lab", url: siteUrl }],
  creator: "NurByte Software Lab",
  publisher: "NurByte Software Lab",
  category: "technology",
  keywords: [
    "NurByte",
    "NurByte Software Lab",
    "software engineer",
    "frontend developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Electron",
    "web applications",
    "SaaS development",
    "developer tools",
    "cross-platform applications",
    "frontend engineering",
    "software development",
    "React",
    "Next.js",
    "Poland",
    "Indonesia",
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
    title: "NurByte Software Lab | Digital Solutions With Purpose",
    description:
      "Web apps, SaaS products and developer tools built with product thinking, clean engineering and a cross-platform mindset.",
    images: [
      {
        url: "/social-preview.jpeg",
        width: 1536,
        height: 864,
        alt: "NurByte Software Lab portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NurByte Software Lab | Digital Solutions With Purpose",
    description:
      "Web apps, SaaS products and developer tools by NurByte Software Lab.",
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
        "Software engineering studio focused on web applications, SaaS products and developer tools.",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Electron",
        "Frontend Engineering",
        "SaaS",
        "Developer Tools",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${pixelify.variable} ${press.variable} ${terminal.variable}`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
