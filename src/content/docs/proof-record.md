# Proof Record Unifie Governor

## But

Transformer la preuve d'execution et de validation en brique systeme explicite.

Aujourd'hui, la preuve existe deja sous plusieurs formes :

- validations textuelles dans `stage-review.md`
- claim gate et quality gates
- logs de tests ou de runtime
- journaux benchmark
- traces dans `session-dashboard.md`

Le probleme n'est pas l'absence totale de preuve.
Le probleme est qu'elle reste encore trop dispersee.

Le contrat `proof-record` vise a standardiser cette couche.

## Principe

Une preuve Governor ne doit plus etre seulement :

- une phrase convaincante ;
- un log brut perdu dans un dossier ;
- une validation annoncee sans rattachement clair.

Une preuve doit devenir un enregistrement standard traceable.

## Objet Canonique

Le contrat cible est :

```text
proof-record
```

Un `proof-record` represente une preuve minimale unitaire rattachee a :

- une session Governor ;
- une tranche ou etape ;
- un gate ou objectif de validation ;
- une commande, un protocole ou une verification manuelle nommee.

## Format Cible

Format cible propose :

```yaml
id: "proof-20260428-001"
session: "governor-phase-b-hardening"
step: "B3"
recorded_at: "2026-04-28T20:00:00Z"
kind: "command | runtime | manual | benchmark | review-link"
gate: "proof | commit | push | ui | api | backend | e2e | security_smoke | manual_review"
status: "passed | failed | blocked | not_applicable"
command: "git diff --check"
exit_code: 0
summary: "Aucun probleme de diff sur le paquet documentaire B1+B2+B4."
log_path: "governor/audit/autopilot/final-git-diff-check.log"
source_artifact: "stage-review.md"
evidence_profile: ""
quality_gates:
  - "manual_review"
claims_supported:
  - "validated"
files_in_scope:
  - "docs/concepts/governor/operation/state-machine-governor.md"
verification_method: "automated | manual | mixed"
verified_by: "Governor | Codex | user"
notes: ""
```

## Champs Obligatoires

Obligatoires :

- `id`
- `session`
- `recorded_at`
- `kind`
- `gate`
- `status`
- `summary`
- `verification_method`

Obligatoires selon le cas :

- `command` si `kind=command`
- `exit_code` si `kind=command` ou `kind=runtime`
- `log_path` si un log brut existe
- `source_artifact` si la preuve est derivee d'un autre artefact

## Typologie Des Preuves

### `command`

Exemple :
- `git diff --check`
- `python -m compileall scripts`
- `npm run build`

### `runtime`

Exemple :
- log d'execution host runtime
- smoke Governor
- orchestration step log

### `manual`

Exemple :
- verification manuelle ciblee
- relecture de contenu ou de diff
- preuve visuelle contextualisee

### `benchmark`

Exemple :
- capture scenario benchmark
- mesure comparative
- scorecard scenario

### `review-link`

Exemple :
- preuve qui lie explicitement une revue finale a un lot de preuves deja capturees

## Index De Session

Chaque session devrait disposer d'un index de preuves, par exemple :

```text
.ai-dev-system/governor/sessions/<session>/proof-index.yml
```

Role :

- lister tous les `proof-records`
- eviter les validations orphelines
- permettre la revue sans relire tous les logs bruts

Format cible minimal :

```yaml
session: "governor-phase-b-hardening"
updated_at: "2026-04-28T20:00:00Z"
records:
  - id: "proof-20260428-001"
    gate: "proof"
    status: "passed"
    summary: "git diff --check propre"
    source: "proof-records/proof-20260428-001.yml"
```

## Lien Obligatoire Avec Stage Review

Une `stage-review.md` ne doit plus seulement contenir un texte libre de validation.

Elle doit pouvoir pointer vers :

- des `proof-records` explicites ;
- ou un `proof-index.yml` qui les consolide.

Regle cible :

- une revue `validee` ou `cloturee` sans `proof-record` rattache reste une reserve ;
- un claim fort sans `proof-record` proportionne doit etre degrade ;
- un `proof-record` absent ne peut pas etre remplace par une reformulation persuasive.

## Regles D'Usage

### Ce Qui Est Autorise

- plusieurs `proof-records` pour une meme tranche
- une preuve manuelle si elle est nommee et contextualisee
- une preuve benchmark liee a une session Governor

### Ce Qui Est Interdit

- annoncer "tests ok" sans commande, log ou preuve manuelle explicite
- reutiliser un ancien log sans borne de perimetre
- lier un claim fort a un record trop faible ou hors scope
- inventer un `exit_code`

## Relation Avec Les Gates

### Proof Gate

Le `proof gate` doit pouvoir s'appuyer sur les `proof-records` pour savoir si :

- une preuve existe ;
- elle est suffisante ;
- elle est proportionnee au claim.

### Commit Gate

Le `commit gate` ne depend pas directement d'un `proof-record`, mais un commit ne doit pas etre considere "pret" si aucune preuve exploitable ne soutient la tranche.

### Push Gate

Le `push gate` peut rester bloque meme avec des preuves presentes.
La preuve ne remplace pas la discipline Git.

## Relation Avec Le Contrat De Retour Executeur

`executor-return.yml` reste le retour source de l'agent d'execution.

Le `proof-record` ne le remplace pas.

Relation cible :

- `executor-return.yml` dit ce que l'agent affirme avoir fait ;
- `proof-record` standardise ce qui est reellement retenu comme preuve exploitable ;
- `stage-review.md` decide ;
- `proof-index.yml` consolide.

## Non-Objectifs

Le contrat `proof-record` ne doit pas :

- dupliquer integralement tous les logs ;
- remplacer les logs bruts ;
- masquer une preuve absente par une sur-structuration ;
- ajouter une bureaucratie qui n'augmente pas la verifiabilite.

## Critere D'Acceptation B3

B3 sera considere atteint si :

- un format `proof-record` unique est defini ;
- un index de session est defini ;
- la revue finale doit pouvoir lier explicitement ses validations a ces records ;
- l'absence de preuve devient un blocage ou une reserve explicite ;
- une review convaincante mais non prouvee n'est plus un chemin normal acceptable.
