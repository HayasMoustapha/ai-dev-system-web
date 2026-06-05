# Pilotage Amplificateur D'Executeur IA

## Statut

Contrat canonique.

Ce document explique comment AI Dev System et le Governor doivent tirer le meilleur d'un executeur IA, quel que soit l'hote utilise : Codex, Claude Code, Cursor, Windsurf ou autre.

Le but n'est pas de promettre une multiplication mathematique de performance.
Le but est d'imposer une methode qui augmente fortement la precision, l'efficacite, la robustesse et la qualite de validation de l'hote.

## Principe

Un executeur IA devient meilleur quand le systeme lui donne :
- un objectif borne ;
- un ordre de lecture court ;
- les bonnes sources de verite ;
- les skills, MCP, agents, sous-agents et outils utiles ;
- une strategie de tests adaptee ;
- des conditions d'arret claires ;
- un format de retour strict.

Le Governor pilote cette amplification.
L'executeur IA reste l'outil qui agit dans le projet.

## Boucle D'Amplification Obligatoire

Avant une execution significative, l'agent doit appliquer cette boucle :

1. **Orienter**
   Lire uniquement les artefacts utiles : manifeste, cadrage courant, handoff, prompt d'execution, rules et sources de verite ciblees.

2. **Verifier L'Hote**
   Identifier ce que l'hote expose vraiment : terminal, fichiers, navigateur, upload, MCP, skills, sous-agents, recherche, base locale, outils de test.

3. **Choisir Les Ressources**
   Selectionner uniquement les ressources qui changent la qualite du cadrage, de l'execution ou de la validation.
   Ne pas activer un outil seulement parce qu'il existe.

4. **Executer Par Petite Tranche**
   Modifier le minimum utile, rester dans le perimetre et conserver les decisions metier au Governor ou a l'utilisateur.

5. **Valider**
   Lancer les tests pertinents : unitaires, backend, UI, end-to-end, build, lint, doctor, smoke, base locale ou dediee selon le projet.

6. **Corriger**
   Corriger les echecs dans le meme perimetre si la cause est claire.
   Stopper si la correction demande une decision ou elargit la mission.

7. **Rendre Compte**
   Dire ce qui a ete fait, quels outils ont ete utilises, quels outils ont ete ignores, quelles validations ont ete executees, ce qui reste risque et quelle est la prochaine action.

## Ressources A Considerer

L'agent doit considerer, selon le contexte :
- agents framework ;
- sous-agents ou profils specialises ;
- skills embarques ;
- skills natifs de l'hote ;
- MCP disponibles ;
- outils hote comme terminal, navigateur, upload, recherche ou inspecteurs ;
- documentation officielle quand une decision depend d'une version ou d'une API ;
- memoire et apprentissages valides quand ils sont pertinents.

## Ressources A Eviter

L'agent ne doit pas :
- charger toute la documentation sans raison ;
- utiliser un MCP si une preuve locale suffit ;
- multiplier les sous-agents sans ownership clair ;
- faire une recherche web pour une convention deja fiable dans le repo ;
- utiliser un outil non verifie comme s'il etait disponible ;
- continuer en mode degrade si le risque devient critique.

## Format Minimal De Retour

Tout retour d'execution doit mentionner :
- ressources considerees ;
- ressources utilisees ;
- ressources ignorees et pourquoi ;
- commandes principales lancees ;
- fichiers modifies ;
- validations executees ;
- validations non executees et raison ;
- risques restants ;
- prochaine action recommandee.

## Arrets Obligatoires

L'amplification ne donne pas de permission illimitee.
Elle doit stopper sur :
- decision metier importante ;
- perimetre flou ;
- action destructive ;
- base de production ;
- secrets ou credentials ;
- push, publication ou tag release ;
- configuration globale ;
- outil necessaire indisponible alors que l'execution en depend.

## Relation Avec Les Autres Contrats

- `rules/operational-policies.md` definit les permissions et les arrets.
- `docs/concepts/governor/operation/contrat-execution-universel.md` definit le contrat Governor -> executeur IA.
- `docs/concepts/core/boucle-execution-multi-etapes.md` definit la boucle d'execution.
- `docs/concepts/core/boucle-apprentissage-controle.md` permet de capitaliser les lecons utiles apres revue.
- `system.yml` declare les ressources disponibles et les regles de routage.
