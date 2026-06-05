# Guide Mode Manuel

## Version Tres Simple

Utilise ce mode si tu veux avancer lentement.

Tu ecris dans le chat :

```text
/ads-manual Decrire le besoin
```

L'executeur IA fait la traduction technique pour toi.
Tu ne dois pas taper les commandes longues si tu travailles dans le chat.

Ce mode veut dire :
- l'IA propose ;
- tu lis ;
- tu valides ;
- l'IA continue seulement apres validation.

Si tu ne sais pas ou ecrire la commande, lis d'abord :

```text
docs/getting-started/guide-demarrage-ultra-simple.md
```

## Objectif

Ce guide montre comment utiliser le systeme en `manual` dans un cas reel, comme si tu travaillais avec Codex, Claude Code ou Cursor.

Le mode manuel est ideal si :
- tu veux comprendre le systeme en profondeur,
- tu veux controler chaque etape,
- tu ne veux pas que l'IA avance seule,
- tu debutes et tu veux apprendre proprement.

Dans ce mode :
- toi, tu pilotes,
- l'IA t'aide,
- tu valides chaque etape avant de continuer.

## Pour Un Non-Informaticien

Choisis ce mode si tu veux avancer lentement et comprendre chaque decision.

Ce que tu dois faire :
- donner ton besoin avec tes mots
- demander a l'IA de cadrer avant de coder
- valider chaque etape avant la suivante

Commande conversationnelle de depart :

```text
/ads-manual Decrire le besoin
```

Traduction technique depuis le repo systeme, a laisser faire par l'executeur IA :

```text
python scripts/ai.py /ads-manual C:\Work\mon-projet "Decrire le besoin"
```

L'executeur IA doit traduire cette intention vers la commande reelle adaptee :
- depuis le repo systeme : `python scripts/ai.py /ads-manual <projet> "<besoin>"`
- depuis le projet cible deja installe : `python .ai-dev-system\scripts\ai.py /ads-manual . "<besoin>"`

Si la demande contient une image, un PDF, un DOC, un DOCX ou un ZIP joint dans le chat, utilise plutot :

```text
/ads-image Analyse cette image en mode manuel
/ads-file Analyse ce document en mode manuel
```

L'executeur IA doit recuperer le fichier via l'upload du chat, verifier le type de fichier, puis lancer la commande reelle avec `--mode manual`.

Avant d'utiliser un skill, un MCP, un agent, un sous-agent ou un outil hote, il doit verifier que cette capacite existe dans l'hote courant et la reporter si elle est utilisee ou ignoree.

Si des skills ou un MCP sont disponibles, tu peux aussi les forcer manuellement dans ce mode.
Ici, rien n'est impose automatiquement : tu choisis.

Regle de budget de contexte :
- colle seulement le prompt utile et l'artefact courant
- ajoute une rule precise si elle est necessaire
- evite de coller tous les guides ou tout `.ai-dev-system`

## Cas reel de demonstration

Nous allons simuler ce besoin :

"Je veux ajouter une fonctionnalite d'invitation par email dans mon application web."

Contexte suppose :
- frontend React,
- backend Node.js,
- API HTTP,
- besoin de travailler proprement sans coder trop tot.

## Ce que tu vas faire

Tu vas apprendre a :
1. cadrer la demande
2. produire une vraie spec
3. completer le contexte technique
4. faire construire un plan
5. executer une etape
6. faire reviewer
7. memoriser les decisions

## Quels agents utiliser dans ce mode

En mode manuel, tu choisis explicitement le role que tu veux demander a l'IA.
Les agents ne s'activent pas tout seuls : tu les utilises comme des fiches de role.

| Moment | Agent conseille | Prompt associe |
| --- | --- | --- |
| Comprendre la demande | `agents/orchestrator.md` | `prompts/spec.md` |
| Cadrer l'architecture | `agents/architect.md` | selon le besoin, souvent avant `prompts/plan.md` |
| Construire le plan | `agents/planner.md` | `prompts/plan.md` |
| Executer une etape | `agents/implementer.md` | `prompts/execute.md` |
| Verifier la solution | `agents/reviewer.md` | `prompts/review.md` |
| Prouver le comportement | `agents/tester.md` | `templates/test-plan.md` |
| Nettoyer sans changer le comportement | `agents/refactorer.md` | `prompts/refactor.md` |

Exemple simple :
- si tu veux un plan, demande a l'IA d'adopter le role `planner`
- si tu veux une revue, demande a l'IA d'adopter le role `reviewer`
- si tu veux corriger une etape, demande a l'IA d'adopter le role `implementer`

## Comment utiliser les rules dans ce mode

En mode manuel, les `rules/` sont visibles et utilisables par toi.
Tu n'as pas besoin de toutes les lire a chaque etape.

