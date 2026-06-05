# Guide De Demarrage Ultra Simple

## A Qui Sert Ce Guide

Ce guide est fait pour une personne qui ne connait pas la technique.

Tu n'as pas besoin de comprendre Python, Git, Odoo, Codex, Claude Code, Cursor ou Windsurf.
Tu dois seulement savoir copier un message dans le chat de ton agent IA.

Dans ce guide :
- `projet cible` veut dire le projet sur lequel tu veux travailler ;
- `executeur IA` veut dire le chat IA que tu utilises : Codex, Claude Code, Cursor, Windsurf ou autre ;
- `AI Dev System` veut dire le systeme installe dans le projet ;
- `Governor` veut dire le pilote qui cadre, relit et decide quand il faut continuer ou s'arreter.

## La Regle La Plus Importante

Utilise les commandes qui commencent par :

```text
/ads-
```

Exemples :

```text
/ads-check
/ads-go Ajouter une page contact
/ads-governor-init Piloter la suite du projet
/ads-governor-loop --prepare
/ads-governor-run codex
```

Ces commandes sont faites pour etre donnees dans le chat de l'executeur IA.
L'executeur IA les traduit ensuite vers les vrais scripts.

## Ou Ouvrir Le Chat IA

Il y a deux cas.

### Cas 1 - Le Systeme N'Est Pas Encore Installe Dans Le Projet

Ouvre le chat IA dans le repo du systeme :

```text
ai-dev-system-universel
```

Puis donne par exemple :

```text
/ads-init C:\chemin\vers\mon-projet
```

Ce que cela fait :
- copie le systeme dans ton projet ;
- cree `.ai-dev-system/` dans ton projet ;
- ajoute `.ai-dev-system/` au `.gitignore` ;
- cree `.gitignore` si le projet n'en a pas ;
- ne modifie pas le code de ton projet.

### Cas 2 - Le Systeme Est Deja Installe Dans Le Projet

Ouvre le chat IA directement dans le projet cible.

Le projet doit contenir :

```text
.ai-dev-system/
```

Dans ce cas, le symbole `.` veut dire :

```text
le projet ouvert maintenant
```

Exemple :

```text
/ads-check
```

L'executeur IA doit traduire vers :

```powershell
python .ai-dev-system\scripts\ai.py /ads-check .
```

Tu n'as pas besoin de taper cette commande longue toi-meme.
C'est l'executeur IA qui doit le faire.

## Premier Controle A Faire

Quand le systeme est installe dans ton projet, commence toujours par :

```text
/ads-check
```

Ce que cela verifie :
- le systeme local existe ;
- les scripts sont presents ;
- les fichiers importants ne manquent pas ;
- le projet peut etre pilote proprement.

Si le resultat dit que tout est bon, tu peux continuer.
Si le resultat signale un probleme, ne demande pas encore de coder.
Demande :

```text
Explique le probleme en mots simples et propose la correction la plus sure.
```

## Choisir Le Bon Chemin

Utilise ce tableau.

| Ton besoin | Commande a donner |
| --- | --- |
| Je ne veux pas choisir le mode | `/ads Decrire le besoin` |
| Petite demande tres simple et bornee | `/ads-fast Decrire le besoin` |
| Petite demande simple avec chemin prudent | `/ads-go Decrire le besoin` |
| Petite demande avec controle humain | `/ads-semi-auto Decrire le besoin` |
| Projet nouveau depuis des documents | `/ads-new-project Decrire le besoin` |
| Projet existant a comprendre avant modification | `/ads-discover-project Decrire le besoin` |
| Projet serieux avec plusieurs etapes | `/ads-governor-init Decrire le besoin` |
| Projet Odoo avance | `/ads-governor-init Decrire le besoin` avec profil rigoureux |
| Verifier une mise a jour du systeme | `/ads-upgrade-system --dry-run` |
| Appliquer une mise a jour apres verification | `/ads-upgrade-system --apply` |
| Produire un paquet pour une autre machine | `/ads-package-system` |
| Capturer une lecon utile | `/ads-learn` |
| Promouvoir une amelioration validee par Governor | `/ads-promote-learning` |
| Signaler une technologie inconnue | `/ads-stack-gap` |

