"use client";

import { Heart } from "lucide-react";

import Image from "next/image";
import { useState } from "react";

export default function HeroCharacters() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Image
        className="hero-characters characters"
        src="/assets/characters/home-characters-primary.webp"
        alt="NurByte creators with Lady"
        width={1671}
        height={941}
        sizes="(max-width: 760px) 112vw, (max-width: 1050px) 64vw, min(60vw, 1050px)"
        priority
        fetchPriority="high"
        quality={65}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRg4DAABXRUJQVlA4WAoAAAAQAAAAJwAAFgAAQUxQSGkBAAABkGttmyFbf1XtY2X2OZER2zauwSdTdk5q27Zt28od29X1ff0HzT1XEBETIAVdVVWVFSctplsj1e9k3IeXUi3G9pozf30L2aL6u6e48pysUFW9u0qjf7pZnBhjSjGm1kf9571qRMSfG4kREVPIuqqa0oeBZIjIoO8bGNP4Zgep6WwuIyJSe6pGZAySga9tlZml+62IuBxGWkxecPidJwmvJL0us1Vyi/HbhZPOnRCT5mzPL6qqMRn/WvuNCPGTGmK7/mVQVT0pLsU4uan/vA8gGX//GYO/pgzvKLvUM0T/dYyrmeJkvXpmqxKE6p8hVzQiIz0vIkZEnEzUAJJIyfT68ZGGxI65BwaKESsd/4bAoiChzFTVAWJr1HmuEVOBrCTSwOiPXjIis9UzCSaBrJxA/L1tk0XfA1KSQCGQJIChl5TZIAgwP0gSDPEw9chKgmWCiNeBFaqs1KhSAKIElEEABFKQA2kgkZoAAFZQOCB+AQAA8AYAnQEqKAAXAD8BaqtPKyYjoiqt+WAgCWxg61ClfVwUNV3mJfgaS9nQV9p6p1eIFJFMCx9RABBs+pjqM3LxAAD+6/r+YHCVGTS/zauY0LYmLdDL+71a0qC1shQJSP4KsJRIhVRy5t4W/QNWGnAmILl5ipItEaSZZ9Pwti2QpmnD9zJj4bnlKRL6jx65KBBnuVRR8tT+p1cw9f/fX+E+rFC68mpwyL3ivdes6poYFjo6q2uUZwbI/iFdbeLOq5bTGj+4fjoQSOZ7+jfd2bMmr83wYDSFaV4YV68xekDNCfjLWaoXVYt10l379+BKrFWYmm3u8F8fsOp5Q095f7RIi8DYtMLz7flh/z/rSxjW/LuLpMATmnYKN8hZK4+lS3VQLB2W9dNByAsAbxe7cGi/MzrrBkBlfKfJfKb43U5tvVumGVHjl92uL0+8ZqPSQKMUVHSotVZt368H2Y1q0GA+QZeZZ5KuCJWy8GCRsfuR43rt8TDsxHdzr86mjo8AAA="
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow((value) => !value)}
      />

      <div className={`lady-bubble ${show ? "show" : ""}`}>
        Ready to build something amazing? <Heart aria-hidden="true" />
      </div>
    </>
  );
}