Regle simple :
- au debut, lis surtout `rules/global-rules.md` et `rules/quality-gates.md`
- si la tache commence a charger trop de contexte, ajoute `rules/context-budget.md`
- pendant une tache frontend, ajoute `rules/frontend.md`
- pendant une tache backend, ajoute `rules/backend.md`
- pendant une tache API, ajoute `rules/api.md`
- si la tache touche l'authentification, les permissions ou les donnees sensibles, ajoute `rules/security.md`

Exemple de message :

```text
Je suis en mode manuel.
Applique aussi les garde-fous de :
- rules/global-rules.md
- rules/quality-gates.md
- rules/api.md

Puis revois la solution proposee.
```

## Etape 1 - Installer le systeme dans le projet

Si ton projet n'a pas encore `.ai-dev-system`, lance :

Dans le chat de l'executeur IA :

```text
/ads-init
```

Traduction technique depuis le repo systeme :

```text
python scripts/ai.py init C:\Work\mon-projet
```

Si tu es deja dans le projet cible et que `.ai-dev-system/` existe, utilise plutot :

```text
/ads-check
```

L'executeur IA doit traduire avec `.` pour designer le projet courant.

Si ton projet utilise aussi des skills ou un MCP local, tu peux en plus preparer :
- `.ai-dev-system/integrations.local.yml` a partir de `integrations.local.example.yml`

Si le MCP n'est pas encore configure, reste en mode prudent :
- genere d'abord une configuration assistee avec `/ads-mcp`
- relis les fichiers crees dans `.ai-dev-system/mcp-configs/<nom>/`
- copie ensuite manuellement le bloc dans l'agent IA cible seulement apres validation

Commande type :

Dans le chat, demande d'abord :

```text
/ads-mcp
```

L'executeur IA doit demander le nom du MCP, la commande serveur et l'hote cible si ces informations manquent.

Traduction technique :

```text
python scripts/ai.py /ads-mcp C:\Work\mon-projet mon_mcp C:\chemin\vers\serveur.exe --target-agent universal
```

Ensuite, ouvre dans le projet :
- `.ai-dev-system/templates/project-spec.md`
- `.ai-dev-system/prompts/spec.md`
- `.ai-dev-system/templates/tech-profile.md`
- `.ai-dev-system/prompts/plan.md`
- `.ai-dev-system/prompts/execute.md`
- `.ai-dev-system/prompts/review.md`

## Etape 2 - Remplir le fichier de depart

Dans `project-spec.md`, note ce que tu sais.
Ne cherche pas a etre parfait.

Exemple :

```md
## Resume executif
- probleme a resoudre : un administrateur ne peut pas inviter un collaborateur par email
- resultat attendu : un administrateur peut envoyer une invitation et le collaborateur peut l'accepter

## Utilisateurs cibles
- utilisateurs principaux : administrateurs d'espace

## Fonctionnalites
- fonctionnalite 1 : creer une invitation email
- fonctionnalite 2 : accepter une invitation

## Hors perimetre
- exclusion 1 : relances automatiques
```

Regle simple :
- ce que tu sais, tu l'ecris
- ce que tu ne sais pas, tu le laisses vide ou tu notes `a clarifier`

## Etape 3 - Utiliser le prompt de spec

Tu vas maintenant demander a l'agent IA de transformer cette base en vraie specification.

### Exemple de message a envoyer a l'agent

```text
Je travaille avec AI Dev System en mode manuel.

Applique le prompt suivant :
[colle ici le contenu de .ai-dev-system/prompts/spec.md]

Voici la base de travail :
[colle ici le contenu de .ai-dev-system/templates/project-spec.md]

Je veux une specification structuree, avec :
- hypotheses explicites
- questions bloquantes
- criteres d'acceptation
- risques connus
- decision de passage
```

### Forcer un skill ou un MCP dans ce mode

En mode manuel, tu peux demander explicitement :
- "utilise tel skill"
- "active tel MCP"
- "n'utilise pas tel MCP"
- "verifie cette documentation officielle avant de decider"
- "applique `rules/context-budget.md` et ne charge que le contexte necessaire"
- "prepare un handoff avant que je change d'agent IA"

### Preparer une passation dans ce mode

Avant de quitter l'agent courant, lance :

```text
/ads-handoff
```

L'executeur IA doit demander l'etat actuel, la prochaine action et les agents concernes si ces informations manquent.

Traduction technique :

```text
python scripts/ai.py /ads-handoff C:\Work\mon-projet "Etat actuel" "Prochaine etape" --current-agent Codex --next-agent Cursor
```

Puis avec le nouvel agent, utilise :
- `prompts/resume-from-handoff.md`
- `rules/handoff.md`
- `rules/context-budget.md`

