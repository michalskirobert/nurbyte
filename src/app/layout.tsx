import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});
const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "NurByte Software Lab — Developer Tools & Document Workflows",
    template: "%s | NurByte",
  },
  description: siteConfig.description,
  keywords: [
    "NurByte",
    "software development",
    "developer tools",
    "Hosts Editor",
    "DocFlow",
    "Next.js",
    "Electron",
    "document workflow",
    "software house Poland",
  ],
  authors: [{ name: "NurByte Software Lab" }],
  creator: "NurByte Software Lab",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NurByte Software Lab",
    title: "NurByte Software Lab — Building digital worlds that work",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "NurByte Software Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NurByte Software Lab",
    description: siteConfig.description,
    images: ["/opengraph-image"],
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
export const viewport: Viewport = {
  themeColor: "#080b13",
  colorScheme: "dark",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixel.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
