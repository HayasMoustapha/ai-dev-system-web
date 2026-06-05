# Contrats Des Artefacts AI Delivery Governor

## Statut

Ce document definit les contrats d'entree et de sortie des artefacts principaux utilises par l'AI Delivery Governor.

Il complete :
- `docs/concepts/governor/overview/workflow-ai-delivery-governor.md`
- `docs/concepts/governor/artifacts/format-prompt-execution-ai.md`
- `docs/concepts/governor/artifacts/format-revue-etape-governor.md`
- `docs/concepts/governor/artifacts/memoire-ai-delivery-governor.md`
- `rules/handoff.md`

Il ne cree pas de moteur d'artefacts.
Il ne definit pas un schema runtime rigide.
Il identifie seulement les artefacts vraiment utiles pour gouverner les transitions entre etapes.

## Principe

Un artefact Governor est exploitable s'il permet de repondre a trois questions :
- qui l'a produit ?
- qui doit l'utiliser ensuite ?
- quelle condition permet de passer a l'etape suivante ?

Un artefact incomplet peut exister, mais il doit annoncer ses limites.

## Vue d'ensemble

| Artefact | Producteur principal | Consommateur principal | Moment du workflow |
| --- | --- | --- | --- |
| Cadrage d'etape | Governor | Governor, utilisateur, agent d'execution IA | Avant plan ou execution |
| Plan de livraison court | Governor | Governor, agent d'execution IA | Avant prompt d'execution IA |
| Prompt d'execution IA | Governor | Agent d'execution IA | Avant execution |
| Retour d'execution IA | Agent d'execution IA | Governor | Apres execution |
| Revue d'etape | Governor | Utilisateur, Governor, agent d'execution IA | Apres retour d'execution |
| Decision de Governor | Governor | Utilisateur, Governor, agent d'execution IA | Apres revue |
| Memoire utile de pilotage | Governor avec validation | Futurs Governors ou agents IA | Apres validation durable |
| Handoff | Governor ou agent courant | Nouvel agent IA | Avant reprise ou changement d'agent |
| Run-manifest / etat de run | Systeme, Governor ou agent courant | Governor, agent d'execution IA, nouvel agent IA | Pendant tout le run |
| Recommandation de continuite | Governor | Utilisateur, prochain agent IA | Fin d'etape ou pause |

## Contrat - Cadrage d'etape

Role :
- borner une demande avant de planifier ou d'executer.

Producteur principal :
- Governor via `Intake Analyst` et `Scope Guardian`.

Consommateur principal :
- Governor, utilisateur, puis agent d'execution IA.

Entrees minimales :
- demande utilisateur
- type d'entree
- faits disponibles
- hypotheses
- inconnues critiques
- contraintes explicites

Contenu attendu :
- objectif
- perimetre
- hors perimetre
- hypotheses actives
- criteres d'acceptation initiaux
- conditions d'arret

Conditions minimales d'acceptation :
- le perimetre est assez clair pour planifier
- les inconnues bloquantes sont visibles
- aucune logique metier absente n'est inventee
- l'utilisateur peut comprendre ce qui sera fait et non fait

Lien avec la suite :
- alimente le plan de livraison court
- peut produire une demande de clarification
- sert de reference a la revue d'etape

## Contrat - Plan de livraison court

Role :
- transformer le cadrage en prochaines actions ordonnees.

Producteur principal :
- Governor via `Delivery Planner`.

Consommateur principal :
- Governor et agent d'execution IA.

Entrees minimales :
- cadrage d'etape
- mode de travail
- contexte utile
- risques connus
- criteres d'acceptation

Contenu attendu :
- etapes courtes
- ordre conseille
- prochaine action unique
- dependances
- validations attendues
- risques par etape

Conditions minimales d'acceptation :
- chaque etape a un objectif unique
- la prochaine action est executable
- les validations ne sont pas toutes repoussees a la fin
- les decisions structurantes non tranchees sont signalees

Lien avec la suite :
- alimente le prompt d'execution IA
- peut mettre a jour le run-manifest
- peut demander un re-cadrage si une etape est trop large

## Contrat - Prompt d'execution IA

Role :
- confier une mission bornee a l'agent d'execution IA.

Producteur principal :
- Governor via `Execution Prompt Designer`.

Consommateur principal :
- agent d'execution IA.

