# Skills Et MCP

## Pourquoi ce document existe

Ce document explique comment le systeme utilise :
- des `skills`
- des profils d'agents `.toml`
- des `MCP`
- des agents framework
- des sous-agents ou profils specialises disponibles dans l'hote d'execution

L'objectif est double :
- recommander ou utiliser les bons outils quand c'est pertinent et disponible
- laisser la possibilite de les forcer manuellement si besoin

## Idee simple

Le systeme a maintenant une regle de fonctionnement claire :
- recommandation automatique par defaut quand le contexte s'y prete
- possibilite de forcer manuellement une activation ou une desactivation

Autrement dit :
- si le systeme reconnait clairement un cas Odoo + OWL, il peut activer les briques Odoo adaptees
- si toi, tu veux imposer ou empecher une brique, tu peux le faire explicitement

Regle importante :
- le systeme doit proposer les ressources utiles avant une execution significative
- il doit expliquer pourquoi elles sont utiles
- il ne doit pas activer une ressource uniquement parce qu'elle existe
- il doit annoncer le mode degrade si une ressource utile n'est pas disponible

## Organisation dans le repo

Le systeme utilise une organisation hybride :
- les skills legers sont embarques dans `integrations/skills/ai-tools`
- les skills embarques sont declares comme capacites natives dans `system.yml`
- les MCP observes dans un hote concret sont catalogues sans secret dans `integrations/mcp/host-observed-mcp-catalog.yml`
- les plugins observes sont catalogues dans `integrations/plugins/host-observed-plugin-catalog.yml`
- les serveurs MCP lourds ou secrets restent externes

Pourquoi :
- les skills sont assez legers pour etre sauvegardes avec le systeme
- les MCP peuvent demander des secrets, une authentification ou des dependances locales
- les plugins dependent de l'hote qui execute la session
- le systeme reste portable sans devenir enorme

## Difference entre skill et MCP

### Agent framework

Un agent framework est une fiche de role dans `agents/`.

Exemples :
- `agents/planner.md`
- `agents/architect.md`
- `agents/implementer.md`
- `agents/reviewer.md`
- `agents/tester.md`

Il sert a definir la posture attendue : planifier, cadrer, executer, relire ou tester.

### Sous-agent ou profil specialise

Un sous-agent ou profil specialise est une capacite d'hote, par exemple un profil `.toml` embarque ou un sous-agent disponible dans l'executeur IA.

Exemples :
- `repo_analyst`
- `spec_orchestrator`
- `execution_architect`
- `qa_reviewer`
- `docs_researcher`
- `browser_debugger`

Il sert a traiter une partie separable du travail quand l'hote le permet.
Il ne doit pas etre utilise si cela ajoute de la coordination sans benefice clair.

### Skill

Un skill est une methode de travail specialisee.

Exemple :
- un skill Odoo
- un skill de synthese de spec
- un skill de delivery frontend

Le skill aide l'agent a mieux travailler.

### Profil `.toml`

Un profil `.toml` est une posture d'agent specialisee.

Exemple :
- `repo_analyst.toml`
- `spec_orchestrator.toml`
- `qa_reviewer.toml`
- `git_workflow_guardian.toml`

Le profil `.toml` aide l'agent a adopter le bon comportement pour une phase donnee.
Ce n'est pas la meme chose qu'un skill :
- le skill donne une methode
- le profil `.toml` donne une posture d'agent

### MCP

Un MCP est une source de contexte ou d'actions specialisees.

Dans ton cas, le MCP Odoo sert surtout a :
- analyser Odoo
- interroger les surfaces UI
- faire du runtime proof
- raisonner sur l'impact
- mieux guider les changements Odoo/OWL

Le MCP aide l'agent a mieux voir et verifier.

## Regle d'activation du systeme

Le systeme suit cette politique :

- `auto_with_manual_override`

Cela veut dire :
- auto par defaut si les conditions sont reunies
- override manuel possible si l'utilisateur veut forcer un comportement

Dans une sortie Governor ou framework, la recommandation doit idealement indiquer :
- agents framework utiles
- sous-agents ou profils specialises utiles
- skills utiles
- MCP utiles
- outils hote utiles : terminal, navigateur, upload, recherche, etc.
- ressources a eviter pour cette etape
- justification courte

## Skills natifs embarques

Les skills legers ne sont plus seulement des fichiers sauvegardes dans le repo.
Ils font partie du catalogue natif du systeme.

Le contrat canonique de redaction des skills est documente dans :
- `docs/concepts/integrations/contrat-canonique-skill.md`

