export type Release = {
  version: string;
  date: string;
  title: string;
  tag: string;
  highlights: string[];
  accent: "cyan" | "violet" | "blue";
};

export const RELEASES: Release[] = [
  {
    version: "1.61.0",
    date: "2026-06-11",
    title: "Programme H — rollup de flotte",
    tag: "Programme H",
    highlights: [
      "H central agrège les ledgers de toute la flotte, sans pont manuel",
      "Scorecards honnêtes sur l'union — mesurées, jamais fabriquées",
    ],
    accent: "cyan",
  },
  {
    version: "1.60.0",
    date: "2026-06-11",
    title: "Programme H — boucle d'apprentissage fermée",
    tag: "Programme H",
    highlights: [
      "governor-loop auto-enregistre les outcomes par rôle dans le ledger",
      "Chaque mission gouvernée nourrit H par défaut",
    ],
    accent: "cyan",
  },
  {
    version: "1.59.0",
    date: "2026-06-10",
    title: "CLI d'observabilité workforce",
    tag: "Programme H",
    highlights: [
      "Scorecards par rôle + recommandation + score d'équipe depuis le ledger",
      "insufficient_data montré clairement, zéro score fabriqué",
    ],
    accent: "violet",
  },
  {
    version: "1.57.0",
    date: "2026-06-10",
    title: "Mission Pack augmenté par recherche (H-5)",
    tag: "Programme H",
    highlights: [
      "Standards réels (OWASP, NIST, RFC, WCAG) tracés à une source officielle",
      "Dégradation hors-ligne propre, jamais de référence fabriquée",
    ],
    accent: "blue",
  },
  {
    version: "1.55.0",
    date: "2026-06-10",
    title: "Team builder gagné du ledger (H-3)",
    tag: "Programme H",
    highlights: [
      "Équipe composée + recommandation d'agent honnête, gagnées des outcomes",
      "Jamais de note sur 100 inventée",
    ],
    accent: "cyan",
  },
  {
    version: "1.53.0",
    date: "2026-06-10",
    title: "AI Workforce & Project Excellence (H-1)",
    tag: "Programme H",
    highlights: [
      "Carte rôle → capacité : fondation de la workforce gouvernée",
      "Réutilisation-first des moteurs existants",
    ],
    accent: "violet",
  },
  {
    version: "1.52.0",
    date: "2026-06-10",
    title: "Mission Composer",
    tag: "Composition",
    highlights: [
      "Couche mince orchestrant les moteurs existants en une mission",
      "Scoring d'agent honnête (insufficient_data sans historique)",
    ],
    accent: "blue",
  },
  {
    version: "1.49.0",
    date: "2026-06-10",
    title: "Confiance 10/10 — capstone",
    tag: "Confiance",
    highlights: [
      "Trust-scorecard calculé : attestation, mutation testing, ratchets",
      "Ledger de capacités zéro-confiance-silencieuse",
    ],
    accent: "cyan",
  },
  {
    version: "1.46.0",
    date: "2026-06-10",
    title: "Attestation de merge signée",
    tag: "Confiance",
    highlights: [
      "Un merge n'est autorisé que sur preuve signée et vérifiable",
      "Refus si manquante, périmée, non-verte ou falsifiée",
    ],
    accent: "violet",
  },
  {
    version: "1.36.0",
    date: "2026-06-08",
    title: "Governor-as-MCP + intelligence de flotte",
    tag: "Flotte",
    highlights: [
      "Governor exposé comme serveur MCP à tout client",
      "Score de santé de flotte, régressions, leçons propagées",
    ],
    accent: "blue",
  },
  {
    version: "1.33.0",
    date: "2026-06-08",
    title: "Calibration mesurée",
    tag: "Calibration",
    highlights: [
      "Prédictions vs issues enregistrées, score de calibration calculé",
      "La gouvernance s'auto-mesure, sans complaisance",
    ],
    accent: "cyan",
  },
  {
    version: "1.30.0",
    date: "2026-06-06",
    title: "Invariant d'auto-activation",
    tag: "Capacités",
    highlights: [
      "Chaque capacité s'auto-déclenche par besoin (table data-driven)",
      "Imposé fail-closed",
    ],
    accent: "violet",
  },
  {
    version: "1.29.0",
    date: "2026-06-06",
    title: "Piliers stratégiques",
    tag: "Gouvernance",
    highlights: [
      "Boucle de gouvernance fermée (décision / preuve / méta) + couche intelligence",
      "Moteurs natifs stdlib, sans dépendance externe",
    ],
    accent: "blue",
  },
  {
    version: "1.16.0",
    date: "2026-06-05",
    title: "Niveau de gouvernance → cadran de strictesse",
    tag: "Strictesse",
    highlights: [
      "Une session strict est strict au gate, sans réglage manuel",
      "recommended_strictness attaché à la guidance de gouvernance",
    ],
    accent: "blue",
  },
  {
    version: "1.15.0",
    date: "2026-06-05",
    title: "Strictesse ciblée et imposée",
    tag: "Strictesse",
    highlights: [
      "Zone rouge hard-enforced (deny toujours, même break-glass)",
      "Cadran strict/balanced/relaxed + mesure des décisions",
    ],
    accent: "blue",
  },
  {
    version: "1.14.0",
    date: "2026-06-05",
    title: "Boucle d'allégeance 100% automatique",
    tag: "Allégeance",
    highlights: [
      "A3 vérifié automatiquement à chaque retour exécuteur",
      "Bloque sur contournement, jamais de faux positif",
    ],
    accent: "violet",
  },
  {
    version: "1.13.0",
    date: "2026-06-04",
    title: "Enforcement automatique + audit d'automatisation",
    tag: "Enforcement",
    highlights: [
      "Hook hôte auto-installé (merge sûr) à chaque upgrade",
      "Audit fail-closed des capacités auto-activées",
    ],
    accent: "violet",
  },
  {
    version: "1.12.0",
    date: "2026-06-04",
    title: "Auto-activation gouvernée maximale",
    tag: "Auto-activation",
    highlights: [
      "9 capacités enregistrées + auto-sélectionnées par le besoin",
      "Gardé par le gate de cohérence registre↔code (32 capacités)",
    ],
    accent: "cyan",
  },
  {
    version: "1.11.0",
    date: "2026-06-04",
    title: "Automatisation gouvernée",
    tag: "Automatisation",
    highlights: ["Attestation d'allégeance auto à chaque refresh", "Propagation flotte en un geste"],
    accent: "cyan",
  },
  {
    version: "1.10.0",
    date: "2026-06-04",
    title: "Allégeance exécuteur",
    tag: "Allégeance",
    highlights: ["Contrat + gate hôte + vérificateur + attestation signée", "Gouverné-par-construction"],
    accent: "blue",
  },
  {
    version: "1.9.0",
    date: "2026-06-04",
    title: "Mode économe",
    tag: "Performance",
    highlights: ["Contexte minimal (~99% d'économie sur la reprise)", "Tiering modèle + escalade sur échec de gate"],
    accent: "cyan",
  },
  {
    version: "1.8.0",
    date: "2026-06-04",
    title: "Prédictif câblé + CLI parallèle/benchmark",
    tag: "Gouvernance",
    highlights: ["La prédiction force strict sur risque élevé", "governor-parallel-plan & governor-benchmark-plan"],
    accent: "blue",
  },
  {
    version: "1.7.0",
    date: "2026-06-04",
    title: "Programme d'élévation (7 chantiers)",
    tag: "Programme",
    highlights: ["Time-travel, attestation, chaos gate, fleet, prédictif, parallèle, benchmark"],
    accent: "violet",
  },
  {
    version: "1.6.0",
    date: "2026-06-04",
    title: "Reprise hyper-robuste",
    tag: "Reprise",
    highlights: ["Écriture atomique crash-safe", "Journal de continuité (WAL) + reprise par rejeu"],
    accent: "cyan",
  },
  {
    version: "1.5.0",
    date: "2026-06-03",
    title: "Programme d'évolution Governor",
    tag: "Conformité",
    highlights: ["NIST SSDF + OWASP SAMM", "Proposeur d'auto-évolution, hooks hôte, harness benchmark"],
    accent: "violet",
  },
  {
    version: "1.4.0",
    date: "2026-06-02",
    title: "Évolution « du décidé au constaté »",
    tag: "Observabilité",
    highlights: ["Observation réelle, provenance signée, télémétrie, dashboard, flotte multi-agents"],
    accent: "blue",
  },
];

export const LATEST_RELEASE = RELEASES[0];
