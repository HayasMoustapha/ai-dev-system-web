# Quelle Commande Utiliser

## Pourquoi ce document existe

Ce document sert de fiche ultra pratique.

Son but est simple :
- aider un debutant a choisir la bonne commande,
- eviter d'hesiter entre `manual`, `semi-auto` et `auto-orchestrated`,
- montrer quoi lancer selon le type de demande de depart.

Si tu ne sais pas quoi faire, commence ici.

Si tu es non-informaticien et que tu veux surtout parler dans le chat avec `/ads-*`, lis aussi :
- `docs/getting-started/guide-demarrage-ultra-simple.md`
- `docs/getting-started/parcours-non-informaticien.md`

Regle pour debutant :
- ecris la commande courte dans le chat ;
- laisse l'executeur IA lancer la commande technique ;
- demande toujours "explique en mots simples ce qui a ete cree".

## Regle simple a retenir

Il y a seulement 3 grandes situations :
- tu veux tout piloter toi-meme : `manual`
- tu veux que le systeme prepare le terrain mais tu gardes des validations : `semi-auto`
- tu veux que l'IA avance plus librement tant que le risque reste acceptable : `auto-orchestrated`

En conversation avec un executeur IA, tu peux utiliser :
- `/ads-manual <besoin>` pour `manual`
- `/ads-semi-auto <besoin>` pour `semi-auto`
- `/ads-auto <besoin>` pour `auto-orchestrated`
- `/ads-image <besoin>` si une image est jointe dans le chat
- `/ads-file <besoin>` si un PDF, DOC, DOCX ou ZIP est joint dans le chat
- `/ads-upgrade-system <projet> --dry-run` pour verifier une mise a jour de `.ai-dev-system` sans appliquer
- `/ads-package-system` pour produire un paquet portable du systeme

Dans tous les cas :
- ne donne a l'IA que le contexte utile pour l'etape courante
- ajoute `rules/context-budget.md` si tu vois qu'elle charge trop de fichiers
- utilise `docs/concepts/core/context-budget.md` pour comprendre la logique

Commande conversationnelle recommandee dans un chat IA :

```text
/ads-<action> <besoin>
```

Traduction technique si tu es dans un terminal, a laisser faire par l'executeur IA si tu utilises le chat :

```text
python scripts/ai.py <commande>
```

Si tu veux la table complete des alias, lis aussi :
- `docs/getting-started/commandes-simples.md`
- `docs/getting-started/commandes-conversationnelles.md`
- `docs/getting-started/catalogue-commandes-ads-et-governor.md`

Exemples :
- en conversation : `/ads-init`, `/ads-semi-auto Ajouter une page contact`, `/ads-governor-init Ajouter une page contact`
- `python scripts/ai.py init C:\Work\mon-projet`
- `python scripts/ai.py /ads-semi-auto C:\Work\mon-projet "Decrire le besoin"`
- `python scripts/ai.py /ads-status C:\Work\mon-projet`
- `python scripts/ai.py /ads-governor-init C:\Work\mon-projet "Decrire le besoin"`
- `python scripts/ai.py /ads-upgrade-system C:\Work\mon-projet --dry-run`
- `python scripts/ai.py /ads-package-system --output-dir dist`

Les commandes avancees historiques restent disponibles, mais les nouveaux guides doivent privilegier `scripts/ai.py` quand c'est possible.

Et il y a 4 grands types de demandes :
- une demande texte
- une image
- un document
- un zip

Et un cas transversal :
- une verification documentaire ou web quand une information peut avoir change
- une passation quand tu changes d'agent IA
- une boucle Governor + agent d'execution IA quand tu veux piloter plusieurs etapes proprement
- une mise a jour de `.ai-dev-system` dans un projet cible
- une distribution du systeme vers une autre machine

## Etape 0 - Installer le systeme dans le projet

Si ton projet ne contient pas encore `.ai-dev-system`, commence toujours par :

