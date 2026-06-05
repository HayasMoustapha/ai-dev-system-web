# Machine D'Etats Canonique Governor

## But

Transformer Governor d'un assemblage d'heuristiques lisibles seulement dans le code en moteur a transitions explicites.

Cette machine d'etats ne remplace pas les autres vues du control plane.
Elle les organise.

Elle doit rester coherente avec :

- `work_mode` dans les artefacts courts ;
- `active_task_status` dans le control plane ;
- `assisted_loop.status` dans `execution-loop.yml` ;
- les gates `proof`, `commit` et `push` ;
- les decisions Governor de revue et de continuation.

## Ce Que Cette Machine N'Est Pas

Ce n'est pas :

- un remplaçant direct des commandes utilisateur ;
- un remplaçant direct des decisions de revue ;
- un log d'evenements ;
- une promesse que toutes les nuances sont deja first-class dans le code actuel.

Elle sert a rendre le comportement central du systeme explicitement pilotable.

## Etats Canoniques

Les etats canoniques de haut niveau sont :

1. `intake`
2. `context_detected`
3. `session_selected`
4. `repair_required`
5. `ready_for_execution`
6. `execution_running`
7. `evidence_pending`
8. `review_required`
9. `closeable`
10. `blocked`

## Definitions Des Etats

### 1. `intake`

Signification :
- Governor a recu une demande ou une relance, mais n'a pas encore stabilise le contexte de travail.

Entree typique :
- ouverture via `ads <besoin>` ou `/ads-governor-init`
- `current_step: autopilot-intake`

Preuve minimale :
- besoin utilisateur connu
- projet cible resolu
- session a creer ou a retrouver

Sorties autorisees :
- `context_detected`
- `blocked`

### 2. `context_detected`

Signification :
- le projet, le mode de travail, les contraintes et la route de gouvernance sont qualifies.

Preuve minimale :
- contexte projet detecte
- gouvernance et permission terminal determinees
- control plane minimal ecrit dans `current-scope.md`

Artefacts / fonctions lies :
- `current-scope.md`
- `resource-activation-report.md`
- `detect_project_context`
- `classify_risk_and_governance_level`
- `select_resources`

Sorties autorisees :
- `session_selected`
- `blocked`

### 3. `session_selected`

Signification :
- une session exploitable a ete selectionnee ou creee, et la raison de selection est explicable.

Preuve minimale :
- `session-manifest.yml` present
- raison de selection lisible
- session root stable

Artefacts / fonctions lies :
- `session-manifest.yml`
- `session-dashboard.md`
- `session-event-log.yml`
- `build_governor_session_selection_reason`
- `governor_detect_active_session`
- `run_governor_autopilot`

Sorties autorisees :
- `repair_required`
- `ready_for_execution`
- `review_required`
- `closeable`
- `blocked`

### 4. `repair_required`

Signification :
- des artefacts reconstructibles manquent ou doivent etre regenerees avant de continuer proprement.

Preuve minimale :
- artefact manquant identifie comme reconstructible
- source de verite suffisante disponible

Artefacts / fonctions lies :
- `repair_governor_session_artifacts`
- `repair_governor_execution_readiness_artifacts`
- `resume-brief.md`
- `execution-readiness.md`
- `execution-prompt.md`
- `execution-handoff.md`
- `session-dashboard.md`
- `session-event-log.yml`

Sorties autorisees :
- `ready_for_execution`
- `review_required`
- `blocked`

Regle :
- si l'artefact critique n'est pas reconstructible, ne pas passer par `repair_required`, aller directement a `blocked`.

### 5. `ready_for_execution`

Signification :
- la prochaine tranche executable est bornee, les artefacts de preparation existent, et aucune condition d'arret critique ne bloque la relance.

Preuve minimale :
- `execution-readiness.md` coherent
- `execution-prompt.md` et `execution-handoff.md` rafraichis si execution requise
- prochaine action lisible
- control plane non terminal

Artefacts / fonctions lies :
- `prepare_governor_execution_artifacts`
- `execution-readiness.md`
- `execution-prompt.md`
- `execution-handoff.md`
- `assisted_loop.status=prepared`
- `autopilot_state=prepared`

Sorties autorisees :
- `execution_running`
- `review_required`
- `blocked`

Note :
- pour une tranche purement Governor, de spec, de review ou de benchmark, Governor peut passer de `ready_for_execution` a `review_required` sans runtime hote.

