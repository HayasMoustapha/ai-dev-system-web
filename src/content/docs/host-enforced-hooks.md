# Host-enforced Governor checkpoints (Claude Code hooks)

Date de reference : 2026-06-03.

## Pourquoi

Les gates Governor sont normalement *consultatifs* : on demande au modele de les
respecter. Un hote qui expose des hooks de cycle de vie (Claude Code :
`PreToolUse`, `Stop`, ...) peut executer une commande **avant** qu'un outil
s'execute et la bloquer. Une invariante Governor devient alors un point de
controle applique par le runtime, pas une regle que le modele peut contourner.

Ce pont implemente deux invariantes existantes comme checkpoints hote :

1. **Proteger avant un effet destructeur** (operational policy). Commande shell
   catastrophique -> `deny` ; destructive/globale -> `ask` ; ecriture sous
   `dist/` -> `deny`. La classification reutilise `classify_command` du chemin
   d'elevation, donc la politique est identique.
2. **Ne jamais s'arreter sur du non prouve** (« never mark done what is not
   proven »). `Stop` est bloque tant qu'un stop-block est ouvert ou qu'un claim
   fort n'est pas prouve.

## Composants

- `scripts/core/governor_host_hooks.py` : couche de decision pure
  (`evaluate_hook_event`), generateur de config (`build_claude_code_hooks_config`),
  validateur (`validate_hooks_config`), rendu (`render_claude_code_hook_output`).
- `scripts/governor-hook-gate.py` : point d'entree wire dans un hook ; lit
  l'evenement JSON sur stdin, applique la politique de session, emet la decision.
- `scripts/test-governor-host-hooks.py` : gate (decisions, config, rendu, CLI).

## Cablage dans Claude Code

Dans `.claude/settings.json` du projet :

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "python scripts/governor-hook-gate.py" }] },
      { "matcher": "Edit|Write|MultiEdit|NotebookEdit",
        "hooks": [{ "type": "command", "command": "python scripts/governor-hook-gate.py" }] }
    ],
    "Stop": [
      { "hooks": [{ "type": "command", "command": "python scripts/governor-hook-gate.py" }] }
    ]
  }
}
```

Generer ce fragment : `build_claude_code_hooks_config()` renvoie exactement cette
structure (verifiee par `validate_hooks_config`).

## Politique transmise au gate

Le gate lit la politique via flags ou variables d'environnement, avec une posture
sure par defaut (`standard`, pas de stop-block) :

- `--operational-level` / `GOVERNOR_OPERATIONAL_LEVEL` (`standard` |
  `full-permission` | `break-glass-controlled`)
- `--stop-block` / `GOVERNOR_STOP_BLOCK` (`clear` ou la raison du blocage)
- `--unproven-claim` / `GOVERNOR_UNPROVEN_CLAIM`

Une session Governor active peut exporter ces valeurs depuis son etat pour que le
checkpoint reflete la tranche en cours.

## Portee et limite

La logique de decision et la forme de la config sont prouvees par le gate unitaire
(y compris un appel CLI reel sur stdin). Le branchement live dans une session
Claude Code en cours reste de la **configuration hote** : ce document en est la
recette. On ne revendique pas ici une verification du runtime Claude Code en
conditions reelles, seulement un pont correct et teste vers son contrat de hooks.