```text
/ads-init
```

Les scripts directs restent disponibles pour les usages avances. En chat, `/ads-*` est le point d'entree recommande ; en terminal, `scripts/ai.py` reste la facade technique.
Si tu es dans Codex, utilise plutot la meme commande sans slash: `ads-*` ou `ads ...`.
Regle simple: toute commande `/ads-*` peut etre reecrite a l'identique en `ads-*`.

Ce que cela fait :
- cree `.ai-dev-system`
- copie les guides, prompts, templates, stacks et scripts
- prepare le projet pour les etapes suivantes

## Si tu ne sais pas quel mode choisir

Utilise cette regle :

- tu debutes ou tu veux apprendre : `manual`
- tu veux aller vite mais garder la main : `semi-auto`
- la demande est deja assez claire et tu veux accelerer : `auto-orchestrated`

## Skills et MCP

Si ton projet a configure des skills ou un MCP :
- le systeme peut les recommander ou les utiliser si l'agent IA les supporte deja
- tu peux aussi les forcer manuellement dans tes demandes a l'agent

Regle recommandee :
- auto par defaut
- override manuel possible
- generation assistee pour configurer un MCP
- pas de modification automatique d'une configuration globale sans validation

Pour preparer la configuration d'un MCP :

```text
/ads-mcp
```

L'executeur IA doit demander le nom du MCP, la commande serveur et l'hote cible si ces informations manquent.

Le systeme cree alors :
- `.ai-dev-system/mcp-configs/<nom>/mcp-definition.yml`
- `.ai-dev-system/mcp-configs/<nom>/README.md`

Si tu cibles Codex :

```text
python scripts/ai.py /ads-mcp C:\Work\mon-projet mon_mcp C:\chemin\vers\serveur.exe --target-agent codex
```

Le systeme genere aussi un bloc `codex-config.toml` a relire et copier manuellement.

## Tableau ultra simple

Pour un utilisateur non-informaticien, la colonne importante est `Commande a ecrire dans le chat`.
La partie terminal sert seulement a l'executeur IA.

