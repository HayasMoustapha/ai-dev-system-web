# Architecture Candidates

## Candidate A - Sidecar Web Over Governor Artifacts

Description :
- repo web autonome en Next.js
- lecture des artefacts Governor existants
- actions web limitees qui appellent localement des commandes Python bornees si necessaire

Avantages :
- respecte la separation des responsabilites
- faible couplage initial
- pas de duplication du noyau
- compatible avec une montee progressive vers AI SDK UI

Risques :
- parsing d'artefacts texte si aucun adaptateur plus stable n'existe encore

Verdict :
- candidat recommande pour P0

## Candidate B - Web Repo Plus Bridge Local Stable

Description :
- meme base que A
- ajout precoce d'un bridge local dedie qui expose les donnees de session de maniere plus stable au frontend

Avantages :
- meilleure stabilite de contrat pour la web app
- meilleure base pour le streaming et les actions web

Risques :
- necessite des changements coeur ou un composant intermediaire maintenu en parallele

Verdict :
- candidat probable pour P1

## Candidate C - Full API Governor Rewrite

Description :
- exposition d'une API complete et possiblement migration d'une partie de la logique Governor autour d'un backend web

Avantages :
- architecture plus unifiee a long terme

Risques :
- depasse complet du perimetre
- refonte du noyau
- tres fort risque de divergence avec le repo source

Verdict :
- rejete pour ce chantier
