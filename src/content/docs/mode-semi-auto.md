# Guide Mode Semi-Auto

## Version Tres Simple

Utilise ce mode si tu veux le choix le plus prudent et le plus pratique.

Tu ecris dans le chat :

```text
/ads-semi-auto Decrire le besoin
```

L'executeur IA fait la traduction technique pour toi.
Tu ne dois pas taper les commandes longues si tu travailles dans le chat.

Ce mode veut dire :
- le systeme prepare les fichiers de travail ;
- l'IA t'aide a avancer ;
- tu valides aux moments importants ;
- l'IA ne doit pas continuer si une decision importante manque.
- l'IA peut lancer sans pause les commandes locales utiles, les tests, les validations, les commits bornes et les bases de test locales.

Si tu ne sais pas quoi choisir, choisis ce mode.

Si tu ne sais pas ou ecrire la commande, lis d'abord :

```text
docs/getting-started/guide-demarrage-ultra-simple.md
```

## Objectif

Ce guide montre comment utiliser le systeme en `semi-auto` dans un cas reel.

Le mode semi-auto est souvent le plus pratique.

Il est adapte si :
- tu veux gagner du temps,
- tu veux que le systeme prepare la structure,
- tu veux garder des checkpoints humains,
- tu ne veux pas que l'IA deroule tout seule du debut a la fin.

## Autonomie Terminal

En `semi-auto`, le systeme applique automatiquement `full-permission`.

Cela veut dire :
- l'agent IA ne doit pas te demander l'autorisation pour chaque lecture, recherche, test, build, lint, doctor ou script local ;
- il peut utiliser une base locale ou dediee aux tests, par exemple une base Odoo de validation ;
- il peut faire un commit logique et borne quand l'etape est validee et que le diff est dans le perimetre ;
- il doit toujours s'arreter avant reset destructeur, amend/rebase/merge non cadres, push, publication, secrets, base de production, suppression large ou changement hors mission.

Important :
- `semi-auto` garde tes validations aux moments importants ;
- `full-permission` supprime les pauses inutiles de terminal, pas les decisions de gouvernance.

## Pour Un Non-Informaticien

Choisis ce mode si tu veux le meilleur compromis :
- le systeme prepare les fichiers de travail
- l'IA aide a avancer
- tu gardes la validation aux moments importants

Commande conversationnelle de depart :

```text
/ads-semi-auto Decrire le besoin
```

Traduction technique depuis le repo systeme, a laisser faire par l'executeur IA :

```text
python scripts/ai.py /ads-semi-auto C:\Work\mon-projet "Decrire le besoin" --stack-profiles universal
```

Si tu joins une image, un PDF, un DOC/DOCX ou un ZIP dans le chat, utilise :

```text
/ads-image Analyse cette image et prepare le travail
/ads-file Analyse ce document et prepare le travail
```

L'executeur IA doit recuperer le fichier joint, choisir `image` ou `file`, puis lancer la commande reelle adaptee :
- depuis le repo systeme, image : `python scripts/ai.py /ads-image <projet> <fichier-upload> "<besoin>" --mode semi-auto`
- depuis le repo systeme, document ou zip : `python scripts/ai.py /ads-file <projet> <fichier-upload> "<besoin>" --mode semi-auto`
- depuis le projet cible deja installe, image : `python .ai-dev-system\scripts\ai.py /ads-image . <fichier-upload> "<besoin>"`
- depuis le projet cible deja installe, document ou zip : `python .ai-dev-system\scripts\ai.py /ads-file . <fichier-upload> "<besoin>"`

## Idee simple

Le systeme prepare :
- un run,
- des artefacts,
- un manifeste,
- un point d'entree clair.

Puis toi et l'IA travaillez ensemble.
L'IA aide a remplir et faire avancer.
Toi, tu valides avant les passages importants.

Si des skills, MCP, agents, sous-agents ou outils hote sont disponibles, ce mode peut aussi les recommander ou les utiliser quand le contexte est clair et que l'agent IA les supporte.
L'executeur doit verifier les capacites exposees par l'hote courant avant de les supposer, puis reporter les ressources considerees, utilisees et ignorees.

