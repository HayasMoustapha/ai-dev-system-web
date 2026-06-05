"use client";

import dynamic from "next/dynamic";

// Three.js must run client-side only; load the canvas without SSR.
const HeroCanvas = dynamic(() => import("../three/hero-canvas"), { ssr: false });

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
      <HeroCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,transparent,rgba(5,6,10,0.7))]" />
    </div>
  );
}
