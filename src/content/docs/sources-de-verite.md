# Sources De Verite

## Pourquoi ce document existe

Ce document cartographie les fichiers qui gouvernent les parties critiques de AI Dev System.

Objectif :
- savoir quel fichier fait autorite selon le domaine
- distinguer les sources principales des fichiers secondaires
- noter les ambiguites a traiter dans une etape ulterieure

Ce document ne modifie pas l'architecture.
Il ne change pas le comportement fonctionnel du systeme.

## Regle de lecture

Une source principale est le fichier qui doit etre consulte en premier pour trancher une question sur un domaine.

Une source secondaire documente, explique, indexe ou applique cette source principale.

## Cartographie

| Domaine | Source principale | Sources secondaires | Role |
| --- | --- | --- | --- |
| Version systeme | `VERSION` | `system.yml`, `README.md`, `CHANGELOG.md` | `VERSION` porte la version release officielle. `system.yml.release_version` doit la reprendre. `README.md` l'affiche. `CHANGELOG.md` documente les changements par version. |
| Schema interne | `system.yml` | `README.md` | `system.yml.version` porte la version de schema interne. `README.md` l'explique comme schema interne, pas comme release produit. |
| Phases du workflow | `system.yml` | `README.md`, `docs/concepts/core/workflows-et-architecture.md`, `docs/modes/*` | `system.yml.phases` liste les phases canoniques. Les docs traduisent ces phases en parcours lisibles. |
| Modes de fonctionnement | `system.yml` | `docs/modes/*`, `scripts/start-ai-dev.*`, `scripts/start-auto-orchestrated-run.*` | `system.yml.operating_modes` liste les modes. Les guides expliquent l'usage. Les scripts les appliquent. |
| Boucle multi-etapes | `docs/concepts/core/boucle-execution-multi-etapes.md` | `templates/execution-loop.yml`, `governor-kit/templates/execution-loop.yml`, `docs/modes/auto-orchestrated-mode.md`, `prompts/auto-orchestrator.md`, `host-adapters/codex/governor-session.md` | Le document canonique definit quand enchainer, corriger, recadrer, bloquer ou cloturer. Les templates materialisent la boucle dans les runs framework et les sessions Governor. |
| Apprentissage controle | `docs/concepts/core/boucle-apprentissage-controle.md` | `.ai-dev-system/learning-reports/`, `memory/`, `scripts/core/ai_dev_cli.py`, `docs/concepts/core/contrat-upgrade-project-instance.md` | Le contrat definit comment capturer les apprentissages dans le repo source ou une Project Instance sans mutation silencieuse. Les rapports locaux restent proteges par l'upgrade. |
| Couches canoniques | `docs/concepts/core/architecture-couches-canoniques.md` | `docs/concepts/core/couches-du-systeme.md`, `system.yml`, `governor-kit/package.yml`, `docs/concepts/governor/*` | Le document d'architecture canonique definit les quatre couches Framework Core, Governor Kit, Host Adapter et Project Instance. `couches-du-systeme.md` explique les briques internes. `system.yml` et `governor-kit/package.yml` declarent les artefacts concrets. |
| Upgrade Project Instance | `docs/concepts/core/contrat-upgrade-project-instance.md` | `docs/concepts/core/architecture-couches-canoniques.md`, `scripts/bootstrap-ai-dev-system.py`, `scripts/core/ai_dev_cli.py`, `rules/operational-policies.md` | Le contrat d'upgrade definit ce qu'une mise a jour de `.ai-dev-system/` a le droit de remplacer, proteger, reporter comme conflit et verifier dans un projet cible. |
| Distribution portable | `docs/concepts/core/contrat-distribution-portable.md` | `docs/concepts/core/contrat-upgrade-project-instance.md`, `scripts/ai.py`, `scripts/core/ai_dev_cli.py`, `CHANGELOG.md`, `VERSION` | Le contrat de distribution portable definit le paquet systeme transportable, son manifeste, ses exclusions et son usage comme source d'upgrade multi-machine. |
| Quality gates | `rules/quality-gates.md` | `system.yml`, `README.md`, guides de modes | `rules/quality-gates.md` definit les gates en detail. `system.yml.quality_gates` fournit l'index canonique court. |
| Claims Governor | `rules/governor-claim-policies.yml` | `system.yml.governor_claim_policy`, `scripts/core/ai_dev_cli.py`, `docs/concepts/governor/operation/governor-charter.md`, `rules/quality-gates.md` | `rules/governor-claim-policies.yml` definit les niveaux de claims autorises, leurs marqueurs de detection, le seuil de preuve et les quality gates minimaux a tenir avant qu'un claim soit accepte. |
| Profils de preuve Governor | `rules/governor-evidence-profiles.yml` | `scripts/core/ai_dev_cli.py`, `templates/executor-return.yml`, `docs/maintenance/benchmark-concurrentiel-governor-vs-agents-ia.md` | `rules/governor-evidence-profiles.yml` definit les profils de preuve explicites comme `ui` et `api`, avec les marqueurs de preuve que Governor doit exiger quand `evidence_profile` est renseigne dans `executor-return.yml`. |
| Policies operatoires | `rules/operational-policies.md` | `system.yml.operational_policies`, `rules/global-rules.md`, `rules/security.md`, `docs/maintenance/versioning-et-git.md` | `rules/operational-policies.md` classe les actions en `autorise`, `sensible`, `confirmation_requise` et `a_eviter`. `system.yml` expose la policy comme source canonique courte. Les autres regles restent les references specialisees. |
| Agents | `agents/*.md` | `system.yml`, `integrations/skills/ai-tools/*.toml`, `docs/concepts/core/couches-du-systeme.md` | `agents/*.md` definit les roles generaux. Les profils `.toml` definissent des postures operationnelles. `system.yml` declare les profils embarques et leurs activations. |
| Regles transverses | `rules/*.md` | `system.yml.behavior`, `README.md`, docs conceptuelles | Les fichiers `rules/*.md` portent les garde-fous detailles. `system.yml.behavior` resume les comportements attendus. |
| Stacks et profils | `stacks/*.md` | `system.yml.stack_profiles`, `README.md`, `docs/getting-started/guide-utilisation.md` | `stacks/*.md` porte le contenu des profils. `system.yml.stack_profiles` liste les profils attendus par le systeme. |
| Templates | `templates/*.md` et `templates/*.yml` | `system.yml.entrypoints`, `README.md`, guides | Les templates definissent les formulaires reutilisables. `system.yml.entrypoints` liste les templates a connaitre comme points d'entree. |
| Templates de run | `templates/*.md` pour les formes de reference | `scripts/core/ai_dev_cli.py`, `docs/modes/*` | Les templates donnent la forme cible. Le runner Python genere certains artefacts de run inline dans `scripts/core/ai_dev_cli.py`. |
| Scripts et commandes | `scripts/README.md` | `scripts/ai.py`, `scripts/ai.ps1`, `scripts/core/ai_dev_cli.py`, scripts publics `scripts/*.py` et `scripts/*.ps1`, `README.md`, guides | `scripts/README.md` indexe les commandes et leur role. `scripts/ai.py` est la facade simple recommandee. `scripts/core/` porte l'implementation partagee. Les wrappers publics restent a la racine pour eviter de casser les commandes documentees. |
| Integrations | `system.yml.integrations` | `integrations/README.md`, `integrations/mcp/*`, `integrations/plugins/*`, `integrations/skills/*`, `integrations/host-imports/codex/*`, `integrations.local.example.yml`, `docs/concepts/integrations/capacites-systeme-vs-capacites-hote.md` | `system.yml.integrations` declare la politique et les catalogues embarques. `integrations/` contient les skills embarques, les catalogues MCP sans secret et les catalogues de plugins hote. Les snapshots sous `integrations/host-imports/codex/` servent de preuve d'inventaire et de reconciliation portable d'un home Codex observe, sans devenir source de verite canonique. Le document de separation systeme/hote interdit qu'une capacite observee dans un hote devienne une source de verite canonique par simple presence. |
| Selection des ressources | `system.yml.integrations.resource_recommendation_rules` | `system.yml.integrations.resource_selection_policy`, `docs/concepts/integrations/skills-et-mcp.md`, `docs/concepts/integrations/politique-selection-ressources-amplificatrices.md`, `templates/execution-prompt.md`, `governor-kit/templates/current-scope.md`, `docs/concepts/governor/overview/workflow-ai-delivery-governor.md` | La policy dit quand proposer agents, sous-agents, skills, MCP et outils hote. Le document de selection formalise la grille de score, les triggers et le reporting attendu. Les templates materialisent cette selection dans les prompts et sessions Governor. |
| Comparaison avec Codex configure | `docs/concepts/integrations/comparaison-framework-governor-codex.md` | `docs/concepts/integrations/analyse-codex-local-r8.md`, `docs/concepts/core/architecture-couches-canoniques.md`, `docs/concepts/governor/operation/contrat-execution-universel.md` | Le document compare Framework seul, Governor et Codex configure pour guider les choix d'usage et les evolutions d'autonomie. |
| Contrat d'execution universel | `docs/concepts/governor/operation/contrat-execution-universel.md` | `docs/concepts/governor/artifacts/format-prompt-execution-ai.md`, `docs/concepts/governor/artifacts/format-revue-etape-governor.md`, `templates/execution-prompt.md`, `templates/stage-review.md`, `governor-kit/templates/session-manifest.yml`, `governor-kit/templates/current-scope.md`, `governor-kit/templates/resume-brief.md`, `docs/concepts/governor/operation/contrat-host-adapter.md` | Le contrat definit les entrees, sorties et invariants entre Governor et agent d'execution IA generique. Il est aussi la source de verite du vocabulaire `work_mode`, `active_task_status` et `requirements_coverage_*` dans les artefacts courts. |
| Boucle Governor assistee | `docs/concepts/governor/operation/boucle-governor-assistee.md` | `docs/concepts/governor/operation/contrat-execution-universel.md`, `docs/concepts/governor/operation/contrat-host-adapter.md`, `governor-kit/templates/execution-loop.yml`, `host-adapters/*/governor-session.md`, `scripts/core/ai_dev_cli.py` | Le contrat definit comment enchainer preparation, execution par l'hote, retour, revue, mise a jour et preparation suivante sans runtime autonome ni decision automatique. Il fixe aussi le miroir court du control plane Governor dans `execution-loop.yml`. |
| Autopilot Governor | `docs/concepts/governor/operation/governor-autopilot-consolidation.md` | `docs/concepts/governor/operation/routeur-central-governor-autopilot.md`, `docs/concepts/governor/operation/surface-utilisateur-governor-autopilot.md`, `docs/concepts/governor/operation/detection-contexte-session-governor-autopilot.md`, `docs/concepts/governor/operation/reprise-repair-readiness-governor-autopilot.md`, `docs/concepts/governor/operation/classification-gouvernance-ressources-governor-autopilot.md`, `docs/concepts/governor/operation/gates-automatiques-governor-autopilot.md`, `docs/concepts/governor/operation/dashboard-journal-evenementiel-governor-autopilot.md`, `scripts/ai.py`, `scripts/core/ai_dev_cli.py`, `governor-kit/templates/session-event-log.yml`, `governor/autopilot-consolidation/A1-architecture-validation.md`, `governor/autopilot-consolidation/A2-routeur-validation.md`, `governor/autopilot-consolidation/A3-surface-validation.md`, `governor/autopilot-consolidation/A4-session-detection-validation.md`, `governor/autopilot-consolidation/A5-repair-readiness-validation.md`, `governor/autopilot-consolidation/A6-gouvernance-ressources-validation.md`, `governor/autopilot-consolidation/A7-gates-validation.md`, `governor/autopilot-consolidation/A8-dashboard-event-log-validation.md`, `governor/autopilot-consolidation/A9-e2e-validation.md` | Ce bloc formalise la consolidation complete du parcours normal, la surface courte, la detection/session, la reprise/repair/readiness, la classification gouvernance/ressources, le journal append-only, les dashboards obligatoires et les gates proof/commit/push exposes par Autopilot. |
| Host Runtimes | `host-runtimes/README.md` | `host-runtimes/*/runtime.yml`, `scripts/core/ai_dev_cli.py`, `docs/getting-started/commandes-conversationnelles.md` | Le catalogue Host Runtime definit si un hote peut etre invoque par script, a quel niveau (`direct_capture`, `launch_only`, `adapter_only`, `unavailable`) et avec quels fallbacks. `host-probe` croise ce catalogue avec les adaptateurs pour produire une compatibilite multi-hotes lisible, puis `host-smoke` consolide cette lecture dans une matrice unique avec limitations residuelles. |
| Skills embarques | `system.yml.embedded_skills` | `integrations/skills/ai-tools/skills/*/SKILL.md`, `docs/concepts/integrations/contrat-canonique-skill.md`, `docs/concepts/integrations/triage-skills-codex.md`, `docs/concepts/integrations/capacites-systeme-vs-capacites-hote.md` | `system.yml` liste les skills attendus. Chaque `SKILL.md` porte la methode du skill. Le triage Codex documente l'import complet des skills utiles observes dans l'hote local comme trace historique. Le contrat canonique definit la structure attendue pour les nouveaux skills et les migrations progressives. |
| Profils d'agents `.toml` | `system.yml.embedded_agent_profiles` | `integrations/skills/ai-tools/*.toml` | `system.yml` liste les profils disponibles. Les fichiers `.toml` portent la posture detaillee. |
| MCP | `system.yml.integrations.known_mcp_catalog` | `integrations/mcp/host-observed-mcp-catalog.yml`, `integrations/mcp/governor-target-mcp-catalog.yml`, `integrations/mcp/*.pointer.md`, `docs/concepts/integrations/mcp-universel.md`, `docs/concepts/integrations/politique-risque-mcp-governor.md`, `docs/concepts/integrations/capacites-systeme-vs-capacites-hote.md`, `templates/mcp-server-definition.yml`, `mcp-configs/*/mcp-definition.yml` | Le catalogue MCP observe liste les MCP vus sans secret. Il reste un catalogue d'observation d'hote, pas une source de verite de gouvernance. Le catalogue cible Governor documente les ajouts strategiques. Les pointeurs MCP documentent les MCP lourds externes. Le template MCP formalise une definition portable. Les bundles dans `mcp-configs/` sont la preuve repo-locale d'une configuration generee. |
| Plugins hote | `system.yml.integrations.plugin_catalog` | `integrations/plugins/host-observed-plugin-catalog.yml`, `integrations/plugins/governor-target-plugin-catalog.yml`, `integrations/plugins/README.md`, `integrations/skills/ai-tools/skills/github-*`, `docs/concepts/integrations/capacites-systeme-vs-capacites-hote.md` | Le catalogue plugin observe documente les capacites d'hote vues sans les rendre obligatoires. Il reste un catalogue d'observation d'hote, pas une source de verite de gouvernance. Le catalogue cible Governor donne la direction produit. Les skills GitHub embarques servent de contrats de comportement quand le plugin ou `gh` est disponible. |
| Host Adapter | `docs/concepts/governor/operation/contrat-host-adapter.md` | `docs/concepts/core/architecture-couches-canoniques.md`, `docs/concepts/governor/operation/adaptateur-codex.md`, `host-adapters/README.md`, `host-adapters/codex/adapter.yml`, `host-adapters/codex/governor-session.md`, `docs/concepts/governor/operation/adaptation-agents-execution-ia-governor.md`, `rules/operational-policies.md`, `system.yml.integrations` | Le contrat Host Adapter definit la couche de traduction entre Governor Core, hote concret, agent d'execution IA et Project Instance. `adaptateur-codex.md` applique ce contrat au premier hote concret. `host-adapters/codex/` materialise la configuration concrete sans rendre Codex obligatoire. |
| Hierarchie d'instructions multi-couches | `docs/concepts/core/sources-de-verite.md` | `AGENTS.md`, `.ai-dev-system/PROJECT-LOCAL-ADAPTER.md`, artefacts de session Governor actifs, `host-adapters/*/adapter.yml`, `host-adapters/*/governor-session.md`, `templates/agents-md.md` | Cette ligne fixe l'ordre canonique entre instructions repo, contrat d'etape Governor, project-local adapter, adaptateur d'hote et templates. Les prompts globaux du host ou les rules personnelles externes au repo restent des entrees contextuelles utiles, mais ne deviennent pas source de verite du systeme tant qu'elles ne sont pas miroirisees dans le repo. |
| Memoire | `memory/README.md` et `memory/memory.md` | `memory/decision-log.md`, `memory/conventions.md`, `memory/patterns.md`, `memory/project-memory.md`, `system.yml.memory_policy`, `docs/concepts/core/guide-fonctionnement-interne.md` | `memory/README.md` indexe les fichiers. `memory/memory.md` porte la politique. Les autres fichiers portent les categories durables. `system.yml.memory_policy` distingue memoire persistante et transitoire. |
| Handoff inter-agent | `.ai-dev-system/handoff/` dans les projets bootstrapes | `rules/handoff.md`, `templates/agent-handoff.md`, `scripts/create-handoff.py`, `docs/concepts/continuity/handoff-inter-agent.md` | Le dossier de projet porte l'etat de passation. Les fichiers du systeme definissent la methode et generent la structure. |
| AI Delivery Governor | `docs/concepts/governor/overview/ai-delivery-governor.md` | `docs/concepts/governor/overview/architecture-operatoire-ai-delivery-governor.md`, `docs/concepts/governor/overview/sous-roles-ai-delivery-governor.md`, `docs/concepts/governor/overview/workflow-ai-delivery-governor.md`, `docs/concepts/governor/artifacts/format-prompt-execution-ai.md`, `docs/concepts/governor/artifacts/format-revue-etape-governor.md`, `docs/concepts/governor/artifacts/memoire-ai-delivery-governor.md`, `docs/concepts/governor/artifacts/contrats-artefacts-ai-delivery-governor.md`, `docs/concepts/governor/operation/incarnation-governor-et-couche-llm.md`, `docs/concepts/governor/operation/interface-operatoire-minimale-governor.md`, `docs/concepts/governor/operation/profils-exploitation-governor.md`, `docs/concepts/governor/operation/adaptation-agents-execution-ia-governor.md`, `docs/concepts/governor/artifacts/artefacts-demarrage-reprise-governor.md`, `docs/concepts/governor/packaging/packaging-minimal-governor.md`, `docs/concepts/governor/packaging/roadmap-implementation-governor.md`, `docs/getting-started/exploiter-ai-delivery-governor.md`, `docs/getting-started/guide-governor-cas-reel.md`, `docs/maintenance/phases-ai-delivery-governor.md` | `ai-delivery-governor.md` definit la cible. Les autres documents definissent l'architecture operatoire, les sous-roles, le workflow, les formats, la memoire, les contrats d'artefacts, l'incarnation, les profils, l'adaptation aux executants IA, les artefacts, le packaging et l'exploitation concrete. |
| Recherche documentaire | `rules/research.md` | `sources.md`, `prompts/verify-docs.md`, profils `docs_researcher` et `syntax_researcher` | `rules/research.md` dit quand verifier. `sources.md` liste les sources officielles preferees. |
| Budget de contexte | `rules/context-budget.md` | `docs/concepts/core/context-budget.md`, `system.yml.context_policy` | La rule porte les garde-fous. `system.yml.context_policy` expose la politique globale. |
| Git et versioning | `docs/maintenance/versioning-et-git.md` | `CHANGELOG.md`, `VERSION`, `ROADMAP.md`, `rules/global-rules.md` | Le guide Git definit la pratique. Les fichiers de version et changelog documentent l'etat courant. |