Le triage des skills Codex locaux et leur integration sont documentes dans :
- `docs/concepts/integrations/triage-skills-codex.md`

La separation canonique entre capacites systeme et capacites hote est documentee dans :
- `docs/concepts/integrations/capacites-systeme-vs-capacites-hote.md`

Le catalogue officiel est declare dans `system.yml` :
- `embedded_skills_root` indique ou les skills sont stockes
- `embedded_skills` liste les skills disponibles
- `skill_activation` explique dans quels cas les preferer
- `embedded_agent_profiles_root` indique ou les profils `.toml` sont stockes
- `embedded_agent_profiles` liste les profils disponibles
- `agent_profile_activation` explique dans quels cas les preferer
- `resource_selection_policy` formalise la grille de score et les triggers

Cette organisation permet :
- d'utiliser les skills sans dependre du dossier source externe
- de bootstrapper un nouveau projet avec les skills deja disponibles
- de faire verifier la presence des skills par le `doctor`
- de recommander les MCP et plugins utiles sans copier de secrets ni forcer une dependance d'hote

## Separation Systeme / Hote

Regle simple :
- AI Dev System possede les methods, skills, profils et policies ;
- les hotes exposent des mecanismes et outils reels ;
- Governor ne doit jamais confondre une capacite observee dans un hote avec une capacite canonique du systeme.

## Catalogue Etendu Codex

Le systeme embarque maintenant les skills utiles observes dans la configuration Codex locale.

Cela ne veut pas dire que Codex devient obligatoire.
Cela veut dire que le framework et Governor disposent du meme niveau de methodes de travail, mais dans une forme portable.

Sources de verite :
- catalogue des skills : `system.yml.integrations.embedded_skills`
- fichiers des skills : `integrations/skills/ai-tools/skills/*/SKILL.md`
- catalogue MCP observe : `integrations/mcp/host-observed-mcp-catalog.yml`
- catalogue MCP cible Governor : `integrations/mcp/governor-target-mcp-catalog.yml`
- catalogue plugins observe : `integrations/plugins/host-observed-plugin-catalog.yml`
- catalogue plugins cible Governor : `integrations/plugins/governor-target-plugin-catalog.yml`

Regle Governor :
- choisir l'outil qui aide vraiment l'etape ;
- ne pas charger un skill ou MCP uniquement parce qu'il existe ;
- verifier la disponibilite du MCP ou plugin dans l'hote courant ;
- ne pas confondre un catalogue cible avec une disponibilite reelle ;
- annoncer le mode degrade si l'outil utile n'est pas disponible.

## Grille De Selection

La politique canonique est documentee dans :
- `docs/concepts/integrations/politique-selection-ressources-amplificatrices.md`

Governor doit maintenant evaluer les ressources avec au moins ces dimensions :

- `scope_fit`
- `execution_gain`
- `validation_gain`
- `host_availability`
- `setup_cost`
- `coordination_cost`

Regle simple :

- un skill est active s'il change materialement la methode ;
- un sous-agent n'est active que si la mission est separable et le cout de coordination justifie ;
- un MCP n'est active que s'il apporte une preuve ou un contexte specialise superieur a l'evidence locale.

Regle Governor renforcee :

- si l'hote supporte les sous-agents et qu'un sidecar court, non bloquant et clairement separable est visible, Governor doit preferer une delegation precoce plutot qu'un report par defaut ;
- les sidecars typiques a deleguer tot sont la cartographie repo, la revue QA, la preuve navigateur, la verification documentaire versionnee et la revue de spec.

Le systeme doit donc pouvoir expliquer :

```text
pourquoi cette ressource augmente la qualite de cette etape plus qu'elle n'ajoute de complexite
```

## Activation automatique par defaut

### Cas Odoo + OWL

Si le stack profile detecte ou choisi est :
- `fullstack-odoo-owl`

alors le systeme doit preferer automatiquement :
- le skill `odoo-19-workflow`
- le skill `development-workflow-orchestrator`
- et le MCP `odoo-ui-intelligence-v2`

### Cas frontend base sur image

Si la source principale est une image et que le travail est surtout frontend, le systeme peut preferer :
- `figma-to-responsive-ui`

### Cas workflow global

Si la tache est un vrai cycle de delivery complet, le systeme peut preferer :
- `development-workflow-orchestrator`

### Cas GitHub

Si la tache concerne une issue, une PR, une review GitHub, la CI ou une publication :
- `github-github`
- `github-gh-address-comments`
- `github-gh-fix-ci`
- `github-yeet`
- `git-workflow`

