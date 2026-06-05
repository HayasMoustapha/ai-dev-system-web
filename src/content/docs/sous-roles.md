# Sous-Roles Internes AI Delivery Governor

## Statut

Ce document definit les sous-roles operatoires internes de l'AI Delivery Governor.

Il complete :
- `docs/concepts/governor/overview/ai-delivery-governor.md`
- `docs/concepts/governor/overview/architecture-operatoire-ai-delivery-governor.md`

Il ne cree pas de runtime.
Il ne cree pas de nouveaux agents techniques.
Il nomme les responsabilites que le Governor applique pendant son travail.

Principe central :
- le Governor pilote les sous-roles
- les sous-roles structurent la reflexion et les livrables
- l'agent d'execution IA reste l'executant des modifications repo
- dans le contexte actuel, l'executant concret est Codex

## Vue d'ensemble

Les sous-roles internes correspondent aux composants deja definis dans l'architecture operatoire.

Ils evitent deux problemes :
- un Governor trop vague qui "pilote tout" sans contrat clair
- une explosion de micro-agents qui rendrait le systeme lourd

Flux typique :

```text
Intake Analyst
  -> Scope Guardian
  -> Mode Strategist
  -> Context Curator
  -> Role Dispatcher
  -> Delivery Planner
  -> Execution Prompt Designer
  -> Quality Gatekeeper
  -> Continuity Steward
```

## Regle d'utilisation

Le Governor n'active pas forcement tous les sous-roles a chaque demande.

Regle simple :
- demande courte et claire : intake, scope, prompt, gate
- demande risquee : intake, scope, mode, contexte, plan, gate
- demande longue ou multi-agent : ajouter role dispatcher et continuity steward
- reprise ou changement d'agent : commencer par continuity steward

## Tableau synthetique

| Sous-role | Mission courte | Agent framework proche | Relation avec l'agent d'execution IA |
| --- | --- | --- | --- |
| Intake Analyst | Comprendre l'entree et les inconnues critiques. | `agents/orchestrator.md` | Ne demande pas encore d'execution si le besoin est flou. |
| Scope Guardian | Borner le perimetre, les interdits et les hypotheses. | `agents/orchestrator.md`, `agents/reviewer.md` | Protege l'executant contre les demandes implicites ou trop larges. |
| Mode Strategist | Choisir le bon niveau d'autonomie. | `agents/orchestrator.md` | Decide si l'executant peut avancer directement ou sous checkpoint. |
| Context Curator | Charger seulement le contexte utile. | `rules/context-budget.md` | Donne a l'executant le contexte minimal, pas tout le systeme. |
| Role Dispatcher | Choisir les agents framework utiles. | `agents/orchestrator.md` | Indique la posture de travail attendue a l'executant. |
| Delivery Planner | Decouper le travail en etapes verifiables. | `agents/planner.md`, `agents/architect.md` | Produit une prochaine action executable. |
| Execution Prompt Designer | Transformer l'etape en prompt d'execution IA. | `agents/implementer.md`, `prompts/*.md` | Prepare la mission bornee de l'executant. |
| Quality Gatekeeper | Decider avec preuves si l'on continue, corrige ou bloque. | `agents/reviewer.md`, `agents/tester.md` | Relit les sorties de l'executant avant validation. |
| Continuity Steward | Maintenir le fil, le handoff et la memoire durable. | `agents/orchestrator.md`, `rules/handoff.md` | Permet a un autre executant ou agent IA de reprendre sans historique prive. |

## Intake Analyst

Mission :
- comprendre la demande initiale et son type d'entree.

Responsabilite principale :
- transformer une demande brute en besoin lisible, sans inventer les parties manquantes.

Entrees attendues :
- demande utilisateur
- image, document, zip, specification ou contexte projet si fourni
- contraintes explicites
- objectif visible ou implicite

Sorties attendues :
- resume court du besoin
- type d'entree
- inconnues critiques
- risques initiaux
- premiere recommandation de suite

Criteres de qualite :
- les faits sont separes des hypotheses
- les inconnues qui bloquent vraiment sont visibles
- aucune logique metier absente n'est inventee
- le resume reste comprehensible par un non-informaticien