Regle de budget de contexte :
- l'agent commence par `run-manifest.yml`, `execution-loop.yml`, l'artefact principal et `tech-profile.md`
- il ajoute les rules, stacks, sources ou MCP seulement si la phase le justifie
- il resume avant de charger plus de contexte

Si tu dois changer d'agent IA, cree un handoff avant la bascule :

```text
/ads-handoff
```

L'executeur IA doit demander l'etat actuel, la prochaine action et les agents concernes si ces informations manquent.

Traduction technique :

```text
python scripts/ai.py /ads-handoff C:\Work\mon-projet "Etat actuel du run" "Reprendre au prochain checkpoint" --current-agent Codex --next-agent Cursor
```

Le nouvel agent doit lire `.ai-dev-system/handoff/` avant de charger le run complet.

Si un MCP n'est pas encore configure, le mode semi-auto doit d'abord produire une configuration assistee.
Il ne doit pas modifier automatiquement la configuration globale de Codex, Claude Code, Cursor, Windsurf ou un autre agent.

Commande conversationnelle :

```text
/ads-mcp
```

L'executeur IA doit demander le nom du MCP, la commande serveur et l'hote cible si ces informations manquent.

Traduction technique :

```text
python scripts/ai.py /ads-mcp C:\Work\mon-projet mon_mcp C:\chemin\vers\serveur.exe --target-agent universal
```

Si une decision depend d'une documentation ou d'une version recente, ajoute un checkpoint de recherche controlee :
- `prompts/verify-docs.md`
- `rules/research.md`
- `sources.md`

Le systeme doit verifier les sources officielles avant de laisser l'IA passer a l'implementation.

## Quand choisir ce mode rapidement

Choisis `semi-auto` si :
- tu veux que le systeme prepare les artefacts de depart,
- tu veux aller plus vite que le mode manuel,
- tu veux garder des validations humaines entre les grandes phases,
- tu n'es pas encore assez a l'aise pour laisser l'IA avancer tres librement.

## Cas reel de demonstration

Nous allons simuler ce cas :

"Je veux developper un module Odoo avec interface OWL a partir d'une image fournie par le client."

Pourquoi c'est un bon cas :
- le visuel donne une base,
- la logique metier n'est pas encore totalement claire,
- il faut cadrer avant de coder.

## Ce que tu vas apprendre

Tu vas voir :
1. comment lancer le mode `semi-auto`
2. quels fichiers sont generes
3. comment les utiliser avec un agent IA
4. quand t'arreter pour valider

## Quels agents utiliser dans ce mode

En mode semi-auto, le systeme prepare le run, mais les agents restent utiles pour guider chaque checkpoint.
Tu n'as pas besoin de les appeler tous a chaque fois : tu choisis le role utile au moment courant.

| Moment | Agent conseille | Pourquoi |
| --- | --- | --- |
| Relire la demande et les artefacts generes | `agents/orchestrator.md` | verifier que le run part dans la bonne direction |
| Transformer l'image ou la demande en spec | `agents/architect.md` ou `agents/planner.md` | structurer sans inventer de logique metier |
| Decouper le travail | `agents/planner.md` | produire des etapes petites et verifiables |
| Executer une seule etape | `agents/implementer.md` | rester dans le scope valide |
| Faire le checkpoint critique | `agents/reviewer.md` | chercher les regressions, hypotheses et risques |
| Prouver que l'etape fonctionne | `agents/tester.md` | relier les tests aux risques reels |

Dans ce mode, la boucle saine est :
1. le systeme prepare
2. l'agent adapte travaille sur une phase
3. tu relis
4. `reviewer` critique
5. `tester` aide a prouver
6. tu valides ou tu corriges

## Comment utiliser les rules dans ce mode

En mode semi-auto, les `rules/` sont surtout appliquees en arriere-plan par l'agent.
Toi, tu les utilises comme checklists aux moments de validation.

Regle simple :
- le systeme et l'agent appliquent `rules/global-rules.md` en permanence
- avant de valider une etape, regarde `rules/quality-gates.md`
- si l'etape touche l'UI, verifie avec `rules/frontend.md`
- si l'etape touche Odoo, le backend, l'API ou la securite, ajoute la rule correspondante

Exemple :
- apres une etape OWL visuelle, tu peux demander une review avec `rules/frontend.md` et `rules/quality-gates.md`
- apres une etape de modele, permission ou action serveur, tu ajoutes `rules/backend.md` et `rules/security.md`

