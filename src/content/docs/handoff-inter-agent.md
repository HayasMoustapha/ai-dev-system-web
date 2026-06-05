# Handoff Inter-Agent

## Pourquoi ce document existe

Ce document explique comment un agent IA peut reprendre le travail d'un autre agent IA.

Exemple :
- tu commences avec Codex
- les credits s'epuisent
- tu passes a Cursor, Claude Code ou Windsurf
- le nouvel agent doit comprendre ou le travail s'est arrete

## Ce qui est possible

On ne peut pas transferer parfaitement la memoire interne privee d'un agent.

Mais on peut rendre l'etat du travail explicite, portable et versionne dans le projet.

Le systeme utilise donc un dossier de passation :

```text
.ai-dev-system/handoff/
```

## Contenu du dossier

Le dossier peut contenir :
- `README.md`
- `current-state.md`
- `next-actions.md`
- `decisions.md`
- `open-questions.md`
- `files-touched.md`
- `validation-status.md`
- `agent-brief.md`

## Workflow

```text
Agent A travaille
  |
  v
Agent A met a jour le handoff
  |
  v
Utilisateur change d'agent IA
  |
  v
Agent B lit le handoff
  |
  v
Agent B reprend avec le contexte minimal utile
```

## Commande utile

```text
python scripts/ai.py handoff C:\Work\mon-projet "Etat actuel" "Prochaine etape"
```

## Prompts utiles

Pour produire une passation :
- `prompts/handoff.md`

Pour reprendre depuis une passation :
- `prompts/resume-from-handoff.md`

## Regle importante

Le handoff doit rester court.
Il ne doit pas remplacer tout l'historique.
Il doit indiquer quoi lire en premier, puis laisser le nouvel agent charger plus de contexte seulement si necessaire.

## En une phrase

Le handoff inter-agent permet de faire passer le relai entre IA sans perdre l'etat de travail et sans exploser le budget de contexte.