### 6. `execution_running`

Signification :
- l'agent d'execution hote ou l'orchestrateur Governor est en train d'executer une mission bornee.

Preuve minimale :
- une execution a ete explicitement demandee
- la boucle n'est pas terminale
- un artefact runtime ou orchestration est en cours

Artefacts / fonctions lies :
- `assisted_loop.status=auto_run_requested`
- `assisted_loop.status=executing` quand expose
- `orchestration/orchestration-run.yml`
- `orchestration/steps/<n>/*-runtime-output.log`
- `governor-run`

Sorties autorisees :
- `evidence_pending`
- `blocked`

### 7. `evidence_pending`

Signification :
- l'execution a produit ou devrait produire des retours, mais la preuve systemique n'est pas encore relue et stabilisee.

Preuve minimale :
- retour d'execution existe ou est attendu
- validations encore absentes, faibles ou non relices

Artefacts / fonctions lies :
- `executor-return.md`
- `executor-return.yml`
- `proof_gate=review_required`
- `validations encore insuffisamment renseignees`

Sorties autorisees :
- `review_required`
- `blocked`

Note :
- `evidence_pending` capture la zone grise ou quelque chose a tourne, mais ne peut pas encore etre tenu pour relu, prouve ou proche de la cloture.

### 8. `review_required`

Signification :
- Governor doit relire explicitement le retour, la preuve, les risques et la prochaine action avant toute continuation sure.

Preuve minimale :
- decision Governor manquante ou en attente
- revue d'etape requise pour autoriser la suite

Artefacts / fonctions lies :
- `stage-review.md`
- `governor-review`
- `governor-loop --review-from-file`
- `assisted_loop.status=review_required`
- `proof_gate=review_required`

Sorties autorisees :
- `ready_for_execution`
- `closeable`
- `blocked`

### 9. `closeable`

Signification :
- Governor dispose de suffisamment de preuve et de coherence pour autoriser une cloture propre ou une fin de tranche sans reserve critique ouverte.

Preuve minimale :
- decision de revue compatible avec la cloture
- prochaine action terminale ou aucune suite sure restante
- gates compatibles avec une cloture ou une livraison propre

Indices actuels dans le systeme :
- `active_task_status=ready_for_next_step` ou `closed` selon le cas
- `proof_gate=ready`
- `commit_gate=clean` ou etat acceptable selon le perimetre
- `push_gate=clean` ou action explicite restante

Sorties autorisees :
- `intake` pour un nouveau programme
- `blocked` si une reserve critique reapparait

Note :
- `closeable` est aujourd'hui plus implicite que les autres etats. B1 sert precisement a le rendre premier-class plutot que derive de plusieurs signaux disperses.

### 10. `blocked`

Signification :
- la continuation sure n'est pas possible sans arbitrage, clarification, preuve critique ou alternative technique encore absente.

Preuve minimale :
- stop condition reelle atteinte

Causes typiques :
- decision irreversible manquante
- session non exploitable
- artefact non reconstructible manquant
- validation critique impossible
- action sensible hors policy
- perimetre derive

Artefacts / fonctions lies :
- `active_task_status=blocked`
- `assisted_loop.status=blocked`
- `status=blocked`
- `governor_control_plane_runtime_hold_reason(...)`

Sorties autorisees :
- `repair_required`
- `ready_for_execution`
- `review_required`
- `intake`

## Transitions Autorisees

Transitions canoniques :

- `intake -> context_detected`
- `intake -> blocked`
- `context_detected -> session_selected`
- `context_detected -> blocked`
- `session_selected -> repair_required`
- `session_selected -> ready_for_execution`
- `session_selected -> review_required`
- `session_selected -> closeable`
- `session_selected -> blocked`
- `repair_required -> ready_for_execution`
- `repair_required -> review_required`
- `repair_required -> blocked`
- `ready_for_execution -> execution_running`
- `ready_for_execution -> review_required`
- `ready_for_execution -> blocked`
- `execution_running -> evidence_pending`
- `execution_running -> blocked`
- `evidence_pending -> review_required`
- `evidence_pending -> blocked`
- `review_required -> ready_for_execution`
- `review_required -> closeable`
- `review_required -> blocked`
- `closeable -> intake`
- `closeable -> blocked`
- `blocked -> intake`
- `blocked -> repair_required`
- `blocked -> ready_for_execution`
- `blocked -> review_required`

## Table De Mapping Avec Les Artefacts Actuels