| Ta situation | Commande a ecrire dans le chat |
| --- | --- |
| Je debute et je veux etre guide calmement | `/ads-manual Decrire le besoin` |
| Je veux le meilleur choix par defaut | `/ads-semi-auto Decrire le besoin` |
| Le besoin est clair et peu risque | `/ads-auto Decrire le besoin` |
| J'ai une image jointe | `/ads-image Decrire le besoin lie a l'image` |
| J'ai un PDF, DOC, DOCX ou ZIP joint | `/ads-file Decrire le besoin lie au fichier` |
| Je veux comprendre un projet existant | `/ads-discover-project Comprendre ce projet avant modification` |
| Je veux utiliser Governor | `/ads-governor-init Decrire le besoin` |
| Je veux reprendre Governor apres fermeture de Codex | `/ads-governor-resume` |
| Je veux verifier l'installation | `/ads-check` |
| Je veux mettre a jour le systeme local | `/ads-upgrade-system --dry-run` |

## Tableau Technique

| Ta situation | Mode conseille | Commande a lancer |
| --- | --- | --- |
| Je debute et je veux etre guide calmement | `manual` | en chat : `/ads-manual <besoin>` ; en terminal : `python scripts/ai.py /ads-manual C:\Work\mon-projet "<besoin>"` |
| J'ai une demande texte et je veux garder des checkpoints | `semi-auto` | en chat : `/ads-semi-auto <besoin>` ; en terminal : `python scripts/ai.py /ads-semi-auto C:\Work\mon-projet "<besoin>" --stack-profiles ...` |
| J'ai une image client | `semi-auto` | en chat : `/ads-image <besoin>` ; en terminal : `python scripts/ai.py /ads-image C:\Work\mon-projet C:\Work\design\mockup.png "<besoin>" --stack-profiles ...` |
| J'ai un document PDF ou DOCX | `semi-auto` | en chat : `/ads-file <besoin>` ; en terminal : `python scripts/ai.py /ads-file C:\Work\mon-projet C:\Work\brief\client.pdf "<besoin>" --stack-profiles ...` |
| J'ai un zip de handoff | `semi-auto` | en chat : `/ads-file <besoin>` ; en terminal : `python scripts/ai.py /ads-file C:\Work\mon-projet C:\Work\handoff\projet.zip "<besoin>" --stack-profiles ...` |
| Le besoin est deja assez clair et je veux aller plus vite | `auto-orchestrated` | en chat : `/ads-auto <besoin>` ; en terminal : `python scripts/ai.py /ads-auto C:\Work\mon-projet "<besoin>" --stack-profiles ...` |
| Je veux preparer un MCP | generation assistee | en chat : `/ads-mcp` ; en terminal : `python scripts/ai.py /ads-mcp C:\Work\mon-projet mon_mcp C:\chemin\vers\serveur.exe --target-agent universal` |
| Je dois verifier une doc ou une version | recherche controlee | utilise `prompts/verify-docs.md` avec `rules/research.md` et `sources.md` |
| Je veux changer d'agent IA | handoff inter-agent | en chat : `/ads-handoff` ; en terminal : `python scripts/ai.py /ads-handoff C:\Work\mon-projet "Etat actuel" "Prochaine etape"` |
| Je veux voir quoi faire maintenant | status | en chat : `/ads-status` ; en terminal : `python scripts/ai.py /ads-status C:\Work\mon-projet` |
| Je veux verifier une mise a jour de `.ai-dev-system` sans appliquer | upgrade non destructif | en chat : `/ads-upgrade-system <projet> --dry-run` ; en terminal : `python scripts\ai.py /ads-upgrade-system C:\Work\mon-projet --dry-run` |
| Je veux appliquer une mise a jour de `.ai-dev-system` apres verification | upgrade non destructif | en chat : `/ads-upgrade-system <projet> --apply` ; en terminal : `python scripts\ai.py /ads-upgrade-system C:\Work\mon-projet --apply` |
| Je veux envoyer le systeme vers une autre machine | distribution portable | en chat : `/ads-package-system` ; en terminal : `python scripts\ai.py /ads-package-system --output-dir dist` |
| Je veux mettre a jour depuis un ZIP portable | upgrade multi-machine | en chat : `/ads-upgrade-system <projet> --dry-run --source-package <paquet.zip>` puis `--apply` ; en terminal : `python scripts\ai.py /ads-upgrade-system C:\Work\mon-projet --dry-run --source-package dist\ai-dev-system-<version>.zip` |
| Je veux mettre a jour une session Governor | suivi Governor | en chat : `/ads-governor-update` ; en terminal : `python scripts\ai.py /ads-governor-update C:\Work\mon-projet ma-session --status active --last-decision "..." --next-action "..."` |
| Je veux reprendre une session Governor apres fermeture de Codex | reprise Governor | en chat : `/ads-governor-resume` ; en terminal : `python scripts\ai.py /ads-governor-resume C:\Work\mon-projet ma-session` |
| Je veux preparer le prompt pour l'agent d'execution IA | execution Governor | en chat : `/ads-governor-next` ; en terminal : `python scripts\ai.py /ads-governor-next C:\Work\mon-projet ma-session` |
| Je veux capturer une revue d'etape Governor | revue Governor | en chat : `/ads-governor-review validee` ; en terminal : `python scripts\ai.py /ads-governor-review C:\Work\mon-projet ma-session --decision validee --validation "..." --next-action "..."` |
| Je veux que Governor pilote et que Codex ou un autre agent IA execute | Governor + execution assistee | lis `docs/getting-started/guide-governor-codex-execution-assistee.md` puis utilise `/ads-governor-init`, `/ads-governor-next` et `/ads-governor-review` |

## Cas transversal - Tu changes d'agent IA

Utilise ce cas si :
- tu passes de Codex a Cursor
- tu passes de Claude Code a Codex
- tes credits s'epuisent
- tu veux reprendre plus tard sans perdre le fil

Commande :

```text
/ads-handoff
```

L'executeur IA doit demander l'etat actuel, la prochaine action et les agents concernes si ces informations manquent.

Traduction technique :

```text
python scripts/ai.py /ads-handoff C:\Work\mon-projet "La spec est faite, implementation pas encore commencee" "Lire le run courant et commencer le plan" --current-agent Codex --next-agent Cursor
```

Ensuite, donne au nouvel agent :

```text
Je reprends ce projet depuis un handoff inter-agent.

