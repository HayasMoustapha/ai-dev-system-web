# Couches Du Systeme

## Pourquoi ce document existe

Ce document explique la difference entre les principales briques du systeme.

Il repond a une question simple :
- quand on voit `prompts`, `agents`, `rules`, `skills`, profils `.toml`, `templates`, `stacks` et `memory`, qui fait quoi ?

L'objectif est qu'une personne non technique comprenne ce qui se passe sans devoir connaitre l'architecture interne d'une IA.

## La phrase a retenir

Les prompts disent quoi faire.
Les agents disent quel role adopter.
Les rules disent quelles limites respecter.
Les skills disent quelle methode experte appliquer.
Les profils `.toml` disent quelle posture IA specialisee utiliser.
Les templates donnent la forme des livrables.
Les stacks adaptent le systeme a la technologie.
La memory conserve les apprentissages valides.

## Vue d'ensemble

| Element | Role simple | Utilise quand |
| --- | --- | --- |
| `prompts/` | Consignes de tache | A chaque etape concrete |
| `agents/` | Roles de travail | Quand on veut cadrer la posture globale |
| `rules/` | Garde-fous | Tout le temps |
| `rules/context-budget.md` | Economie de contexte | Tout le temps, surtout quand la tache grandit |
| `rules/research.md` | Recherche controlee | Quand une information externe ou instable influence une decision |
| `skills/` | Methodes expertes | Selon le contexte |
| profils `.toml` | Profils d'agents specialises | Selon la phase ou la mission |
| `templates/` | Formulaires de sortie | Pour structurer les livrables |
| `stacks/` | Reglages par technologie | Quand la techno est connue |
| `memory/` | Memoire durable | Apres validation |
| `handoff/` | Passation courte | Quand un autre agent IA doit reprendre |
| `sources.md` | References fiables | Quand il faut verifier une information |
| `system.yml` | Carte officielle du systeme | Pour savoir ce qui existe et quand l'activer |
| configuration MCP | Adaptateur vers un agent IA | Quand un agent doit utiliser un serveur MCP |

## Architecture canonique en 4 couches

Ce document explique surtout les briques internes du systeme.

La separation canonique entre framework, Governor, hote et projet cible est definie dans :
- `docs/concepts/core/architecture-couches-canoniques.md`

Les quatre couches a retenir sont :
- Framework Core : noyau universel du systeme
- Governor Kit : composant de pilotage instanciable
- Host Adapter : adaptation a un agent IA ou environnement hote
- Project Instance : copie et etat dans un projet cible

## Qui manipule quoi

Tous les elements du systeme ne se manipulent pas de la meme facon.

| Element | L'utilisateur doit-il l'ouvrir ? | Le systeme ou l'agent l'utilise-t-il en arriere-plan ? |
| --- | --- | --- |
| `prompts/` | Oui, surtout en mode manuel et semi-auto | Oui, pour guider la tache courante |
| `agents/` | Parfois, pour choisir ou comprendre un role | Oui, pour cadrer la posture de travail |
| `rules/` | Parfois, comme checklist ou reference | Oui, comme garde-fous permanents |
| `rules/context-budget.md` | Parfois, si le contexte devient lourd | Oui, pour limiter les tokens |
| `rules/research.md` | Parfois, avant une verification externe | Oui, pour eviter les recherches inutiles ou les sources faibles |
| `templates/` | Oui, pour remplir ou relire les artefacts | Oui, pour structurer les sorties |
| `stacks/` | Parfois, quand la techno est connue | Oui, pour adapter les decisions techniques |
| `skills/` | Rarement, sauf si tu veux forcer un skill | Oui, selon le contexte detecte |
| profils `.toml` | Rarement, sauf diagnostic avance | Oui, pour choisir une posture specialisee |
| `memory/` | Oui, a la fin d'une decision validee | Oui, pour capitaliser les apprentissages |
| `handoff/` | Oui, avant de changer d'agent IA | Oui, comme point de reprise minimal |
| `sources.md` | Parfois, si une reference doit etre verifiee | Oui, pour privilegier les sources fiables |
| `system.yml` | Parfois, pour comprendre la carte officielle | Oui, comme manifeste du systeme |
| configuration MCP | Rarement, surtout a l'installation | Oui, pour connecter l'agent IA a un serveur externe |

La regle simple :
- si tu debutes, commence par les guides, les commandes et les artefacts generes
- si tu travailles en manuel, tu manipules davantage les prompts et templates
- si tu travailles en semi-auto, tu relis surtout les artefacts et checkpoints
- si tu travailles en auto-orchestrated, le systeme utilise plus de choses en arriere-plan, mais tu dois verifier les sorties

## `prompts/`

Les prompts sont les consignes operationnelles.
Ils repondent a : "qu'est-ce que je demande maintenant a l'IA ?"

Exemples :
- `prompts/spec.md` pour transformer une demande en specification
- `prompts/plan.md` pour produire un plan
- `prompts/execute.md` pour implementer une etape
- `prompts/review.md` pour revoir une solution

Un prompt est donc un ordre de mission.

## `agents/`

Les agents sont les roles du systeme.
Ils repondent a : "quel role l'IA doit-elle jouer ?"

Exemples :
- `agents/planner.md`
- `agents/architect.md`
- `agents/implementer.md`
- `agents/reviewer.md`
- `agents/tester.md`

