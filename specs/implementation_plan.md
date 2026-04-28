# Implementation Plan

## Objective

Bootstrappper un repo web autonome pour AI Dev System / Governor sans dupliquer le noyau Python.

## Phase 0 - Bootstrap

### Acceptance

- repo `ai-dev-system-web` cree
- stack Next.js App Router TypeScript installee
- `AGENTS.md`, `research/`, `specs/` en place
- separation avec le repo source explicitement documentee

## Phase 1 - Foundation UI

### Scope

- page d'accueil de chantier
- design system minimal
- structure applicative lisible
- dependances AI SDK ajoutees

### Acceptance

- l'app demarre
- lint et build passent
- la page d'accueil explique le role du repo et sa frontiere avec Governor coeur

## Phase 2 - Governor Session Read Model

### Scope

- lecture d'une session Governor locale
- projection initiale de `session-dashboard.md`
- projection initiale de `session-event-log.yml`

### Acceptance

- une session locale peut etre lue dans l'UI sans toucher au noyau

## Phase 3 - AI SDK Surface

### Scope

- premier point d'entree chat ou panneau d'action
- route handler compatible AI SDK UI
- premiere experience de streaming visible

### Acceptance

- une interaction web AI SDK fonctionne
- la separation entre UX web et logique coeur reste respectee

## Phase 4 - Hardening

### Scope

- validation plus robuste
- documentation de run local
- traitement des besoins coeur qui doivent repartir sur `ai-dev-system-universel`

### Acceptance

- workflow de contribution clair
- frontiere entre les deux repos non ambigue
