export type Capability = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  since: string;
  accent: "cyan" | "violet" | "blue";
  /** Why this matters — the problem it removes. */
  why: string;
  /** How it works — mechanism, in plain bullets. */
  how: string[];
  /** The guarantee and how it is verified. */
  proof: string;
  /** Optional governed commands that exercise it. */
  commands?: string[];
  /** Optional related documentation slug (/docs/<slug>). */
  docSlug?: string;
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
        why: "Un agent IA qui plante en plein travail laisse d'habitude un état ambigu : qu'est-ce qui était fait ? Le journal supprime cette ambiguïté.",
        how: [
          "Écriture append-only NDJSON, une ligne par événement, suivie d'un fsync.",
          "Le fichier est la source de vérité runtime, pas la mémoire du processus.",
          "Une ligne tronquée par un crash est détectée et ignorée au rejeu — jamais interprétée à moitié.",
        ],
        proof:
          "Le gate chaos injecte un crash en pleine écriture et prouve que le rejeu reconstruit un état cohérent, sans la ligne torn.",
        docSlug: "sources-de-verite",
      },
      {
        id: "exact-resume",
        title: "Reprise exacte",
        tagline: "Reprendre précisément où ça s'est arrêté.",
        description:
          "Le journal est rejoué pour reconstruire le fil complet et la next-action exacte ; si le manifest est périmé, le journal fait foi.",
        since: "v1.x",
        accent: "cyan",
        why: "« Reprendre quelque part avant » fait refaire du travail ou en sauter. La reprise exacte repart sur l'action précise, sans perte ni doublon.",
        how: [
          "Au démarrage, le journal est relu de bout en bout pour rematérialiser l'état.",
          "La next-action est dérivée du fil, pas d'un fichier de statut qui peut mentir.",
          "En cas de conflit, le journal prime toujours sur le manifest.",
        ],
        proof:
          "Un scénario de gap multi-jours + manifest périmé est rejoué en CI : la reprise retombe sur la tranche exacte attendue.",
        commands: ["python scripts/ai.py /ads-go --resume"],
        docSlug: "reprise-exacte",
      },
      {
        id: "time-travel",
        title: "Voyage temporel & fork",
        tagline: "Rejouer l'état à n'importe quel point.",
        description:
          "Event-sourcing : inspecte une session à tout instant de son histoire, et branche un fork depuis un point choisi sans toucher la source.",
        since: "v1.x",
        accent: "cyan",
        why: "Comprendre une décision passée ou explorer une alternative ne devrait pas exiger de tout recommencer ni de risquer la session d'origine.",
        how: [
          "L'historique est une suite d'événements rejouables (event-sourcing).",
          "On reconstruit l'état à n'importe quel offset du journal.",
          "Un fork copie le fil jusqu'au point choisi et continue en isolation.",
        ],
        proof:
          "Le fork est déterministe : rejouer le même préfixe d'événements produit exactement le même état, vérifié par hash.",
        docSlug: "sources-de-verite",
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
        why: "Sans preuve cryptographique, « c'est fait » repose sur la confiance. L'attestation rend la livraison vérifiable par un tiers, sans faire confiance au serveur.",
        how: [
          "Chaque bloc référence le hash du précédent (chaîne tamper-evident).",
          "La chaîne entière est signée en HMAC-SHA256.",
          "Régénérée à chaque refresh ; vérifiable hors-ligne, sans réseau.",
        ],
        proof:
          "Toute altération, réordonnancement ou troncature casse la vérification — démontré par injection de falsification dans le gate chaos.",
        docSlug: "proof-record",
      },
      {
        id: "chaos-gate",
        title: "Gate chaos permanent",
        tagline: "La résilience prouvée à chaque build.",
        description:
          "Une batterie de pannes injectées (crash mid-write, ligne torn, manifest périmé, falsification, processus tué, gap multi-jours) prouve la récupération en CI.",
        since: "v1.x",
        accent: "violet",
        why: "La résilience qui n'est pas testée en continu régresse en silence. Le gate chaos transforme « ça devrait récupérer » en porte verte obligatoire.",
        how: [
          "Des pannes réalistes sont injectées à chaque exécution du gate.",
          "Le système doit récupérer un état cohérent après chaque panne.",
          "L'échec d'un seul scénario fait échouer le build.",
        ],
        proof:
          "Le gate fait partie de la CI : aucune livraison ne passe si un scénario de chaos n'est pas récupéré.",
        docSlug: "gates-automatiques",
      },
      {
        id: "benchmark",
        title: "Automatisation benchmark",
        tagline: "Comparaison concurrentielle gouvernée.",
        description:
          "Classification auto/externe des cellules, plan de run, handoff gouverné et couverture honnête — l'exécution concurrents reste externe, jamais fabriquée.",
        since: "v1.x",
        accent: "violet",
        why: "Un benchmark crédible ne doit jamais inventer les résultats des concurrents. L'honnêteté de la couverture est une garantie, pas une option.",
        how: [
          "Chaque cellule est classée : mesurable automatiquement, ou à exécuter en externe.",
          "Un plan de run et un handoff gouverné cadrent l'exécution.",
          "Les cellules externes restent externes — jamais simulées ni fabriquées.",
        ],
        proof:
          "La couverture est rapportée honnêtement : ce qui n'a pas été mesuré réellement est marqué comme tel, pas rempli.",
        docSlug: "workflow",
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
        why: "Appliquer la même rigueur partout est lent ; l'appliquer nulle part est dangereux. La prédiction met le curseur au bon endroit, automatiquement.",
        how: [
          "Le risque d'une tranche est estimé avant exécution à partir de signaux et de l'historique.",
          "Un risque élevé relève le plancher de gouvernance et déclenche revue + strictesse.",
          "Un risque faible laisse le travail propre avancer rapidement.",
        ],
        proof:
          "Les décisions de calibrage sont journalisées et liées au risque prédit, donc auditables après coup.",
        docSlug: "profils-exploitation",
      },
      {
        id: "allegiance",
        title: "Allégeance exécuteur",
        tagline: "L'exécuteur agit toujours sous Governor.",
        description:
          "Gouverné-par-construction : contrat d'allégeance, gate hôte qui refuse le hors-bande, vérificateur de conformité au retour, et attestation signée — tout automatique.",
        since: "v1.14",
        accent: "blue",
        why: "Si l'exécuteur peut agir hors du cadre, la gouvernance n'est qu'une suggestion. L'allégeance la rend structurelle.",
        how: [
          "Un contrat d'allégeance lie l'exécuteur au Governor.",
          "Un gate hôte refuse toute action hors-bande au niveau runtime.",
          "Le retour de l'exécuteur est vérifié pour conformité, puis attesté.",
        ],
        proof:
          "L'enforcement vit dans l'hôte (hooks), pas dans la discipline du modèle : il ne peut pas être contourné par un prompt.",
        docSlug: "pilotage-executeur",
      },
      {
        id: "strictness",
        title: "Strictesse ciblée",
        tagline: "Zone rouge hard-enforced + cadran.",
        description:
          "Une denylist non-négociable refusée toujours (même break-glass), un cadran strict/balanced/relaxed lié au niveau de gouvernance, et la mesure des décisions.",
        since: "v1.16",
        accent: "blue",
        why: "Certaines actions ne doivent jamais passer, quelles que soient les circonstances ; d'autres méritent de la souplesse. Un seul réglage ne suffit pas.",
        how: [
          "Une zone rouge (denylist) est refusée en toutes circonstances, même en break-glass.",
          "Un cadran strict/balanced/relaxed s'aligne sur le niveau de gouvernance.",
          "Chaque décision strictesse est mesurée et journalisée.",
        ],
        proof:
          "Les actions de la zone rouge sont refusées dans les tests même avec une autorisation explicite — l'invariant tient.",
        docSlug: "charter",
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
        why: "Maintenir des dizaines d'instances à la main dérive vite. Le control plane les garde alignées sans effort manuel.",
        how: [
          "Découverte automatique des instances installées.",
          "Évaluation du drift et de l'écart de version par instance.",
          "Plan d'upgrade gouverné, puis propagation en un seul geste.",
        ],
        proof:
          "Chaque propagation est gouvernée et journalisée — l'alignement de la flotte est vérifiable, pas supposé.",
        commands: ["python scripts/ai.py governor-fleet --root <dossier>"],
        docSlug: "architecture",
      },
      {
        id: "economy",
        title: "Mode économe",
        tagline: "Le minimum de crédits, sans perdre en qualité.",
        description:
          "Contexte minimal rejoué (≈99% d'économie sur la reprise), tiering de modèle par le risque, prompts cache-friendly, et escalade uniquement sur échec de gate.",
        since: "v1.9",
        accent: "cyan",
        why: "La qualité ne devrait pas coûter le maximum de crédits par défaut. Le mode économe dépense peu et n'escalade que si nécessaire.",
        how: [
          "La reprise rejoue un contexte minimal (≈99% d'économie vs tout recharger).",
          "Le modèle est choisi par tier selon le risque de la tranche.",
          "Prompts cache-friendly ; escalade uniquement sur échec de gate.",
        ],
        proof:
          "La qualité reste garantie par les portes : l'économie ne baisse jamais le plancher, elle ne fait qu'éviter le gaspillage.",
        docSlug: "profils-exploitation",
      },
      {
        id: "parallel",
        title: "Orchestration parallèle",
        tagline: "Des voies à ownership disjoint, gouvernées.",
        description:
          "Planifie des voies parallèles sans chevauchement, détecte les conflits et merge de façon gouvernée — bloquant sur conflit réel de fichier.",
        since: "v1.x",
        accent: "violet",
        why: "Paralléliser naïvement crée des conflits silencieux. L'orchestration garantit des voies à propriété disjointe.",
        how: [
          "Les voies sont planifiées avec un ownership de fichiers disjoint.",
          "Les conflits potentiels sont détectés avant exécution.",
          "Le merge est gouverné, bloquant sur un conflit réel de fichier.",
        ],
        proof:
          "Un conflit réel de fichier bloque le merge plutôt que de l'écraser en silence.",
        docSlug: "workflow",
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
        why: "Préparer un audit à la main est coûteux et fragile. Le pack se génère depuis les preuves déjà produites, pas depuis des affirmations.",
        how: [
          "Les preuves réelles de la session alimentent le pack.",
          "Le contenu est mappé sur SOC2, ISO27001, EU-AI-Act, NIST SSDF, OWASP SAMM.",
          "Le pack est signé et certifié, vérifiable.",
        ],
        proof:
          "Rien n'est affirmé sans preuve sous-jacente : le pack reflète l'état réellement attesté de la livraison.",
        docSlug: "proof-record",
      },
      {
        id: "self-evolution",
        title: "Proposeur d'auto-évolution",
        tagline: "Propose, ne promeut jamais.",
        description:
          "Governor propose des évolutions de capacités à partir de signaux observés, mais ne les active jamais sans validation gouvernée.",
        since: "v1.x",
        accent: "blue",
        why: "Un système qui s'auto-modifie sans contrôle est dangereux. Ici l'évolution est proposée, jamais auto-promue.",
        how: [
          "Des signaux observés alimentent des propositions d'évolution.",
          "Chaque proposition est explicite et tracée.",
          "L'activation exige une validation gouvernée — jamais automatique.",
        ],
        proof:
          "La frontière propose-vs-promeut est structurelle : aucune capacité ne s'active sans passage par la validation.",
        docSlug: "governor-overview",
      },
      {
        id: "host-hooks",
        title: "Checkpoints imposés par l'hôte",
        tagline: "Pas un invariant que le modèle peut contourner.",
        description:
          "L'hôte (hooks) applique les points de contrôle Governor au niveau runtime — l'enforcement ne dépend pas de la discipline de l'agent.",
        since: "v1.x",
        accent: "violet",
        why: "Un point de contrôle que le modèle peut ignorer n'en est pas un. Les hooks de l'hôte le rendent non-contournable.",
        how: [
          "Les checkpoints sont appliqués par des hooks de l'hôte, au niveau runtime.",
          "L'enforcement est indépendant de ce que le modèle décide de faire.",
          "Une action hors-cadre est bloquée avant de s'exécuter.",
        ],
        proof:
          "Le contrôle s'exerce dans l'hôte, pas dans le prompt : il tient même si l'agent tente de le contourner.",
        docSlug: "host-enforced-hooks",
      },
    ],
  },
];

export const CAPABILITY_COUNT = CAPABILITY_GROUPS.reduce((n, g) => n + g.items.length, 0);

export const CAPABILITIES: Capability[] = CAPABILITY_GROUPS.flatMap((g) =>
  g.items.map((c) => ({ ...c, _category: g.category } as Capability & { _category: string })),
);

export function getCapability(id: string): (Capability & { category?: string }) | undefined {
  for (const g of CAPABILITY_GROUPS) {
    const found = g.items.find((c) => c.id === id);
    if (found) return { ...found, category: g.category };
  }
  return undefined;
}

export function getAdjacentCapabilities(id: string) {
  const flat = CAPABILITY_GROUPS.flatMap((g) => g.items);
  const i = flat.findIndex((c) => c.id === id);
  return { prev: flat[i - 1], next: flat[i + 1] };
}
