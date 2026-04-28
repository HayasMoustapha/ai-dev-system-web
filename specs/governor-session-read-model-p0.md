# Governor Session Read Model P0

## Objectif

Produire une premiere surface web read-only capable de lire une session Governor locale sans modifier le noyau Python.

## Invariants

- aucune ecriture dans `.ai-dev-system/`
- aucune redefinition des contrats coeur
- aucune API distante supposee
- lecture locale uniquement des artefacts de session existants

## Artefacts Sources

- `.ai-dev-system/governor/sessions/<session>/session-manifest.yml`
- `.ai-dev-system/governor/sessions/<session>/session-dashboard.md`
- `.ai-dev-system/governor/sessions/<session>/session-event-log.yml`
- `.ai-dev-system/governor/sessions/<session>/resume-brief.md`

## Surface P0

### 1. Index des sessions

Une page `/sessions` affiche :

- le nom des sessions locales detectees
- leur statut
- la prochaine action
- la date de derniere mise a jour

### 2. Detail d'une session

Une page `/sessions/[sessionName]` affiche :

- les metadonnees principales de la session
- les sections du dashboard Governor
- la timeline des evenements append-only
- les artefacts relies les plus utiles

## Contrat De Lecture

Le read model de P0 s'autorise :

- parsing YAML de `session-manifest.yml` et `session-event-log.yml`
- parsing leger de `session-dashboard.md` en sections UI

Le read model de P0 ne promet pas :

- une couverture exhaustive de tous les artefacts Governor
- une stabilite d'API externe
- une edition interactive

## Validation

- `npm run lint`
- `npm run build`

## Sortie Attendue

Une base visible, utile et strictement read-only sur laquelle la future couche AI SDK pourra ensuite se brancher.