## Ambiguites identifiees

### Phases du workflow

`system.yml.phases` contient une liste detaillee :
- `intake`
- `spec`
- `architecture`
- `planning`
- `implementation`
- `validation`
- `review`
- `hardening`
- `memory`

`README.md` presente une boucle simplifiee en 7 etapes.

Statut :
- pas de conflit fonctionnel identifie
- la difference est une simplification pedagogique
- a surveiller si une etape future veut rendre les phases strictement machine-readable partout

### Quality gates

`system.yml.quality_gates` liste les identifiants canoniques.
`rules/quality-gates.md` contient la definition detaillee et actionnable de chaque gate.

Statut :
- pas de conflit bloquant identifie
- la source detaillee est `rules/quality-gates.md`
- `system.yml` sert d'index canonique court

### Claims Governor

`system.yml.governor_claim_policy` pointe vers `rules/governor-claim-policies.yml`.
Ce fichier relie chaque claim Governor fort (`validated`, `complete`, `deployable`, `handoff_ready`, `production_ready`) a un seuil de preuve et a une liste de quality gates minimaux.

Statut :
- pas de conflit bloquant identifie
- la source detaillee est `rules/governor-claim-policies.yml`
- `rules/quality-gates.md` reste la reference semantique des gates cites par la policy

### Templates de run

