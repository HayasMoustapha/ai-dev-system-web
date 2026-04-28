# AI Dev System Web

Interface web dediee pour AI Dev System / Governor.

## Purpose

Ce repo porte :

- la surface web navigateur ;
- l'experience de chat, de streaming et de pilotage ;
- l'integration `ai-sdk.dev` cote interface ;
- les projections UI des sessions Governor.

Ce repo ne porte pas :

- le noyau Python Governor ;
- l'upgrade system ;
- la logique coeur des sessions ;
- une copie de `ai-dev-system-universel`.

Le repo source du coeur Governor reste :

- `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- npm

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Source Of Truth

Lire en priorite :

- [AGENTS.md](./AGENTS.md)
- [research/source_inventory.md](./research/source_inventory.md)
- [research/open_questions.md](./research/open_questions.md)
- [specs/implementation_plan.md](./specs/implementation_plan.md)

## Boundary With The Core Repo

Si une demande impose de modifier :

- les scripts Python Governor ;
- les contrats coeur de session ;
- les artefacts natifs du systeme ;
- la logique d'upgrade ;

alors cette evolution doit repartir dans `ai-dev-system-universel`, puis revenir ici si necessaire.
