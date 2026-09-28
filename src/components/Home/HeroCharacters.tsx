"use client";

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
        width={1050}
        height={780}
        priority
        style={{ width: "auto", height: "auto" }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow((value) => !value)}
      />

      <div className={`lady-bubble ${show ? "show" : ""}`}>
        Ready to build something amazing? ♥
      </div>
    </>
  );
}