Les templates reutilisables vivent dans `templates/`.
Le script `scripts/core/ai_dev_cli.py` genere aussi certains artefacts de run avec du contenu inline :
- `project-spec.md`
- `ui-spec-from-image.md`
- `tech-profile.md`
- `test-plan.md`
- `frontend-contract.md`
- `api-contract.md`
- `AGENTS.md`
- `run-manifest.yml`

Statut :
- ambiguite importante a documenter
- pas de correction structurelle dans cette etape
- recommandation future : decider si les contenus inline doivent rester source d'application ou etre rapproches des templates

### Hierarchie d'instructions multi-couches

Le benchmark web du 2026-05-01 montre que le marche rend explicites plusieurs couches d'instructions :
- instructions versionnees dans le repo ;
- instructions scopees par sous-arbre ;
- contrat actif de session ou d'etape ;
- conventions d'hote ;
- prompts globaux ou rules personnelles hors repo.

Statut :
- ambiguite historique reduite mais pas encore canoniquement ecrite partout avant cette tranche ;
- le systeme doit traiter les instructions hors repo comme du contexte decouvert, pas comme une source canonique silencieuse ;
- la precedence cible dans AI Dev System / Governor est :
  1. instructions directes systeme / developpeur / utilisateur ;
  2. `AGENTS.md` le plus proche du chemin cible, puis remontree vers les `AGENTS.md` parents ;
  3. artefact Governor actif de l'etape en cours (`runtime-prompt.md`, `execution-handoff.md`, `execution-prompt.md`, `current-scope.md`) sans contredire les niveaux superieurs ;
  4. `.ai-dev-system/PROJECT-LOCAL-ADAPTER.md` ;
  5. `host-adapters/<host>/adapter.yml` et `host-adapters/<host>/governor-session.md` ;
  6. templates et exemples versionnes ;
  7. prompts globaux d'hote, user rules ou memories non miroirises dans le repo, seulement comme contexte secondaire a signaler en cas de conflit.

