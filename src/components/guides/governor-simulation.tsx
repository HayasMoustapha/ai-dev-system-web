"use client";

import { useEffect, useRef, useState } from "react";

type Line = {
  kind: "comment" | "cmd" | "out" | "ok" | "warn" | "ask" | "done";
  text: string;
};

// A scripted, realistic Governor session: add a contact page, governed end-to-end.
const SCRIPT: Line[] = [
  { kind: "comment", text: "# Cas pratique — ajouter une page de contact, gouvernée de bout en bout" },
  { kind: "cmd", text: 'ads-go "Ajoute une page de contact avec un formulaire validé"' },
  { kind: "out", text: "Governor · session ouverte → contact-page-2026" },
  { kind: "out", text: "Cadrage… risque prédit : 38/100 (modéré) · profil : balanced" },
  { kind: "out", text: "Plan : 3 tranches · capacités activées : validation, anti-spam, tests" },
  { kind: "out", text: "" },
  { kind: "out", text: "Tranche 1/3 — Échafaudage du formulaire" },
  { kind: "ok", text: "  ✓ porte lint    ✓ porte types    ✓ tests (4 verts)" },
  { kind: "out", text: "Tranche 2/3 — Validation des champs + anti-spam" },
  { kind: "ok", text: "  ✓ porte lint    ✓ tests (9 verts)   ✓ revue ciblée" },
  { kind: "warn", text: "Tranche 3/3 — Envoi e-mail · secret SMTP manquant → arrêt gouverné" },
  { kind: "ask", text: "→ décision requise : fournir SMTP_URL (zone sensible, jamais devinée)" },
  { kind: "cmd", text: "ads-go --resume  SMTP_URL=••••••" },
  { kind: "ok", text: "  ✓ tests (12 verts)   ✓ attestation signée (HMAC-SHA256)" },
  { kind: "done", text: "Livré · 3/3 tranches prouvées · 0 régression · pack de conformité généré" },
];

const STYLES: Record<Line["kind"], string> = {
  comment: "text-muted",
  cmd: "text-foreground",
  out: "text-foreground/70",
  ok: "text-cyan/90",
  warn: "text-amber-300/90",
  ask: "text-violet/90",
  done: "text-foreground",
};

const DELAY: Record<Line["kind"], number> = {
  comment: 500,
  cmd: 650,
  out: 320,
  ok: 480,
  warn: 620,
  ask: 700,
  done: 400,
};

export function GovernorSimulation() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceRef = useRef(false);

  // Start when scrolled into view (or immediately if reduced motion).
  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceRef.current) {
      setStep(SCRIPT.length);
      setStarted(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reveal lines one by one.
  useEffect(() => {
    if (!started || reduceRef.current) return;
    if (step >= SCRIPT.length) return;
    const line = SCRIPT[step];
    const t = setTimeout(() => setStep((s) => s + 1), DELAY[line.kind]);
    return () => clearTimeout(t);
  }, [started, step]);

  const replay = () => {
    if (reduceRef.current) return;
    setStep(0);
  };

  const done = step >= SCRIPT.length;
  const visible = SCRIPT.slice(0, step);

  return (
    <div ref={containerRef} className="glass glow-cyan overflow-hidden rounded-2xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-300/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-mono text-xs text-muted">governor — session simulée</span>
        <button
          type="button"
          onClick={replay}
          className="ml-auto rounded-md px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-foreground"
        >
          ↻ rejouer
        </button>
      </div>

      {/* terminal body */}
      <div className="min-h-[20rem] space-y-1 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        {visible.map((line, i) => (
          <div key={i} className={STYLES[line.kind]}>
            {line.kind === "cmd" ? (
              <span>
                <span className="text-cyan/70">❯ </span>
                {line.text}
              </span>
            ) : line.text === "" ? (
              <span>&nbsp;</span>
            ) : (
              line.text
            )}
          </div>
        ))}
        {!done && started && (
          <span className="inline-block h-4 w-2 animate-pulse bg-cyan/80 align-middle" />
        )}
        {done && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[0.06] px-3 py-1 text-xs text-cyan/90">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
            Session prouvée — rien marqué « fait » sans preuve
          </div>
        )}
      </div>
    </div>
  );
}
