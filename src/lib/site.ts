/**
 * Single source of truth for site identity used by metadata, OpenGraph images,
 * sitemap and robots. Override the canonical URL at deploy time with
 * NEXT_PUBLIC_SITE_URL (e.g. https://ai-dev-system-web.vercel.app).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-dev-system-web.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "AI Dev System";

export const SITE_TAGLINE = "Gouverne. Prouve. Automatise.";

export const SITE_DESCRIPTION =
  "Le système de livraison gouverné : pilote n'importe quel exécuteur IA sous une gouvernance déterministe, intelligente et prouvée — reprise exacte, attestation cryptographique, gouvernance prédictive et strictesse imposée, par construction.";

export const SITE_KEYWORDS = [
  "AI Dev System",
  "Governor",
  "gouvernance IA",
  "AI delivery",
  "agent IA gouverné",
  "attestation",
  "reprise exacte",
  "Claude Code",
  "Codex",
  "orchestration IA",
];
