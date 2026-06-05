# Governor En 15 Minutes

## Objectif

Ce guide sert a demarrer avec Governor sans connaitre toute la documentation.

Il s'adresse a un utilisateur non-informaticien ou a quelqu'un qui veut seulement comprendre le minimum utile.

Si tu veux d'abord un parcours encore plus direct avec les commandes AI Dev System, lis :
- `docs/getting-started/guide-demarrage-ultra-simple.md`
- `docs/getting-started/parcours-non-informaticien.md`

Si tu reprends une session Governor apres fermeture de Codex, lis :
- `docs/getting-started/reprise-exacte-governor-codex.md`

Si tu es dans Codex, utilise les formes `ads-*` ou `ads ...` sans slash.

## Idee A Retenir

```text
Governor = pilote le travail
Agent d'execution IA = execute dans le projet
Utilisateur = valide les decisions importantes
```

Exemples d'agent d'execution IA :
- Codex
- Claude Code
- Cursor
- Windsurf
- autre agent IA compatible

## Les 5 Fichiers A Connaitre

Dans une session Governor, commence par lire seulement :

| Fichier | A quoi il sert |
| --- | --- |
| `START-HERE.md` | Dit quoi lire et dans quel ordre. |
| `current-scope.md` | Dit ce qui est demande, inclus, exclu et quelle est la prochaine action. |
| `execution-prompt.md` | Instruction a donner a l'agent d'execution IA. |
| `stage-review.md` | Revue apres execution : valide, corrige, bloque ou cloture. |
| `resume-brief.md` | Resume court pour reprendre plus tard. |

Tu peux ignorer le reste au debut.

## Les 5 Commandes A Retenir

Dans le chat d'un executeur IA, utilise les formes courtes :

```text
/ads-governor-init <ce que je veux faire>
/ads-governor-resume
/ads-governor-next
/ads-governor-review validee
/ads-governor-loop --prepare
/ads-check
```

Si un fichier est joint dans le chat :

```text
/ads-image Analyse cette image et prepare la session Governor
/ads-file Analyse ce document ou ce zip et prepare la session Governor
```

L'executeur IA doit recuperer le fichier via l'upload du chat, puis traduire vers la commande reelle adaptee :
- depuis le repo systeme, image : `python scripts\ai.py image <projet> <fichier-upload> "<besoin>"` ;
- depuis le repo systeme, document ou zip : `python scripts\ai.py file <projet> <fichier-upload> "<besoin>"` ;
- depuis le projet cible deja installe, image : `python .ai-dev-system\scripts\ai.py /ads-image . <fichier-upload> "<besoin>"` ;
- depuis le projet cible deja installe, document ou zip : `python .ai-dev-system\scripts\ai.py /ads-file . <fichier-upload> "<besoin>"`.

Si tu ne comprends pas les lignes `python`, ignore-les.
Elles sont la traduction technique que l'executeur IA doit lancer pour toi.

## Choisir Le Mode Et Le Profil

Governor utilise deux reglages differents :

| Reglage | Role | Valeurs |
| --- | --- | --- |
| Mode framework | Dit comment le systeme avance. | `manual`, `semi-auto`, `auto-orchestrated` |
| Profil Governor | Dit avec quelle intensite Governor pilote. | `simple`, `rigoureux`, `avance` |

Formulation recommandee pour debuter :

```text
/ads-governor-init Ajouter une page contact simple
Mode framework : semi-auto
Profil Governor : simple
Agent d'execution IA : codex
```

Traduction technique :

```powershell
python scripts\ai.py /ads-governor-init C:\Work\mon-projet "Ajouter une page contact simple" --mode semi-auto --profile simple --execution-agent codex
```

Depuis le projet cible deja installe :

```powershell
python .ai-dev-system\scripts\ai.py /ads-governor-init . "Ajouter une page contact simple" --mode semi-auto --profile simple --execution-agent codex
```

Regle pratique :

| Situation | Mode framework | Profil Governor |
| --- | --- | --- |
| Je debute avec Governor | `semi-auto` | `simple` |
| Projet reel avec validations importantes | `semi-auto` | `rigoureux` |
| Chantier long ou multi-agent | `semi-auto` ou `auto-orchestrated` | `avance` |
| Je veux tout controler | `manual` | `simple` ou `rigoureux` |

Evite `auto-orchestrated` + `avance` tant que tu ne maitrises pas bien Governor ou tant que le besoin reste flou.

