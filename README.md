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

## Environment

Le copilote de session fonctionne en mode fallback sans credentials, mais pour activer un vrai stream modele il faut configurer un provider.

Configuration recommandee pour vos tests avec une cle OpenAI directe :

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5-nano
```

`gpt-5-nano` est le choix le plus leger et le moins couteux pour les tests rapides. Si vous preferez passer plus tard par Vercel AI Gateway, vous pouvez utiliser a la place :

```env
AI_GATEWAY_API_KEY=...
AI_GATEWAY_MODEL=openai/gpt-5-nano
```

Etapes locales :

```bash
copy .env.example .env.local
npm run dev
```

Important :

- `AI_GATEWAY_API_KEY` attend une cle Vercel AI Gateway, pas une cle OpenAI directe.
- ce repo ne versionne pas `.env.local`.
- la session Governor locale reste sous `.ai-dev-system/` et pilote le chantier web localement.

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