## Etape 1 - Installer le systeme

Dans le chat de l'executeur IA :

```text
/ads-init
```

Traduction technique depuis le repo systeme :

```text
python scripts/ai.py init C:\Work\bao_stock
```

Si tu es deja dans le projet cible et que `.ai-dev-system/` existe, commence par :

```text
/ads-check
```

L'executeur IA doit traduire avec `.` pour designer le projet courant.

## Etape 2 - Lancer un run semi-auto

Exemple realiste :

Dans le chat de l'executeur IA, avec l'image jointe :

```text
/ads-image Analyser cette liste Odoo et preparer le travail
```

Traduction technique depuis le repo systeme :

```text
python scripts/ai.py /ads-image C:\Work\bao_stock C:\Work\design\list_view.png "Analyser cette liste Odoo et preparer le travail" --mode semi-auto --stack-profiles fullstack-odoo-owl
```

Dans ce cas, la logique recommande est :
- preferer le skill `odoo-19-workflow` s'il est disponible
- preferer le skill `development-workflow-orchestrator` s'il est disponible
- utiliser le MCP Odoo s'il est configure et utile

## Etape 3 - Comprendre ce que le systeme genere

Le systeme cree un dossier :

```text
.ai-dev-system/runs/<run-name>/
```

Avec au minimum :
- `input/request.md`
- `artifacts/ui-spec-from-image.md`
- `artifacts/tech-profile.md`
- `artifacts/AGENTS.md`
- `artifacts/test-plan.md`
- `artifacts/frontend-contract.md`
- `artifacts/api-contract.md`
- `artifacts/execution-loop.yml`
- `run-manifest.yml`

## Etape 4 - Lire le manifeste

Ouvre `run-manifest.yml`.
Ouvre aussi `artifacts/execution-loop.yml` si tu veux enchainer plusieurs etapes.

En mode semi-auto, tu dois voir une logique de type :
- `status.global: awaiting_human_validation`
- `status.active_phase: spec`
- `awaiting_validation`
- `human_checkpoints_required`
- `next_action.recommended_agent`
- `quality_gates`

Cela signifie :
- le systeme prepare,
- mais tu dois valider avant la suite.

Dans `execution-loop.yml`, tu dois voir :
- les conditions pour continuer
- les tests ou validations attendus
- les cas ou l'agent doit s'arreter

### Checklist avant de continuer

Avant de passer a l'etape suivante, verifie :
- tu sais ou se trouve le dossier de run
- tu comprends le role de chaque artefact
- tu vois bien que le run attend une validation humaine
- tu vois les hypotheses, risques, decisions ouvertes et quality gates a suivre
- tu sais sur quel document l'IA doit travailler en premier
- tu sais si la prochaine etape peut s'enchainer ou si elle attend une validation

## Etape 5 - Ouvrir les bons artefacts

Dans ce mode, commence par lire :
- `ui-spec-from-image.md`
- `tech-profile.md`
- `AGENTS.md`

Ce sont tes 3 documents de base.

Si ton projet utilise des integrations externes, regarde aussi :
- `integrations.local.yml` si tu l'as configure
- les sections `Skills et MCP` dans `tech-profile.md` et `AGENTS.md`

## Etape 6 - Utiliser le prompt image -> spec

Tu prends `prompts/ui-from-image.md`.

### Exemple de message a envoyer a Codex, Claude Code ou Cursor

```text
Je travaille avec AI Dev System en mode semi-auto.

Applique ce prompt :
[colle ici .ai-dev-system/prompts/ui-from-image.md]

Contexte :
- projet : module Odoo + OWL
- source : image d'une liste type stock/orders
- artefact cible : ui-spec-from-image.md

Je veux que tu me rendes une specification claire en separant :
- les faits observables
- les inferences raisonnables
- les inconnues

Base de travail :
[colle ici artifacts/ui-spec-from-image.md]
```

## Etape 7 - Valider la spec UI

Tu ne passes pas a l'etape suivante sans verifier :
- a-t-on bien decrit ce qu'on voit ?
- a-t-on evite d'inventer de la logique metier ?
- les ambiguites sont-elles explicites ?

