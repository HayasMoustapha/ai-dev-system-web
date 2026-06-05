# Architecture En Couches Canoniques

## Pourquoi Ce Document Existe

Ce document formalise les quatre couches canoniques de AI Dev System :
- Framework Core
- Governor Kit
- Host Adapter
- Project Instance

Objectif :
- clarifier ce qui appartient a chaque couche
- eviter les melanges entre framework, Governor, agent hote et projet cible
- rendre le systeme plus portable et maintenable

Ce document ne deplace aucun fichier.
Il ne cree pas de runtime.
Il sert de reference d'architecture pour les prochaines evolutions.

## Vue D'Ensemble

| Couche | Role court | Exemple concret |
| --- | --- | --- |
| Framework Core | Noyau universel du systeme | `system.yml`, `rules/`, `prompts/`, `templates/`, `scripts/core/` |
| Governor Kit | Composant de pilotage instanciable | `governor-kit/`, commandes Governor, templates de session |
| Host Adapter | Adaptation a l'agent IA ou a l'environnement hote | Codex, Claude Code, Cursor, Windsurf, MCP, wrappers |
| Project Instance | Copie et etat dans un projet cible | `.ai-dev-system/`, sessions, runs, handoff, artefacts projet |

La regle simple :
- le Framework Core definit les principes et outils generiques
- le Governor Kit fournit un dispositif de pilotage reutilisable
- le Host Adapter traduit l'usage vers un agent ou environnement concret
- la Project Instance porte l'etat reel d'un projet donne

## Couche 1 - Framework Core

### Role

Le Framework Core est le noyau universel de AI Dev System.

Il definit :
- les modes de fonctionnement
- les phases de travail
- les rules
- les prompts
- les agents
- les templates generiques
- les scripts communs
- les sources de verite
- les politiques de memoire, handoff, recherche, contexte et quality gates

### Responsabilite

Le Framework Core doit rester :
- universel
- portable
- coherent entre les projets
- independant d'un agent d'execution IA unique
- maintenable comme source commune

### Contenu Attendu

Appartiennent au Framework Core :
- `system.yml`
- `VERSION`
- `CHANGELOG.md`
- `README.md`
- `rules/`
- `prompts/`
- `agents/`
- `templates/`
- `stacks/`
- `memory/`
- `sources.md`
- `scripts/core/`
- scripts generiques a la racine de `scripts/`
- documentation de reference dans `docs/`

### Ce Qui Ne Lui Appartient Pas

Le Framework Core ne doit pas porter :
- l'etat d'un projet cible
- les decisions d'un projet particulier
- l'historique complet d'une conversation utilisateur
- une dependance obligatoire a Codex, Claude Code, Cursor ou un autre agent
- une configuration globale silencieuse d'un outil hote

### Relation Avec Les Autres Couches

Le Framework Core fournit :
- au Governor Kit ses conventions, templates et commandes de base
- au Host Adapter les informations universelles a adapter
- a la Project Instance les fichiers a copier ou utiliser localement

## Couche 2 - Governor Kit

### Role

Le Governor Kit est le composant de pilotage instanciable de l'AI Delivery Governor.

Il sert a piloter un chantier avec :
- une session Governor
- un cadrage courant
- un prompt d'execution IA
- une revue d'etape
- un brief de demarrage
- un brief de reprise
- une memoire de pilotage minimale
- un handoff si necessaire

### Responsabilite

Le Governor Kit doit :
- rendre le Governor concret et manipulable
- rester leger
- rester portable entre agents IA
- aider a tenir la boucle cadrer, executer, relire, decider, reprendre
- ne pas decider automatiquement a la place de l'utilisateur

### Contenu Attendu

Appartiennent au Governor Kit :
- `governor-kit/README.md`
- `governor-kit/package.yml`
- `governor-kit/starter-prompt-governor.md`
- `governor-kit/templates/*`
- commandes Governor comme `init-governor-session`, `update-governor-session`, `prepare-governor-execution`, `review-governor-step`
- documentation Governor dans `docs/concepts/governor/`

### Ce Qui Ne Lui Appartient Pas

Le Governor Kit ne doit pas devenir :
- une application web complete
- un runtime autonome
- un orchestrateur multi-agent automatique
- une implementation liee a un seul fournisseur LLM
- une integration specifique a un seul agent d'execution IA
- une archive exhaustive de conversation

### Relation Avec Les Autres Couches

Le Governor Kit depend du Framework Core pour :
- les templates communs
- les rules
- la logique CLI partagee
- les quality gates
- la politique de handoff et de memoire

Il produit dans la Project Instance :
- `.ai-dev-system/governor/`
- `.ai-dev-system/governor/sessions/<session>/`

Il peut utiliser un Host Adapter pour s'adapter a un agent d'execution IA concret.

## Couche 3 - Host Adapter

### Role

Le Host Adapter est la couche d'adaptation entre le systeme et l'environnement concret qui execute ou assiste le travail.

Un hote peut etre :
- Codex
- Claude Code
- Cursor
- Windsurf
- un autre agent IA
- un MCP
- un terminal ou wrapper local

### Responsabilite

Le Host Adapter doit :
- traduire les conventions universelles vers les contraintes de l'outil hote
- exposer les commandes ou configurations utiles
- conserver l'universalite du framework
- documenter les limites de l'environnement concret
- eviter de faire passer une capacite locale pour une capacite universelle

