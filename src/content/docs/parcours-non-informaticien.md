# Parcours Non-Informaticien

## Objectif

Ce guide donne le chemin le plus simple quand tu veux utiliser AI Dev System sans manipuler les longues commandes terminal.

Si tu veux une version encore plus guidee, commence par :
- `docs/getting-started/guide-demarrage-ultra-simple.md`

L'idee est simple :
- tu parles dans le chat de ton executeur IA avec des commandes AI Dev System
- l'executeur IA traduit vers les vrais scripts
- le systeme garde les traces, les prompts, les revues et les prochaines actions

Deux usages sont possibles :
- avant installation ou depuis le repo systeme, l'executeur IA lance `python scripts\ai.py ...` avec le chemin du projet cible ;
- apres installation, si le chat est ouvert directement dans le projet cible, l'executeur IA lance `python .ai-dev-system\scripts\ai.py ...` avec `.` pour designer le projet courant.

Dans le second cas, l'executeur IA doit lire `.ai-dev-system/PROJECT-LOCAL-ADAPTER.md` avant de traduire les commandes AI Dev System.

## Regle De Base

Utilise toujours les commandes AI Dev System avec le prefixe `ads`.

Regle simple :
- dans Codex, ecris `ads-*` ou `ads ...` sans slash ;
- dans les autres hotes, `/ads-*` reste acceptable ;
- toute commande `/ads-*` peut etre reecrite a l'identique en `ads-*`.

```text
ads-init
ads-upgrade-system
ads-package-system
ads-semi-auto Ajouter une page contact simple
ads-governor-init Ajouter une page contact simple
ads-governor-next
ads-governor-review validee
```

## Parcours 1 - Petite Demande Sans Governor

Utilise ce parcours si tu veux juste faire une petite evolution et garder le controle.

Dans le chat :

```text
/ads-init
/ads-semi-auto Ajouter une page contact simple
```

L'executeur IA doit :
- identifier le projet cible
- lancer `python scripts\ai.py init ...` si le systeme n'est pas encore installe
- lancer `python scripts\ai.py /ads-semi-auto ...`
- proposer les ressources utiles : agents, skills, MCP ou outils hote seulement si elles aident vraiment
- verifier que ces ressources existent dans l'hote courant avant de les utiliser
- te dire quoi lire ou valider avant execution

Utilise `/ads-check` si tu veux verifier l'installation.
Utilise `/ads-upgrade-system` d'abord avec `--dry-run` si tu veux verifier une mise a jour du systeme installe, puis `--apply` seulement si le rapport ne signale pas de conflit bloquant.
Utilise `/ads-package-system` depuis le repo systeme si tu dois produire un ZIP portable pour mettre a jour une Project Instance sur une autre machine.

## Parcours 2 - Nouveau Projet Depuis Des Sources

Utilise ce parcours si tu as surtout des specs, PDF, images, DOC/DOCX, ZIP ou notes brutes.

Dans le chat, joins le fichier si besoin, puis ecris :

```text
/ads-new-project Creer une base propre depuis les documents fournis
```

Si tu as une image :

```text
/ads-image Analyse cette maquette et prepare le travail
```

Si tu as un PDF, DOC/DOCX ou ZIP :

```text
/ads-file Analyse ce document joint et prepare le travail
```

L'executeur IA doit recuperer le chemin du fichier via l'upload du chat, puis traduire vers le script reel.
Le texte apres `/ads-image` ou `/ads-file` est la description du besoin rattachee au fichier, pas le chemin du fichier.

Sortie attendue :
- inventaire des sources
- questions ouvertes
- pistes d'architecture
- plan d'implementation initial
- proposition de consignes projet

Ressource prioritaire :
- `project-bootstrap`

## Parcours 3 - Projet Existant A Comprendre

Utilise ce parcours si le projet existe deja avec du code, des tests ou une structure.

Dans le chat :

```text
/ads-discover-project Comprendre ce projet avant modification
```