Le connecteur GitHub ou `gh` ne doivent etre utilises que si l'hote les expose et si l'authentification est disponible.

### Cas OpenAI ou Codex

Si la tache concerne OpenAI, Codex, les modeles, les schemas ou l'API :
- `openai-docs`
- `official-doc-verifier`
- `codex-planner` si une planification Codex-like est utile
- MCP `openaiDeveloperDocs` si l'hote l'expose

### Cas UI avancee

Si la tache concerne shadcn/ui, Framer Motion, GSAP, Figma ou une UI visuelle exigeante :
- `frontend-delivery-workflow`
- `frontend-skill`
- `make-interfaces-feel-better`
- `simplify`
- `frontend-design`
- `ui-ux-pro-max`
- `shadcn-ui-standards` si shadcn/ui est implique ou si aucun systeme de composants meilleur n'est etabli
- `framer-motion-standards` si Framer Motion est implique
- `gsap-motion-standards` si GSAP est implique
- MCP `Context7` ou `figma` seulement si cela apporte une preuve utile

Governor garde l'ordre de preference utilisateur visible dans les artefacts, mais execute l'ordre operationnel adapte a la tranche : cadrage UX/design system, direction visuelle, base composants, simplification, finition d'interface. Si le skill natif manque dans l'hote, Governor applique une projection equivalente et documente le skip.

### Cas MECID, BAO ou Meti

Si la tache concerne MECID, BAO, Meti ou un alignement metier Odoo :
- `odoo-19-workflow`
- `meti-rag-mecid`
- MCP `meti_rag` si configure dans l'hote
- MCP `odoo_ui_intelligence_v2` si une preuve Odoo locale est utile

### Cas n8n

Si la tache concerne un workflow n8n :
- `n8n-workflow-router`
- MCP `n8n-mcp` si configure avec les secrets locaux

### Cas creation de skills ou plugins

Si la tache concerne l'extension du systeme :
- `skill-creator`
- `skill-installer`
- `plugin-creator`

## Activation manuelle

Tu peux aussi demander explicitement :
- d'activer un skill
- d'activer un MCP
- d'en desactiver un

Exemples de formulation :
- "Utilise explicitement le skill odoo-19-workflow pour cette tache"
- "Active le MCP Odoo pour verifier la structure UI"
- "N'utilise pas le MCP sur cette tache"

## Quand forcer manuellement

Tu peux forcer manuellement si :
- tu sais deja quel skill est le meilleur
- tu veux eviter un skill non pertinent
- tu veux obliger l'usage du MCP sur une verification critique
- tu veux au contraire rester en mode purement local ou documentaire

## Comment le noter dans le projet

Les bons endroits pour declarer cela sont :
- `tech-profile.md`
- `AGENTS.md`

### Dans `tech-profile.md`

Tu peux documenter :
- skills disponibles
- MCP disponibles
- activation par defaut
- activation manuelle forcee
- limites de confiance

### Dans `AGENTS.md`

Tu peux documenter :
- skills a activer par defaut
- skills a forcer si besoin
- MCP a utiliser par defaut
- MCP a ne pas utiliser sans validation
- regle de confiance

## Fichier de configuration locale

Le systeme propose :
- `integrations.local.example.yml`

Tu peux en faire une copie locale nommee :
- `integrations.local.yml`

Puis y renseigner :
- le chemin des skills
- le chemin du MCP Odoo
- les regles d'activation

Ce fichier local n'est pas versionne par defaut.

Si tu n'as pas de `integrations.local.yml`, le systeme peut utiliser les skills embarques.
Pour le MCP Odoo, il faut garder un chemin local si tu veux que le `doctor` le verifie.

## Exemple de configuration locale

```yml
activation_mode: auto_with_manual_override

paths:
  skills_root: integrations\skills\ai-tools\skills
  odoo_mcp_root: C:\Users\moust\Documents\Work\tools\mcp_servers\odoo-ui-intelligence-v2-package
```

## Configuration MCP universelle

Le systeme ne doit pas considerer le MCP comme une configuration propre a un seul agent IA.

La bonne logique est :
- AI Dev System documente les informations universelles du MCP
- chaque agent IA les traduit dans son propre format de configuration

Informations universelles :
- nom logique du MCP
- commande a lancer
- arguments
- racine de travail
- timeouts
- caractere obligatoire ou optionnel

Exemples d'agents pouvant consommer cette logique :
- Codex
- Claude Code
- Cursor
- Windsurf
- un autre agent compatible MCP