Conditions de passage :
- passer au Scope Guardian si le besoin est assez lisible
- demander clarification si une inconnue change fortement le resultat attendu
- passer au Continuity Steward si le travail est une reprise

Dependances :
- `rules/global-rules.md`
- `rules/context-budget.md`
- `prompts/spec.md`

Articulation avec les agents framework :
- proche de `agents/orchestrator.md`
- peut demander une posture `architect` si le besoin est deja structurel

Articulation avec l'agent d'execution IA :
- ne lui envoie rien tant que l'objectif n'est pas formulable
- prepare seulement le contexte initial utile

## Scope Guardian

Mission :
- proteger le perimetre de la demande.

Responsabilite principale :
- definir ce qui est inclus, exclu, suppose ou interdit.

Entrees attendues :
- resume du besoin
- contraintes utilisateur
- inconnues critiques
- risques initiaux

Sorties attendues :
- perimetre
- hors perimetre
- hypotheses actives
- interdits
- conditions d'arret

Criteres de qualite :
- le scope est assez petit pour etre execute et relu
- les risques de derive sont nommes
- les interdits sont actionnables
- le hors perimetre n'est pas flou

Conditions de passage :
- passer au Mode Strategist si le perimetre est stable
- repasser a Intake Analyst si la demande reste trop floue
- bloquer si le travail exige une decision utilisateur structurante

Dependances :
- `rules/global-rules.md`
- `rules/quality-gates.md`
- `docs/concepts/core/sources-de-verite.md`

Articulation avec les agents framework :
- proche de `agents/orchestrator.md`
- proche de `agents/reviewer.md` pour detecter les derives

Articulation avec l'agent d'execution IA :
- donne les limites que l'executant ne doit pas franchir
- empeche les modifications opportunistes

## Mode Strategist

Mission :
- choisir le mode de fonctionnement adapte.

Responsabilite principale :
- determiner si la demande doit avancer en `manual`, `semi-auto` ou `auto-orchestrated`.

Entrees attendues :
- perimetre
- niveau de risque
- autonomie souhaitee par l'utilisateur
- clarte des criteres d'acceptation
- disponibilite du contexte

Sorties attendues :
- mode recommande
- justification courte
- niveau de checkpoint humain attendu
- condition de passage a un autre mode si le risque change

Criteres de qualite :
- le mode n'est pas choisi pour aller plus vite artificiellement
- les limites du mode sont visibles
- le mode reste compatible avec les guides existants

Conditions de passage :
- passer au Context Curator une fois le mode choisi
- revenir au Scope Guardian si le mode choisi revele un scope trop large

Dependances :
- `system.yml`
- `docs/modes/guide-mode-manuel.md`
- `docs/modes/guide-mode-semi-auto.md`
- `docs/modes/guide-mode-auto-orchestrated.md`

Articulation avec les agents framework :
- proche de `agents/orchestrator.md`

Articulation avec l'agent d'execution IA :
- indique si l'executant peut avancer directement ou doit attendre validation a chaque checkpoint

## Context Curator

Mission :
- fournir le bon contexte, au bon moment, sans gaspiller les tokens.

Responsabilite principale :
- selectionner les fichiers, rules, docs, stacks, memory, skills ou MCP utiles a la phase courante.

Entrees attendues :
- mode choisi
- phase active
- stack ou domaine probable
- artefacts deja disponibles
- budget de contexte implicite ou explicite

Sorties attendues :
- contexte minimal a lire
- contexte a ignorer pour l'instant
- sources de verite pertinentes
- besoin eventuel de skill, MCP ou verification externe

Criteres de qualite :
- le contexte est suffisant pour decider
- les fichiers longs ne sont pas charges sans raison
- local d'abord, externe seulement si utile
- les sources de verite sont distinguees des guides secondaires

Conditions de passage :
- passer au Role Dispatcher si plusieurs postures sont utiles
- passer au Delivery Planner si le contexte suffit deja
- demander contexte complementaire seulement si necessaire

Dependances :
- `rules/context-budget.md`
- `docs/concepts/core/sources-de-verite.md`
- `sources.md`
- `docs/concepts/integrations/skills-et-mcp.md`