Si tu demandes "configure ce MCP", l'action attendue n'est pas une modification globale immediate.
L'action attendue est :
- generer la definition universelle
- generer la proposition pour l'agent cible
- te laisser valider avant application

### Verifier une information externe dans ce mode

En mode manuel, tu pilotes toi-meme la verification.

Utilise :
- `.ai-dev-system/prompts/verify-docs.md`
- `.ai-dev-system/rules/research.md`
- `.ai-dev-system/sources.md`

Exemple :

```text
Je travaille en mode manuel.

Applique :
- prompts/verify-docs.md
- rules/research.md
- sources.md

Question :
La methode recommandee pour enregistrer un composant OWL dans Odoo 19 est-elle toujours celle-ci ?

Je veux une reponse courte avec sources officielles et limites.
```

## Etape 4 - Lire et valider la spec

Quand l'IA te repond, tu ne passes pas a la suite sans verifier :
- le besoin principal est-il clair ?
- les utilisateurs sont-ils clairs ?
- les limites du perimetre sont-elles claires ?
- les questions bloquantes sont-elles visibles ?

Si quelque chose est flou, tu demandes une reprise.

### Exemple de reprise

```text
La spec est meilleure, mais il manque encore :
- la regle exacte pour les doublons
- le comportement si l'utilisateur est deja membre
- les criteres d'acceptation precis

Reprends la spec en corrigeant seulement ces points.
```

### Checklist avant de passer a la suite

Avant de continuer, verifie :
- la spec tient en quelques phrases claires
- les utilisateurs sont identifies
- les limites du perimetre sont visibles
- les points flous sont notes explicitement
- tu comprends ce que l'IA propose

## Etape 5 - Completer le contexte technique

Maintenant, remplis `tech-profile.md`.

Pour t'aider, ouvre aussi les profils de stack utiles :
- `.ai-dev-system/stacks/frontend-react-typescript.md`
- `.ai-dev-system/stacks/backend-node.md`
- `.ai-dev-system/stacks/api-openapi.md`

Exemple de contenu simple :

```md
## Stack principale
- langage ou runtime : TypeScript + Node.js
- framework principal : React cote frontend, Node cote backend

## API
- style d'API : REST

## Tests
- outils : unitaires + integration

## CI/CD
- pipeline : GitHub Actions
```

## Etape 6 - Utiliser le prompt de plan

Quand la spec et le contexte technique sont valides, demande un plan.

### Exemple de message

```text
Je travaille avec AI Dev System en mode manuel.

Applique ce prompt :
[colle ici .ai-dev-system/prompts/plan.md]

Contexte :
- la specification est validee
- le tech profile est complete

Je veux un plan incremental, en petites etapes, avec :
- objectif de chaque etape
- risques
- tests associes
```

## Etape 7 - Choisir une seule etape a executer

Tu ne demandes pas a l'IA de tout faire d'un coup.

Tu prends une seule etape.
Exemple :
"Definir le contrat API de creation d'invitation."

Puis tu utilises `execute.md`.

### Exemple de message

```text
Je travaille avec AI Dev System en mode manuel.

Applique ce prompt :
[colle ici .ai-dev-system/prompts/execute.md]

Etape a executer :
Definir le contrat API de creation d'invitation.

Contraintes :
- ne pas toucher au frontend
- rester dans ce scope
- proposer les tests lies a cette etape
```

## Etape 8 - Faire la revue apres l'execution

Apres une etape importante, utilise `review.md`.

### Exemple de message

```text
Je travaille avec AI Dev System en mode manuel.

Applique ce prompt :
[colle ici .ai-dev-system/prompts/review.md]

Voici la solution proposee pour l'etape "contrat API d'invitation" :
[colle ici la solution]

Je veux une revue critique priorisee par severite.
```

### Comment utiliser le reviewer dans ce mode

En mode manuel, le reviewer sert a verifier calmement si l'etape que tu viens de faire est vraiment acceptable.

Concretement, il doit t'aider a repondre a ces questions :
- y a-t-il un bug probable ?
- y a-t-il un oubli par rapport a la spec ?
- y a-t-il un risque de regression ?
- y a-t-il un manque de test important ?

Le reviewer ne sert pas a "feliciter".
Il sert a trouver les vrais risques avant que tu continues.

### Comment lire le resultat de la review

Quand l'agent te rend la review, regarde surtout :
- le `statut`
- les `problemes`
- la `severite`
- les `zones non verifiees`

Regle simple :
- si la review dit `a corriger avant validation`, tu ne passes pas a l'etape suivante
- si la review dit `accepte avec reserves`, tu decides consciemment si tu continues
- si la review dit `accepte`, tu peux cloturer l'etape

## Erreurs frequentes a eviter

