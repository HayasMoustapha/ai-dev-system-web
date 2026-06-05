# Governor Operating Manual

## A quoi sert cette page

Cette page sert a une seule chose :

- choisir rapidement le bon mode ;
- lancer la bonne commande ;
- savoir quand Governor doit commander ;
- savoir quand Codex ne doit pas partir ;
- savoir quoi faire si le chantier bloque, boucle ou manque de preuve.

Si tu ne veux lire qu'une seule page pour utiliser Governor, lis celle-ci.

## Regle centrale

Retenir ceci :

```text
Codex execute.
Governor decide quoi lancer, quand le lancer, comment le borner, comment le verifier et quand l'arreter.
```

## Demarrage minimum

Dans un projet deja installe avec AI Dev System :

```text
/ads-check
```

ou :

```text
python .ai-dev-system\scripts\ai.py /ads-check .
```

Si le systeme n'est pas encore installe :

```text
python scripts\ai.py /ads-init C:\Work\mon-projet
```

## Choix rapide

Utilise cette table si tu veux decider en moins de 10 secondes.

| Situation | Commande recommandee | Pourquoi |
| --- | --- | --- |
| petite correction locale et prouvable | `/ads-auto <besoin>` | Governor peut souvent traiter localement sans lancer Codex |
| petite feature bornee sur repo existant | `/ads <besoin>` | Governor tente d'abord le chemin le plus direct, puis borne l'execution |
| travail standard sur repo existant | `/ads-go <besoin>` | mode prudent par defaut |
| besoin encore flou ou sensible | `/ads-semi-auto <besoin>` | checkpoint humain plus visible |
| chantier long, multi-etapes, reprise | `/ads-governor-init <besoin>` | il faut une vraie session Governor |
| lancer reellement Codex sous commandement Governor | `/ads-governor-run` | Governor garde le pilotage et Codex reste l'executant |
| maintenance ou propagation du systeme | `/ads-upgrade-system` puis `/ads-check` | logique de maintenance project-local |

## Quand Governor doit dominer

Governor doit dominer dans ces cas :

- le besoin est encore large, flou ou sensible ;
- il faut decouper le travail en tranches ;
- il faut reprendre un chantier deja entame ;
- il faut verifier, relire, corriger ou cloturer ;
- il faut gerer un repo deja sale ;
- il faut faire dry-run, apply, doctor, packaging ou upgrade.

Dans ces cas, Codex n'est pas le chef. Codex est l'executant.

## Quand Codex ne doit pas partir

Ne lance pas Codex tout de suite si :

- la tache est triviale et localement prouvable ;
- la prochaine action n'est pas executable ;
- il manque un arbitrage produit, metier ou architecture ;
- la demande est trop vague ;
- il faut d'abord verifier l'installation ou la stack ;
- le travail demande surtout une revue, une preuve ou une cloture.

Dans ces cas, Governor doit :

- traiter localement ;
- recadrer ;
- demander une decision ;
- ou cloturer proprement.

## Cas d'usage directs

### 1. Petite correction locale

Exemple :

```text
/ads-auto Corrige la phrase incomplete dans README.md et verifie le diff
```

Commande terminal :

```text
python .ai-dev-system\scripts\ai.py /ads-auto . "Corrige la phrase incomplete dans README.md et verifie le diff"
```

Ce qu'on attend :

- fast-path local si le cas est prouvable ;
- aucune relance Codex si la preuve locale suffit.

### 2. Petite feature simple

Exemple :

```text
/ads Ajoute une section Contact simple
```

Commande terminal :

```text
python .ai-dev-system\scripts\ai.py /ads . "Ajoute une section Contact simple" --allow-real-executor
```

Ce qu'on attend :

- Governor tente d'abord le chemin direct ;
- si le cas sort du fast-path, il borne la tranche pour Codex.

### 3. Travail standard de production

Exemple :

```text
/ads-go Ajoute un endpoint backend et branche le frontend dessus
```

Commande terminal :

```text
python .ai-dev-system\scripts\ai.py /ads-go . "Ajoute un endpoint backend et branche le frontend dessus"
```

Ce qu'on attend :

- progression normale ;
- perimetre borne ;
- validation apres execution.

### 4. Besoin encore flou

Exemple :

```text
/ads-semi-auto Comprendre ce repo puis proposer la premiere tranche executable
```

Commande terminal :

```text
python .ai-dev-system\scripts\ai.py /ads-semi-auto . "Comprendre ce repo puis proposer la premiere tranche executable"
```

Ce qu'on attend :

- plus de cadrage ;
- moins d'improvisation ;
- checkpoint clair avant modifications importantes.

### 5. Chantier long ou reprise

Exemple :

```text
/ads-governor-init Finis le frontend, puis les APIs, puis l'integration, puis la preparation production
```

Commande terminal :

```text
python .ai-dev-system\scripts\ai.py /ads-governor-init . "Finis le frontend, puis les APIs, puis l'integration, puis la preparation production" --session-name chantier-principal
```

Puis :

```text
/ads-governor-next
```

ou :

