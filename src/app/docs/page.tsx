import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — Introduction · AI Dev System",
  description: "Qu'est-ce qu'AI Dev System et Governor, et comment le système est structuré.",
};

export default function DocsIntroPage() {
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Démarrer</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-foreground">Introduction</h1>

      <p>
        <strong>AI Dev System</strong> est un système de livraison <strong>gouverné</strong> : il pilote
        n&apos;importe quel exécuteur IA (Codex, Claude Code, Cursor, Windsurf…) sous une gouvernance
        ultra-automatisée, intelligente et prédictive. Tu donnes le besoin ; le système sélectionne les
        capacités utiles, exécute par tranches prouvées, et garantit la qualité par construction.
      </p>

      <h2>Le principe</h2>
      <p>
        La gouvernance est du code déterministe (zéro token) ; le coût et le risque viennent de
        l&apos;exécuteur. Le système sépare donc les deux et impose, à la frontière, des garanties que le
        modèle ne peut pas contourner : <strong>règle d&apos;or — ne jamais marquer comme fait ce qui n&apos;est
        pas prouvé.</strong>
      </p>

      <h2>Les quatre couches canoniques</h2>
      <ul>
        <li>
          <strong>Framework Core</strong> — le noyau : phases, quality gates, contexte minimal, contrats.
        </li>
        <li>
          <strong>Governor Kit</strong> — le pilote : sessions, artefacts de reprise, journal de continuité,
          attestation, prédictif, strictesse, allégeance.
        </li>
        <li>
          <strong>Host Adapter</strong> — l&apos;intégration à l&apos;exécuteur (hooks, prompts, permissions).
        </li>
        <li>
          <strong>Project Instance</strong> — la copie gouvernée installée dans chaque projet.
        </li>
      </ul>

      <h2>Et ensuite ?</h2>
      <p>
        Continue avec le <Link href="/docs/getting-started">getting started</Link>, explore l&apos;
        <Link href="/docs/architecture">architecture</Link>, ou parcours toutes les{" "}
        <Link href="/capabilities">capacités</Link>.
      </p>
    </>
  );
}
