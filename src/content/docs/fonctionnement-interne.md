# Guide De Fonctionnement Interne

## Pourquoi ce document existe

Ce document explique le fonctionnement interne du systeme avec des mots simples.

Son objectif est clair :
- permettre a une personne non technique de comprendre ce qui se passe,
- montrer le role de chaque element du systeme,
- expliquer comment ces elements travaillent ensemble,
- aider a ne plus voir le systeme comme "une boite noire".

Tu peux lire ce guide comme si on te montrait les coulisses d'une machine bien organisee.

## Idee generale

Le systeme sert a transformer une demande de depart en travail propre, relu, verifie et memorise.

La demande de depart peut etre :
- une phrase,
- une idee de fonctionnalite,
- une specification ecrite,
- une image ou un mockup,
- un document,
- une archive `.zip`,
- un bug a corriger,
- un refactoring,
- un projet entier a cadrer.

Le systeme ne cherche pas a coder tout de suite.
Il cherche d'abord a :
1. comprendre
2. structurer
3. planifier
4. executer
5. verifier
6. retenir ce qui sera utile plus tard

## Vision simple du systeme

Tu peux imaginer le systeme comme une equipe de travail.

Dans cette equipe :
- `system.yml` joue le role du reglement general
- `prompts/` jouent le role de consignes de travail
- `agents/` jouent le role des fiches de poste
- `rules/` jouent le role des garde-fous
- `templates/` jouent le role des formulaires a remplir
- `stacks/` jouent le role des adaptations par technologie
- les `skills` jouent le role de methodes specialisees supplementaires
- les profils `.toml` jouent le role de postures IA specialisees pretes a activer
- les `MCP` jouent le role de sources de contexte ou de preuve renforcee
- `memory/` joue le role du carnet de memoire
- `sources.md` joue le role de liste de references fiables
- `rules/context-budget.md` evite de charger trop de contexte pour une etape simple
- `.ai-dev-system/handoff/` sert de passation courte quand un autre agent IA doit reprendre
- `scripts/` jouent le role des outils pratiques
- `runs/` jouent le role des dossiers de mission

## Schema simple du flux global

Si tu veux une image mentale tres simple, le flux ressemble a ceci :

```text
Demande initiale
    ->
Choix du mode et du point d'entree
    ->
Creation ou remplissage des artefacts
    ->
Ajout du contexte technique
    ->
Planification
    ->
Execution par etapes
    ->
Review et validation
    ->
Memoire et capitalisation
```

Autrement dit :
- on commence par comprendre,
- on transforme cela en documents de travail,
- on execute avec methode,
- on verifie,
- on garde une trace utile.

## Ce qui se passe au tout debut

Quand tu commences un nouveau travail, le systeme a besoin de 3 choses :
- un contexte de projet
- une demande de depart
- un mode de fonctionnement

Le mode peut etre :
- `manual`
- `semi-auto`
- `auto-orchestrated`

Cela change le niveau d'autonomie de l'IA.

## Le role de `system.yml`

`system.yml` est le manifeste du systeme.

C'est lui qui dit :
- quelles sont les grandes phases
- quels sont les principes
- quels sont les quality gates
- quels sont les modes disponibles
- quels sont les profils de stack
- quels sont les points d'entree principaux

En clair :
- il ne fait pas le travail lui-meme
- il explique comment le systeme est cense se comporter

Si tu veux comprendre "la logique officielle" du systeme, c'est le premier fichier a regarder.

## Le role des `prompts/`

Les prompts sont des consignes precises donnees a l'agent IA.

Chaque prompt correspond a un type de travail.

Exemples :
- `spec.md` : transformer une demande brute en specification
- `ui-from-image.md` : reconstruire une specification frontend a partir d'une image
- `plan.md` : transformer une spec en plan
- `execute.md` : realiser une etape precise
- `review.md` : verifier de facon critique
- `refactor.md` : simplifier sans changer le comportement
- `debug.md` : chercher la cause d'un probleme
- `project-agent-context.md` : produire un `AGENTS.md`
- `auto-orchestrator.md` : piloter plusieurs phases automatiquement

Un prompt ne contient pas "la solution".
Il contient la methode de travail a appliquer.

## Le role des `agents/`

Les agents sont des roles logiques.

Ils disent :
- qui fait quoi
- quel est l'objectif du role
- jusqu'ou il peut aller
- quels sont ses devoirs

