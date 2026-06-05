# Reprise Exacte Governor Apres Fermeture De Codex

## Objectif

Ce guide explique comment reprendre exactement une session Governor quand une
session Codex a ete fermee, puis ouverte plus tard.

La regle importante est :

```text
Codex peut perdre sa conversation.
Governor ne doit pas perdre l'etat du chantier.
```

La reprise exacte se fait donc depuis les artefacts Governor dans le projet
cible, pas depuis la memoire de l'ancienne conversation Codex.

## Principe

Quand Codex redemarre, il doit :

1. ouvrir le bon projet ;
2. retrouver la session Governor active ;
3. lire les fichiers Governor dans le bon ordre ;
4. reconstruire l'etat courant ;
5. continuer uniquement depuis la prochaine action validee.

La commande dediee automatise cette preparation :

```powershell
python .ai-dev-system\scripts\ai.py /ads-governor-resume . <session>
```

Elle detecte la session quand c'est possible, verifie les artefacts de reprise,
ecrit `codex-resume-prompt.md`, ecrit `resume-readiness.md`, puis affiche la
prochaine commande sure.

Pour rafraichir aussi `execution-prompt.md` et `execution-handoff.md` :

```powershell
python .ai-dev-system\scripts\ai.py /ads-governor-resume . <session> --prepare-next
```

Si les artefacts Governor sont absents ou incomplets, la reprise exacte est
impossible. Il faut alors reprendre prudemment, reconstruire ce qui est prouve,
et ne pas marquer une etape comme validee sans preuve.

## Etape 1 - Ouvrir Le Bon Projet

Ouvre Codex dans le projet cible, c'est-a-dire le projet qui contient :

```powershell
.ai-dev-system\
```

Il ne faut ouvrir le repo `ai-dev-system-universel` que si le chantier porte
sur le systeme lui-meme.

## Etape 2 - Trouver La Session Governor

Depuis le projet cible :

```powershell
Get-ChildItem .ai-dev-system\governor\sessions
```

S'il n'y a qu'une session, utilise ce dossier.

S'il y a plusieurs sessions, inspecte au minimum :

```powershell
Get-Content .ai-dev-system\governor\sessions\<session>\session-manifest.yml
Get-Content .ai-dev-system\governor\sessions\<session>\resume-brief.md
```

Ne devine pas la session active si plusieurs sessions semblent possibles.
Demande a l'utilisateur de choisir le nom de session.

## Etape 3 - Donner Le Prompt De Reprise A Codex

Dans la nouvelle conversation Codex, donne ce prompt :

```text
Je reprends une session Governor existante.

Projet courant: .
Session Governor: <session>

Ne repars pas de zero.
Lis et applique dans cet ordre:
1. AGENTS.md si present
2. .ai-dev-system/PROJECT-LOCAL-ADAPTER.md
3. .ai-dev-system/governor/sessions/<session>/START-HERE.md
4. .ai-dev-system/governor/sessions/<session>/session-manifest.yml
5. .ai-dev-system/governor/sessions/<session>/current-scope.md
6. .ai-dev-system/governor/sessions/<session>/execution-loop.yml
7. .ai-dev-system/governor/sessions/<session>/resume-brief.md
8. .ai-dev-system/governor/sessions/<session>/stage-review.md si present
9. .ai-dev-system/governor/sessions/<session>/execution-handoff.md si present

Ensuite, resume:
- l'etat exact de la session
- la derniere action faite
- la prochaine action attendue
- les validations manquantes
- les conditions d'arret

Puis continue uniquement selon Governor.
```

Dans Codex, prefere les formes `ads-*` sans slash dans le chat si les slash
commands entrent en conflit avec l'interface Codex.

Si tu utilises la commande dediee, Codex peut lire directement :

```text
.ai-dev-system/governor/sessions/<session>/codex-resume-prompt.md
```

## Etape 4 - Preparer La Prochaine Execution

Pour preparer la prochaine etape Governor :

```powershell
python .ai-dev-system\scripts\ai.py /ads-governor-next . <session>
```

Pour utiliser la boucle assistee :

```powershell
python .ai-dev-system\scripts\ai.py /ads-governor-loop . <session> --prepare
```

Codex doit ensuite lire `execution-prompt.md` et executer seulement la mission
bornee par Governor.

## Etape 5 - Capturer La Revue Apres Execution

Apres chaque chantier execute, Governor doit recevoir le resultat reel.

Exemple de revue directe :

```powershell
python .ai-dev-system\scripts\ai.py /ads-governor-review . <session> --decision validee --validation "<preuve de validation>" --next-action "<prochaine action>"
```

Si la boucle Governor a produit un retour executeur, utilise plutot le fichier
de retour :

```powershell
python .ai-dev-system\scripts\ai.py /ads-governor-loop . <session> --review-from-file .ai-dev-system\governor\sessions\<session>\executor-return.md --decision validee --validation "<preuve de validation>" --next-action "<prochaine action>"
```

## Cas D'Interruption Avant Revue

Si l'ancienne session Codex a ete fermee avant que Governor ait recu une revue
complete, donne ce cadrage a Codex :

```text
La session Codex precedente a ete interrompue avant revue Governor complete.
Reconstruis l'etat depuis les fichiers disponibles.
Marque ce qui est valide, ce qui ne l'est pas, et propose la prochaine action sure.
```

Ne transforme pas une execution interrompue en etape validee par defaut.

## Fichiers A Lire En Priorite

Les fichiers les plus importants pour une reprise sont :

| Fichier | Role |
| --- | --- |
| `START-HERE.md` | Ordre de lecture de la session. |
| `session-manifest.yml` | Identite, etat et metadonnees de la session. |
| `current-scope.md` | Perimetre courant et prochaine action. |
| `execution-loop.yml` | Etat de boucle et conditions de continuation. |
| `resume-brief.md` | Resume minimal pour reprendre plus tard. |
| `stage-review.md` | Dernier verdict Governor. |
| `execution-prompt.md` | Mission bornee a executer. |
| `execution-handoff.md` | Contexte de transfert si un autre agent reprend. |

## Rappel Operationnel

Pour les chantiers pilotes avec Governor et Codex :

```text
- ne pas bypasser Governor si une session .ai-dev-system/governor est active ;
- a chaque chantier termine, faire un commit ;
- apres chaque commit, faire le push ;
- ne jamais se baser uniquement sur la memoire d'une ancienne conversation Codex.
```

La phrase a retenir :

```text
Conversation Codex fermee = pas grave.
Artefacts Governor absents ou incomplets = reprise exacte impossible.
```