### Contenu Attendu

Peuvent appartenir a cette couche :
- wrappers comme `scripts/ai.ps1`
- notes de configuration MCP
- fichiers d'adaptation dans `integrations/`
- pointeurs MCP dans `integrations/mcp/`
- profils ou skills embarques quand ils servent d'adaptation operationnelle
- documentation d'adaptation aux agents d'execution IA

### Ce Qui Ne Lui Appartient Pas

Le Host Adapter ne doit pas porter :
- les regles metier d'un projet
- la definition canonique du framework
- la memoire durable du systeme
- l'etat complet d'une session Governor
- une configuration globale appliquee sans validation humaine

### Relation Avec Les Autres Couches

Le Host Adapter lit les conventions du Framework Core.
Il peut aider le Governor Kit a produire des consignes adaptees a un agent d'execution concret.
Il agit sur la Project Instance seulement si l'utilisateur le valide ou si une commande explicite le demande.

## Couche 4 - Project Instance

### Role

La Project Instance est l'instance locale du systeme dans un projet cible.

Elle correspond typiquement a :
- un projet client
- une base de code existante
- une copie locale de `.ai-dev-system/`
- les runs, sessions, handoffs et artefacts produits pour ce projet

### Responsabilite

La Project Instance doit :
- porter l'etat reel du projet
- conserver les artefacts de run et de Governor propres au projet
- rester distincte du repo source du framework
- documenter les decisions projet validees
- permettre a un autre agent IA de reprendre avec un contexte minimal

### Contenu Attendu

Appartiennent a une Project Instance :
- `.ai-dev-system/` dans le projet cible
- `.ai-dev-system/runs/`
- `.ai-dev-system/governor/sessions/<session>/`
- `.ai-dev-system/handoff/`
- `AGENTS.md` projet si genere
- artefacts de cadrage, execution, revue et reprise propres au projet
- memoire projet validee

### Ce Qui Ne Lui Appartient Pas

La Project Instance ne doit pas modifier directement :
- la source canonique du framework
- les rules globales du repo systeme
- le packaging du Governor Kit
- les configurations globales d'un agent IA

Si une amelioration est decouverte dans une Project Instance, elle doit etre remontee comme proposition vers le repo framework, puis traitee dans une etape dediee.

### Relation Avec Les Autres Couches

La Project Instance consomme :
- le Framework Core via la copie `.ai-dev-system/`
- le Governor Kit via les sessions Governor
- le Host Adapter via l'agent IA ou les integrations activees

Elle ne doit pas devenir la source de verite globale du systeme.

Pour une mise a jour d'une Project Instance deja installee, le contrat canonique est :
- `docs/concepts/core/contrat-upgrade-project-instance.md`

Pour transporter une source systeme vers une autre machine sans acces au repo source d'origine, le contrat canonique est :
- `docs/concepts/core/contrat-distribution-portable.md`

## Flux Typique Entre Les Couches

1. Le Framework Core definit les conventions et les commandes.
2. Le Governor Kit fournit les artefacts de pilotage.
3. Le Host Adapter adapte l'usage a l'agent IA ou a l'environnement concret.
4. La Project Instance recoit les artefacts et porte l'etat du projet.
5. Si une lecon durable emerge, elle est proposee au Framework Core via une evolution controlee.

## Regles De Separation

- Ne pas mettre l'etat projet dans le Framework Core.
- Ne pas mettre une dependance hote dans le Governor Kit comme obligation structurelle.
- Ne pas mettre une logique metier projet dans le Host Adapter.
- Ne pas considerer une Project Instance comme source de verite globale.
- Ne pas confondre documentation Governor et package Governor executable.
- Ne pas configurer silencieusement un agent IA global depuis une commande projet.

## Ambiguites A Traiter Ensuite

### Host Adapter Encore Conceptuel

La couche Host Adapter a maintenant un contrat canonique dedie :
- `docs/concepts/governor/operation/contrat-host-adapter.md`

Elle a aussi un premier contrat concret pour Codex :
- `docs/concepts/governor/operation/adaptateur-codex.md`

La premiere configuration concrete associee vit dans :
- `host-adapters/codex/`

Ce contrat Codex reste une adaptation d'hote.
Il ne rend pas Codex obligatoire pour le framework ou le Governor.

Point a traiter plus tard :
- decider si elle reste une convention documentaire
- ou si elle devient un repertoire dedie, par exemple `host-adapters/`

### Governor Kit Et Scripts Partages

Le Governor Kit utilise des scripts generiques dans `scripts/core/`.

Point a surveiller :
- eviter de dupliquer la logique Governor dans un second runtime
- garder les commandes Governor comme assistants de fichiers legers

### Project Instance Et Retour D'Experience

Une Project Instance peut reveler une amelioration utile.

Point a traiter :
- definir un flux simple pour remonter une amelioration projet vers le Framework Core sans modifier directement le noyau depuis le projet cible

## Resume Court

Les quatre couches canoniques sont :
- Framework Core : source commune et universelle
- Governor Kit : composant de pilotage instanciable
- Host Adapter : adaptation a l'agent IA ou a l'environnement hote
- Project Instance : etat reel dans un projet cible

Cette separation doit guider les prochaines evolutions pour eviter les couplages et garder le systeme portable.
