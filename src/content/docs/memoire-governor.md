# Memoire Specifique AI Delivery Governor

## Statut

Ce document definit la memoire utile a l'AI Delivery Governor.

Il complete :
- `memory/README.md`
- `memory/memory.md`
- `docs/concepts/governor/overview/workflow-ai-delivery-governor.md`
- `docs/concepts/governor/artifacts/format-revue-etape-governor.md`

Il ne cree pas de moteur de memoire.
Il ne remplace pas la memoire generique du framework.
Il precise comment le Governor decide ce qui merite d'etre conserve durablement.

## Principe

La memoire du Governor sert a ameliorer le pilotage futur.

Elle doit retenir uniquement ce qui aide a :
- cadrer plus vite une demande similaire
- eviter une erreur deja identifiee
- respecter une contrainte projet stable
- reprendre un travail sans historique prive
- guider une revue ou une correction future

Elle ne doit pas devenir une archive conversationnelle.

## Niveaux de memoire

| Niveau | Role | Emplacement |
| --- | --- | --- |
| Memoire generique du framework | Regles durables du systeme universel. | `memory/` du repo systeme |
| Memoire specifique du Governor | Decisions et apprentissages durables lies au pilotage Governor. | `memory/` si l'information concerne le systeme, ou `project-memory.md` si elle concerne un projet cible |
| Memoire d'un projet pilote | Contraintes, conventions et decisions propres au projet utilise par le Governor. | `.ai-dev-system/memory/project-memory.md` dans le projet cible |
| Etat d'un run | Phase active, hypotheses, risques, gates et prochaine action. | `run-manifest.yml` |
| Handoff | Passation courte entre agents IA ou sessions. | `.ai-dev-system/handoff/` |

Regle :
- `memory/` garde ce qui est durable
- `run-manifest.yml` garde ce qui est courant
- `handoff/` garde ce qui sert a reprendre

## Categories a conserver

### Decisions de pilotage

A conserver si :
- la decision change la facon dont le Governor pilote les prochaines etapes
- elle a ete validee ou fortement confirmee
- elle a un impact au-dela d'une seule action

Exemples :
- choisir `semi-auto` par defaut pour un type de demande risquee
- exiger une revue avant tout passage en `auto-orchestrated`
- traiter un MCP externe comme optionnel et non bloquant si une preuve locale suffit

Destination recommandee :
- `memory/decision-log.md` si la decision concerne le systeme
- `project-memory.md` si la decision concerne un projet cible

### Contraintes projet

A conserver si :
- la contrainte est stable dans un projet pilote
- elle doit guider plusieurs prompts d'execution IA
- elle evite une derive de scope ou de logique metier

Exemples :
- "ne pas inventer la logique metier absente d'une image"
- "ne pas modifier la configuration globale sans validation"
- "dans ce projet, utiliser telle stack ou telle convention"

Destination recommandee :
- `project-memory.md` dans le projet cible
- `memory/conventions.md` seulement si la contrainte devient une convention systeme generale

### Conventions d'execution

A conserver si :
- la convention rend les prompts ou revues plus fiables
- elle est applicable a plusieurs runs
- elle est stable et non contradictoire avec les rules

Exemples :
- toujours demander un format de retour avec validations executees et non executees
- garder un seul objectif principal par prompt d'execution IA
- demander un handoff quand le contexte devient trop lourd

Destination recommandee :
- `memory/conventions.md`

### Iterations et corrections importantes

A conserver si :
- la correction revele un piege recurrent
- elle change une maniere de piloter
- elle evite une regression future

Exemples :
- un agent d'execution IA elargit souvent le scope quand le hors perimetre est absent
- une revue bloque si les validations sont annoncees mais non executees
- un prompt trop long provoque une perte de focus

Destination recommandee :
- `memory/patterns.md` avec type `piege` ou `anti-pattern`
- `project-memory.md` si le piege est propre au projet cible

### Continuite utile a la revue et au handoff

A conserver si :
- un autre agent IA doit reprendre
- une phase est interrompue
- une revue future doit connaitre l'etat valide

