# Governor Session Adapter And AI SDK Entry P1

## Objectif

Stabiliser le read model local derriere des routes JSON read-only et poser un premier point d'entree `AI SDK UI` sans modifier le noyau Python Governor.

## Livrables

### 1. Adaptateur JSON read-only

Routes :

- `/api/governor/sessions`
- `/api/governor/sessions/[sessionName]`

Responsabilites :

- exposer un contrat JSON local plus stable que le parsing direct depuis chaque surface UI
- rester strictement read-only
- reutiliser le read model serveur existant

### 2. Premier point d'entree AI SDK UI

Surface :

- un panneau copilote sur le detail d'une session

Responsabilites :

- brancher `useChat` sur `/api/chat`
- injecter un contexte session minimal au backend
- rester optionnel tant qu'aucun provider n'est configure

## Regle Provider

La route AI SDK ne force aucun provider par defaut.

Mode supporte dans cette tranche :

- si `AI_GATEWAY_API_KEY` et `AI_GATEWAY_MODEL` sont definis, utiliser `gateway(...)`
- sinon, retourner un stream compatible UI qui explique que le copilote est cable mais pas encore configure

## Invariants

- pas de dependance a une API Governor inexistante
- pas de write-back vers `.ai-dev-system`
- pas de duplication du noyau Python
- aucun choix irreversible de provider

## Validation

- `npm run lint`
- `npm run build`

## Suite Logique

Si ce lot est stable, la tranche suivante peut porter sur :

- enrichissement du contexte session injecte au copilote
- choix d'actions/outils limites
- preuve navigateur de l'experience de pilotage web