Voici les erreurs les plus courantes en mode manuel :
- demander a l'IA de faire tout le projet d'un coup
- passer au code sans spec relue
- melanger plusieurs etapes dans une seule demande
- corriger un bug et changer l'architecture en meme temps
- oublier la revue parce que "la solution a l'air bonne"

## Etape 9 - Corriger si necessaire

Si la revue remonte des problemes :
- tu corriges,
- tu ne fais pas autre chose en meme temps,
- tu restes sur le meme scope.

### Exemple

```text
La revue remonte :
- un risque de doublon
- un manque de test d'integration

Corrige seulement ces deux points sans elargir le perimetre.
```

## Etape 10 - Continuer le plan

Tu repeats la meme boucle pour chaque etape :
1. choisir l'etape
2. executer
3. reviewer
4. corriger
5. valider

Si tu veux enchainer plusieurs etapes sans oublier les arrets importants, utilise aussi `templates/execution-loop.yml` comme checklist.
Ce fichier ne remplace pas ton jugement : il rappelle quand continuer, quand tester et quand demander une decision.

## Etape 11 - Memoriser les decisions

Quand une bonne decision ressort, note-la dans :
- `.ai-dev-system/memory/decision-log.md`
- `.ai-dev-system/memory/conventions.md`
- `.ai-dev-system/memory/patterns.md`
- `.ai-dev-system/memory/project-memory.md` si c'est propre au projet cible

### Comment utiliser la memory dans ce mode

En mode manuel, la memory sert a garder ce qui sera encore utile plus tard.

Tu ne dois pas y mettre :
- des brouillons
- des hypotheses non confirmees
- des notes temporaires sans valeur durable

Tu dois y mettre :
- une decision validee
- une convention confirmee
- un pattern qui a fonctionne
- un piege reel a eviter plus tard

### Difference simple entre les fichiers memory

- `decision-log.md` : pour les decisions importantes prises et validees
- `conventions.md` : pour les conventions stables
- `patterns.md` : pour les bonnes pratiques confirmees, les pieges ou les anti-patterns reperes
- `project-memory.md` : pour la memoire durable d'un projet cible
- `memory.md` : pour rappeler la politique memoire

### Exemple de contenu dans `decision-log.md`

```md
## Decision
- sujet : envoi d'email d'invitation
- decision : l'envoi d'email est sorti du service metier principal
- raison : mieux separer logique metier et integration externe
- impact : tests plus simples, architecture plus lisible
```

### Exemple de contenu dans `patterns.md`

```md
## Pattern valide
- nom : service metier + adaptateur externe
- contexte : invitation utilisateur
- benefice : limite le couplage et facilite les tests
```

### Checklist avant de memoriser

Avant d'ecrire dans `memory/`, verifie :
- cette information sera-t-elle encore utile dans 2 semaines ?
- est-ce une decision validee et pas une simple idee ?
- est-ce que cela aidera vraiment un futur agent ou un futur collaborateur ?

Exemple :

```md
Decision :
Le service metier d'invitation ne doit pas envoyer l'email lui-meme.
Il delegue cette responsabilite a un adaptateur email.
```

## Simulation complete tres simple

Voici une version resumee de ce que tu dirais a un agent comme Codex :

### Message 1

```text
Je suis en mode manuel avec AI Dev System.
Je veux que tu m'aides a produire une specification exploitable a partir de cette demande brute.
[prompt spec]
[project-spec]
```

### Message 2

```text
La spec est validee.
Maintenant construis un plan incremental.
[prompt plan]
[spec validee]
[tech profile]
```

### Message 3

```text
Execute seulement l'etape 1 du plan.
[prompt execute]
[plan]
[contexte]
```

### Message 4

```text
Revois cette solution avec un regard critique.
[prompt review]
[solution]
```

## Ce qu'un debutant doit retenir

Le mode manuel, c'est :
- pas de precipitations,
- pas de "fais-moi tout",
- une etape a la fois,
- verification a chaque fois.

## Resume ultra court

Si tu veux retenir l'essentiel :
1. remplir `project-spec.md`
2. utiliser `spec.md`
3. remplir `tech-profile.md`
4. utiliser `plan.md`
5. utiliser `execute.md`
6. utiliser `review.md`
7. utiliser `execution-loop.yml` si plusieurs etapes doivent s'enchainer
8. noter les decisions utiles dans `memory/`

## A retenir en une phrase

Le mode manuel est le meilleur mode pour apprendre le systeme calmement, sans perdre le controle.

## Quand ne pas utiliser ce mode

Tu ne choisis pas `manual` si :
- tu veux aller plus vite avec un cadre deja clair,
- tu veux que le systeme te prepare les artefacts automatiquement.

Dans ce cas, regarde :
- `docs/modes/guide-mode-semi-auto.md`
- `docs/modes/guide-mode-auto-orchestrated.md`