Entrees minimales :
- plan ou prochaine action
- objectif
- contexte minimal a lire
- perimetre exact
- contraintes strictes
- fichiers cibles ou zones probables
- validations attendues

Contenu attendu :
- mission
- objectif
- contexte utile
- perimetre exact
- fichiers concernes
- contraintes strictes
- non-objectifs
- livrables attendus
- criteres d'acceptation
- format de retour attendu

Conditions minimales d'acceptation :
- l'objectif principal est unique
- le hors perimetre est visible
- les validations attendues sont explicites
- le format de retour permet une revue
- l'agent d'execution IA peut agir sans inventer le besoin

Lien avec la suite :
- utilise `templates/execution-prompt.md`
- produit le retour d'execution IA
- sert de reference a la revue d'etape

## Contrat - Retour d'execution IA

Role :
- rendre compte de ce que l'agent d'execution IA a fait ou n'a pas pu faire.

Producteur principal :
- agent d'execution IA.

Consommateur principal :
- Governor via `Quality Gatekeeper`.

Entrees minimales :
- prompt d'execution IA
- contexte lu par l'agent d'execution IA
- modifications, validations ou artefacts produits

Contenu attendu :
- resume
- fichiers modifies ou artefacts produits
- validations executees
- validations non executees et raison
- limites
- hypotheses restantes
- risques ou questions ouvertes

Conditions minimales d'acceptation :
- le retour distingue fait, non fait et non verifie
- les fichiers touches sont listes si disponibles
- les validations ne sont pas inventees
- les risques restants sont visibles

Lien avec la suite :
- alimente la revue d'etape
- peut declencher une correction, une clarification ou un handoff

## Contrat - Revue d'etape

Role :
- evaluer le retour d'execution IA et produire une decision.

Producteur principal :
- Governor via `Quality Gatekeeper`.

Consommateur principal :
- utilisateur, Governor, agent d'execution IA.

Entrees minimales :
- objectif initial
- prompt d'execution IA
- retour d'execution IA
- criteres d'acceptation
- quality gates pertinents
- validations disponibles

Contenu attendu :
- rappel de l'objectif
- perimetre attendu et verifie
- resume des changements
- fichiers touches
- validations rapportees
- conformite aux contraintes
- evaluation des criteres d'acceptation
- quality gates pertinents
- points satisfaits
- ecarts, risques et ambiguites
- decision finale
- prochaine action recommandee
- impact sur memoire, handoff ou phase suivante

Conditions minimales d'acceptation :
- la decision est unique
- les gates bloques ou reserves sont cites
- les limites de revue sont annoncees
- la prochaine action est actionnable

Lien avec la suite :
- utilise `templates/stage-review.md`
- peut produire une decision Governor
- peut proposer memoire ou handoff

## Contrat - Decision de Governor

Role :
- trancher la suite apres revue.

Producteur principal :
- Governor.

Consommateur principal :
- utilisateur, Governor, agent d'execution IA.

Entrees minimales :
- revue d'etape
- quality gates
- risques residuels
- questions ouvertes

Contenu attendu :
- decision : validee | a corriger | a reprendre partiellement | a re-cadrer | bloquee | cloturee
- justification
- condition de passage
- responsable de la prochaine action
- besoin de memoire ou handoff

Conditions minimales d'acceptation :
- la decision correspond aux preuves disponibles
- elle ne masque pas une validation manquante
- elle indique qui agit ensuite
- elle reste comprehensible par l'utilisateur

Lien avec la suite :
- declenche une correction, une nouvelle iteration, une clarification, un handoff ou une cloture

## Contrat - Memoire utile de pilotage

Role :
- conserver un apprentissage durable utile au pilotage futur.

Producteur principal :
- Governor avec validation humaine ou gouvernee.

Consommateur principal :
- futurs Governors ou agents IA.

Entrees minimales :
- decision validee
- convention stable
- correction importante
- contrainte projet durable
- preuve ou origine

Contenu attendu :
- categorie
- statut
- contexte
- contenu
- justification
- impact
- reutilisation future

Conditions minimales d'acceptation :
- l'information est validee
- elle est durable
- elle est courte
- elle est au bon endroit
- elle ne contient pas de secret

Lien avec la suite :
- suit `docs/concepts/governor/artifacts/memoire-ai-delivery-governor.md`
- va dans `memory/` si elle concerne le systeme
- va dans `project-memory.md` si elle concerne un projet cible

