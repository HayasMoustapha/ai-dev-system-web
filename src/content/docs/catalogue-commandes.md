# Catalogue Complet Des Commandes ADS Et Governor

## Pourquoi ce document existe

Les guides de demarrage expliquent deja les parcours les plus frequents.

Ce document sert de reference complete cote UX non technique :

- chaque commande conversationnelle `/ads-*` exposee par `scripts/ai.py` est listee ;
- chaque commande a un cas d'utilisation clair ;
- chaque commande est reformulee en mots simples ;
- chaque commande pointe vers sa traduction technique.

Si tu veux juste choisir rapidement une commande, commence plutot par :

- `docs/getting-started/quelle-commande-utiliser.md`
- `docs/getting-started/commandes-simples.md`

Si tu veux la reference complete, reste sur ce document.

## Regle de lecture simple

- `Commande` : ce que tu peux ecrire dans le chat.
- `A quoi ca sert` : la promesse courte.
- `Quand l'utiliser` : le bon cas d'usage.
- `Traduction technique` : ce que l'executeur IA doit lancer reellement.

Par defaut, un utilisateur non technique peut se contenter d'ecrire la commande courte dans le chat.
L'executeur IA doit ensuite completer le chemin du projet, la session Governor ou les options evidentes.

Important pour Codex :

- dans la documentation, tu verras souvent les formes `/ads-*` ;
- dans le chat Codex, il faut preferer `ads-*` ou `ads ...` sans slash ;
- cela evite que Codex traite `/ads-*` comme une commande native inconnue avant la traduction AI Dev System.

## 1. Demarrer Ou Cadrer Un Travail

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-init` | Installer `.ai-dev-system` dans un projet | Premier passage sur un projet qui n'a pas encore le systeme | `python scripts/ai.py /ads-init <projet>` |
| `/ads` | Ouvrir le parcours normal Governor Autopilot | Tu veux lancer une demande texte sans exposer toute la mecanique interne | `python scripts/ai.py governor-autopilot <projet> --action start --need "<besoin>"` |
| `/ads-go` | Demarrer un travail texte en mode prudent par defaut | Tu veux une demande texte classique avec checkpoints | `python scripts/ai.py /ads-go <projet> "<besoin>"` |
| `/ads-fast` | Forcer le fast path | Petite tache locale, faible risque, besoin clair | `python scripts/ai.py /ads-fast <projet> "<besoin>"` |
| `/ads-manual` | Travailler pas a pas | Tu veux apprendre, valider chaque etape ou garder la main | `python scripts/ai.py /ads-manual <projet> "<besoin>"` |
| `/ads-semi-auto` | Avancer avec checkpoints | Le besoin est assez clair mais tu veux garder des validations humaines | `python scripts/ai.py /ads-semi-auto <projet> "<besoin>"` |
| `/ads-auto` | Avancer plus librement | Le besoin est stable et tu acceptes que l'IA continue tant que le risque reste borne | `python scripts/ai.py /ads-auto <projet> "<besoin>"` |
| `/ads-image` | Partir d'une image jointe | Mockup, capture, maquette, export Figma, screenshot client | `python scripts/ai.py /ads-image <projet> <image> "<besoin>"` |
| `/ads-file` | Partir d'un document ou d'un ZIP | PDF, DOC, DOCX, tableur, handoff ZIP, archive de projet | `python scripts/ai.py /ads-file <projet> <fichier> "<besoin>"` |
| `/ads-new-project` | Cadrer un projet neuf ou presque vide | Nouveau dossier, specs brutes, docs, images, ZIP, mais pas encore de vraie architecture code | `python scripts/ai.py /ads-new-project <projet> "<besoin>"` |
| `/ads-discover-project` | Comprendre un projet existant avant modification | Repo deja vivant avec code, tests, docs et architecture a lire | `python scripts/ai.py /ads-discover-project <projet> "<besoin>"` |

## 2. Voir L'Etat Et Verifier

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-status` | Voir ou en est le systeme | Tu veux savoir quoi lire, quoi faire ensuite, ou quel run/session est actif | `python scripts/ai.py /ads-status <projet>` |
| `/ads-check` | Verifier l'installation et les fichiers critiques | Tu veux confirmer que le systeme est bien installe ou qu'une upgrade n'a rien casse | `python scripts/ai.py /ads-check <projet>` |
| `/ads-host-probe` | Verifier un host precis | Tu veux savoir si `codex`, `claude-code`, `cursor`, `windsurf` ou `mock` est exploitable proprement | `python scripts/ai.py /ads-host-probe <projet> --executor <host>` |
| `/ads-host-smoke` | Voir la sante multi-hotes | Tu veux une vue consolidee des hosts disponibles, de leurs limites et du chemin Governor recommande | `python scripts/ai.py /ads-host-smoke <projet>` |

