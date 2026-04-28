# Specs Index

## Scope

Ce repo porte l'interface web dediee d'AI Dev System / Governor.

## Source Of Truth

- coeur Governor : `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel`
- architecture de ce repo : `research/` et `specs/`

## Active Spec Documents

- `specs/implementation_plan.md`
- `research/source_inventory.md`
- `research/open_questions.md`
- `research/architecture_candidates.md`

## Current Recommendation

Demarrer par une application web Next.js qui :

- expose une control surface web moderne ;
- lit une session Governor existante ;
- prepare l'integration `ai-sdk.dev` pour chat, streaming et UI agentique ;
- n'introduit aucune copie du noyau Python.
