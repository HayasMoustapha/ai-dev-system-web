export type Release = {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  accent: "cyan" | "violet" | "blue";
};

export const RELEASES: Release[] = [
  {
    version: "1.16.0",
    date: "2026-06-05",
    title: "Niveau de gouvernance → cadran de strictesse",
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
    highlights: ["Attestation d'allégeance auto à chaque refresh", "Propagation flotte en un geste"],
    accent: "cyan",
  },
  {
    version: "1.10.0",
    date: "2026-06-04",
    title: "Allégeance exécuteur",
    highlights: ["Contrat + gate hôte + vérificateur + attestation signée", "Gouverné-par-construction"],
    accent: "blue",
  },
  {
    version: "1.9.0",
    date: "2026-06-04",
    title: "Mode économe",
    highlights: ["Contexte minimal (~99% d'économie sur la reprise)", "Tiering modèle + escalade sur échec de gate"],
    accent: "cyan",
  },
  {
    version: "1.8.0",
    date: "2026-06-04",
    title: "Prédictif câblé + CLI parallèle/benchmark",
    highlights: ["La prédiction force strict sur risque élevé", "governor-parallel-plan & governor-benchmark-plan"],
    accent: "blue",
  },
  {
    version: "1.7.0",
    date: "2026-06-04",
    title: "Programme d'élévation (7 chantiers)",
    highlights: ["Time-travel, attestation, chaos gate, fleet, prédictif, parallèle, benchmark"],
    accent: "violet",
  },
  {
    version: "1.6.0",
    date: "2026-06-04",
    title: "Reprise hyper-robuste",
    highlights: ["Écriture atomique crash-safe", "Journal de continuité (WAL) + reprise par rejeu"],
    accent: "cyan",
  },
  {
    version: "1.5.0",
    date: "2026-06-03",
    title: "Programme d'évolution Governor",
    highlights: ["NIST SSDF + OWASP SAMM", "Proposeur d'auto-évolution, hooks hôte, harness benchmark"],
    accent: "violet",
  },
  {
    version: "1.4.0",
    date: "2026-06-02",
    title: "Évolution « du décidé au constaté »",
    highlights: ["Observation réelle, provenance signée, télémétrie, dashboard, flotte multi-agents"],
    accent: "blue",
  },
];