## Parcours Minimum

### 1. Ouvrir la session

Ecris dans le chat :

```text
/ads-governor-init Ajouter une page contact simple
```

Demande ensuite :

```text
Explique-moi ce que Governor a prepare en langage simple.
Dis-moi seulement :
- objectif
- inclus
- exclus
- prochaine action
- ressources utiles recommandees
```

### 2. Lire le cadrage

Lis :

```text
.ai-dev-system/governor/sessions/<session>/START-HERE.md
.ai-dev-system/governor/sessions/<session>/current-scope.md
```

Verifie seulement :
- je comprends l'objectif
- je comprends ce qui est hors perimetre
- je vois la prochaine action
- les ressources utiles sont proposees : agents, sous-agents, skills, MCP ou outils hote

Si ce n'est pas clair, demande :

```text
Reste en role Governor.
Recadre en langage simple avant execution.
```

### 3. Choisir Le Mode D'Execution Governor

Tu as plusieurs options. Les deux plus simples pour commencer sont le mode manuel controle et la boucle assistee.

Mode manuel controle :

```text
/ads-governor-next
```

Puis lis :

```text
.ai-dev-system/governor/sessions/<session>/execution-prompt.md
```

Ce fichier est l'instruction a donner a Codex ou a l'agent IA choisi.

Boucle assistee :

```text
/ads-governor-loop --prepare
```

Cette commande prepare `execution-prompt.md`, `execution-handoff.md` et l'etat `execution-loop.yml`.
Elle n'execute pas le code elle-meme.
Utilise cette option pour un chantier en plusieurs etapes ou un projet sensible.

### 4. Faire executer

Dans l'espace de l'agent d'execution IA :

```text
Tu es l'agent d'execution IA.
Governor pilote.
Execute uniquement le contenu de execution-prompt.md.
Ne depasse pas le perimetre.
Liste les fichiers modifies, les validations executees et les limites.
```

### 5. Relire avec Governor

Apres execution :

```text
/ads-governor-review validee
```

Si quelque chose ne va pas :

```text
/ads-governor-review a corriger
```

Les decisions possibles sont :
- `validee`
- `a corriger`
- `a reprendre partiellement`
- `a re-cadrer`
- `bloquee`
- `cloturee`

Si l'agent IA a sauvegarde son retour dans `executor-return.md`, utilise la boucle assistee :

```text
/ads-governor-loop --review-from-file
```

L'agent hote doit alors lancer la commande reelle avec le fichier de retour, une decision explicite, une preuve de validation et la prochaine action.
La boucle s'arrete si Governor doit recadrer, bloquer ou cloturer.

Pour choisir entre tous les modes Governor, lis :

```text
docs/getting-started/guide-governor-modes-loop.md
```

### 6. Reprendre plus tard

Lis :

```text
.ai-dev-system/governor/sessions/<session>/resume-brief.md
```

Ce fichier doit suffire pour reprendre sans relire toute la conversation.

## Quand Choisir Governor

Utilise Governor si :
- le projet a plusieurs etapes
- une decision importante peut arriver
- tu as une image, un document ou un zip
- tu veux que Codex ou un autre agent execute sans partir hors perimetre
- tu veux pouvoir reprendre plus tard proprement

Utilise le framework seul si :
- la demande est petite
- tu veux seulement un mode `manual`, `semi-auto` ou `auto-orchestrated`
- tu n'as pas besoin d'une session de pilotage durable

## Regle De Securite Simple

Governor peut recommander :
- agents framework
- sous-agents ou profils specialises
- skills
- MCP
- outils hote comme terminal, navigateur, upload ou recherche

Mais il ne doit les utiliser que si cela aide vraiment le cadrage, l'execution ou la validation.
Il doit d'abord verifier que ces capacites existent dans l'hote courant.
Dans son retour, il doit dire quelles ressources ont ete considerees, utilisees ou ignorees.

Si un outil utile manque, il doit le dire clairement.

## Phrase De Demarrage Recommandee

```text
Agis comme AI Delivery Governor.
Explique-moi les decisions simplement.
Ne code pas directement tant que le cadrage n'est pas clair.
Prepare Codex ou mon agent d'execution IA avec un prompt borne.
Apres execution, aide-moi a relire et a decider : valider, corriger, re-cadrer, bloquer ou cloturer.
```