Exemples :
- `orchestrator.md` : pilote l'ensemble
- `planner.md` : construit le plan
- `architect.md` : cadre la solution
- `implementer.md` : realise le changement
- `reviewer.md` : critique la solution
- `tester.md` : valide
- `refactorer.md` : simplifie apres validation

Tu peux voir les agents comme des "personnalites de travail".

Ils ne remplacent pas les prompts.
Ils les completent.

## Difference entre `prompts/` et `agents/`

Cette difference est importante :

- un `prompt` dit : "quelle tache faire maintenant et sous quel format"
- un `agent` dit : "comment ce role doit se comporter globalement"

Exemple simple :
- `execute.md` dit comment faire une etape d'execution
- `implementer.md` dit comment un bon implementer doit penser et travailler

## Le role des `rules/`

Les rules sont les garde-fous.

Elles disent ce qu'on ne doit pas oublier.

Exemples :
- `global-rules.md` : regles generales
- `quality-gates.md` : quand une tache peut etre consideree comme terminee
- `security.md` : securite
- `frontend.md` : bonnes pratiques frontend
- `backend.md` : bonnes pratiques backend
- `api.md` : bonnes pratiques API

Les rules ne remplacent pas les prompts.
Elles evitent les comportements dangereux ou trop superficiels.

## Le role des `templates/`

Les templates sont des gabarits.

Ils servent a structurer les informations importantes.

Exemples :
- `project-spec.md`
- `tech-profile.md`
- `ui-spec-from-image.md`
- `frontend-contract.md`
- `api-contract.md`
- `test-plan.md`
- `agents-md.md`

Un template sert a eviter le flou.

Au lieu de laisser l'IA ou l'utilisateur parler dans tous les sens, le template force une structure.

## Le role des `stacks/`

Les stacks sont les profils technologiques.

Ils adaptent le systeme a une technologie ou a une famille de projets.

Exemples :
- `frontend-nextjs-typescript.md`
- `backend-node-express.md`
- `fullstack-odoo-owl.md`
- `mobile-react-native.md`

Le systeme est generaliste.
Les stacks lui donnent le contexte technique concret.

Sans stack, le systeme sait travailler.
Avec une stack, il travaille de facon plus precise.

## Le role des skills et des MCP

Les skills et les MCP ne remplacent pas le systeme.
Ils l'enrichissent.

### Les skills

Un skill est une methode specialisee que le systeme peut utiliser quand un contexte le justifie.

Exemple :
- un skill Odoo
- un skill frontend depuis visuel
- un skill d'orchestration de delivery

Les skills legers sont embarques dans le repo et declares dans `system.yml`.
Cela veut dire que le systeme les considere comme des capacites natives, pas comme de simples fichiers externes optionnels.

### Les profils `.toml`

Les profils `.toml` sont des postures d'agents specialisees.

Exemples :
- `repo_analyst.toml` pour analyser un repo
- `docs_researcher.toml` pour verifier la documentation officielle
- `qa_reviewer.toml` pour revoir une solution
- `git_workflow_guardian.toml` pour cadrer Git et les commits

Ils completent les fichiers `agents/`.
Un agent de `agents/` decrit un role general, tandis qu'un profil `.toml` prepare une posture operationnelle plus directement activable.

### Les MCP

Un MCP est une source de contexte, de verification ou d'action plus specialisee.

Exemple :
- un MCP Odoo peut aider a verifier des surfaces UI, des impacts ou des preuves runtime

La configuration MCP suit un mode prudent :
- le systeme genere d'abord une definition universelle
- il produit une proposition adaptee a l'agent cible quand il connait le format
- il n'ecrit pas automatiquement dans une configuration globale sans validation explicite
- Codex, Claude Code, Cursor, Windsurf ou un autre agent sont traites comme des adaptateurs

Commande de generation assistee :

```text
python scripts/ai.py mcp C:\Work\mon-projet mon_mcp C:\chemin\vers\serveur.exe --target-agent universal
```

### Regle du systeme

Le systeme suit maintenant une logique simple :
- auto par defaut quand le contexte est clair
- override manuel possible si l'utilisateur veut forcer un choix

## Le role de `memory/`

La memoire sert a retenir ce qui doit survivre a la tache en cours.

Elle contient par exemple :
- des decisions d'architecture
- des patterns valides
- des erreurs recurrentes
- des conventions confirmees

