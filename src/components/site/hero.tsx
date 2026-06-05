"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HeroBackground } from "./hero-background";

const STATS = [
  { value: "16", label: "releases livrées" },
  { value: "9", label: "instances gouvernées" },
  { value: "82", label: "portes CI vertes" },
  { value: "0", label: "régression tolérée" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="absolute inset-0 -z-10 grid-noise" />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
          Le système de livraison gouverné · v1.16
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.06 }}
          className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">Gouverne. Prouve.</span>
          <br />
          Automatise.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-foreground/80 sm:text-xl"
        >
          AI Dev System pilote n&apos;importe quel exécuteur IA sous une gouvernance
          ultra‑automatisée, intelligente et prédictive — reprise exacte, attestation
          cryptographique, strictesse imposée. Tu donnes le besoin ; le système fait le
          reste, et le prouve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-[#05060a] transition-transform hover:-translate-y-0.5"
          >
            Commencer
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/capabilities"
            className="glass inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07]"
          >
            Explorer les capacités
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.28 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center">
              <div className="text-3xl font-semibold tracking-tight text-foreground">{s.value}</div>
              <div className="mt-1 text-xs leading-5 text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
