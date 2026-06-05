"use client";

import { useBackground } from "./background-context";
import { NeuralCanvas } from "./neural-canvas";

/**
 * Site-wide fixed background, behind all page content (z-0). Always shows the
 * deep-space base + aurora glow; the animated neural layer is gated by the
 * background toggle (and defaults off for prefers-reduced-motion).
 */
export function SiteBackground() {
  const { enabled, ready } = useBackground();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* deep-space base gradients (always visible, even animation-off) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% -10%, rgba(91,140,255,0.12), transparent 60%)," +
            "radial-gradient(900px 600px at 85% 8%, rgba(167,139,250,0.10), transparent 55%)," +
            "radial-gradient(900px 600px at 12% 22%, rgba(34,211,238,0.09), transparent 55%)," +
            "var(--background)",
        }}
      />
      <div className="aurora" />
      {ready && enabled && (
        <div className="absolute inset-0">
          <NeuralCanvas />
        </div>
      )}
      {/* subtle vignette so foreground text always stays legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_30%,transparent,rgba(5,6,10,0.45))]" />
    </div>
  );
}