Exemple de choses visibles dans ce type d'ecran :
- une barre de recherche
- une liste tabulaire
- des colonnes
- des statuts
- des actions de ligne

Exemple de choses a ne pas inventer trop vite :
- le vrai modele Odoo sous-jacent
- la logique exacte des filtres
- la signification metier precise des boutons

## Etape 8 - Completer le tech profile

Maintenant, tu utilises :
- `artifacts/tech-profile.md`
- `stacks/fullstack-odoo-owl.md`

### Exemple de message

```text
Je suis en mode semi-auto avec AI Dev System.

Je veux completer le tech profile pour un module Odoo + OWL.

Contexte :
- projet cible : module Odoo
- UI basee sur une image
- objectif initial : v1 visuelle fidele avant branchement metier

Base de travail :
[colle ici artifacts/tech-profile.md]
```

## Etape 9 - Produire le AGENTS.md de projet

Tu utilises `prompts/project-agent-context.md`.

### Exemple de message

```text
Je suis en mode semi-auto avec AI Dev System.

Applique :
[colle ici .ai-dev-system/prompts/project-agent-context.md]

Je veux un AGENTS.md projet pour un module Odoo + OWL.

Base de travail :
[colle ici artifacts/AGENTS.md]

Le contexte doit rappeler :
- la stack
- le mode semi-auto
- les conventions a respecter
- le fait qu'on ne doit pas inventer la logique metier absente de l'image
- les skills et MCP actives par defaut pour ce cas
```

## Etape 10 - Faire le premier checkpoint humain

Avant de planifier, pose-toi ces questions :
- sait-on quel objet metier est represente ?
- sait-on si on veut une v1 visuelle ou une vraie vue metier complete ?
- sait-on si les actions edit/delete doivent etre reelles ?
- sait-on si les donnees seront mockees au debut ?

Si la reponse est non, tu demandes encore un peu de clarification.

## Etape 11 - Utiliser le prompt de plan

Une fois les 3 artefacts valides, utilise `prompts/plan.md`.

### Exemple de message

```text
Je suis en mode semi-auto avec AI Dev System.

Applique :
[colle ici .ai-dev-system/prompts/plan.md]

Contexte :
- spec UI validee
- tech profile valide
- AGENTS.md pret

Je veux un plan Odoo + OWL en petites etapes, avec :
- scope de chaque etape
- tests
- risques

Contrainte :
- commencer par une v1 visuelle propre
```

## Etape 12 - Executer une seule etape

Prenons :
"Creer le squelette du module Odoo."

Tu utilises `execute.md`.

### Exemple de message

```text
Je suis en mode semi-auto avec AI Dev System.

Applique :
[colle ici .ai-dev-system/prompts/execute.md]

Etape :
Creer le squelette du module Odoo et preparer la client action.

Contraintes :
- ne pas brancher encore la vraie logique metier
- rester dans une v1 structurelle
```

## Etape 13 - Relecture obligatoire

En semi-auto, tu dois t'arreter ici et verifier :
- le scope a-t-il ete respecte ?
- le module est-il proprement structure ?
- l'IA a-t-elle suppose des choses non validees ?

## Etape 14 - Revue

Tu utilises `prompts/review.md`.

### Exemple de message

```text
Je suis en mode semi-auto avec AI Dev System.

Applique :
[colle ici .ai-dev-system/prompts/review.md]

Je veux une revue critique de cette etape :
[colle ici la solution produite]

Contexte :
- projet Odoo + OWL
- ecran base sur une image
- objectif actuel : v1 visuelle fidele
```

### Comment utiliser le reviewer dans ce mode

En `semi-auto`, le reviewer est l'un des principaux garde-fous.

Son role est de verifier si :
- l'etape executee respecte bien le scope
- l'IA n'a pas invente de logique metier
- la structure du module reste saine
- des risques importants sont visibles avant la phase suivante

Ici, le reviewer travaille juste apres ton checkpoint humain.

L'ordre sain est :
1. tu relis
2. le reviewer critique
3. tu corriges si necessaire
4. tu valides
5. seulement ensuite tu continues

### Comment lire le resultat de la review

Regarde surtout :
- si le reviewer remonte une sur-interpretation du visuel
- si la severite est `critique` ou `elevee`
- si des zones restent non verifiees

