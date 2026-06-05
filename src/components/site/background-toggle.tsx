"use client";

import { useBackground } from "./background-context";

export function BackgroundToggle() {
  const { enabled, toggle, ready } = useBackground();
  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      title={enabled ? "Désactiver l'animation de fond" : "Activer l'animation de fond"}
      className="glass group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-foreground/90 transition-colors hover:bg-white/[0.08]"
    >
      <span className="relative flex h-2 w-2">
        {enabled && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            enabled ? "bg-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" : "bg-muted"
          }`}
        />
      </span>
      <span className="hidden sm:inline">
        {enabled ? "Animation IA" : "Animation off"}
      </span>
    </button>
  );
}