Codex peut servir d'exemple concret, mais il ne doit pas devenir la seule cible du systeme.

Pour le detail, lis :
- `docs/concepts/integrations/mcp-universel.md`

### Generer une configuration MCP assistee

Le mode par defaut est :
- generation assistee
- pas de modification automatique des configurations globales
- validation humaine avant application

Commande type :

```text
python scripts/ai.py mcp C:\Work\mon-projet mon_mcp C:\chemin\vers\serveur.exe --target-agent universal
```

Le systeme genere alors :
- `.ai-dev-system/mcp-configs/<nom>/mcp-definition.yml`
- `.ai-dev-system/mcp-configs/<nom>/README.md`
- `.ai-dev-system/mcp-configs/<nom>/codex-config.toml` si la cible est `codex` ou `universal`

Ces fichiers sont des propositions.
Ils doivent etre relus avant d'etre copies dans la configuration globale d'un agent IA.

## Verification avec le doctor

Le `doctor` peut maintenant verifier :
- que le systeme est complet
- que la version, les entrypoints, les stack profiles, les quality gates, les contrats agents et la structure memoire restent coherents
- que les skills embarques declares dans `system.yml` existent bien
- que chaque skill embarque a un `SKILL.md`
- que chaque skill embarque a une configuration `agents/openai.yaml`
- que les profils `.toml` declares dans `system.yml` existent bien
- que les regles `agent_profile_activation` ne pointent pas vers un profil inconnu
- que les bundles MCP generes dans `mcp-configs/` ont bien une definition et une note minimales
- et, si `integrations.local.yml` existe, que les chemins externes configures existent bien

Commande :

```text
python scripts/doctor-ai-dev-system.py --project-path C:\Work\mon-projet
```

## Regle de confiance importante

Ni un skill ni un MCP ne remplacent le jugement.

Tu dois retenir :
- un skill guide mieux le travail
- un MCP donne plus de contexte ou de preuve
- mais une hypothese produit ou metier doit rester explicite
- et `rules/context-budget.md` doit eviter d'activer une brique lourde sans valeur claire

## Cas recommande pour toi

Dans ton usage principal, la bonne regle par defaut est :

- si `fullstack-odoo-owl` est choisi :
  - preferer le skill `odoo-19-workflow` s'il est disponible
  - preferer le skill `development-workflow-orchestrator` s'il est disponible
  - utiliser le MCP Odoo s'il est configure et utile pour une preuve

Et tu gardes toujours la possibilite de dire :
- "utilise-les"
- "n'utilise pas celui-ci"
- "force celui-la"

## Routage Framework Seul

Quand le framework est utilise sans Governor, il doit quand meme proposer les ressources utiles dans `artifacts/resource-routing.md`.

Ce routage doit rendre visibles :
- le skill prioritaire ;
- les skills complementaires a considerer ;
- les agents ou profils specialises utiles ;
- les MCP utiles seulement s'ils apportent une preuve ou un contexte supplementaire ;
- les outils hote utiles, par exemple terminal, recherche locale, upload chat ou navigateur ;
- la raison de selection et le cout de coordination attendu ;
- les validations a prevoir.

Regles par defaut :
- nouveau projet ou dossier presque vide : preferer `project-bootstrap`, `spec-synthesizer` et `test-strategy-builder` ;
- projet existant : preferer `repo-discovery`, `development-workflow-orchestrator` et `test-strategy-builder` ;
- demande avec image ou UI : ajouter `figma-to-responsive-ui`, `frontend-delivery-workflow` et `browser-proof-runbook` si une preuve visuelle est utile ;
- Odoo : ajouter `odoo-19-workflow`, `meti-rag-mecid` si MECID/BAO est implique, `official-doc-verifier` et le MCP Odoo/Meti/Context7 quand ils changent la qualite de decision ;
- GitHub : ajouter les skills GitHub et `git-workflow` si une PR, une issue, une CI ou une publication est en jeu ;
- OpenAI/Codex : ajouter `openai-docs`, `codex-planner` et le MCP `openaiDeveloperDocs` si l'hote l'expose ;
- n8n : ajouter `n8n-workflow-router` et le MCP `n8n-mcp` si disponible ;
- backend ou API : ajouter `development-workflow-orchestrator`, `official-doc-verifier` et une validation backend adaptee.

## En une phrase

Le systeme utilise maintenant les skills et le MCP comme des briques intelligentes :
- auto quand le contexte est clair
- manuel quand l'utilisateur veut reprendre la main.
