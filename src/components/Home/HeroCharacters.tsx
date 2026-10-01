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
        src="/assets/characters/home-characters-primary.png"
        alt="NurByte creators with Lady"
        width={1671}
        height={941}
        sizes="(max-width: 760px) 112vw, (max-width: 1050px) 64vw, min(60vw, 1050px)"
        priority
        fetchPriority="high"
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
