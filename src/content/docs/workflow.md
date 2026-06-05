# Workflow AI Delivery Governor

## Statut

Ce document decrit le workflow operatoire exact entre :
- l'utilisateur
- l'AI Delivery Governor
- l'agent d'execution IA

Il complete :
- `docs/concepts/governor/overview/ai-delivery-governor.md`
- `docs/concepts/governor/overview/architecture-operatoire-ai-delivery-governor.md`
- `docs/concepts/governor/overview/sous-roles-ai-delivery-governor.md`

Il ne cree pas d'orchestrateur technique.
Il ne definit pas une machine d'etat runtime.

Principe universel :
- le Governor pilote le flux
- l'utilisateur arbitre les decisions importantes
- l'agent d'execution IA modifie le projet quand une execution est necessaire
- l'agent d'execution IA peut etre Codex, Claude Code, Cursor, Windsurf ou un autre outil

## Vue d'ensemble du flux

```text
Utilisateur
  -> demande initiale
Governor
  -> qualification
  -> cadrage
  -> choix du mode
  -> contexte utile
  -> sous-roles internes
  -> preparation de l'etape
  -> prompt d'execution IA
Agent d'execution IA
  -> modifications, validations ou analyse demandee
Governor
  -> lecture du retour
  -> quality gates
  -> decision
Utilisateur
  -> validation, arbitrage ou nouvelle demande si necessaire
```

## Roles dans le workflow

| Acteur | Role principal | Ne doit pas faire |
| --- | --- | --- |
| Utilisateur | Donner la demande, arbitrer les choix importants, valider les limites. | Porter toute la complexite du systeme. |
| Governor | Cadrer, decouper, preparer, controler, maintenir la continuite. | Modifier directement le repo ou inventer la logique metier. |
| Agent d'execution IA | Executer la mission bornee : modifier, verifier, analyser ou produire un artefact demande. | Elargir le scope ou ignorer les gates. |

## Etape 1 - Entree utilisateur

Declencheur :
- l'utilisateur donne une demande texte, image, document, zip, repo existant ou contexte mixte.

Sous-role principal :
- `Intake Analyst`

Le Governor fait :
- identifier le type d'entree
- reformuler le besoin
- separer faits, hypotheses et inconnues
- detecter les risques initiaux
- verifier si une clarification est indispensable

Sortie attendue :

```text
Besoin :
Type d'entree :
Faits disponibles :
Hypotheses :
Inconnues critiques :
Risque initial :
```

Decision :
- si le besoin est lisible, passer au cadrage
- si une inconnue change le resultat attendu, demander clarification
- si c'est une reprise, passer d'abord par le handoff ou le run-manifest

## Etape 2 - Qualification et cadrage initial

Sous-role principal :
- `Scope Guardian`

Le Governor fait :
- definir le perimetre
- definir le hors perimetre
- nommer les interdits
- expliciter les hypotheses actives
- relier la demande aux criteres d'acceptation connus

Sortie attendue :

```text
Perimetre :
Hors perimetre :
Hypotheses actives :
Interdits :
Criteres d'acceptation initiaux :
Condition d'arret :
```

Decision :
- si le perimetre est stable, choisir le mode de travail
- si le perimetre est trop large, reduire ou decouper
- si le perimetre depend d'un choix utilisateur, demander arbitrage

## Etape 3 - Choix du mode de travail

Sous-role principal :
- `Mode Strategist`

Le Governor choisit entre :
- `manual` si le risque est eleve ou si l'utilisateur veut tout piloter
- `semi-auto` si le systeme peut preparer mais avec checkpoints humains
- `auto-orchestrated` si le contexte est clair et les gates ne bloquent pas

Sortie attendue :

```text
Mode recommande :
Pourquoi :
Niveau d'autonomie :
Checkpoints humains :
Condition de changement de mode :
```

Decision :
- si le mode est accepte ou evident, passer au contexte utile
- si le mode a des consequences importantes, proposer les options a l'utilisateur

## Etape 4 - Selection du contexte utile

Sous-role principal :
- `Context Curator`

