# MCP Universel

## Pourquoi ce document existe

Ce document explique comment brancher un MCP de facon universelle, quel que soit l'agent IA utilise :
- Codex
- Claude Code
- Cursor
- Windsurf
- un autre agent compatible MCP

L'objectif est de ne pas rendre le systeme dependant d'un seul outil.
Codex peut servir d'exemple concret, mais la logique doit rester portable.

## Idee simple

Un MCP n'est pas une fonctionnalite propre a Codex.

Un MCP est un serveur externe que l'agent IA peut interroger pour obtenir :
- du contexte specialise
- des outils de verification
- des preuves runtime
- des actions encadrees

La configuration exacte change selon l'agent IA, mais les informations de base restent les memes.

## Les informations universelles a connaitre

Pour configurer un MCP dans n'importe quel agent, il faut toujours connaitre :

| Information | Role |
| --- | --- |
| Transport | `stdio_command` ou `remote_http` |
| Nom logique | Nom court du serveur dans l'agent |
| Commande | Programme a lancer |
| Arguments | Parametres passes a la commande |
| URL distante | Endpoint MCP si le serveur est heberge |
| Dossier de travail | Racine servie par le MCP |
| Timeout | Temps maximum de demarrage et d'execution |
| Obligatoire ou optionnel | Est-ce que l'agent doit bloquer si le MCP est absent ? |
| Auth | `none`, `oauth`, `env`, `host_auth`, etc. |

Exemple pour le MCP Odoo :

```text
nom logique : odoo_ui_intelligence_v2
commande : C:\chemin\vers\.venv_win\Scripts\python.exe
arguments : -m odoo_ui_intelligence.mcp_server --workspace-root C:\...\odoo-ui-intelligence-v2-package
obligatoire : non
```

## Modele de configuration neutre

Le systeme peut documenter un MCP sous cette forme, sans imposer un outil IA precis :

```yml
mcp_servers:
  odoo_ui_intelligence_v2:
    command: C:\chemin\vers\python.exe
    args:
      - -m
      - odoo_ui_intelligence.mcp_server
      - --workspace-root
      - C:\chemin\vers\odoo-ui-intelligence-v2-package
    startup_timeout_sec: 20
    tool_timeout_sec: 600
    required: false
```

Ensuite, chaque agent IA traduit cette configuration dans son propre format.

## Mode par defaut : generation assistee

Par defaut, AI Dev System ne modifie pas directement la configuration globale d'un agent IA.

Il fait plutot ceci :
1. generer une definition MCP universelle
2. generer une proposition de configuration pour l'agent cible si possible
3. indiquer ou copier cette configuration
4. proposer ou executer un test local si l'utilisateur le demande
5. laisser l'utilisateur valider avant toute modification globale

Pourquoi :
- les configurations globales peuvent impacter tous les projets
- chaque agent IA a son propre format
- un chemin local peut etre valable sur une machine et faux sur une autre
- un MCP marque obligatoire peut bloquer le demarrage d'un agent

Commande portable pour un MCP `stdio_command` :

```text
python scripts/ai.py mcp C:\Work\mon-projet odoo_ui_intelligence_v2 C:\chemin\vers\python.exe --target-agent universal
```

Exemple pour un MCP `remote_http` :

```text
python scripts/ai.py mcp C:\Work\mon-projet notion --transport remote_http --remote-url https://mcp.notion.com/mcp --target-agent universal --auth-mode oauth
```

Exemple avance avec arguments serveur multiples :

Dans ce cas, on utilise le script direct parce qu'il expose toutes les options avancees du configurateur MCP.

```text
python scripts/configure-mcp.py --project-path C:\Work\mon-projet --name odoo_ui_intelligence_v2 --command C:\chemin\vers\python.exe --server-arg=-m --server-arg odoo_ui_intelligence.mcp_server --server-arg=--workspace-root --server-arg C:\chemin\vers\odoo-ui-intelligence-v2-package --target-agent codex
```

Resultat :
- le systeme cree un dossier `.ai-dev-system/mcp-configs/<nom-du-mcp>/`
- il y place une definition universelle
- il ajoute un fichier de notes pour les agents
- il ajoute un bloc Codex si l'agent cible est `codex` ou `universal`
- il peut produire un `verification-report.json` si `--run-test` est utilise
- il ne touche pas automatiquement aux fichiers globaux comme `config.toml`

## Niveaux de preuve MCP

Le repo distingue maintenant plusieurs niveaux de preuve MCP :

| Niveau | Signification |
| --- | --- |
| `configured` | le bundle existe, sans preuve d'execution |
| `technical` | le serveur demarre ou l'endpoint repond |
| `authenticated` | une authentification reelle est prouvee |
| `tool_call_ok` | un vrai parcours d'outil MCP est prouve |

Important :

- `technical` n'est pas synonyme de "pleinement operationnel"
- un `401` OAuth peut compter comme preuve `technical`
- un `--help` local peut compter comme preuve `technical`
- seul `authenticated` ou `tool_call_ok` permet d'affirmer qu'on a depasse le simple probe

## Vague De Configuration Strategique

Le catalogue cible distingue trois niveaux d'action :

| Niveau | Sens |
| --- | --- |
| `config_bundle_allowed` | Governor peut generer un bundle `mcp-configs/<nom>/` sans ecriture globale. |
| `catalog_only_*` | Governor connait le MCP et peut preparer une installation, mais l'activation attend un scope d'auth, de budget ou de securite. |
| `docs_only_*` | Governor utilise la ressource comme reference ou pattern, sans installation par defaut. |