Si tu ne sais pas quoi choisir, utilise :

```text
/ads Decris simplement ce que tu veux
```

Le systeme choisit alors un chemin rapide si c'est sûr, ou un chemin plus gouverne si le besoin est risque.
Si l'hote IA peut etre appele directement, le systeme peut aussi lancer l'execution.
Sinon il prepare le meilleur contexte court possible et indique quoi faire ensuite.

## Si Tu As Un Fichier Joint

Si tu as une image, un PDF, un DOC, un DOCX ou un ZIP :

1. joins le fichier dans le chat ;
2. ecris une commande simple.

Pour une image :

```text
/ads-image Analyse cette image et prepare le travail
```

Pour un document ou un ZIP :

```text
/ads-file Analyse ce fichier et prepare le travail
```

Le texte apres la commande explique le besoin.
Le chemin du fichier vient de l'upload du chat.

## Quand Utiliser Governor

Utilise Governor si :
- le projet est important ;
- il y a plusieurs etapes ;
- tu veux eviter de casser le projet ;
- tu veux que l'agent IA reste dans un perimetre clair ;
- tu veux pouvoir reprendre plus tard.

Commande de depart :

```text
/ads-governor-init Piloter ce projet sans regression
```

Ce que Governor cree :
- une session de pilotage ;
- un cadrage ;
- une prochaine action ;
- un prompt pour l'agent IA ;
- une revue d'etape ;
- un resume pour reprendre plus tard.

## Les Modes Governor

| Mode | Quand l'utiliser | Commande |
| --- | --- | --- |
| Manuel controle | Tu veux valider chaque etape toi-meme. | `/ads-governor-next`, puis `/ads-governor-review` |
| Boucle assistee | Tu veux que Governor prepare, relise et enchaine proprement. | `/ads-governor-loop --prepare`, puis `/ads-governor-loop --review-from-file` |
| Auto-run hote | Tu veux que l'agent IA deja ouvert continue dans le meme chat. | `/ads-governor-loop --auto-run` |
| Orchestrateur autonome | Tu veux que Governor appelle directement un runtime IA supporte. | `/ads-governor-run codex` |

Pour commencer sans risque, utilise :

```text
/ads-governor-loop --prepare
```

Pour un projet tres sensible, commence avec une seule etape courte.

## Ce Que L'Agent Peut Faire Sans Te Deranger

Dans les modes non manuels, le systeme donne automatiquement une permission controlee appelee `full-permission`.

En mots simples, cela veut dire :
- l'agent peut lire les fichiers ;
- il peut chercher dans le projet ;
- il peut modifier seulement les fichiers utiles a la mission ;
- il peut lancer les tests ;
- il peut utiliser une base de test locale ou dediee ;
- il peut faire un commit propre si l'etape le prevoit.

Il doit quand meme s'arreter si quelque chose est dangereux :
- base de production ;
- secret, mot de passe ou token ;
- suppression large ;
- reset Git destructeur ;
- amend, rebase ou merge non prevus ;
- push, publication ou tag release ;
- configuration globale ;
- demande floue ou hors mission.

## Comment Le Systeme Rend L'Agent IA Plus Fort

Avant une vraie execution, le systeme doit aider l'agent IA a mieux travailler.

Il lui demande de :
- lire seulement les bons fichiers ;
- verifier les outils disponibles dans son hote ;
- choisir les skills, MCP, agents ou sous-agents vraiment utiles ;
- utiliser les tests adaptes ;
- corriger seulement dans le perimetre ;
- expliquer les outils utilises et ignores.

Donc tu n'as pas besoin de deviner quel outil choisir.
Le systeme doit le proposer et l'utiliser quand cela aide vraiment.

