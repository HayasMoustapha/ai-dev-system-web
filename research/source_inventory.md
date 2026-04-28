# Source Inventory

## Objective

Identifier les sources de verite qui justifient la creation du repo `ai-dev-system-web`.

## Ranked Sources

### 1. Repo source Governor

Autorite : tres forte

Chemin :
- `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel`

Utilite :
- source de verite du noyau Python Governor
- contrats des sessions, du dashboard, du journal evenementiel et de la surface utilisateur

Documents clefs :
- `docs/concepts/governor/operation/surface-utilisateur-governor-autopilot.md`
- `docs/concepts/governor/operation/dashboard-journal-evenementiel-governor-autopilot.md`
- `docs/concepts/governor/operation/interface-operatoire-minimale-governor.md`
- `docs/concepts/governor/operation/contrat-session-governor.md`
- `docs/maintenance/plan-integration-stack-externe-governor.md`

### 2. AI SDK official docs

Autorite : forte

URL :
- `https://ai-sdk.dev/`
- `https://ai-sdk.dev/docs/getting-started/nextjs-app-router`
- `https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol`

Utilite :
- verification de la couche web agentique
- streaming UI
- compatibilite backend custom y compris backend dans un autre langage

### 3. Next.js official docs

Autorite : forte

URL :
- `https://nextjs.org/docs/app/getting-started/installation`

Utilite :
- bootstrap de l'application web App Router TypeScript
- structure recommandee du projet

## Working Interpretation

Le repo web ne porte pas la logique coeur Governor.
Il porte une surface web qui doit rester compatible avec les contrats du repo source.
