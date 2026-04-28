# AGENTS.md

## Project Context
- objectif : construire une interface web dediee pour AI Dev System / Governor
- perimetre courant : surface web, UX navigateur, streaming, lecture des sessions Governor, integration `ai-sdk.dev`

## Stack And Architecture
- stack retenue : Next.js App Router, TypeScript, Tailwind CSS, npm
- couches ou modules principaux : interface web, route handlers web, adaptateurs de lecture de session Governor, composants UI
- profils de stack appliques : frontend-nextjs-typescript, ai-sdk-ui

## Working Rules
- conventions locales : ne pas copier le noyau Python Governor dans ce repo
- structure de dossiers : `src/app` pour la surface Next.js, `research/` pour les preuves, `specs/` pour le plan executable
- pratiques a respecter :
  - traiter `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel` comme source de verite du coeur Governor
  - toute evolution du coeur Python doit etre faite dans le repo source, pas ici
  - consommer les contrats Governor existants avant d'en redefinir de nouveaux
  - verifier la doc officielle Next.js et AI SDK avant tout choix version-sensible

## Commands And Validation
- installation : `npm install`
- developpement : `npm run dev`
- tests : `npm run lint`
- build ou package : `npm run build`
- verification minimale avant livraison : `npm run lint` puis `npm run build`

## Sensitive Areas
- zones a risque : frontiere entre UI web et noyau Governor, protocole de streaming, lecture d'artefacts de session, futurs appels subprocess ou bridge local
- securite : ne jamais supposer un mode d'execution distant sans spec explicite ; ne pas exposer des commandes systeme sensibles via l'UI
- compatibilite ou migration : les contrats de session viennent du repo `ai-dev-system-universel` et peuvent evoluer hors de ce repo

## Agent Guidance
- autonomie autorisee : bootstrap, documentation, scaffold UI, composants, adapters web, validations locales
- quand demander clarification : si un besoin impose de modifier le coeur Governor ou choisit une politique de securite/deploiement non encore decidee
- ce qu'il ne faut pas supposer : API HTTP Governor deja existante, auth multi-utilisateur, persistance serveur deja stable, provider LLM definitif
- appliquer AI Dev System a ses propres actions : oui, y compris separation explicite entre chantier web et chantier coeur
- utiliser `rules/context-budget.md` avant de charger plus de contexte :
- utiliser `rules/handoff.md` avant changement d'agent IA :
- utiliser `rules/research.md` avant de s'appuyer sur une information externe ou instable :
- proposer ou faire un commit logique apres validation selon la preference utilisateur :

## Skills And MCP
- skills a activer par defaut : `repo-discovery`, `codex-planner`, `official-doc-verifier`, `frontend-delivery-workflow`
- skills a forcer manuellement si besoin : `shadcn-ui-standards`, `figma-to-responsive-ui`, `browser-proof-runbook`
- MCP a utiliser par defaut : Context7 pour docs officielles quand la stack l'exige
- MCP a ne pas utiliser sans validation : tout MCP non necessaire au chantier web courant
- regle de confiance : priorite aux docs officielles, puis au repo source `ai-dev-system-universel` pour les contrats Governor

## Useful References
- artefacts projet : `research/source_inventory.md`, `research/open_questions.md`, `specs/implementation_plan.md`
- documents a lire en priorite :
  - `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel\docs\concepts\governor\operation\surface-utilisateur-governor-autopilot.md`
  - `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel\docs\concepts\governor\operation\dashboard-journal-evenementiel-governor-autopilot.md`
  - `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel\docs\concepts\governor\operation\interface-operatoire-minimale-governor.md`
  - `https://ai-sdk.dev/docs/getting-started/nextjs-app-router`
  - `https://nextjs.org/docs/app/getting-started/installation`
