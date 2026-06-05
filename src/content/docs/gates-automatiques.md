# Gates Automatiques Governor Autopilot

## Objectif

Rendre visibles et gouvernes trois gates du parcours normal :

- `proof gate`
- `commit gate`
- `push gate`

## Proof Gate

Refuse les faux succes.

Le contrat cible de standardisation de la preuve est :

- `docs/concepts/governor/operation/proof-record-unifie-governor.md`

Il reste ouvert si :

- le claim gate est degrade ou en echec
- les validations sont absentes ou trop faibles
- la session reste ouverte sans prochaine action sure
- le workspace Git local est encore sale et empeche une preuve propre de stabilisation

## Commit Gate

Il signale qu'un commit logique borne est attendu quand le workspace local est sale et que les validations minimales sont acquises.

## Push Gate

Il lit maintenant l'etat Git reel :

- `impossible:no_remote_configured` si aucun remote n'existe
- `blocked:commit_required` si des modifications locales doivent encore etre committees
- `required:set_upstream` si le remote existe mais que la branche n'a pas encore d'upstream
- `required` si des commits locaux sont en avance sur l'upstream
- `clean` si la branche locale est deja synchronisee
- `impossible:no_branch_detected` si la branche courante ne peut pas etre detectee

En mode `governor-run`, un commit valide peut ensuite declencher l'auto-push vers `origin/<branche>` quand le remote est exploitable.

## Regle de transparence

Les gates doivent etre visibles dans :

- `session-dashboard.md`
- `governor-autopilot-brief.md`
- la review finale Governor

## Preuve d'implementation attendue

A7 est conforme seulement si :

- `governor_git_gate_report` calcule `proof_gate`, `commit_gate` et `push_gate`
- le proof gate relit les statuts Governor de claim et de dette de preuve
- le commit gate lit le workspace Git reel
- le push gate lit remote, upstream, avance/retard et blocage par modifications locales
- `session-dashboard.md` et `governor-autopilot-brief.md` exposent les trois gates
- `scripts/test-governor-autopilot.py` verifie les libelles `proof gate`, `commit gate` et `push gate`

Cette preuve est archivee dans `governor/audit/autopilot/A7-proof.md`.
