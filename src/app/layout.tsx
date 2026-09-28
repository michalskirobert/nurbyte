import type { Metadata } from "next";
import { Pixelify_Sans, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import "./master.css";

const pixelify = Pixelify_Sans({ subsets:["latin"], weight:["400","700"], variable:"--font-pixelify" });
const press = Press_Start_2P({ subsets:["latin"], weight:"400", variable:"--font-press" });
const terminal = VT323({ subsets:["latin"], weight:"400", variable:"--font-terminal" });

export const metadata: Metadata = {
  title:"NurByte Software Lab",
  description:"Software engineering across web, mobile and desktop.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body suppressHydrationWarning className={`${pixelify.variable} ${press.variable} ${terminal.variable}`}>{children}</body></html>;
}
