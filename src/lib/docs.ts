/**
 * Documentation information architecture.
 *
 * Each page maps a public `slug` (route: /docs/<slug>) to a curated source
 * markdown file from the canonical docs corpus. The `source` field is the path
 * (relative to the AI Dev System `docs/` folder) used by scripts/copy-docs to
 * vendor the markdown into src/content/docs/<slug>.md at authoring time.
 */

export type DocPage = {
  slug: string;
  title: string;
  summary: string;
  source: string;
};

export type DocSection = {
  id: string;
  title: string;
  blurb: string;
  pages: DocPage[];
};

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "demarrer",
    title: "Démarrer",
    blurb: "De zéro à une première livraison gouvernée. Pas informaticien ? Commence par « Parcours non-informaticien » ci-dessous.",
    pages: [
      {
        slug: "parcours-non-informaticien",
        title: "Parcours non-informaticien",
        summary: "Le point de départ si tu n'es pas technique : comprendre et utiliser Governor en langage clair.",
        source: "getting-started/parcours-non-informaticien.md",
      },
      {
        slug: "getting-started",
        title: "Démarrage ultra-simple",
        summary: "Le chemin le plus court : installer, ouvrir une session, livrer une première tranche.",
        source: "getting-started/guide-demarrage-ultra-simple.md",
      },
      {
        slug: "governor-15-minutes",
        title: "Governor en 15 minutes",
        summary: "L'essentiel pour démarrer sans lire toute la doc : le modèle mental et les premiers gestes.",
        source: "getting-started/governor-en-15-minutes.md",
      },
      {
        slug: "operating-manual",
        title: "Manuel d'exploitation",
        summary: "Le manuel opératoire complet de Governor : commandes, états, et bonnes pratiques.",
        source: "getting-started/governor-operating-manual.md",
      },
      {
        slug: "catalogue-commandes",
        title: "Catalogue des commandes",
        summary: "Toutes les commandes AI Dev System et Governor, regroupées et expliquées.",
        source: "getting-started/catalogue-commandes-ads-et-governor.md",
      },
      {
        slug: "quelle-commande-utiliser",
        title: "Quelle commande utiliser ?",
        summary: "Un arbre de décision simple pour choisir la bonne commande selon ta situation.",
        source: "getting-started/quelle-commande-utiliser.md",
      },
      {
        slug: "reprise-exacte",
        title: "Reprise exacte après fermeture",
        summary: "Reprendre une session précisément là où elle s'était arrêtée, même après un crash.",
        source: "getting-started/reprise-exacte-governor-codex.md",
      },
    ],
  },
  {
    id: "concepts",
    title: "Approfondissement — Concepts",
    blurb: "Pour aller plus loin (profils techniques) : couches, sources de vérité, boucle d'exécution, pilotage de l'exécuteur.",
    pages: [
      {
        slug: "architecture",
        title: "Architecture en couches canoniques",
        summary: "Les quatre couches — Framework Core, Governor Kit, Host Adapter, Project Instance.",
        source: "concepts/core/architecture-couches-canoniques.md",
      },
      {
        slug: "couches-du-systeme",
        title: "Les couches du système",
        summary: "Comment les couches se composent et qui possède quoi, sans mélange.",
        source: "concepts/core/couches-du-systeme.md",
      },
      {
        slug: "sources-de-verite",
        title: "Sources de vérité",
        summary: "Quels fichiers font foi, et pourquoi le journal prime sur le manifest.",
        source: "concepts/core/sources-de-verite.md",
      },
      {
        slug: "boucle-execution",
        title: "Boucle d'exécution multi-étapes",
        summary: "Le cycle phases → portes → preuve qui structure chaque tranche de travail.",
        source: "concepts/core/boucle-execution-multi-etapes.md",
      },
      {
        slug: "fonctionnement-interne",
        title: "Fonctionnement interne",
        summary: "Sous le capot : comment le système relie principes, outils et runtime.",
        source: "concepts/core/guide-fonctionnement-interne.md",
      },
      {
        slug: "pilotage-executeur",
        title: "Pilotage de l'exécuteur IA",
        summary: "Comment Governor amplifie et contraint l'exécuteur IA sans jamais lui céder le contrôle.",
        source: "concepts/core/pilotage-amplificateur-executeur-ia.md",
      },
    ],
  },
  {
    id: "governor",
    title: "Governor",
    blurb: "Le pilote : vue d'ensemble, workflow, contrats de session, portes, machine à états, preuves.",
    pages: [
      {
        slug: "governor-overview",
        title: "Vue d'ensemble — AI Delivery Governor",
        summary: "Ce qu'est Governor, ce qu'il garantit, et où il se place dans la livraison.",
        source: "concepts/governor/overview/ai-delivery-governor.md",
      },
      {
        slug: "workflow",
        title: "Workflow de livraison",
        summary: "Le flux de bout en bout d'une livraison gouvernée, étape par étape.",
        source: "concepts/governor/overview/workflow-ai-delivery-governor.md",
      },
      {
        slug: "sous-roles",
        title: "Sous-rôles du Governor",
        summary: "Les rôles internes (cadrage, exécution, revue, preuve) et leur articulation.",
        source: "concepts/governor/overview/sous-roles-ai-delivery-governor.md",
      },
      {
        slug: "contrat-session",
        title: "Contrat de session",
        summary: "Les artefacts d'une session Governor et les invariants qui les régissent.",
        source: "concepts/governor/operation/contrat-session-governor.md",
      },
      {
        slug: "gates-automatiques",
        title: "Portes automatiques (gates)",
        summary: "Les quality gates appliquées automatiquement avant qu'une tranche soit « faite ».",
        source: "concepts/governor/operation/gates-automatiques-governor-autopilot.md",
      },
      {
        slug: "state-machine",
        title: "Machine à états",
        summary: "Les états d'une session et les transitions autorisées, déterministes.",
        source: "concepts/governor/operation/state-machine-governor.md",
      },
      {
        slug: "profils-exploitation",
        title: "Profils d'exploitation",
        summary: "Les profils de gouvernance (du plus léger au plus strict) et quand les utiliser.",
        source: "concepts/governor/operation/profils-exploitation-governor.md",
      },
      {
        slug: "host-enforced-hooks",
        title: "Checkpoints imposés par l'hôte",
        summary: "Comment les hooks de l'hôte appliquent les points de contrôle au niveau runtime.",
        source: "concepts/governor/host-enforced-hooks.md",
      },
      {
        slug: "proof-record",
        title: "Proof record unifié",
        summary: "L'enregistrement de preuve consolidé d'une livraison, vérifiable.",
        source: "concepts/governor/operation/proof-record-unifie-governor.md",
      },
      {
        slug: "charter",
        title: "Charte du Governor",
        summary: "Les principes non-négociables qui gouvernent le comportement du système.",
        source: "concepts/governor/operation/governor-charter.md",
      },
    ],
  },
  {
    id: "modes",
    title: "Modes d'exécution",
    blurb: "Du contrôle total au pilotage automatique — choisis le niveau d'autonomie.",
    pages: [
      {
        slug: "mode-manuel",
        title: "Mode manuel",
        summary: "Tu valides chaque décision : contrôle maximal, idéal pour apprendre ou les zones sensibles.",
        source: "modes/guide-mode-manuel.md",
      },
      {
        slug: "mode-semi-auto",
        title: "Mode semi-automatique",
        summary: "Le système avance seul et s'arrête aux décisions importantes.",
        source: "modes/guide-mode-semi-auto.md",
      },
      {
        slug: "mode-auto-orchestrated",
        title: "Mode auto-orchestré",
        summary: "Pilotage automatique de bout en bout, sous gouvernance et preuve continues.",
        source: "modes/guide-mode-auto-orchestrated.md",
      },
    ],
  },
  {
    id: "continuite",
    title: "Continuité & artefacts",
    blurb: "Ne jamais perdre le fil : handoff entre agents, contrats d'artefacts, mémoire.",
    pages: [
      {
        slug: "handoff-inter-agent",
        title: "Handoff inter-agent",
        summary: "Passer le relais entre agents sans perte de contexte ni d'état.",
        source: "concepts/continuity/handoff-inter-agent.md",
      },
      {
        slug: "contrats-artefacts",
        title: "Contrats d'artefacts",
        summary: "Le format et les garanties des artefacts de livraison du Governor.",
        source: "concepts/governor/artifacts/contrats-artefacts-ai-delivery-governor.md",
      },
      {
        slug: "memoire-governor",
        title: "Mémoire de livraison",
        summary: "Comment la mémoire de session est structurée, promue et rejouée.",
        source: "concepts/governor/artifacts/memoire-ai-delivery-governor.md",
      },
    ],
  },
  {
    id: "integrations",
    title: "Intégrations & capacités",
    blurb: "Étendre le système : MCP, skills, banque de capacités, acquisition web gouvernée.",
    pages: [
      {
        slug: "mcp-universel",
        title: "MCP universel",
        summary: "Brancher des serveurs MCP de façon gouvernée et portable.",
        source: "concepts/integrations/mcp-universel.md",
      },
      {
        slug: "skills-et-mcp",
        title: "Skills & MCP",
        summary: "Comment skills et MCP s'articulent dans le système.",
        source: "concepts/integrations/skills-et-mcp.md",
      },
      {
        slug: "capability-bank",
        title: "Banque de capacités",
        summary: "Le catalogue de capacités acquérables et leur cycle de vie gouverné.",
        source: "concepts/integrations/capability-bank.md",
      },
      {
        slug: "web-capability-acquisition",
        title: "Acquisition web gouvernée",
        summary: "Découvrir et installer des capacités du web sous revue et vérification.",
        source: "concepts/integrations/web-capability-acquisition.md",
      },
    ],
  },
];

export const DOC_PAGES: DocPage[] = DOC_SECTIONS.flatMap((s) => s.pages);

export const DOC_PAGE_COUNT = DOC_PAGES.length;

export function getDocPage(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug);
}

/** Flattened order for prev/next navigation. */
export function getAdjacentDocs(slug: string): { prev?: DocPage; next?: DocPage } {
  const i = DOC_PAGES.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: DOC_PAGES[i - 1], next: DOC_PAGES[i + 1] };
}

/** Map a source basename (e.g. "architecture-couches-canoniques.md") to its public slug. */
export const SOURCE_BASENAME_TO_SLUG: Record<string, string> = Object.fromEntries(
  DOC_PAGES.map((p) => [p.source.split("/").pop() as string, p.slug]),
);