## 3. Gouverner Une Session Governor

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-governor-init` | Ouvrir une session Governor | Tu veux que Governor prenne le pilotage d'un chantier | `python scripts/ai.py /ads-governor-init <projet> "<besoin>"` |
| `/ads-governor-resume` | Reprendre une session Governor apres fermeture de Codex | Tu veux reconstruire l'etat exact depuis les artefacts et produire le prompt de reprise | `python scripts/ai.py /ads-governor-resume <projet> <session>` |
| `/ads-governor-next` | Preparer la prochaine etape d'execution | Tu veux generer `execution-prompt.md`, `execution-handoff.md` et la prochaine tranche courte | `python scripts/ai.py /ads-governor-next <projet> <session>` |
| `/ads-governor-review` | Enregistrer la revue d'une etape | Une etape a ete executee, tu veux consigner la decision, la preuve et la prochaine action | `python scripts/ai.py /ads-governor-review <projet> <session> --decision <decision> --validation "<preuve>" --next-action "<suite>"` |
| `/ads-governor-update` | Mettre a jour l'etat de session | Tu veux corriger ou expliciter `status`, `last_decision` ou `next_action` sans relancer toute la revue | `python scripts/ai.py /ads-governor-update <projet> <session> --status <statut> --last-decision "<decision>" --next-action "<suite>"` |
| `/ads-governor-loop` | Utiliser la boucle Governor assistee | Tu veux preparer, relire et enchainer plusieurs etapes avec discipline | `python scripts/ai.py /ads-governor-loop <projet> <session> --prepare` ou `--auto-run` ou `--review-from-file ...` |
| `/ads-governor-run` | Faire executer une session par un host choisi | Tu veux que Governor pilote `codex`, `claude-code`, `cursor`, `windsurf` ou `mock` | `python scripts/ai.py /ads-governor-run <projet> <session> --executor <host>` |
| `/ads-governor-status` | Voir l'etat Governor depuis l'alias conversationnel | Tu es deja dans une logique Governor et tu veux simplement l'etat courant | `python scripts/ai.py /ads-governor-status <projet>` |
| `/ads-governor-package` | Construire un paquet Governor portable | Tu veux distribuer le kit Governor sans tout le systeme source | `python scripts/ai.py /ads-governor-package --output-dir dist` |

## 4. Cas D'Usage Governor En Langage Simple

| Si tu veux... | Ecris... | Ce qui se passe ensuite |
| --- | --- | --- |
| Demarrer un chantier pilote proprement | `/ads-governor-init Ajouter une page contact simple` | Governor ouvre une session, fixe un cadre, une prochaine action et les artefacts de reprise |
| Reprendre apres fermeture de Codex | `/ads-governor-resume` | Governor reconstruit le prompt de reprise depuis la session existante |
| Donner du travail borne a l'executeur IA | `/ads-governor-next` | Governor prepare le prompt d'execution et les fichiers utiles a l'etape suivante |
| Dire "cette etape est relue" | `/ads-governor-review validee` | Governor enregistre la preuve et decide la suite |
| Corriger l'etat sans relancer tout le flux | `/ads-governor-update` | La session est remise a jour proprement |
| Enchainer plusieurs tours sans perdre le fil | `/ads-governor-loop` | Governor applique sa boucle de preparation, review et continuation |
| Lancer un host precis | `/ads-governor-run codex` | Governor prepare, lance le host et garde la reprise lisible |

## 5. Apprentissage Et Evolution Controlee

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-learn` | Capturer une lecon utile | Une erreur, une bonne pratique ou une correction doit etre retenue | `python scripts/ai.py /ads-learn <projet> "<resume>" --lesson "<lecon>" --recommendation "<amelioration>"` |
| `/ads-promote-learning` | Promouvoir une lecon vers le systeme source | Une lecon locale est assez solide pour devenir officielle | `python scripts/ai.py /ads-promote-learning <projet> --dry-run --source-path <repo-source>` puis `--apply --governor-confirmed` |
| `/ads-stack-gap` | Declarer un manque de couverture stack | Le projet utilise une techno que le systeme ne couvre pas encore assez bien | `python scripts/ai.py /ads-stack-gap <projet> "<stack>" --need "<raison>"` |