Regle simple :
- si la review dit que la logique metier a ete inventee, tu bloques
- si la review dit qu'un doute structurel existe, tu clarifies avant de continuer

### Override manuel possible

Meme si le systeme recommande une brique automatiquement, tu peux toujours dire :
- "n'utilise pas le MCP pour cette etape"
- "force le skill Odoo sur cette analyse"
- "reste seulement sur les artefacts locaux"

## Etape 15 - Corriger, valider, continuer

La boucle devient :
1. une etape
2. execution
3. checkpoint humain
4. review
5. correction
6. validation
7. etape suivante

## Etape 16 - Memoriser ce qui est confirme

En `semi-auto`, tu n'alimentes pas la memory apres chaque brouillon.
Tu l'alimentes apres une validation reelle.

Tu utilises surtout :
- `memory/decision-log.md`
- `memory/conventions.md`
- `memory/patterns.md`
- `memory/project-memory.md` si c'est une memoire propre au projet cible

### Quoi memoriser ici

Pour ce type de projet Odoo + OWL, tu peux memoriser :
- une convention de structure module validee
- une decision sur la v1 visuelle puis la v2 metier
- un piege a eviter sur les hypothese issues d'un mockup
- un pattern valide pour organiser XML, JS/OWL et SCSS

### Exemple de message a envoyer a l'agent

```text
Je suis en mode semi-auto avec AI Dev System.

Je viens de valider une etape.

Aide-moi a mettre a jour :
- memory/decision-log.md
- memory/conventions.md si une convention stable a ete validee
- memory/patterns.md
- memory/project-memory.md si l'information est propre a ce projet

Je veux memoriser seulement :
- les decisions confirmees
- les conventions validees
- les patterns vraiment reutilisables
- les pieges reels a eviter
```

### Exemple de contenu dans `decision-log.md`

```md
## Decision
- sujet : premiere version du module
- decision : commencer par une vue OWL statique fidele au visuel avant branchement ORM
- raison : eviter d'inventer trop tot la logique metier
- impact : meilleure validation UX, risque fonctionnel reduit
```

### Exemple de contenu dans `patterns.md`

```md
## Pattern valide
- nom : v1 visuelle avant integration metier
- contexte : ecran construit a partir d'une image client
- benefice : separe validation visuelle et validation metier
```

### Checklist avant de memoriser

Avant d'ecrire dans `memory/`, verifie :
- ce point a-t-il ete valide humainement ?
- est-ce reutilisable sur une prochaine tache ?
- est-ce une vraie decision ou juste une hypothese de travail ?

## Erreurs frequentes a eviter

Voici les erreurs les plus courantes en mode semi-auto :
- croire que "semi-auto" veut dire "pas besoin de relire"
- lancer l'implementation avant d'avoir valide `ui-spec-from-image.md`
- supposer trop tot le vrai modele metier
- demander une grosse implementation alors que le plan n'est pas encore stabilise
- oublier de faire la revue apres une etape importante

## Simulation tres simple avec un agent

### Message 1

```text
Je suis en semi-auto.
Voici le prompt ui-from-image.
Voici mon artefact ui-spec-from-image.
Complete-le proprement.
```

### Message 2

```text
Maintenant complete le tech profile pour ce module Odoo + OWL.
```

### Message 3

```text
Maintenant produis un plan incremental.
```

### Message 4

```text
Execute seulement l'etape 1 du plan.
```

### Message 5

```text
Revois cette etape avec un regard critique.
```

## Ce qu'un debutant doit retenir

Le mode semi-auto, c'est :
- le systeme prepare le terrain,
- l'IA travaille avec toi,
- toi, tu valides avant les zones importantes.

## Resume ultra court

1. lancer le run semi-auto
2. lire le manifeste
3. lire `execution-loop.yml`
4. remplir la spec ou la spec UI
5. completer le tech profile
6. completer le AGENTS.md
7. produire le plan
8. executer une etape
9. reviewer
10. memoriser ce qui est confirme
11. corriger ou continuer selon le verdict

## A retenir en une phrase

Le mode semi-auto est le meilleur mode pour aller vite tout en gardant des checkpoints humains.

## Quand choisir un autre mode

- si tu veux tout piloter a la main : `manual`
- si le besoin est tres stable et tu veux plus d'automatisation : `auto-orchestrated`