Fichiers importants :
- `README.md`
- `memory.md`
- `decision-log.md`
- `conventions.md`
- `patterns.md`
- `project-memory.md`

La memoire n'est pas un tas de notes.
Elle sert a ne pas recommencer les memes erreurs.

La distinction importante :
- `memory/` garde les apprentissages durables
- `run-manifest.yml` garde l'etat courant d'un run
- `.ai-dev-system/handoff/` garde la passation entre agents

## Le role de `sources.md`

`sources.md` liste les references preferees du systeme.

Son but est simple :
- dire quelles sources sont fiables
- favoriser la documentation officielle
- eviter les recherches floues ou peu fiables

Ce fichier est surtout utile quand il faut verifier un point technique.

La verification documentaire suit une regle prudente :
- utiliser `rules/research.md` pour savoir quand chercher
- utiliser `prompts/verify-docs.md` pour formuler la verification
- privilegier `sources.md` et les sources officielles
- ne pas chercher sur le web si le code local suffit
- dire clairement si la verification externe n'a pas ete faite

## Le role de `scripts/`

Les scripts sont les outils pratiques.

Ils ne remplacent pas la methode.
Ils la rendent plus simple a utiliser.

Exemples :
- `bootstrap-ai-dev-system.py` : installe le systeme dans un projet
- `start-ai-dev.py` : point d'entree principal
- `start-auto-orchestrated-run.py` : cree un run structure

Les scripts PowerShell `.ps1` existent aussi pour les environnements Windows/PowerShell.

## Le role des `runs/`

Les `runs` sont essentiels.

Un run est un dossier de travail pour une mission donnee.

Tu peux le voir comme un dossier de chantier.

Exemple de chemin :

```text
.ai-dev-system/runs/run-20260410-101500/
```

Dans un run, on trouve :
- la demande d'origine
- les artefacts en cours
- le manifeste du run

Le run permet de separer clairement :
- un besoin
- son contexte
- son avancement

## Que contient un run

Un run contient generalement :

### `input/request.md`

C'est la demande de depart.

Elle peut contenir :
- la demande brute
- le chemin d'un document
- le chemin d'un zip
- le chemin de l'image
- le mode choisi
- la stack choisie

### `artifacts/`

C'est le coeur du travail.

On y trouve par exemple :
- `project-spec.md`
- `ui-spec-from-image.md`
- `tech-profile.md`
- `AGENTS.md`
- `frontend-contract.md`
- `api-contract.md`
- `test-plan.md`

### `run-manifest.yml`

C'est le tableau de bord du run.

Il dit :
- quel est le mode
- quel est le statut global
- quelle est la phase active
- quel est le prompt d'entree
- quel est l'artefact principal
- quelles phases sont en attente
- quelle est la politique de validation
- quelles hypotheses, risques et decisions ouvertes restent a suivre
- quels quality gates et artefacts de validation consulter
- quel agent est recommande pour la prochaine action

## Le role de `AGENTS.md`

`AGENTS.md` ne decrit pas le systeme global.

Il decrit le projet courant.

Il sert a rappeler :
- le contexte projet
- la stack retenue
- les conventions locales
- les commandes utiles
- les zones a risque
- ce que l'agent ne doit pas supposer

En une phrase :
- le systeme global explique comment on travaille en general
- `AGENTS.md` explique comment on travaille dans ce projet precis

## Comment les briques se parlent entre elles

Voici la relation pratique entre les briques :

- `system.yml` donne le cadre global
- un `script` cree ou organise un `run`
- le `run` contient les `artifacts`
- les `templates` donnent la forme de ces artefacts
- les `prompts` disent comment remplir ou utiliser ces artefacts
- les `agents` donnent le comportement attendu du role actif
- les `rules` controlent la qualite et les limites
- les `stacks` adaptent tout cela a la technologie du projet
- les `skills` raffinent la methode de travail
- les profils `.toml` raffinent la posture IA a adopter
- les `MCP` renforcent le contexte et la verification
- `sources.md` aide a verifier ce qui doit l'etre
- `memory/` garde les decisions importantes a la fin

Autrement dit :
- les scripts organisent,
- les templates structurent,
- les prompts font travailler,
- les agents specialisent,
- les rules protegent,
- les stacks contextualisent,
- la memory retient.

## Qui lit quoi et quand

Cette section est utile pour un debutant qui veut savoir "quel fichier entre en jeu a quel moment".

### Au demarrage

