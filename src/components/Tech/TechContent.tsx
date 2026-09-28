"use client";

import { useState } from "react";
import TechInspector from "./TechInspector";
import TechInventory from "./TechInventory";
import { technologies } from "./technologies.data";

export default function TechContent() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="tech-layout">
      <TechInventory items={technologies} selected={selected} onSelect={setSelected} />
      <TechInspector technology={technologies[selected]} />
    </div>
  );
}