```text
python .ai-dev-system\scripts\ai.py /ads-governor-next . chantier-principal
```

Ce qu'on attend :

- une vraie session ;
- une prochaine action exploitable ;
- une suite relisible.

### 6. Lancer Codex sous Governor

Avant tout :

```text
python .ai-dev-system\scripts\ai.py /ads-host-probe . --executor codex
python .ai-dev-system\scripts\ai.py /ads-check .
```

Premier lancement borne :

```text
python .ai-dev-system\scripts\ai.py /ads-governor-run . chantier-principal --executor codex --allow-real-executor --max-steps 1
```

Version autonome :

```text
python .ai-dev-system\scripts\ai.py /ads-governor-run . chantier-principal --executor codex --allow-real-executor --until-done --codex-bypass-approvals --host-bypass-permissions
```

Ce qu'on attend :

- Governor garde la main ;
- Codex execute ;
- Governor relit `executor-return` ;
- Governor decide la suite ou la cloture.

## Revue et cloture

Si une etape a deja tourne et que tu veux la revoir :

```text
/ads-governor-review validee
```

ou :

```text
python .ai-dev-system\scripts\ai.py /ads-governor-review . chantier-principal --decision validee --validation "Tests ok" --next-action "Preparer la suite"
```

Si tu veux boucler a partir d'un retour d'execution :

```text
python .ai-dev-system\scripts\ai.py /ads-governor-loop . chantier-principal --review-from-file .ai-dev-system\governor\sessions\chantier-principal\executor-return.md --decision validee --validation "Tests ok" --next-action "Preparer la suite"
```

## Maintenance project-local

### Verifier une mise a jour

```text
/ads-upgrade-system --dry-run
```

ou :

```text
python .ai-dev-system\scripts\ai.py /ads-upgrade-system . --dry-run
```

### Appliquer la mise a jour

```text
/ads-upgrade-system --apply
```

ou :

```text
python .ai-dev-system\scripts\ai.py /ads-upgrade-system . --apply
```

### Revalider

```text
/ads-check
```

ou :

```text
python .ai-dev-system\scripts\ai.py /ads-check .
```

## Erreurs frequentes

### Erreur 1 - Lancer Codex sur un cas trop petit

Symptome :

- tache triviale ;
- attente longue ;
- peu de valeur ajoutee.

Correction :

- commencer par `/ads-auto` ou `/ads`.

### Erreur 2 - Lancer `/ads-auto` alors qu'un arbitrage manque

Symptome :

- plusieurs options produit possibles ;
- architecture encore ouverte ;
- besoin encore flou.

Correction :

- passer par `/ads-semi-auto` ou une session Governor.

### Erreur 3 - Vouloir faire un chantier long sans session Governor

Symptome :

- perte du fil ;
- reprises maladroites ;
- prochaine action floue ;
- revues difficiles.

Correction :

- ouvrir `/ads-governor-init`.

### Erreur 4 - Confondre execution et revue

Symptome :

- on relance Codex alors qu'il fallait juste valider, corriger ou cloturer.

Correction :

- utiliser `/ads-governor-review` ou `/ads-governor-loop`.

### Erreur 5 - Oublier le doctor ou le probe

Symptome :

- le runtime ne part pas proprement ;
- le projet n'est pas sain ;
- le host direct n'est pas capturable.

Correction :

- lancer `/ads-check` ;
- puis `/ads-host-probe` avant `/ads-governor-run`.

## Conduite a tenir si Governor bloque

Si Governor bloque, il faut distinguer trois cas.

### 1. Blocage sain

C'est un bon blocage si :

- un arbitrage manque ;
- la prochaine action n'est pas executable ;
- la tache est hors perimetre ;
- une action est trop dangereuse.

Dans ce cas :

- ne force pas Codex ;
- recadre ou decide.

### 2. Blocage technique

Exemples :

- host runtime non capturable ;
- probe insuffisant ;
- retour structure absent ;
- erreur de runtime.

Dans ce cas :

- utiliser le fallback Governor ;
- repasser par la boucle Governor ;
- ou basculer sur une execution plus borne.

### 3. Blocage de preuve

Exemples :

- patch annonce termine sans test ;
- fichiers modifies non declarés ;
- aucune validation utile.

Dans ce cas :

- Governor doit corriger ou exiger la preuve ;
- pas accepter un faux succes.

## Resume final a retenir

```text
petit et prouvable -> /ads-auto
petite feature bornee -> /ads
travail standard -> /ads-go
besoin sensible ou flou -> /ads-semi-auto
chantier long ou reprise -> /ads-governor-init
Codex sous commandement Governor -> /ads-governor-run
maintenance -> /ads-upgrade-system puis /ads-check
```

## Documents lies

- `docs/concepts/governor/operation/governor-charter.md`
- `docs/concepts/governor/overview/governor-vs-codex-maitrise.md`
- `docs/concepts/governor/overview/governor-vs-codex-matrice-decisions.md`
- `docs/concepts/governor/overview/governor-playbook-lancement.md`
- `docs/getting-started/commandes-conversationnelles.md`
- `docs/getting-started/commandes-simples.md`