On lit surtout :
- `README.md`
- `system.yml`
- `docs/getting-started/guide-utilisation.md`
- le guide du mode choisi

But :
- comprendre comment le systeme fonctionne globalement
- choisir le bon mode

### Quand une demande arrive

On utilise surtout :
- `prompts/spec.md` ou `prompts/ui-from-image.md`
- `templates/project-spec.md` ou `templates/ui-spec-from-image.md`

But :
- transformer une demande floue en demande exploitable

### Quand on veut cadrer le projet

On utilise surtout :
- `templates/tech-profile.md`
- `stacks/*.md`
- `prompts/project-agent-context.md`
- `templates/agents-md.md`

But :
- expliquer dans quel environnement technique on travaille
- generer un `AGENTS.md` local au projet

### Quand on veut organiser le travail

On utilise surtout :
- `prompts/plan.md`
- `agents/planner.md`
- `templates/test-plan.md`

But :
- transformer la spec en plan concret

### Quand on code

On utilise surtout :
- `prompts/execute.md`
- `agents/implementer.md`
- les `rules/` pertinentes
- la `stack/` pertinente

But :
- realiser une etape limitee proprement

### Quand on verifie

On utilise surtout :
- `prompts/review.md`
- `agents/reviewer.md`
- `agents/tester.md`
- `rules/quality-gates.md`

But :
- verifier si le travail est reellement acceptable

### Quand on cloture

On utilise surtout :
- `memory/decision-log.md`
- `memory/patterns.md`
- `memory/memory.md`

But :
- garder ce qu'il faudra reutiliser plus tard

## Le parcours complet d'une demande

Voici ce qui se passe, concretement, quand tu utilises le systeme.

### 1. Tu apportes une demande

Exemple :
- "Je veux ajouter une invitation email"
- "Je veux coder cet ecran a partir d'une image"
- "Je veux un module Odoo + OWL"

### 2. Le systeme choisit un point d'entree

Selon la situation :
- `spec.md` si tu pars d'un texte
- `spec.md` si tu pars d'un document ou d'un zip
- `ui-from-image.md` si tu pars d'une image

### 3. Un artefact principal est cree

Exemple :
- `project-spec.md`
- ou `ui-spec-from-image.md`

### 4. Le contexte technique est ajoute

Avec :
- `tech-profile.md`
- les `stacks/`
- eventuellement un `AGENTS.md`

### 5. Le travail est planifie

Avec :
- `plan.md`
- le role `planner`

### 6. Une etape est executee

Avec :
- `execute.md`
- le role `implementer`

### 7. La solution est revue

Avec :
- `review.md`
- les `quality-gates`
- le role `reviewer`

### 8. Les apprentissages sont memorises

Avec :
- `memory/`

## Exemple concret de bout en bout

Prenons un cas tres simple :

"Je veux creer un module Odoo + OWL a partir d'une image de liste."

Voici ce que le systeme fait, en langage simple.

### Etape 1. La demande entre

L'utilisateur donne :
- une image
- un projet cible
- une stack, ici `fullstack-odoo-owl`
- un mode de fonctionnement, par exemple `semi-auto`

### Etape 2. Le systeme cree un cadre de travail

Le systeme cree ou remplit un `run`.

Dans ce run, il place :
- la demande de depart
- les premiers artefacts
- un manifeste de suivi

En pratique, cela veut dire :
- "on ne travaille plus dans le vide"
- "on travaille dans un dossier organise"

### Etape 3. L'image devient une specification

Le prompt `ui-from-image.md` est utilise.

Son travail n'est pas de coder.
Son travail est de decrire :
- ce qu'on voit vraiment
- ce qu'on suppose
- ce qu'on ne sait pas encore

Le resultat est souvent :
- `ui-spec-from-image.md`

### Etape 4. La technologie est clarifiee

On remplit `tech-profile.md` et on s'appuie sur `stacks/fullstack-odoo-owl.md`.

Cela sert a dire :
- que le projet est un module Odoo
- qu'il y a du OWL
- qu'il faut respecter les conventions Odoo
- qu'on ne doit pas inventer de logique metier absente du visuel

### Etape 5. Le projet recoit son contexte local

Le systeme peut generer `AGENTS.md`.

Ce fichier explique aux futurs agents :
- ou ils travaillent
- ce qu'ils doivent respecter
- ce qu'ils ne doivent pas supposer

### Etape 6. Le travail est decoupe

Le prompt `plan.md` entre en jeu.