Le Governor selectionne :
- les fichiers sources de verite
- les rules pertinentes
- le stack profile utile
- les artefacts de run ou handoff si disponibles
- la memoire durable seulement si elle aide vraiment
- les agents framework utiles
- les sous-agents ou profils specialises utiles si l'hote les supporte
- les skills, MCP, outils hote ou sources externes seulement si leur valeur est claire

Le Governor doit justifier cette selection avec la grille canonique :

- `scope_fit`
- `execution_gain`
- `validation_gain`
- `host_availability`
- `setup_cost`
- `coordination_cost`

Pour un sous-agent ou profil specialise, il doit aussi verifier :

- que la mission est separable ;
- que l'ownership est clair ;
- que le cout de coordination est acceptable.

Sortie attendue :

```text
Contexte a lire :
Contexte ignore pour l'instant :
Sources de verite :
Rules pertinentes :
Stack ou profil :
Memoire utile :
Agents framework utiles :
Sous-agents ou profils specialises utiles :
Skills utiles :
MCP utiles :
Outils hote utiles :
Ressources a ne pas utiliser :
Justification :
Dimensions de score :
Ressources activees :
Ressources ignorees :
```

Decision :
- si le contexte suffit, mobiliser les sous-roles internes
- si une source manque, demander ou chercher uniquement cette source
- si le contexte devient lourd, resumer avant de continuer

## Etape 5 - Mobilisation des sous-roles internes

Sous-role principal :
- `Role Dispatcher`

Le Governor choisit les sous-roles utiles pour la suite.

Exemples :
- demande simple : `Intake Analyst`, `Scope Guardian`, `Execution Prompt Designer`, `Quality Gatekeeper`
- demande technique risquee : ajouter `Mode Strategist`, `Context Curator`, `Delivery Planner`
- demande longue : ajouter `Continuity Steward`
- reprise : commencer par `Continuity Steward`

Sortie attendue :

```text
Sous-role actif :
Sous-roles secondaires :
Agent framework proche :
Raison :
Prochaine transition :
```

Decision :
- si l'etape est deja executable, passer au prompt d'execution
- sinon, passer au plan de livraison

## Etape 6 - Preparation de l'etape

Sous-role principal :
- `Delivery Planner`

Le Governor prepare une action unique.

Il definit :
- objectif
- fichiers ou zones probables
- dependances
- risques
- preuve attendue
- condition de passage

Sortie attendue :

```text
Etape courante :
Objectif unique :
Fichiers ou zones probables :
Risques :
Preuve attendue :
Condition de passage :
```

Decision :
- si l'etape est trop large, la reduire
- si l'etape est claire, produire le prompt d'execution IA
- si une decision structurelle manque, revenir au cadrage

## Etape 7 - Production du prompt d'execution IA

Sous-role principal :
- `Execution Prompt Designer`

Le Governor produit un prompt que l'agent d'execution IA peut appliquer.

Format minimal :

```text
Mission execution IA :
- mode :
- phase :
- objectif :
- contexte minimal a lire :
- fichiers cibles :
- hors perimetre :
- rules a appliquer :
- validations attendues :
- sortie attendue :
```

Decision :
- envoyer le prompt a l'agent d'execution IA si tout est borne
- demander clarification si le prompt contient une hypothese dangereuse
- revenir au plan si l'objectif est trop large

## Etape 8 - Intervention de l'agent d'execution IA

Acteur principal :
- agent d'execution IA generique

L'agent d'execution IA peut etre Codex, Claude Code, Cursor, Windsurf ou un autre outil.

L'agent d'execution IA fait uniquement la mission bornee :
- modifier les fichiers si demande
- produire un artefact si demande
- executer ou proposer les validations utiles
- signaler les limites ou blocages

Sortie attendue :

```text
Resume :
Fichiers modifies :
Validations executees :
Validations non executees :
Risques restants :
Questions ouvertes :
```

Decision :
- l'agent d'execution IA rend la main au Governor pour revue
- il ne doit pas elargir le scope sans validation

## Etape 9 - Lecture du retour d'execution

Sous-role principal :
- `Quality Gatekeeper`

Le Governor relit :
- la sortie de l'agent d'execution IA
- le diff si disponible
- les validations
- les limites annoncees
- les incoherences avec le perimetre

