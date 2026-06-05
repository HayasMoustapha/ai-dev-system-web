# Boucle D'Execution Multi-Etapes

## Objectif

Ce document definit la boucle universelle qui permet a AI Dev System et au Governor de piloter un plan d'implementation en plusieurs etapes.

La boucle doit permettre de :
- planifier plusieurs etapes,
- executer une etape bornee,
- lancer les validations pertinentes,
- capturer une decision,
- passer a l'etape suivante si rien ne bloque,
- s'arreter uniquement quand une decision importante, une preuve manquante ou un risque critique l'exige.

Ce document ne cree pas un runtime autonome.
Il definit le contrat commun que les modes du framework, le Governor Kit et les Host Adapters doivent appliquer.

## Portee

Cette boucle s'applique a trois chemins d'usage :
- framework seul, via `manual`, `semi-auto` ou `auto-orchestrated`,
- Governor Kit, via une session Governor,
- Host Adapter, via une adaptation concrete comme Codex.

La difference entre ces chemins porte sur le niveau d'autonomie.
Le contrat de decision reste le meme.

## Principe

Une etape peut etre enchainee seulement si :
- son objectif est clair,
- son perimetre est borne,
- les hypotheses critiques sont visibles,
- les tests pertinents ont ete executes ou explicitement marques comme non executables,
- les quality gates critiques ne bloquent pas,
- aucune decision produit, architecture, securite ou donnees ne manque.

Si une de ces conditions n'est pas satisfaite, la boucle s'arrete.

## Contrat D'Une Etape

Chaque etape doit porter au minimum :
- un identifiant,
- un objectif,
- un perimetre inclus,
- un perimetre exclu,
- les fichiers ou zones prioritaires,
- les validations attendues,
- les quality gates pertinents,
- les conditions de passage,
- les conditions d'arret.

La sortie d'une etape doit porter au minimum :
- les changements realises,
- les validations executees,
- les validations non executees avec raison,
- les risques residuels,
- la decision finale,
- la prochaine action.

## Tests Et Validations

Le systeme ne doit pas promettre de lancer "tous les tests possibles" sans contexte.

Il doit plutot qualifier la matrice pertinente :
- backend,
- UI,
- fullstack,
- contrats API,
- integration,
- e2e,
- accessibilite,
- performance smoke,
- securite smoke,
- verification manuelle quand l'automatisation n'est pas disponible.

Pour chaque categorie, la boucle doit indiquer :
- commande ou methode,
- statut : `a_executer`, `execute`, `non_applicable`, `bloque`,
- preuve attendue,
- preuve obtenue ou raison de non-execution.

## Decisions De Continuation

Les decisions autorisees sont :
- `continuer` : passer a l'etape suivante,
- `corriger` : traiter une correction bornee avant de continuer,
- `reprendre_partiellement` : reprendre une partie de l'etape,
- `recadrer` : revenir au cadrage,
- `bloquer` : attendre une decision ou preuve critique,
- `cloturer` : fermer le chantier ou la phase.

Un mode plus autonome peut appliquer `continuer` sans arret utilisateur si les conditions de passage sont satisfaites.
Il ne peut pas appliquer `continuer` si une condition d'arret est presente.

## Conditions D'Arret Obligatoire

La boucle doit s'arreter si :
- une decision metier structurante manque,
- une decision d'architecture irreversible manque,
- une action touche securite, donnees sensibles, production ou migration sans validation suffisante,
- une validation critique ne peut pas etre executee,
- une quality gate critique est en echec,
- le perimetre derive au-dela de l'etape,
- l'agent d'execution IA n'a pas les capacites ou outils necessaires.

## Application Par Mode

### Manual

L'utilisateur decide explicitement chaque passage.
La boucle sert de checklist de controle.

### Semi-Auto

Le systeme prepare les artefacts et checkpoints.
L'utilisateur valide entre les etapes importantes.

### Auto-Orchestrated

L'agent IA peut enchainer les etapes tant que les conditions de passage sont satisfaites.
Il doit s'arreter aux conditions d'arret obligatoire.

Ce mode reste conversationnel et artefact-driven.
Il n'est pas un moteur invisible qui execute tout sans supervision.

## Application Par Governor

Le Governor utilise cette boucle pour :
- cadrer une sequence,
- produire ou mettre a jour `execution-loop.yml`,
- preparer `execution-prompt.md`,
- relire avec `stage-review.md`,
- mettre a jour `session-manifest.yml` et `resume-brief.md`.

Le Governor ne code pas lui-meme.
Il pilote l'agent d'execution IA et garde la decision finale explicite.

## Application Par Host Adapter

Un Host Adapter doit rendre cette boucle exploitable dans son environnement concret.

Il peut definir :
- l'ordre de lecture des artefacts,
- les raccourcis utiles,
- les regles persistantes propres a l'hote,
- les limites de validation de l'hote.

Il ne doit pas absorber :
- la logique canonique de la boucle,
- les quality gates,
- la decision finale,
- la logique metier du projet.

## Artefact Canonique

Le template canonique est :
- `templates/execution-loop.yml`

Dans une session Governor, l'artefact instancie est :
- `execution-loop.yml`

Dans un run framework, l'artefact est :
- `artifacts/execution-loop.yml`

## Etat Actuel

La boucle est maintenant definie, materialisee comme artefact et raccordee a deux usages :
- boucle assistee : l'agent IA hote execute dans le chat courant et Governor relit ;
- orchestrateur autonome : `/ads-governor-run` peut appeler un runtime hote supporte, avec retour structure et revue Governor.

Les modes non manuels utilisent `terminal_permission: full-permission` par defaut.
Cela permet les commandes locales utiles, validations, commits bornes et SGBD local/dedie sans pause inutile.

Les arrets obligatoires restent actifs :
- decision metier ou architecture importante ;
- action destructive ou hors perimetre ;
- base de production ;
- secrets ou credentials ;
- push, publication ou tag release ;
- configuration globale d'un hote IA.