Au lieu de faire "tout le module d'un coup", le systeme produit des etapes comme :
1. creer le squelette du module
2. ajouter le client action
3. construire la vue OWL statique
4. ajouter les styles
5. connecter les vraies donnees plus tard

### Etape 7. Une etape est executee

Le prompt `execute.md` et le role `implementer` servent a faire une seule etape a la fois.

Le systeme cherche a eviter :
- les changements trop gros
- les hypotheses cachees
- les actions irreversibles mal preparees

### Etape 8. Le travail est revu

Le prompt `review.md` et les `quality-gates` servent a verifier :
- si l'ecran ressemble bien a la demande
- si on n'a pas invente une logique metier absente
- si la structure Odoo reste propre
- si les risques sont visibles

### Etape 9. Ce qu'on apprend est memorise

Si une convention importante est confirmee, elle peut aller dans :
- `decision-log.md`
- `patterns.md`

Le systeme devient donc plus utile a la prochaine tache.

## Comment les modes changent ce fonctionnement

Le fonctionnement interne reste le meme.
Ce qui change, c'est qui pilote et a quelle vitesse on avance.

### Mode `manual`

Tu choisis chaque etape a la main.

En pratique :
- tu ouvres les templates
- tu utilises les prompts un par un
- tu decises quand passer a la suite

### Mode `semi-auto`

Le systeme prepare les artefacts et le run.

En pratique :
- le run est cree
- les artefacts de base existent deja
- l'IA peut aider a les remplir
- tu valides entre les grandes phases

### Mode `auto-orchestrated`

Le systeme prepare un run oriente continuation, puis l'IA avance plus librement si tu lui donnes le prompt auto et les artefacts utiles.

En pratique :
- le manifeste autorise une progression plus automatique
- l'IA peut enchainer plusieurs phases dans la conversation
- elle doit s'arreter si un blocage critique apparait

## Pourquoi il y a autant d'elements

Un debutant pourrait se dire :
"Pourquoi ne pas faire un seul fichier et un seul prompt ?"

La reponse est simple :
- parce qu'un projet reel est complexe
- parce qu'une bonne methode separe les roles
- parce qu'on veut eviter le flou
- parce qu'on veut pouvoir verifier chaque phase

Chaque element a donc une fonction precise.

## Comment comprendre la relation entre tous les elements

Voici la relation la plus simple a retenir :

- `system.yml` donne la carte generale
- `templates/` donnent les formulaires
- `prompts/` donnent la methode de travail
- `agents/` donnent les roles
- `rules/` donnent les limites et garde-fous
- `stacks/` donnent le contexte technique
- `scripts/` donnent les raccourcis pratiques
- `runs/` donnent le dossier concret de mission
- `memory/` garde ce qui doit rester
- `sources.md` donne les references fiables

## Si tu es non-informaticien, retiens ceci

Tu n'as pas besoin de tout memoriser.

Tu dois juste retenir :
- une demande entre
- le systeme la structure
- le systeme la planifie
- l'IA execute par etapes
- une revue verifie
- la memoire garde les decisions utiles

## En version tres courte

Si tu veux une image mentale simple :

- `README.md` = la brochure
- `system.yml` = la constitution
- `templates/` = les formulaires
- `prompts/` = les methodes de travail
- `agents/` = les roles de l'equipe
- `rules/` = les garde-fous
- `stacks/` = les reglages par technologie
- `scripts/` = les boutons rapides
- `runs/` = les dossiers de mission
- `memory/` = le carnet de memoire
- `sources.md` = la bibliotheque de references

## Quand lire ce document

Ce document est particulierement utile :
- au tout debut
- quand tu te sens perdu dans les noms de fichiers
- quand tu veux expliquer le systeme a quelqu'un d'autre
- quand tu veux comprendre ce que l'IA est en train de faire

## Quelle lecture faire ensuite

Apres ce document, la meilleure suite est :
1. lire `README.md`
2. lire `docs/getting-started/guide-utilisation.md`
3. lire le guide du mode qui t'interesse
4. regarder un exemple dans `examples/`

## Conclusion simple

Le systeme n'est pas un gros prompt magique.

C'est une organisation de travail.

Sa force vient du fait que :
- chaque element a un role
- les elements se completent
- le travail devient plus clair
- les risques sont plus visibles
- l'IA est mieux guidee

Et c'est justement cela qui permet a un projet de rester comprehensible, meme quand il devient plus complexe.