Articulation avec les agents framework :
- sert tous les agents en limitant ce qu'ils doivent lire

Articulation avec l'agent d'execution IA :
- donne la liste courte des fichiers a lire avant execution
- evite de transmettre tout le repo ou toute la documentation

## Role Dispatcher

Mission :
- choisir la posture de travail utile.

Responsabilite principale :
- mapper la phase courante vers un ou plusieurs agents framework.

Entrees attendues :
- phase active
- mode choisi
- contexte minimal
- risques
- prochaine action probable

Sorties attendues :
- role principal recommande
- roles secondaires eventuels
- raison du choix
- handoff attendu entre roles si necessaire

Criteres de qualite :
- un role principal clair
- pas d'empilement inutile d'agents
- role choisi coherent avec le moment du cycle
- les responsabilites ne se chevauchent pas inutilement

Conditions de passage :
- passer au Delivery Planner si le travail doit etre decoupe
- passer a Execution Prompt Designer si l'etape est deja claire
- passer a Quality Gatekeeper si l'on relit une sortie

Dependances :
- `agents/orchestrator.md`
- `agents/architect.md`
- `agents/planner.md`
- `agents/implementer.md`
- `agents/reviewer.md`
- `agents/tester.md`
- `agents/refactorer.md`

Articulation avec les agents framework :
- il ne remplace pas les agents framework
- il choisit lequel appliquer comme posture dominante

Articulation avec l'agent d'execution IA :
- signale a l'executant la posture attendue : planifier, implementer, tester, reviewer ou refactorer

## Delivery Planner

Mission :
- produire une suite d'etapes executable et verifiable.

Responsabilite principale :
- transformer le scope en prochaines actions ordonnees.

Entrees attendues :
- scope valide
- contexte minimal
- mode choisi
- role principal
- risques
- criteres d'acceptation

Sorties attendues :
- plan court
- prochaine action unique
- dependances
- risques par etape
- validations attendues

Criteres de qualite :
- chaque etape a un objectif unique
- chaque etape est relisible
- les validations ne sont pas repoussees a la fin
- les decisions structurantes non tranchees sont visibles

Conditions de passage :
- passer a Execution Prompt Designer quand une etape est prete
- revenir a Scope Guardian si une etape devient trop large
- passer a Mode Strategist si le niveau d'autonomie doit changer

Dependances :
- `agents/planner.md`
- `agents/architect.md`
- `rules/quality-gates.md`
- `run-manifest.yml` dans un projet cible si disponible

Articulation avec les agents framework :
- applique surtout `planner`
- consulte `architect` quand une decision structurante est necessaire

Articulation avec l'agent d'execution IA :
- lui donne une action a la fois
- evite les missions trop larges ou non verifiables

## Execution Prompt Designer

Mission :
- convertir la prochaine action en prompt operatoire.

Responsabilite principale :
- produire une consigne claire, bornee et executable par l'agent d'execution IA.

Entrees attendues :
- prochaine action
- scope
- fichiers ou zones cibles si connus
- contexte minimal
- rules pertinentes
- validations attendues

Sorties attendues :
- prompt d'execution IA
- interdits explicites
- format de sortie attendu
- preuves a produire

Criteres de qualite :
- le prompt a un seul objectif principal
- les limites sont concretes
- les fichiers a ne pas toucher sont visibles si connus
- le format de sortie permet la revue

Conditions de passage :
- envoyer a l'agent d'execution IA si le prompt est executable
- revenir a Delivery Planner si l'etape reste trop large
- revenir a Scope Guardian si une ambiguite de perimetre apparait

Dependances :
- `prompts/execute.md`
- `prompts/refactor.md`
- `prompts/review.md`
- `rules/global-rules.md`
- `rules/quality-gates.md`
- templates pertinents dans `templates/`

Articulation avec les agents framework :
- traduit le role `implementer`, `tester`, `reviewer` ou `refactorer` en consigne concrete

Articulation avec l'agent d'execution IA :
- c'est le sous-role qui prepare directement sa mission
- il ne fait pas l'execution a sa place

## Quality Gatekeeper

Mission :
- decider si le travail peut continuer, doit etre corrige ou doit etre bloque.

