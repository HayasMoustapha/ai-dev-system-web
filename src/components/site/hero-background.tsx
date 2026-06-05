"use client";

import { NeuralCanvas } from "./neural-canvas";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="aurora" />
      <div className="absolute inset-0">
        <NeuralCanvas />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_36%,transparent,rgba(5,6,10,0.55))]" />
    </div>
  );
}