### Integrations

`system.yml` declare le catalogue embarque.
`integrations/` contient les fichiers reels.
`integrations.local.yml` peut exister localement mais n'est pas versionne.

Statut :
- pas de conflit identifie
- la configuration locale peut diverger selon la machine
- le `doctor` sert de garde-fou quand `integrations.local.yml` existe

### Version

Les fichiers consultes sont coherents :
- `VERSION` : `1.2.0`
- `system.yml.release_version` : `1.2.0`
- `README.md` : `1.2.0`
- `CHANGELOG.md` : section `1.2.0`

Statut :
- pas de conflit identifie
- `VERSION` est la source principale

### AI Delivery Governor

La couche Governor construite en Phase 2 est documentee par plusieurs fichiers, chacun avec un role distinct :
- la specification cible est dans `docs/concepts/governor/overview/ai-delivery-governor.md`
- l'architecture operatoire est dans `docs/concepts/governor/overview/architecture-operatoire-ai-delivery-governor.md`
- les sous-roles internes sont dans `docs/concepts/governor/overview/sous-roles-ai-delivery-governor.md`
- le workflow est dans `docs/concepts/governor/overview/workflow-ai-delivery-governor.md`
- les formats standard sont dans `docs/concepts/governor/artifacts/format-prompt-execution-ai.md` et `docs/concepts/governor/artifacts/format-revue-etape-governor.md`
- la memoire specifique est dans `docs/concepts/governor/artifacts/memoire-ai-delivery-governor.md`
- les contrats d'artefacts sont dans `docs/concepts/governor/artifacts/contrats-artefacts-ai-delivery-governor.md`
- l'exploitation concrete est dans `docs/getting-started/exploiter-ai-delivery-governor.md` et `docs/getting-started/guide-governor-cas-reel.md`
- l'incarnation, la session, l'interface, les profils, l'adaptation aux agents IA, les artefacts de demarrage, le packaging et la roadmap MVP sont dans `docs/concepts/governor/`

Statut :
- pas de conflit fonctionnel identifie
- `docs/concepts/governor/overview/ai-delivery-governor.md` reste la source principale de definition cible
- les documents de Phase 2 et Phase 3 sont des sources operatoires secondaires

## Recommandations minimales pour la suite

- Garder `VERSION` comme source principale de version release.
- Garder `system.yml` comme manifeste central pour les phases, modes, politiques, catalogues et entrypoints.
- Garder les fichiers `rules/*.md`, `agents/*.md`, `stacks/*.md`, `templates/*` et `memory/*.md` comme sources de contenu detaille de leur domaine.
- Traiter l'ambiguite des templates de run dans une etape separee, car elle touche potentiellement le comportement des scripts.
- Eviter de corriger les divergences pedagogiques tant qu'elles n'impactent pas le comportement ou la comprehension.

## Resume court

Le systeme a une source principale claire dans la plupart des domaines.

Le point le plus important a surveiller est la coexistence entre :
- les templates de reference dans `templates/`
- les artefacts generes inline par `scripts/core/ai_dev_cli.py`

Cette etape documente l'ambiguite sans la corriger.