La vague 2026-05 genere par defaut seulement :

- `mcp-configs/microsoft-learn/` : MCP distant officiel Microsoft Learn, sans secret ;
- `mcp-configs/chrome-devtools/` : MCP local Chrome DevTools, preuve technique de demarrage seulement.

Les candidats `sentry`, `browserbase`, `github`, `supabase`, `slack`, `hashicorp-vault` et `serena` restent catalogues mais non actives par defaut.
Ils requierent soit une authentification, soit un perimetre non-production, soit une revue de securite avant usage.

## Exemple d'adaptation par agent

### Codex

Codex lit sa configuration globale dans un fichier comme :

```text
C:\Users\<utilisateur>\.codex\config.toml
```

Exemple :

```toml
[mcp_servers.odoo_ui_intelligence_v2]
command = "C:\\chemin\\vers\\python.exe"
args = [
  "-m",
  "odoo_ui_intelligence.mcp_server",
  "--workspace-root",
  "C:\\chemin\\vers\\odoo-ui-intelligence-v2-package",
]
startup_timeout_sec = 20.0
tool_timeout_sec = 600.0
required = false
```

### Claude Code, Cursor, Windsurf ou autre agent

Le principe reste le meme :
- trouver l'emplacement de configuration MCP de l'outil
- declarer le meme nom logique
- declarer la meme commande
- declarer les memes arguments
- garder le serveur optionnel si le projet doit rester portable
- redemarrer l'agent si la configuration n'est pas rechargee automatiquement

Le format exact peut changer selon l'outil.
Le systeme ne doit donc pas supposer que tous les agents utilisent le format TOML de Codex.

## Verification universelle

Avant de configurer l'agent IA, il faut verifier soit que le serveur demarre localement, soit qu'un endpoint distant repond de facon credible.

Exemple :

```powershell
& "C:\chemin\vers\python.exe" -m odoo_ui_intelligence.mcp_server --help
```

Resultat attendu :
- l'aide du serveur s'affiche
- les options principales sont visibles
- la commande ne leve pas d'erreur de module manquant

Pour un MCP `remote_http`, la verification minimale devient :
- endpoint joignable
- documentation officielle coherente
- mode d'auth explicite

Le `doctor` peut maintenant aller plus loin avec un seuil de preuve explicite :

```text
python scripts/doctor-ai-dev-system.py --project-path C:\Work\mon-projet --mcp-proof-floor authenticated
```

Ce mode echoue si un MCP genere n'a qu'une preuve `technical` alors qu'on exige au moins `authenticated`.

Attention :

```text
endpoint joignable != MCP pleinement exploitable
```

Une reponse HTTP prouve l'existence du endpoint, pas l'etat final du login, des scopes ou des outils exposes.

Pour le MCP Odoo, les options utiles attendues sont notamment :
- `--workspace-root`
- `--transport`
- `--host`
- `--port`

## Regle d'usage dans AI Dev System

AI Dev System doit traiter les MCP comme des integrations optionnelles mais puissantes.

Regle recommandee :
- si le MCP est disponible et pertinent, l'agent peut l'utiliser
- si le MCP est absent, l'agent doit continuer en mode degrade quand c'est possible
- si le MCP est indispensable pour une preuve, l'agent doit le dire clairement
- l'agent ne doit jamais inventer une preuve MCP non executee
- l'agent ne doit pas appliquer une configuration globale sans validation explicite
- l'agent doit respecter `rules/context-budget.md` et ne pas interroger le MCP si une verification locale suffit

## Cas Odoo + OWL

Pour une tache Odoo + OWL, le systeme peut preferer :
- le stack `fullstack-odoo-owl`
- le skill `odoo-19-workflow`
- le MCP `odoo_ui_intelligence_v2`, s'il est configure dans l'agent IA utilise

Mais la configuration exacte depend de l'outil :
- Codex : configuration dans `config.toml`
- Claude Code : configuration MCP propre a Claude Code
- Cursor : configuration MCP propre a Cursor
- Windsurf : configuration MCP propre a Windsurf

La logique metier du systeme reste identique.
Seul l'adaptateur de configuration change.

## Quand ne pas utiliser le MCP

Il vaut mieux ne pas utiliser le MCP si :
- la tache est purement documentaire
- le serveur n'est pas installe
- le chemin local n'est pas fiable
- le projet ne concerne pas le domaine du MCP
- l'utilisateur demande explicitement de ne pas l'utiliser

## Depannage generique

| Probleme | Cause probable | Action |
| --- | --- | --- |
| Le MCP ne demarre pas | Dependances absentes | Installer les dependances du serveur |
| `ModuleNotFoundError` | Mauvais environnement Python | Utiliser le bon venv ou reinstaller le package |
| Le serveur n'apparait pas dans l'agent | Config non rechargee | Redemarrer l'agent IA |
| Le serveur voit les mauvaises donnees | Mauvais `workspace-root` | Corriger le chemin de racine |
| L'agent bloque au demarrage | MCP marque obligatoire | Le rendre optionnel si le projet doit rester portable |

## En une phrase

Un MCP se configure en deux couches :
- une definition universelle : nom, commande, arguments, racine et timeouts
- un adaptateur par agent IA : Codex, Claude Code, Cursor, Windsurf ou autre
