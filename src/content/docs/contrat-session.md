# Contrat De Session Governor

## Statut

Ce document definit le contrat operatoire d'une session Governor.

Il complete :
- `docs/concepts/governor/operation/incarnation-governor-et-couche-llm.md`
- `docs/concepts/governor/operation/point-entree-utilisateur-governor.md`
- `docs/concepts/governor/artifacts/memoire-ai-delivery-governor.md`
- `docs/concepts/governor/overview/workflow-ai-delivery-governor.md`
- `docs/concepts/continuity/handoff-inter-agent.md`

Il ne cree pas de runtime de session.
Il ne definit pas une interface technique.
Il ne remplace pas le run-manifest, la memoire durable ou le handoff.

## Definition courte

Une session Governor est un espace conversationnel dedie ou le Governor pilote un chantier avec l'utilisateur.

Elle est portee par une couche LLM conversationnelle, mais encadree par la logique Governor.

Elle sert a :
- comprendre le besoin
- maintenir le cadre courant du chantier
- preparer les actions de l'agent d'execution IA
- relire les retours
- decider des transitions
- garder assez de contexte pour continuer sans tout recommencer

## Ce que la session porte legitimement

Une session Governor peut contenir :
- la demande utilisateur courante
- le cadrage actif
- les hypotheses et inconnues encore utiles
- le mode de travail choisi ou recommande
- la prochaine action gouvernee
- les prompts prepares pour l'agent d'execution IA
- les retours recents de l'agent d'execution IA
- les decisions de validation, correction, recadrage ou blocage
- les references vers artefacts utiles : run-manifest, handoff, memoire, spec, plan, revue
- les limites connues de la session

La session porte surtout le contexte de pilotage.
Elle ne doit pas devenir l'archive complete du projet.

## Ce que la session ne doit pas devenir

Une session Governor ne doit pas devenir :
- une memoire durable
- un run-manifest
- un handoff complet
- une archive exhaustive de conversation
- un stockage de fichiers
- un journal technique de toutes les commandes
- une session d'execution repo

Elle doit rester lisible et actionnable.

## Conditions d'ouverture

Une session Governor peut s'ouvrir quand :
- un utilisateur exprime un besoin, meme imparfait
- un point d'entree utilisateur existe
- le Governor peut identifier au moins une intention de travail
- l'utilisateur accepte que le Governor cadre avant execution

Entrees minimales recommandees :
- besoin ou objectif
- source disponible si elle existe
- projet ou contexte si une action sur code est attendue
- contrainte forte si elle existe

Si ces elements sont absents, la session peut quand meme s'ouvrir, mais son premier objectif devient le recadrage.

## Ouverture type

Une ouverture saine ressemble a ceci :

```text
Session Governor ouverte.

Besoin initial :

Source disponible :

Projet ou contexte :

Contraintes connues :

Etat initial :
- entree suffisante : oui | non
- recadrage necessaire : oui | non
- prochaine action Governor :
```

Cette ouverture ne declenche pas encore une execution.
Elle autorise d'abord le cadrage.

## Regles pendant la session

La session doit :
- annoncer le role actif : Governor ou agent d'execution IA si le meme outil sert aux deux
- garder une prochaine action principale
- distinguer faits, hypotheses et inconnues
- rendre visibles les limites et validations manquantes
- produire des prompts bornes pour l'agent d'execution IA
- relire les retours avant validation
- proposer une memoire durable seulement si l'information est validee
- produire un handoff si une reprise est probable

La session ne doit pas :
- executer silencieusement a la place de l'agent d'execution IA
- melanger plusieurs chantiers sans recadrage
- considerer l'historique conversationnel comme preuve
- valider une etape sans preuve minimale ou limite explicite

## Reprise d'une session

Une session peut etre reprise si l'utilisateur revient apres une pause ou change d'agent IA.

La reprise doit commencer par charger le minimum utile :
- dernier objectif valide
- phase ou etape courante
- derniere decision Governor
- prochaine action recommandee
- risques ou blocages ouverts
- references vers run-manifest ou handoff si disponibles

Ordre de reprise recommande :
1. lire le handoff si un changement d'agent a eu lieu
2. lire le run-manifest si un run existe
3. lire la derniere revue ou decision Governor si disponible
4. reprendre par une prochaine action unique

Exemple de reprise :

```text
Je reprends une session Governor.

Contexte disponible :
- handoff :
- run-manifest :
- derniere decision :

Ta mission :
- reconstruire l'etat utile
- dire ce qui est valide
- dire ce qui reste ouvert
- proposer la prochaine action unique
```

## Cloture d'une session

Une session Governor peut etre cloturee quand :
- l'objectif du chantier est atteint
- ou l'utilisateur decide d'arreter
- ou le Governor bloque faute d'information ou de validation
- ou un handoff permet une reprise propre ailleurs

La cloture doit contenir :
- resultat atteint ou raison d'arret
- derniere decision Governor
- validations executees et non executees
- risques restants
- memoire durable a proposer si necessaire
- handoff a produire si une reprise est probable
- prochaine action si le chantier n'est pas termine

Exemple de cloture :

```text
Session Governor cloturee.

Resultat :

Decision finale :

Validations :

Risques restants :

Memoire durable proposee :

Handoff necessaire : oui | non

Prochaine action si reprise :
```

## Distinctions critiques

### Session Governor

Role :
- porter le contexte conversationnel et de pilotage courant.

Elle repond a :
- ou en est-on dans l'echange avec l'utilisateur ?
- quelle est la prochaine action gouvernee ?

### Memoire durable

Role :
- conserver les decisions, conventions et patterns durables.

Elle repond a :
- qu'est-ce qui restera vrai et utile plus tard ?

La session peut proposer une memoire.
Elle ne remplace pas `memory/`.

### Etat de run

Role :
- suivre l'etat operationnel d'un run.

Il repond a :
- quelle phase est active ?
- quels artefacts, gates, risques et blocages structurent le run ?

La session peut pointer vers `run-manifest.yml`.
Elle ne le remplace pas.

### Handoff

Role :
- permettre une reprise courte par un autre agent IA ou une autre session.

Il repond a :
- que doit savoir le prochain agent pour reprendre sans tout relire ?

La session peut produire un handoff.
Elle ne doit pas etre le handoff elle-meme.

### Session de l'agent d'execution IA

Role :
- executer une mission bornee dans le projet cible.

Elle repond a :
- qu'est-ce qui a ete modifie, verifie ou produit ?

La session Governor prepare et relit cette execution.
Elle ne doit pas se confondre avec elle.

## Contrat minimal de session

Une session Governor est saine si elle peut toujours repondre a ces questions :
- quel est l'objectif courant ?
- qu'est-ce qui est valide ?
- qu'est-ce qui reste inconnu ?
- quelle est la prochaine action unique ?
- faut-il executer, relire, recadrer, memoriser ou transmettre ?

## Limites ouvertes

Cette etape ne tranche pas encore :
- le format technique de stockage d'une session persistante
- la forme exacte de l'interface utilisateur
- les profils d'exploitation par type d'utilisateur
- la maniere dont chaque fournisseur LLM expose ou conserve une session

Ces points appartiennent aux prochaines etapes de la Phase 3.

## Resume court

Une session Governor est l'espace de pilotage conversationnel d'un chantier.

Elle contient le contexte utile pour cadrer, preparer, relire et decider.

Elle ne remplace pas :
- la memoire durable
- le run-manifest
- le handoff
- la session d'execution IA

Elle doit rester courte, gouvernable et reprenable.
