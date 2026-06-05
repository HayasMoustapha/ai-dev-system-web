export type Capability = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  since: string;
  accent: "cyan" | "violet" | "blue";
};

export type CapabilityGroup = {
  category: string;
  blurb: string;
  items: Capability[];
};

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    category: "Reprise & continuité",
    blurb: "Ne jamais perdre le fil — même après un crash ou plusieurs jours.",
    items: [
      {
        id: "continuity-journal",
        title: "Journal de continuité",
        tagline: "Write-ahead log crash-safe, instantané.",
        description:
          "Chaque tâche, décision et processus est écrit au moment où il survient (append + fsync). Une interruption ne peut abîmer que la dernière ligne, ignorée au rejeu.",
        since: "v1.x",
        accent: "cyan",
      },
      {
        id: "exact-resume",
        title: "Reprise exacte",
        tagline: "Reprendre précisément où ça s'est arrêté.",
        description:
          "Le journal est rejoué pour reconstruire le fil complet et la next-action exacte ; si le manifest est périmé, le journal fait foi.",
        since: "v1.x",
        accent: "cyan",
      },
      {
        id: "time-travel",
        title: "Voyage temporel & fork",
        tagline: "Rejouer l'état à n'importe quel point.",
        description:
          "Event-sourcing : inspecte une session à tout instant de son histoire, et branche un fork depuis un point choisi sans toucher la source.",
        since: "v1.x",
        accent: "cyan",
      },
    ],
  },
  {
    category: "Preuve & confiance",
    blurb: "Des garanties cryptographiques, pas des promesses.",
    items: [
      {
        id: "attestation",
        title: "Attestation cryptographique",
        tagline: "Chaîne de hachage signée du fil de livraison.",
        description:
          "Un hash chain tamper-evident sur le journal, signé HMAC-SHA256, auto-généré à chaque refresh. Toute altération, réordonnancement ou troncature est détecté hors-ligne.",
        since: "v1.x",
        accent: "violet",
      },
      {
        id: "chaos-gate",
        title: "Gate chaos permanent",
        tagline: "La résilience prouvée à chaque build.",
        description:
          "Une batterie de pannes injectées (crash mid-write, ligne torn, manifest périmé, falsification, processus tué, gap multi-jours) prouve la récupération en CI.",
        since: "v1.x",
        accent: "violet",
      },
      {
        id: "benchmark",
        title: "Automatisation benchmark",
        tagline: "Comparaison concurrentielle gouvernée.",
        description:
          "Classification auto/externe des cellules, plan de run, handoff gouverné et couverture honnête — l'exécution concurrents reste externe, jamais fabriquée.",
        since: "v1.x",
        accent: "violet",
      },
    ],
  },
  {
    category: "Gouvernance intelligente",
    blurb: "Strict là où c'est vital, léger là où c'est sûr — automatiquement.",
    items: [
      {
        id: "predictive",
        title: "Gouvernance prédictive",
        tagline: "Le risque prédit pilote le pilotage.",
        description:
          "Le risque d'une tranche est prédit avant exécution (signaux + expérience) et relève le plancher de gouvernance, le profil, la revue et la strictesse.",
        since: "v1.16",
        accent: "blue",
      },
      {
        id: "allegiance",
        title: "Allégeance exécuteur",
        tagline: "L'exécuteur agit toujours sous Governor.",
        description:
          "Gouverné-par-construction : contrat d'allégeance, gate hôte qui refuse le hors-bande, vérificateur de conformité au retour, et attestation signée — tout automatique.",
        since: "v1.14",
        accent: "blue",
      },
      {
        id: "strictness",
        title: "Strictesse ciblée",
        tagline: "Zone rouge hard-enforced + cadran.",
        description:
          "Une denylist non-négociable refusée toujours (même break-glass), un cadran strict/balanced/relaxed lié au niveau de gouvernance, et la mesure des décisions.",
        since: "v1.16",
        accent: "blue",
      },
    ],
  },
  {
    category: "Échelle & performance",
    blurb: "Gouverner une flotte, paralléliser, et dépenser le minimum.",
    items: [
      {
        id: "fleet",
        title: "Fleet control plane",
        tagline: "Voir et gouverner toutes les instances.",
        description:
          "Découverte des instances, évaluation drift/version, plan d'upgrade gouverné et propagation en un seul geste (governor-fleet-upgrade).",
        since: "v1.4",
        accent: "cyan",
      },
      {
        id: "economy",
        title: "Mode économe",
        tagline: "Le minimum de crédits, sans perdre en qualité.",
        description:
          "Contexte minimal rejoué (≈99% d'économie sur la reprise), tiering de modèle par le risque, prompts cache-friendly, et escalade uniquement sur échec de gate.",
        since: "v1.9",
        accent: "cyan",
      },
      {
        id: "parallel",
        title: "Orchestration parallèle",
        tagline: "Des voies à ownership disjoint, gouvernées.",
        description:
          "Planifie des voies parallèles sans chevauchement, détecte les conflits et merge de façon gouvernée — bloquant sur conflit réel de fichier.",
        since: "v1.x",
        accent: "violet",
      },
    ],
  },
  {
    category: "Conformité & auto-évolution",
    blurb: "Audit-ready, et capable d'évoluer sous contrôle.",
    items: [
      {
        id: "compliance",
        title: "Pack de conformité",
        tagline: "SOC2 / ISO27001 / EU-AI-Act / NIST SSDF / OWASP SAMM.",
        description:
          "Un pack d'audit signé et certifié, mappé sur les frameworks majeurs, généré depuis les preuves réelles de la session.",
        since: "v1.x",
        accent: "blue",
      },
      {
        id: "self-evolution",
        title: "Proposeur d'auto-évolution",
        tagline: "Propose, ne promeut jamais.",
        description:
          "Governor propose des évolutions de capacités à partir de signaux observés, mais ne les active jamais sans validation gouvernée.",
        since: "v1.x",
        accent: "blue",
      },
      {
        id: "host-hooks",
        title: "Checkpoints imposés par l'hôte",
        tagline: "Pas un invariant que le modèle peut contourner.",
        description:
          "L'hôte (hooks) applique les points de contrôle Governor au niveau runtime — l'enforcement ne dépend pas de la discipline de l'agent.",
        since: "v1.x",
        accent: "violet",
      },
    ],
  },
];

export const CAPABILITY_COUNT = CAPABILITY_GROUPS.reduce((n, g) => n + g.items.length, 0);