Un agent est une fiche de poste.

## `rules/`

Les rules sont les garde-fous permanents.
Elles repondent a : "quelles regles ne doivent jamais etre oubliees ?"

Une rule n'est pas une tache.
C'est une limite a respecter pendant toutes les taches.

L'utilisateur ne doit pas forcement ouvrir les `rules/` a chaque fois.
En pratique :
- l'agent doit les appliquer en arriere-plan
- l'utilisateur les ouvre quand il veut comprendre une exigence ou verifier une decision
- le reviewer et le tester doivent s'en servir comme checklists

Exemple :
- `rules/security.md` doit influencer les choix de securite meme si l'utilisateur ne l'a pas colle dans chaque prompt
- `rules/quality-gates.md` doit etre utilise avant de dire qu'une tache est terminee
- `rules/context-budget.md` doit eviter de charger tout le systeme pour une petite tache
- `rules/research.md` doit etre utilise quand une information externe ou version-sensitive influence une decision
- `rules/frontend.md` ou `rules/backend.md` doivent etre appliques quand la tache touche ces zones

## `skills/`

Les skills sont des methodes expertes reutilisables.
Ils repondent a : "quelle methode specialisee faut-il appliquer dans ce contexte ?"

Exemples :
- `repo-discovery`
- `spec-synthesizer`
- `odoo-19-workflow`
- `figma-to-responsive-ui`
- `test-strategy-builder`

Un skill aide l'IA a mieux travailler dans un cas precis.

## Configuration MCP

Un MCP est un serveur externe branche a un agent IA.
Il repond a : "quelle source de contexte, de verification ou d'action supplementaire peut aider l'agent ?"

Exemple :
- un MCP Odoo peut aider a verifier des surfaces UI, des impacts ou des preuves runtime

Important :
- un MCP n'est pas propre a Codex
- Codex, Claude Code, Cursor, Windsurf ou un autre agent peuvent avoir chacun leur format de configuration
- le systeme doit documenter les informations universelles du MCP, puis laisser chaque agent les adapter
- le guide detaille est dans `docs/concepts/integrations/mcp-universel.md`

## Profils `.toml`

Les fichiers `.toml` dans `integrations/skills/ai-tools` sont des profils d'agents specialises.
Ils repondent a : "quelle posture IA specialisee doit-on activer ?"

Exemples :
- `repo_analyst.toml` pour analyser un repo avant d'agir
- `spec_orchestrator.toml` pour transformer une demande eparse en spec exploitable
- `docs_researcher.toml` pour verifier la documentation officielle
- `qa_reviewer.toml` pour revoir une solution avec un angle qualite
- `git_workflow_guardian.toml` pour cadrer Git, les branches et les commits

Un profil `.toml` ne remplace pas un prompt.
Il precise la posture, le niveau d'exigence et parfois les outils a privilegier.

## Difference entre agent et profil `.toml`

Un fichier dans `agents/` est une fiche de role generale du systeme.

Un fichier `.toml` est un profil operationnel plus pret a etre active par un outil IA.

Exemple :
- `agents/reviewer.md` explique le role general du reviewer
- `qa_reviewer.toml` configure une posture specialisee de revue qualite

Les deux sont complementaires.

## Difference entre skill et profil `.toml`

Un skill est une methode.

Un profil `.toml` est une posture d'agent.

Exemple :
- `test-strategy-builder` aide a construire une strategie de test
- `qa_reviewer.toml` adopte une posture de reviewer QA pour verifier les risques et la validation

Dans une meme tache, le systeme peut utiliser les deux.

## Exemple simple

Pour une representation visuelle du workflow complet, lis aussi :
- `docs/concepts/core/workflows-et-architecture.md`

Demande :
- "Je veux creer un module Odoo + OWL a partir d'une image."

Le systeme peut combiner :
- `prompts/ui-from-image.md` pour transformer l'image en specification
- `agents/planner.md` pour planifier
- `rules/frontend.md` et `rules/quality-gates.md` comme garde-fous
- `stacks/fullstack-odoo-owl.md` pour le contexte Odoo
- `skills/odoo-19-workflow` pour la methode Odoo
- `ux_spec_architect.toml` pour cadrer l'interface
- `repo_analyst.toml` pour comprendre le repo existant
- `qa_reviewer.toml` pour verifier la solution

## Comment le systeme choisit

La logique officielle est declaree dans `system.yml`.

On y trouve :
- les skills embarques
- les profils `.toml` embarques
- les contextes ou les activer
- les modes de fonctionnement
- les points d'entree

Si le contexte est clair, le systeme peut recommander ou utiliser la bonne brique quand l'agent IA la supporte deja.
Si l'utilisateur veut forcer un choix, il peut le dire explicitement.

## Regle de prudence

Ni un prompt, ni un agent, ni un skill, ni un profil `.toml` ne doit inventer une logique metier absente.

Si une information manque, le systeme doit :
- le dire clairement
- proposer une hypothese prudente si possible
- demander une clarification si le risque est reel

## En une phrase

Le systeme fonctionne comme une equipe bien organisee :
- les prompts donnent les missions
- les agents donnent les roles
- les rules posent les limites
- les skills apportent les methodes expertes
- les profils `.toml` donnent des postures IA specialisees
- les templates, stacks et memory gardent le travail structure et reutilisable