## Ce Que Chaque Mode Fait

### Manuel Controle

Tu demandes :

```text
/ads-governor-next
```

Governor prepare le prompt.
Tu donnes ce prompt a l'agent IA.
Apres le retour, tu demandes :

```text
/ads-governor-review validee
```

ou :

```text
/ads-governor-review a corriger
```

### Boucle Assistee

Tu demandes :

```text
/ads-governor-loop --prepare
```

Governor cree ou met a jour :
- `execution-prompt.md`
- `execution-handoff.md`
- `execution-loop.yml`

L'agent IA execute.
Il sauvegarde son retour dans :

```text
.ai-dev-system/governor/sessions/<session>/executor-return.md
```

Puis Governor relit avec :

```text
/ads-governor-loop --review-from-file
```

### Auto-Run Hote

Tu demandes :

```text
/ads-governor-loop --auto-run
```

Governor prepare la boucle.
L'agent IA deja ouvert doit continuer lui-meme dans le chat.

Important :
ce mode ne lance pas Codex depuis Python.
Il depend de l'agent IA ouvert dans le chat.

### Orchestrateur Autonome

Tu demandes :

```text
/ads-governor-run codex
```

Governor appelle Codex lui-meme si le runtime Codex est disponible.
Avant de l'utiliser :

```text
/ads-host-probe
/ads-check
```

Commence par :

```text
Max steps : 1
```

## Choisir L'Hote IA

| Hote | Ce que le systeme peut faire |
| --- | --- |
| Codex | Peut etre appele directement si `codex exec` fonctionne. |
| Claude Code | Peut etre appele directement si la CLI est installee et connectee. Si le systeme dit `claude_auth_required`, lance `/login` dans Claude Code. |
| Cursor | Utilisable en project-local. Runtime direct seulement si un agent headless capturable existe. |
| Windsurf | Utilisable en project-local. Runtime direct seulement si une sortie capturable est prouvee. |

Si tu ne comprends pas ce tableau, retiens seulement :
- Codex est le plus pret pour l'orchestration autonome ;
- les autres hotes peuvent utiliser les commandes `/ads-*` dans le projet cible ;
- dans Codex, reecris simplement la meme commande sans slash : `ads-*` ou `ads ...` ;
- lance `/ads-host-probe` pour savoir ce qui est possible sur ta machine.

## Phrase A Copier Au Debut D'Une Session

Copie ceci dans le chat IA ouvert dans ton projet :

```text
Agis avec AI Dev System.
Je ne veux pas de commande compliquee.
Quand j'ecris une commande /ads-* ou ads-*, traduis-la vers le vrai script local.
Si tu es dans Codex, prefere la forme sans slash.
Utilise le projet courant avec le chemin ".".
Explique toujours en mots simples :
- ce que tu fais ;
- ce que la commande cree ou modifie ;
- ce que je dois verifier ;
- la prochaine action.
Ne modifie pas le code tant que le cadrage n'est pas clair.
```

## Si Tu Veux Un Parcours Tres Sur

Utilise cette sequence :

```text
/ads-check
/ads-discover-project Comprendre le projet avant modification
/ads-governor-init Piloter une premiere etape courte et testable
/ads-governor-loop --prepare
```

Puis demande a l'agent IA :

```text
Lis execution-prompt.md et execution-handoff.md.
Execute uniquement la mission bornee.
Donne les fichiers modifies, les tests lances, les limites et la prochaine action.
```

Apres son retour :

```text
/ads-governor-loop --review-from-file
```

## Quand S'Arreter

L'agent IA doit s'arreter si :
- il ne sait pas quel projet utiliser ;
- la demande est floue ;
- un test critique echoue ;
- il faut toucher une base de production ;
- il faut supprimer beaucoup de fichiers ;
- il faut modifier une configuration globale ;
- il faut pousser sur Git ou publier ;
- il manque une decision metier.

Dans ce cas, il doit expliquer le probleme simplement et demander une validation.