Destination recommandee :
- `run-manifest.yml` pour l'etat courant
- `.ai-dev-system/handoff/` pour la passation
- `memory/` seulement si une decision durable ressort de la reprise

## Ce qu'il faut refuser

Ne pas conserver en memoire durable :
- raisonnement prive
- historique conversationnel
- brouillons
- hypotheses non validees
- resultats temporaires d'une commande
- fichiers entiers recopies
- details qui appartiennent seulement a un run
- informations sensibles, secrets ou tokens
- decisions non arbitrees par l'utilisateur quand elles ont un impact important

## Gate avant ecriture

Avant de proposer une mise a jour memoire, le Governor verifie :

```text
Est-ce valide ?
Est-ce durable ?
Est-ce reutilisable ?
Est-ce court ?
Est-ce au bon endroit ?
Est-ce sans secret ?
```

Si une reponse est non, ne pas ecrire en memoire durable.

## Moment d'ecriture

Le Governor peut proposer une mise a jour memoire :
- apres une revue d'etape validee
- apres une decision de pilotage explicite
- apres une correction qui revele un piege recurrent
- avant cloture si un apprentissage durable a ete confirme
- avant handoff seulement si l'information survivra au run

Il ne doit pas ecrire pendant :
- l'intake initial
- une hypothese non tranchee
- une execution encore non revue
- une correction en cours

## Format recommande

### Decision de pilotage

```text
### YYYY-MM-DD - Titre court

- domaine : Governor
- statut : validee | remplacee | a reevaluer
- decision :
- contexte :
- pourquoi :
- impact sur les prochains runs :
- lien avec quality gates :
```

### Contrainte ou convention

```text
### Titre court

- domaine : Governor | projet cible
- statut : active | remplacee | a reevaluer
- convention :
- justification :
- quand l'appliquer :
- exceptions :
```

### Piege ou correction importante

```text
### Titre court

- type : piege | anti-pattern
- statut : actif | a reevaluer
- symptome :
- risque :
- correction recommandee :
- preuve ou origine :
```

## Relation avec la revue d'etape

La revue d'etape peut proposer une action memoire via :
- `templates/stage-review.md`
- section `Memoire, Handoff Et Phase Suivante`

Regle :
- une revue peut proposer une memoire
- elle ne doit pas forcer l'ecriture si l'information n'est pas durable
- elle doit distinguer memoire systeme et memoire projet

## Relation avec le handoff

Le handoff sert a reprendre.

La memoire projet durable sert a eviter la redecouverte.

Governor relit maintenant automatiquement une version compacte de `memory/project-memory.md` dans :
- `resume-brief.md`
- `execution-readiness.md`
- `execution-prompt.md`
- `execution-handoff.md`
- `orchestration-report.md`

Regles complementaires :
- la remontee doit rester courte et orientee reprise, pas recopier tout le fichier ;
- si un signal sensible apparait dans `project-memory.md`, Governor masque cette section au lieu de la reinjecter ;
- cette remontee n'autorise toujours pas l'ecriture automatique en memoire durable sans revue et validation.
La memoire sert a reutiliser.

Exemple :
- "l'etape courante est bloquee car le test X n'a pas ete execute" va dans le handoff ou le run-manifest
- "les prompts d'execution IA doivent toujours demander les validations non executees" peut devenir une convention durable

## Relation avec le run-manifest

Le run-manifest garde :
- phase active
- statut courant
- hypotheses actives
- risques et blocages
- decisions ouvertes
- quality gates
- prochaine action
- prochain agent recommande
- references de validation

La memoire durable garde seulement ce qui restera utile apres le run.

## Arbitrages retenus

- Pas de nouveau dossier memoire specifique au Governor pour l'instant.
- Pas de moteur de memoire automatique.
- Les fichiers `memory/` existants restent les sources durables.
- La memoire projet reste dans le projet cible quand le systeme est copie.
- Le Governor propose une mise a jour memoire, mais la validation reste humaine ou gouvernee.

## Limites volontaires

Ce document ne definit pas :
- une politique de retention automatique
- un format de base de donnees
- une synchronisation entre agents IA
- une ecriture automatique dans `memory/`

Il donne une politique simple pour les etapes suivantes et les runs pilotes.