Responsabilite principale :
- appliquer les quality gates sur les sorties de l'agent d'execution IA ou sur un artefact de cadrage.

Entrees attendues :
- demande initiale ou spec
- sortie de l'agent d'execution IA
- diff ou fichiers modifies si disponibles
- validations executees
- risques et limites annoncees

Sorties attendues :
- verdict
- gates passes, reserves ou bloques
- corrections recommandees
- validations manquantes
- prochaine action

Criteres de qualite :
- chaque blocage est rattache a un gate ou un risque
- les reserves ne sont pas confondues avec les optimisations
- les preuves sont citees ou les absences de preuve sont annoncees
- le verdict reste actionnable

Conditions de passage :
- continuer si les gates critiques passent
- revenir a Execution Prompt Designer si une correction est necessaire
- revenir a Scope Guardian si le probleme vient du perimetre
- passer a Continuity Steward si l'etape doit etre transmise ou memorisee

Dependances :
- `rules/quality-gates.md`
- `agents/reviewer.md`
- `agents/tester.md`
- `prompts/review.md`

Articulation avec les agents framework :
- combine les postures `reviewer` et `tester`
- peut demander `implementer` pour une correction ciblee

Articulation avec l'agent d'execution IA :
- relit ses sorties
- ne valide pas sans preuve minimale
- produit un prompt de correction si necessaire

## Continuity Steward

Mission :
- maintenir la continuite du travail dans le temps et entre agents IA.

Responsabilite principale :
- gerer le fil entre run-manifest, handoff, memoire durable et prochaine action.

Entrees attendues :
- etat courant
- decisions prises
- validations executees ou non
- risques restants
- prochaine action recommandee
- contexte minimal a transmettre

Sorties attendues :
- handoff court si necessaire
- proposition de mise a jour memoire
- prochaine action explicite
- limites et questions ouvertes

Criteres de qualite :
- le handoff reste court et actionnable
- la memoire durable ne contient pas de brouillon
- les decisions importantes sont tracables
- un nouvel agent peut reprendre sans historique prive

Conditions de passage :
- produire un handoff avant changement d'agent IA
- proposer une memoire seulement apres validation
- revenir a Intake Analyst si une nouvelle demande arrive
- revenir a Delivery Planner si le run continue

Dependances :
- `rules/handoff.md`
- `templates/agent-handoff.md`
- `memory/README.md`
- `memory/memory.md`
- `memory/decision-log.md`
- `memory/conventions.md`
- `memory/patterns.md`

Articulation avec les agents framework :
- proche de `agents/orchestrator.md`
- transmet au role suivant les decisions, validations et risques utiles

Articulation avec l'agent d'execution IA :
- lui fournit le point de reprise minimal
- evite de s'appuyer sur la memoire interne privee d'un agent precedent

## Ordre de passage recommande

Ordre nominal :

```text
Intake Analyst
  -> Scope Guardian
  -> Mode Strategist
  -> Context Curator
  -> Role Dispatcher
  -> Delivery Planner
  -> Execution Prompt Designer
  -> Agent d'execution IA
  -> Quality Gatekeeper
  -> Continuity Steward
```

Ordre reduit pour une demande simple :

```text
Intake Analyst
  -> Scope Guardian
  -> Execution Prompt Designer
  -> Agent d'execution IA
  -> Quality Gatekeeper
```

Ordre de reprise :

```text
Continuity Steward
  -> Context Curator
  -> Role Dispatcher
  -> Delivery Planner ou Quality Gatekeeper
```

## Arbitrages retenus

- Les sous-roles sont des responsabilites internes, pas de nouveaux agents runtime.
- Le nombre de sous-roles est limite aux composants deja presents dans l'architecture operatoire.
- Les agents existants du framework restent les postures de reference.
- L'agent d'execution IA reste generique ; Codex n'est qu'un executant concret possible dans le contexte actuel.
- La memoire et le handoff restent separes du run courant.

## Limites restantes

Ce document ne definit pas encore :
- le contrat d'entree utilisateur detaille
- le protocole de cadrage complet
- le format final du generateur de prompt d'execution IA
- un runtime automatique pour activer ces sous-roles

Ces limites sont volontaires et preparent les etapes suivantes.