Sortie attendue :

```text
Ce qui a ete fait :
Ce qui n'a pas ete fait :
Ecarts de scope :
Preuves disponibles :
Risques residuels :
```

Decision :
- si la sortie est claire, appliquer les quality gates
- si la sortie est incomplete, demander une correction ou une validation complementaire

## Etape 10 - Evaluation par quality gates

Sous-role principal :
- `Quality Gatekeeper`

Le Governor evalue :
- alignement au besoin
- adequation d'architecture
- robustesse fonctionnelle
- preuves de verification
- securite
- performance adaptee
- maintenabilite
- hygiene documentaire

Format minimal :

```text
Gate need_alignment :
Gate architecture_fit :
Gate functional_robustness :
Gate verification_evidence :
Gate security_review :
Gate performance_fit :
Gate maintainability :
Gate documentation_hygiene :
```

Decision :
- `continuer` si les gates critiques passent
- `corriger` si un probleme est actionnable
- `bloquer` si une condition critique manque
- `clarifier` si la suite depend d'un arbitrage utilisateur

## Etape 11 - Decision du Governor

Sous-roles possibles :
- `Quality Gatekeeper`
- `Continuity Steward`
- `Delivery Planner`

Le Governor choisit une decision unique.

| Decision | Quand l'utiliser | Prochaine action |
| --- | --- | --- |
| Validation | Le livrable respecte le perimetre et les gates critiques passent. | Passer a l'etape suivante ou cloturer. |
| Correction | Un probleme est clair et corrigeable. | Produire un prompt de correction pour l'agent d'execution IA. |
| Nouvelle iteration | Le besoin avance mais une etape supplementaire est necessaire. | Revenir a Delivery Planner. |
| Clarification | Une decision utilisateur manque. | Poser une question courte. |
| Handoff | Un autre agent IA doit reprendre ou le contexte devient lourd. | Produire ou mettre a jour le handoff. |
| Memoire | Une decision durable est validee. | Proposer une mise a jour de `memory/`. |
| Cloture | L'objectif est atteint et les validations sont suffisantes. | Resumer le resultat, preuves et limites. |

## Etape 12 - Memoire et continuite

Sous-role principal :
- `Continuity Steward`

Le Governor distingue :
- `run-manifest.yml` pour l'etat courant du run
- `.ai-dev-system/handoff/` pour une passation courte
- `memory/` pour les apprentissages durables et valides

Sortie attendue si necessaire :

```text
Handoff a produire :
Memoire durable a proposer :
Decision a tracer :
Prochaine action recommandee :
Contexte minimal pour reprise :
```

Decision :
- ne rien ecrire en memoire si l'information est temporaire
- produire un handoff si la reprise est probable
- cloturer si le travail est valide et reprenable

## Boucles de correction

Le workflow autorise des boucles courtes.

Boucles normales :
- retour a Scope Guardian si le perimetre est faux
- retour a Delivery Planner si l'etape est trop large
- retour a Execution Prompt Designer si le prompt manque de precision
- retour a l'agent d'execution IA si une correction ciblee est necessaire
- retour a l'utilisateur si une decision manque
- passage a Continuity Steward si le contexte doit etre transmis

## Exemple court de sequence

```text
Utilisateur :
Je veux ajouter une page frontend a partir d'une image.

Governor :
- qualifie l'entree comme image UI
- borne le scope : reproduire l'interface visible, ne pas inventer de logique metier
- choisit semi-auto si l'utilisateur veut valider les checkpoints
- selectionne rules/frontend.md, rules/quality-gates.md et le stack profile pertinent
- active Intake Analyst, Scope Guardian, Delivery Planner, Execution Prompt Designer
- produit un prompt d'execution IA

Agent d'execution IA :
- implemente ou prepare l'artefact demande
- liste les fichiers modifies et validations

Governor :
- relit le resultat
- applique les quality gates
- decide : corriger, continuer ou cloturer
```

## Limites volontaires

Ce workflow ne definit pas :
- une automatisation runtime
- une file de taches automatique
- un format final de prompt d'execution IA exhaustif
- un protocole de revue complet
- une strategie de memoire avancee

Il prepare les etapes 14 a 18.