## Contrat - Handoff

Role :
- permettre une reprise courte par un autre agent IA.

Producteur principal :
- Governor ou agent courant.

Consommateur principal :
- nouvel agent IA, Governor, utilisateur.

Entrees minimales :
- objectif
- mode
- stack ou profil
- run courant si disponible
- dernier etat valide
- fichiers touches
- decisions prises
- questions ouvertes
- validations executees et non executees
- prochaine action recommandee

Contenu attendu :
- resume court
- etat valide
- derniere action
- prochaine action
- decisions prises
- questions ouvertes
- validations
- contexte minimal a lire

Conditions minimales d'acceptation :
- le handoff est court
- il ne recopie pas tout l'historique
- il ne contient pas de raisonnement prive inutile
- il distingue valide, non valide et non verifie

Lien avec la suite :
- suit `rules/handoff.md`
- peut utiliser `templates/agent-handoff.md`
- pointe vers le run-manifest si un run existe

## Contrat - Run-manifest / etat de run

Role :
- garder l'etat courant d'un run.

Producteur principal :
- systeme, Governor ou agent courant selon le mode.

Consommateur principal :
- Governor, agent d'execution IA, nouvel agent IA.

Entrees minimales :
- demande ou run courant
- phase active
- statut global
- hypotheses actives
- risques et blocages
- decisions ouvertes
- quality gates
- prochaine action
- prochain agent recommande
- references d'artefacts ou validations

Contenu attendu :
- etat courant
- prochain pas
- references utiles
- limites ou blocages

Conditions minimales d'acceptation :
- la phase active est claire
- la prochaine action est visible
- les blocages ne sont pas caches
- les references utiles sont indiquees sans recopier tout le contexte

Lien avec la suite :
- ne remplace pas la memoire durable
- ne remplace pas le handoff
- aide le Governor a reprendre sans relire tout l'historique

## Contrat - Recommandation de continuite

Role :
- dire quoi faire ensuite apres une decision.

Producteur principal :
- Governor via `Continuity Steward`.

Consommateur principal :
- utilisateur, prochain agent IA, Governor.

Entrees minimales :
- decision Governor
- etat du run
- risques residuels
- validations disponibles
- besoin eventuel de handoff ou memoire

Contenu attendu :
- prochaine action
- responsable
- contexte minimal a lire
- condition de passage
- besoin de correction, clarification, handoff, memoire ou cloture

Conditions minimales d'acceptation :
- une seule prochaine action principale
- responsable clair
- condition de passage explicite
- pas de dependance a une memoire privee d'agent

Lien avec la suite :
- alimente le prochain prompt d'execution IA
- alimente le handoff si un autre agent reprend
- alimente le run-manifest si un run continue

## Transitions minimales

| Transition | Artefact source | Artefact cible | Condition minimale |
| --- | --- | --- | --- |
| Demande vers cadrage | Demande utilisateur | Cadrage d'etape | Besoin reformule et inconnues critiques visibles. |
| Cadrage vers plan | Cadrage d'etape | Plan de livraison court | Perimetre assez stable. |
| Plan vers execution | Plan de livraison court | Prompt d'execution IA | Prochaine action unique et verifiable. |
| Execution vers revue | Retour d'execution IA | Revue d'etape | Fait, non fait et non verifie distingues. |
| Revue vers decision | Revue d'etape | Decision Governor | Gates critiques evalues avec preuves ou limites. |
| Decision vers continuite | Decision Governor | Recommandation de continuite | Prochaine action et responsable clairs. |
| Continuite vers reprise | Recommandation de continuite | Handoff ou run-manifest | Reprise probable ou contexte trop lourd. |
| Decision durable vers memoire | Decision Governor | Memoire utile de pilotage | Information validee, durable et reutilisable. |

## Arbitrages retenus

- Les contrats restent documentaires.
- Les artefacts retenus sont ceux qui aident vraiment le Governor a piloter.
- Les templates existants restent les formes reutilisables quand ils existent.
- Le run-manifest, la memoire et le handoff restent separes.
- L'agent d'execution IA reste generique ; Codex n'est qu'un exemple concret possible.

## Limites volontaires

Ce document ne definit pas :
- un schema machine obligatoire
- une generation automatique d'artefacts
- une taxonomie exhaustive de tous les fichiers du repo
- un format different par agent IA

Il sert de base a la validation pilote de l'etape suivante.
