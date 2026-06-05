# Capability Bank Governor

## Role

La capability bank est la banque centrale des capacites que Governor peut connaitre, comparer, projeter et installer. Elle contient beaucoup de candidats, mais seuls les elements verifies et utiles sont actives.

## Types De Capacites

- `skill`
- `subagent`
- `plugin`
- `mcp`
- `hook`
- `workflow`
- `host-adapter`
- `prompt-pack`
- `command`
- `runtime-policy`

## Structure Source

```text
capability-bank/
  index.yml
  sources/
  skills/
  subagents/
  plugins/
  mcp/
  hooks/
  workflows/
  host-adapters/
  locks/
  quarantine/
  reviews/
  projections/
```

## Cycle De Vie

```text
candidate
  -> reviewed
  -> approved | quarantine | rejected
  -> projected
  -> install_planned
  -> installed
  -> verified
  -> locked
  -> active | disabled
```

## Regle De Stockage

Governor peut stocker une capacite externe comme candidate meme si elle n'est pas encore utilisable. Il ne peut pas l'activer sans revue, verification et lock.

## Sources Initiales

- OpenAI skills
- Anthropic skills et plugins
- GitHub Awesome Copilot
- Awesome Claude Code
- MCP Registry officiel
- Superpowers
- SuperClaude
- BMAD Method
- Task Master
- Vibe Kanban
- ToolHive
- Context7
- Figma/Playwright/GitHub MCP
- Serena
- Sentry MCP
- Chrome DevTools MCP
- Browserbase MCP
- Microsoft Learn MCP
- Supabase MCP
- Slack MCP
- HashiCorp Vault MCP
- Cloudflare MCP Portals
- Docker MCP Gateway
- Snyk Agent Scan
- Make Interfaces Feel Better
- Simplify
- Frontend Design
- UI UX Pro Max
- shadcn/ui Standards
- Governor Design Preferred Stack
- Matt Pocock Skills (`mattpocock.skills`) comme source externe en quarantaine

## Vague Strategique 2026-05

La vague strategique ajoute des capacites utiles sans les activer aveuglement.

| Capacite | Statut Governor | Raison |
| --- | --- | --- |
| `microsoft-learn-mcp` | `approved` + bundle genere | Documentation officielle Microsoft sans secret. |
| `chrome-devtools-mcp` | `candidate` + bundle genere | Preuve navigateur forte, mais controle Chrome local. |
| `sentry-mcp` | `candidate`, catalogue seulement | Donnees incident et auth Sentry requises. |
| `browserbase-mcp` | `candidate`, catalogue seulement | Navigateur cloud payant et secrets Browserbase. |
| `github-mcp-server` | `candidate`, catalogue seulement | OAuth/PAT et surface ecriture GitHub. |
| `supabase-mcp` | `candidate`, catalogue seulement | Acces DB/projets ; lecture seule et non-production par defaut. |
| `slack-mcp` | `candidate`, catalogue seulement | Contexte workspace et validation admin/OAuth. |
| `hashicorp-vault-mcp` | `candidate`, docs only | Surface secrets critique ; jamais auto-activer. |
| `serena` | `candidate`, docs only | Capacite semantique forte, mais runtime Python/uv et droits repo a verifier. |
| `cloudflare-mcp-portals` | `candidate`, docs only | Pattern de portail/gouvernance, pas serveur unitaire. |
| `docker-mcp-gateway` | `candidate`, docs only | Gateway utile, mais deuxieme control-plane. |
| `snyk-agent-scan` | `candidate`, security scan only | Scanner utile mais susceptible d'executer des commandes MCP stdio pendant l'audit. |

## Pile Design Preferee

Governor traite la pile design preferee comme une capacite centrale projetable sur tous les executeurs IA :

| Priorite utilisateur | Capacite | Role Governor |
| --- | --- | --- |
| 1 | `make-interfaces-feel-better` | Passe de finition : details d'interaction, densite visuelle, feedback, confort d'usage. |
| 2 | `simplify` | Passe de degraissage : retirer les composants trop charges, reduire les etats inutiles, clarifier le flow. |
| 3 | `frontend-design` | Direction visuelle : typographie, espacement, hierarchie, composition non generique. |
| 4 | `ui-ux-pro-max` | Repenser un flow complet, choisir design system, UX, palettes, typographie et anti-patterns. |
| 5 | `shadcn-ui-standards` | Base composants propre, theme coherent, accessibilite et style editorial quand shadcn/ui est adapte. |

Si un hote ne connait pas nativement un de ces skills, Governor doit projeter son equivalent sous forme de checklist, prompt d'execution ou sous-tache specialisee, puis declarer le mode degrade dans les artefacts.

## Source Externe mattpocock/skills

Governor reference `mattpocock.skills` comme source externe utile mais non installable brute.

- source: `https://github.com/mattpocock/skills`
- commit audite: `d54c497aa94400a496d3f2c38be10fa5f284c5a9`
- rapport: `capability-bank/reviews/mattpocock.skills.source-audit.yml`
- candidates: `capability-bank/quarantine/mattpocock.skills.*.candidate.yml`
- statut par defaut: `quarantine_until_reviewed`

Les patterns utiles sont absorbes comme capacites Governor natives :

| Pattern externe | Capacite Governor | Decision |
| --- | --- | --- |
| `diagnose` | `diagnosis_loop` | reecriture Governor-native |
| `grill-me` / `grill-with-docs` | `adversarial_planning` | projection multi-hote |
| `tdd` | `tdd_slice_delivery` | reecriture Governor-native |
| `prototype` | `throwaway_prototype_policy` | prototype isole puis cleanup/absorption |
| `handoff` | `durable_handoff` | continuity pack Governor |
| `write-a-skill` | `skill_authoring_factory` | factory de skills gouvernes |
| `to-prd` / `to-issues` | `issue_to_prd_projection` | projection tracker-aware |

Les scripts externes risques restent bloques : installateur destructif, hooks fail-open, scripts CRLF, buckets personnels/drafts/deprecated et mismatch manifest. Governor doit reecrire ces comportements au lieu de les executer.

## Sortie Attendue Pour Un Agent

Quand Governor demande une installation precise, l'agent doit recevoir :

- id de capacite ;
- source et lock ;
- hote cible ;
- verdict de compatibilite ;
- fichiers a creer ou modifier ;
- validation ;
- rollback.