## 6. Benchmark, Comparaison Et Preuve Marche

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-benchmark` | Preparer un benchmark gouverne | Tu veux creer un workspace benchmark avec scorecard, runbook, rapport public et backlog de captures, soit en mode marche, soit en mode exploitation reelle | `python scripts/ai.py /ads-benchmark <projet> --benchmark-name <nom> --wave <base|exploitation|extended|all>` |
| `/ads-benchmark-record` | Enregistrer une execution benchmarkee | Une offre et un scenario ont ete executes, tu veux remplir la preuve sans edition manuelle dispersee | `python scripts/ai.py /ads-benchmark-record <projet> --benchmark-name <nom> --offer <offre> --scenario <scenario> --status <statut> ...` |
| `/ads-benchmark-summarize` | Consolider les captures benchmark | Tu veux recalculer le manifest, la synthese, la preuve economique et le backlog de captures | `python scripts/ai.py /ads-benchmark-summarize <projet> --benchmark-name <nom>` |
| `/ads-benchmark-verify` | Verifier qu'un benchmark est defendable | Tu veux controler la coherence avant publication | `python scripts/ai.py /ads-benchmark-verify <projet> --benchmark-name <nom>` |
| `/ads-benchmark-publish` | Produire le bundle de publication | Le benchmark est assez mature pour sortir un rapport publiable et son archive | `python scripts/ai.py /ads-benchmark-publish <projet> --benchmark-name <nom>` |

## 7. Memoire RAG Locale

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-rag-index` | Construire l'index RAG local | Gros projet ou besoin de retrouver vite les bonnes sources internes | `python scripts/ai.py /ads-rag-index <projet>` |
| `/ads-rag-refresh` | Rafraichir l'index RAG | Le code a bouge et tu veux mettre la memoire de recherche a jour | `python scripts/ai.py /ads-rag-refresh <projet>` |
| `/ads-rag-status` | Voir si l'index existe et est a jour | Tu veux savoir si la memoire locale est exploitable | `python scripts/ai.py /ads-rag-status <projet>` |
| `/ads-rag-query` | Poser une question a la memoire locale | Tu veux retrouver rapidement quelles sources locales parlent d'un sujet | `python scripts/ai.py /ads-rag-query <projet> "<question>"` |

## 8. Handoff, MCP Et Exploitation

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-handoff` | Passer le relais a un autre agent ou a plus tard | Changement d'agent, reprise differee, credits epuises, session a transmettre | `python scripts/ai.py /ads-handoff <projet> "<etat>" "<prochaine action>" --current-agent <agent> --next-agent <agent>` |
| `/ads-mcp` | Preparer une configuration MCP | Tu veux brancher un serveur MCP a un host donne | `python scripts/ai.py /ads-mcp <projet> <nom-mcp> <commande-serveur> --target-agent <host>` |

## 9. Mise A Jour Et Distribution

| Commande | A quoi ca sert | Quand l'utiliser | Traduction technique |
| --- | --- | --- | --- |
| `/ads-upgrade-system` | Mettre a jour la copie `.ai-dev-system` d'un projet | Le repo source a evolue et tu veux propager la nouvelle version | `python scripts/ai.py /ads-upgrade-system <projet> --dry-run` puis `--apply` |
| `/ads-package-system` | Fabriquer un paquet portable du systeme complet | Tu veux diffuser le systeme sur une autre machine ou sans repo source local | `python scripts/ai.py /ads-package-system --output-dir dist` |

## 10. Alias Acceptes Mais Non Recommandes

Ces formes existent encore pour compatibilite.
Pour l'UX, la forme recommandee reste `/ads-*` en documentation generale, mais dans Codex chat il faut preferer la forme sans slash `ads-*`.

| Alias accepte | Equivalent recommande |
| --- | --- |
| `/init` | `/ads-init` |
| `/governor-init` | `/ads-governor-init` |
| `/governor-next` | `/ads-governor-next` |
| `/governor-review` | `/ads-governor-review` |
| `/governor-update` | `/ads-governor-update` |
| `/governor-loop` | `/ads-governor-loop` |
| `/governor-run` | `/ads-governor-run` |
| `/governor-status` | `/ads-governor-status` |
| `/governor-package` | `/ads-governor-package` |
| `/ads-bootstrap-project` | `/ads-new-project` |

`/ads-auto-orchestrated` est aussi accepte comme alias technique de `/ads-auto`, mais la forme conseillee pour un humain reste `/ads-auto`.

## 11. Parcours Recommandes Pour Un Non Technique

### Commencer un projet existant sans se tromper

1. `/ads-init`
2. `/ads-discover-project Comprendre ce projet avant modification`
3. `/ads-check`
4. `/ads-semi-auto <besoin>` ou `/ads-governor-init <besoin>`

### Travailler avec Governor

1. `/ads-governor-init <besoin>`
2. `/ads-governor-next`
3. l'executeur IA fait l'etape
4. `/ads-governor-review validee`
5. `/ads-governor-next` ou `/ads-governor-loop`

### Mettre a jour le systeme dans un projet cible

1. `/ads-upgrade-system --dry-run`
2. lire le rapport
3. `/ads-upgrade-system --apply`
4. `/ads-check`

### Faire un benchmark propre

1. `/ads-benchmark`
2. `/ads-benchmark-record`
3. `/ads-benchmark-summarize`
4. `/ads-benchmark-verify`
5. `/ads-benchmark-publish`

## 12. Verdict

Non, la documentation UX non technique n'etait pas encore totalement exhaustive avant ce document.

Maintenant, la surface conversationnelle exposee par `scripts/ai.py` est couverte ici avec :

- les commandes Governor ;
- les commandes ADS hors Governor ;
- leur usage ;
- leur traduction technique ;
- les alias encore acceptes.
