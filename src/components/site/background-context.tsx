"use client";

import { createContext, useContext, useEffect, useState } from "react";

type BackgroundCtx = {
  enabled: boolean;
  toggle: () => void;
  ready: boolean;
};

const Ctx = createContext<BackgroundCtx | null>(null);
const STORAGE_KEY = "ads-bg-anim";

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Default: on, unless the user previously disabled it or prefers reduced motion.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "on") setEnabled(true);
    else if (stored === "off") setEnabled(false);
    else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setEnabled(!reduce);
    }
    setReady(true);
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  };

  return <Ctx.Provider value={{ enabled, toggle, ready }}>{children}</Ctx.Provider>;
}

export function useBackground() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBackground must be used within BackgroundProvider");
  return ctx;
}