Applique :
- .ai-dev-system/prompts/resume-from-handoff.md
- .ai-dev-system/rules/handoff.md
- .ai-dev-system/rules/context-budget.md

Lis d'abord :
- .ai-dev-system/handoff/README.md
- .ai-dev-system/handoff/current-state.md
- .ai-dev-system/handoff/next-actions.md
- .ai-dev-system/handoff/validation-status.md

Ne charge pas toute la documentation tant que ce n'est pas necessaire.
```

## Cas transversal - Tu dois verifier une documentation

Utilise ce cas si :
- tu n'es pas sur d'une version
- une API ou une syntaxe a pu changer
- une decision depend d'une documentation officielle
- tu veux eviter une supposition sur Odoo, OWL, Next.js, React, Flutter, React Native, Meteor, Express, MCP ou OpenAPI

Message type a envoyer a l'agent :

```text
Je veux une verification documentaire controlee.

Applique :
- .ai-dev-system/prompts/verify-docs.md
- .ai-dev-system/rules/research.md
- .ai-dev-system/sources.md

Question a verifier :
[decris ici la question]

Priorite :
- sources officielles d'abord
- pas de source secondaire si une source officielle suffit
- dis clairement si tu n'as pas pu verifier
```

## Cas 1 - Tu as une demande texte simple

Exemple :
"Je veux ajouter une invitation par email."

### Si tu debutes

Commande :

```text
/ads-manual Je veux ajouter une invitation par email
```

Traduction technique :

```text
python scripts/ai.py /ads-manual C:\Work\mon-projet "Je veux ajouter une invitation par email"
```

Puis tu utilises ensuite :
- `templates/project-spec.md`
- `prompts/spec.md`

Choisis ce cas si :
- tu veux comprendre chaque etape
- tu ne veux pas que l'IA prepare trop de choses toute seule

### Si tu veux aller plus vite avec validation

Commande :

```text
/ads-semi-auto Je veux ajouter une invitation par email
```

Traduction technique :

```text
python scripts/ai.py /ads-semi-auto C:\Work\mon-projet "Je veux ajouter une invitation par email" --stack-profiles fullstack-nextjs-typescript
```

Choisis ce cas si :
- la demande est assez claire
- tu veux que le systeme cree les artefacts
- tu veux garder des checkpoints humains

### Si le besoin est deja bien cadre

Commande :

```text
/ads-auto Je veux ajouter une invitation par email
```

Traduction technique :

```text
python scripts/ai.py /ads-auto C:\Work\mon-projet "Je veux ajouter une invitation par email" --stack-profiles fullstack-nextjs-typescript
```

Choisis ce cas si :
- tu connais deja bien le projet
- tu es pret a laisser l'IA avancer plus librement

## Cas 2 - Tu as une image ou un mockup

Si l'image est jointe dans le chat de l'executeur IA, donne simplement :

```text
/ads-image Analyse cette image et prepare le travail
```

L'executeur IA doit recuperer le chemin du fichier joint, puis lancer la commande reelle adaptee :
- depuis le repo systeme : `python scripts/ai.py image <projet> <fichier-upload> "<besoin>"`
- depuis le projet cible deja installe : `python .ai-dev-system\scripts\ai.py /ads-image . <fichier-upload> "<besoin>"`

Exemple :
- un ecran Figma exporte
- un PNG fourni par le client

### Commande recommandee

```text
/ads-image Analyser cette maquette
```

Traduction technique :

```text
python scripts/ai.py /ads-image C:\Work\mon-projet C:\Work\design\mockup.png "Analyser cette maquette" --mode semi-auto --stack-profiles frontend-nextjs-typescript
```

Pourquoi `semi-auto` est souvent le meilleur choix ici :
- l'image montre une interface
- mais elle ne montre pas toujours toute la logique metier
- il faut donc garder des validations humaines

Si le stack profile est `fullstack-odoo-owl`, le systeme peut aussi recommander :
- le skill Odoo, s'il est disponible
- le skill d'orchestration de workflow, s'il est disponible
- le MCP Odoo, s'il est configure et utile

Si l'image est tres claire et le risque faible, tu peux aussi utiliser :

```text
python scripts/ai.py /ads-image C:\Work\mon-projet C:\Work\design\mockup.png "Analyser cette maquette" --mode auto-orchestrated --stack-profiles frontend-nextjs-typescript
```

## Cas 3 - Tu as un document client

Exemple :
- un PDF
- un DOCX
- un tableur

### Commande recommandee

```text
/ads-file Analyser ce brief client
```

Traduction technique :

```text
python scripts/ai.py /ads-file C:\Work\mon-projet C:\Work\brief\client.pdf "Analyser ce brief client" --mode semi-auto --stack-profiles universal
```

Pourquoi :
- un document peut contenir des choses claires et d'autres ambigues
- le systeme va enregistrer la source
- il va resumer ce qu'il peut lire automatiquement
- il va te laisser valider avant d'aller plus loin

## Cas 4 - Tu as un zip de handoff

Exemple :
- archive client
- export de projet
- dossier de transfert

### Commande recommandee

```text
/ads-file Reprendre ce ZIP de handoff
```

Traduction technique :

```text
python scripts/ai.py /ads-file C:\Work\mon-projet C:\Work\handoff\projet-client.zip "Reprendre ce ZIP de handoff" --mode semi-auto --stack-profiles fullstack-nextjs-typescript
```

Pourquoi :
- un zip peut contenir plusieurs fichiers
- il faut souvent inspecter sa structure avant d'en tirer des conclusions
- `semi-auto` est plus prudent que `auto-orchestrated`

## Cas 5 - Tu ne veux rien automatiser au debut

Commande :

```text
/ads-manual Je veux avancer manuellement
```

Traduction technique :

```text
python scripts/ai.py /ads-manual C:\Work\mon-projet "Je veux avancer manuellement"
```

Utilise ce cas si :
- tu veux apprendre le systeme
- tu veux tout valider toi-meme
- le besoin est flou ou sensible

## Cas 6 - Tu veux juste le run directement

Parfois, tu veux lancer directement le runner sans passer par le selecteur de mode.

### Avec texte

```text
python scripts/ai.py /ads-semi-auto C:\Work\mon-projet "Construire un tableau de bord admin" --stack-profiles fullstack-nextjs-typescript
```

### Avec image

```text
python scripts/ai.py /ads-image C:\Work\mon-projet C:\Work\design\mockup.png "Analyser cette maquette" --mode semi-auto --stack-profiles frontend-nextjs-typescript
```

### Avec document

```text
python scripts/ai.py /ads-file C:\Work\mon-projet C:\Work\brief\client.pdf "Analyser ce brief client" --mode semi-auto --stack-profiles universal
```

### Avec zip

```text
python scripts/ai.py /ads-file C:\Work\mon-projet C:\Work\handoff\projet-client.zip "Reprendre ce ZIP de handoff" --mode semi-auto --stack-profiles fullstack-nextjs-typescript
```

## Et juste apres la commande, que faire ?

### Si tu as lance `manual`

Tu fais ensuite :
1. ouvrir `templates/project-spec.md` ou `templates/ui-spec-from-image.md`
2. ouvrir le bon prompt
3. demander a l'agent de t'aider etape par etape

### Si tu as lance `semi-auto` ou `auto-orchestrated`

Tu fais ensuite :
1. ouvrir `.ai-dev-system/runs/<run-name>/run-manifest.yml`
2. ouvrir `.ai-dev-system/runs/<run-name>/artifacts/execution-loop.yml`
3. ouvrir l'artefact principal
4. ouvrir `tech-profile.md`
5. continuer avec l'agent selon le mode

Dans le manifeste, regarde d'abord `status.global`, `status.active_phase`, `next_action`, `quality_gates`, `risks` et `open_decisions`.
Dans `execution-loop.yml`, regarde si l'agent peut continuer ou s'il doit s'arreter pour validation.

### Si tu veux utiliser Governor avec Codex ou un autre agent IA

Lis :
- `docs/getting-started/jour-1-avec-governor-kit.md` pour la premiere session
- `docs/getting-started/guide-governor-codex-execution-assistee.md` pour la boucle concrete Governor + execution IA

Commandes de base :

```text
/ads-governor-init Decrire le besoin
/ads-governor-next
/ads-governor-review validee
```

Traductions techniques :

```text
python scripts/ai.py /ads-governor-init C:\Work\mon-projet "Decrire le besoin" --session-name ma-session --execution-agent codex --next-action "Executer uniquement la premiere etape bornee validee"
python scripts/ai.py /ads-governor-next C:\Work\mon-projet ma-session
python scripts/ai.py /ads-governor-review C:\Work\mon-projet ma-session --decision validee --validation "Execution relue" --next-action "Preparer l'etape suivante"
```

Ici, Governor garde le cadre et la continuite.
Codex ou l'agent IA choisi execute seulement le contenu de `execution-prompt.md`.

## Comment savoir quel stack profile mettre

Exemples simples :
- projet React + Node : `frontend-react-typescript backend-node`
- projet Next.js fullstack : `fullstack-nextjs-typescript`
- API Express : `backend-node-express`
- Odoo + OWL : `fullstack-odoo-owl`
- mobile Flutter : `mobile-flutter`
- mobile React Native : `mobile-react-native`
- si tu ne sais pas encore : `universal`

## Version PowerShell

Si tu preferes PowerShell, tu peux utiliser `scripts/ai.ps1`, mais la politique d'execution Windows peut le bloquer.

Exemple :

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\ai.ps1 image C:\Work\mon-projet C:\Work\design\mockup.png --mode semi-auto --stack-profiles fullstack-odoo-owl
```

## Si tu veux la reponse la plus simple possible

Retiens seulement ceci :

- si tu debutes : `manual`
- si tu as une image, un document ou un zip : `semi-auto`
- si tout est deja assez clair : `auto-orchestrated`

Et lance en general :

```text
/ads-semi-auto ...
/ads-image Analyser cette maquette
/ads-file Analyser ce brief client
/ads-status
```

## En une phrase

Si tu ne sais pas quoi lancer :
- commence par `/ads-semi-auto <besoin>`
- choisis ton mode
- donne soit un texte, soit une image, soit un document, soit un zip
- et laisse le systeme te preparer la suite.


## Governor Autopilot Consolidation

Surface courte du parcours normal quand une session Governor pilote deja le chantier :
- `ads <besoin>` pour ouvrir le besoin via Governor Autopilot
- `python scripts/ai.py governor-autopilot <projet> --action start --need "<besoin>"`
- alias conversationnels disponibles via `continue`, `reprends`, `status`, `stop`, `ads <besoin>` et `ads-governor-autopilot`
- artefacts exposes : `session-dashboard.md`, `session-event-log.yml`, `governor-autopilot-brief.md`