| Etat canonique | Signaux actuels dominants |
| --- | --- |
| `intake` | `current_step=autopilot-intake`, session en creation ou prochain cadrage initial |
| `context_detected` | `current-scope.md` et `resource-activation-report.md` renseignes, gouvernance connue |
| `session_selected` | session root detectee, `session-manifest.yml` present, `Session selection: ...` |
| `repair_required` | `repaired_files != none`, artefacts reconstructibles regenes |
| `ready_for_execution` | `prepared_execution=true`, `execution-readiness.md` present, `assisted_loop.status=prepared` |
| `execution_running` | `assisted_loop.status=auto_run_requested`, logs runtime ou orchestration en cours |
| `evidence_pending` | retour runtime present mais preuve non relue, `proof_gate=review_required` |
| `review_required` | `stage-review.md` ou revue explicite requise, `assisted_loop.status=review_required` |
| `closeable` | gates propres ou cloture defensable, etat encore partiellement derive |
| `blocked` | `active_task_status=blocked`, `assisted_loop.status=blocked`, stop condition active |

## Decisions De Route Versus Etats

Le routeur central ne doit pas confondre decisions et etats.

Les etats decrivent :
- ou se trouve la session dans le cycle Governor.

Les decisions de route decrivent :
- ce que Governor fait ensuite.

Decisions de route actuelles :
- `continue`
- `review`
- `repair`
- `block`
- `close`

Mapping canonique :

| Decision de route | Etat source typique | Etat cible typique |
| --- | --- | --- |
| `continue` | `session_selected`, `review_required`, `blocked` | `ready_for_execution` ou `execution_running` |
| `review` | `evidence_pending`, `ready_for_execution` | `review_required` |
| `repair` | `session_selected`, `blocked` | `repair_required` |
| `block` | n'importe quel etat | `blocked` |
| `close` | `review_required`, `closeable` | cloture effective ou retour a `intake` pour un nouveau programme |

## Regles D'Arret Explicites

Governor doit stopper proprement et entrer en `blocked` si :

- une decision metier ou architecturale irreversible manque ;
- une preuve critique ne peut pas etre obtenue ;
- une action sensible hors policy devient necessaire ;
- aucune session exploitable n'est detectable et aucune creation de session n'est possible ;
- un artefact non reconstructible bloque la continuite ;
- aucune alternative technique sure n'existe.

## Invariants

Invariants obligatoires :

- aucune transition ne doit inventer une preuve absente ;
- `repair_required` ne couvre que les artefacts reconstructibles ;
- `review_required` ne doit pas etre saute si la preuve est incomplete ;
- `closeable` ne doit pas etre atteint si les gates critiques restent ouverts ;
- `blocked` doit toujours expliquer sa cause de maniere lisible ;
- la raison de selection de session doit rester visible a chaque reprise Autopilot.

## Ecart Connu Entre Cible Et Implementation Actuelle

La machine d'etats canonique est plus stricte que l'exposition actuelle du code sur trois points :

1. `closeable` n'est pas encore un etat first-class unique ; il est encore derive de plusieurs signaux.
2. `evidence_pending` est surtout visible via le `proof_gate` et la revue manquante, plus que via un statut unique.
3. `execution_running` est expose de facon mixte entre `assisted_loop.status`, `governor-run` et les artefacts d'orchestration.

Ces ecarts sont acceptables a ce stade seulement si les futurs chantiers de la Phase B les reduisent explicitement.

## Source De Verite D'Implementation

Les points de preuve actuels les plus proches sont :

- `scripts/core/ai_dev_cli.py`
- `scripts/ai.py`
- `docs/concepts/governor/operation/routeur-central-governor-autopilot.md`
- `docs/concepts/governor/operation/detection-contexte-session-governor-autopilot.md`
- `docs/concepts/governor/operation/reprise-repair-readiness-governor-autopilot.md`
- `docs/concepts/governor/operation/boucle-governor-assistee.md`
- `docs/concepts/governor/operation/gates-automatiques-governor-autopilot.md`

## Critere De Conformite B1

B1 est considere atteint si :

- les etats canoniques sont nommes et limites ;
- les transitions autorisees sont explicites ;
- les causes de blocage sont explicites ;
- les decisions de route sont separees des etats ;
- chaque etat critique est relie a une preuve minimale et a des artefacts existants ;
- le routeur central peut etre lu sans laisser de decision centrale magique.