L'executeur IA doit d'abord analyser :
- structure du repo
- stack probable
- commandes de validation
- risques
- prochaine petite tranche sure

Ressource prioritaire :
- `repo-discovery`

Ne demande pas de coder tant que cette decouverte n'a pas donne un perimetre clair.

## Parcours 4 - Governor Pilote, Agent IA Execute

Utilise ce parcours si le chantier a plusieurs etapes, des validations, une reprise possible ou des decisions importantes.

Dans le chat :

```text
/ads-governor-init Ajouter une page contact simple
```

Puis :

```text
/ads-governor-next
```

Donne ensuite `execution-prompt.md` a l'agent d'execution IA.

Apres execution :

```text
/ads-governor-review validee
```

Si ce n'est pas bon :

```text
/ads-governor-review a corriger
```

Governor doit garder visibles :
- objectif
- inclus / exclus
- policy operatoire
- ressources recommandees
- validations attendues
- prochaine action
- resume de reprise

## Si Tu Travailles Dans Codex

Demande a Codex d'utiliser l'adaptateur :

```text
Applique host-adapters/codex/governor-session.md.
Si j'utilise une commande ads-* ou /ads-*, lis host-adapters/codex/command-map.yml.
Pour un flux Governor, suis host-adapters/codex/session-checklist.md.
```

Dans Codex, utilise directement la forme sans slash :

```text
ads-check
ads-governor-init ...
ads-governor-next
ads-auto ...
```

Cela ne rend pas Codex obligatoire.
C'est seulement la configuration pratique quand Codex est l'hote courant.

## Quand S'Arreter

L'executeur IA ou Governor doit s'arreter si :
- une decision produit importante manque
- une action est `confirmation_requise`
- le besoin devient flou
- un test critique echoue
- une ressource necessaire manque
- l'agent propose une refonte non demandee

Dans ce cas, il doit poser une question courte ou proposer une prochaine action de cadrage.

## Ce Qui Ne Doit Pas Bloquer Le Travail

En mode non manuel, l'agent IA ne doit pas te demander une autorisation pour chaque action normale.

Il peut avancer sans pause sur :
- lecture et recherche dans le projet ;
- modifications locales bornees ;
- tests, lint, build, doctor et scripts locaux ;
- base locale ou dediee aux tests ;
- Git non destructeur ;
- commit logique et borne quand l'etape le prevoit.

Il doit seulement stopper sur les vrais risques :
- production ;
- secrets ;
- reset destructeur ;
- amend, rebase ou merge non prevus ;
- push, publication ou tag release ;
- suppression large ;
- configuration globale ;
- changement hors mission.

## Le Systeme Choisit Les Meilleurs Outils Pour L'Agent

Tu n'as pas besoin de connaitre les skills, MCP, agents ou sous-agents.

Le systeme doit :
- regarder le besoin ;
- regarder le projet ;
- verifier les capacites de l'hote IA ;
- proposer les ressources utiles ;
- utiliser uniquement celles qui ameliorent vraiment le travail ;
- dire dans le retour ce qui a ete utilise ou ignore.

Exemple :
- projet Odoo : proposer `odoo-19-workflow`, documentation officielle et MCP Odoo/Meti si utile ;
- interface visuelle : proposer skill frontend, navigateur et preuve visuelle ;
- projet inconnu : proposer decouverte repo et strategie de tests.

## Phrase A Copier Dans Le Chat

```text
Agis avec AI Dev System.
Traduis mes commandes /ads-* vers les vrais scripts du projet.
Ne traite pas /ads-* comme des commandes natives de ton hote.
Propose les agents, skills, MCP, sous-agents ou outils hote utiles seulement s'ils changent vraiment la qualite du travail.
Verifie d'abord que ces capacites existent dans ton hote courant, puis dis celles que tu utilises ou ignores.
Si une action est sensible ou demande confirmation, arrete-toi et explique le choix a valider.
```
