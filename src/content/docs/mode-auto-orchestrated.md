# Guide Mode Auto-Orchestrated

## Version Tres Simple

Utilise ce mode seulement si la demande est deja claire.

Tu ecris dans le chat :

```text
/ads Decrire le besoin
/ads-fast Decrire le besoin
/ads-auto Decrire le besoin
```

En mode auto, le systeme active maintenant un fast path en arriere-plan quand le contexte le permet.
Le fast path cree `artifacts/fast-path.md` pour dire a l'agent IA quoi lire, quoi ignorer, quelle premiere action executer et quand basculer vers Governor.
Si un runtime hote direct est autorise et prouve, le systeme peut executer ce fast path directement et ecrire `artifacts/executor-return.yml`.

L'executeur IA fait la traduction technique pour toi.
Tu ne dois pas taper les commandes longues si tu travailles dans le chat.

Ce mode veut dire :
- le systeme prepare un cadre plus autonome ;
- l'IA peut avancer plus vite ;
- l'IA doit quand meme s'arreter si un risque important apparait.
- l'IA peut executer les commandes locales utiles sans pause tant que tout reste dans le perimetre.

Si tu as un doute, utilise plutot :

```text
/ads-semi-auto Decrire le besoin
```

Si tu ne sais pas ou ecrire la commande, lis d'abord :

```text
docs/getting-started/guide-demarrage-ultra-simple.md
```

## Objectif

Ce guide montre comment utiliser le systeme en `auto-orchestrated` dans un cas reel.

Ce mode est le plus automatise dans la maniere de preparer et piloter un run.

Il convient quand :
- le besoin est deja assez clair,
- la stack est connue,
- le risque est modere,
- tu veux que l'IA avance plus librement.

## Autonomie Terminal

En `auto-orchestrated`, le systeme applique automatiquement `full-permission`.

L'agent IA peut avancer sans te demander l'autorisation pour :
- lire et chercher dans le projet ;
- modifier les fichiers strictement necessaires ;
- lancer tests, lint, build, doctor, smoke tests et scripts locaux ;
- utiliser une base locale ou dediee aux tests ;
- faire un commit logique, borne et verifie quand l'etape le prevoit.

Il ne doit pas executer aveuglement :
- reset destructeur, amend, rebase ou merge non cadres ;
- push, publication ou tag release ;
- secrets, tokens ou credentials ;
- base de production ;
- suppression large ;
- configuration globale d'un hote IA ;
- changement hors mission.

En `until-done`, Governor doit d'abord chercher une alternative sure : dry-run, backup, sandbox, base de test, mock, commit local borne puis push Governor sur la branche courante, hypothese conservative ou tranche de clarification executable.

Regle simple : autonomie forte pour executer et tester localement ; arret seulement si aucun chemin sur ne permet de continuer.

Si l'utilisateur veut le niveau maximal controle, utiliser `break-glass-controlled`.
Ce niveau autorise aussi les actions sensibles necessaires, mais avec verification de perimetre, dry-run si disponible, backup ou rollback si raisonnable, puis preuve dans le retour Governor.

## Pour Un Non-Informaticien

Choisis ce mode seulement si la demande est deja claire et peu risquee.

Si tu n'es pas sur, commence plutot par `semi-auto`.

Commande conversationnelle de depart :

```text
/ads-auto Decrire le besoin
```

Traduction technique depuis le repo systeme, a laisser faire par l'executeur IA :

```text
python scripts/ai.py /ads-auto C:\Work\mon-projet "Decrire le besoin" --stack-profiles universal
```

L'executeur IA doit traduire cette intention vers la commande reelle adaptee :
- depuis le repo systeme : `python scripts/ai.py /ads-auto <projet> "<besoin>"`
- depuis le projet cible deja installe : `python .ai-dev-system\scripts\ai.py /ads-auto . "<besoin>"`
S'il manque une decision importante ou si le besoin est flou, il doit proposer `/ads-semi-auto` a la place.

Si la demande contient une image, un PDF, un DOC, un DOCX ou un ZIP joint dans le chat, utilise plutot :

```text
/ads-image Analyse cette image et prepare un run auto-orchestrated seulement si le cadrage est suffisant
/ads-file Analyse ce document et prepare un run auto-orchestrated seulement si le cadrage est suffisant
```

L'executeur IA doit recuperer le fichier via l'upload du chat, puis lancer la commande reelle avec `--mode auto-orchestrated` uniquement si aucune decision importante ne manque.
Depuis une Project Instance, la commande reelle doit utiliser le script local :
- image : `python .ai-dev-system\scripts\ai.py /ads-image . <fichier-upload> "<besoin>"`
- document ou zip : `python .ai-dev-system\scripts\ai.py /ads-file . <fichier-upload> "<besoin>"`

## Attention importante

`auto-orchestrated` ne veut pas dire :
"l'IA fait tout sans controle".

Cela veut dire :
- le script prepare le run, les artefacts et le manifeste,
- l'IA peut ensuite enchainer plusieurs phases si tu lui donnes le prompt auto et le contexte du run,
- elle continue tant qu'il n'y a pas de blocage critique,
- tu peux toujours l'arreter.

Si des skills, MCP, agents, sous-agents ou outils hote sont configures, ce mode est celui qui beneficie le plus de leur recommandation ou utilisation contextuelle.
L'orchestrator doit d'abord verifier que ces capacites existent dans l'hote courant, puis reporter les ressources considerees, utilisees ou ignorees.

Regle de budget de contexte :
- l'orchestrator charge le contexte par phase
- il n'ouvre pas toute la documentation au demarrage
- il active recherche, skills ou MCP seulement si la decision en depend

Si l'orchestration doit etre reprise par un autre agent IA, cree un handoff avant la bascule :

```text
/ads-handoff
```

L'executeur IA doit demander l'etat actuel, la prochaine action et les agents concernes si ces informations manquent.

Traduction technique :

```text
python scripts/ai.py /ads-handoff C:\Work\mon-projet "Etat actuel de l'orchestration" "Reprendre depuis le manifeste et le prochain checkpoint" --current-agent Codex --next-agent Cursor
```

Le nouvel agent doit appliquer `prompts/resume-from-handoff.md` avant de continuer automatiquement.

Pour un MCP non encore configure, le mode auto-orchestrated ne doit pas ecrire silencieusement dans une configuration globale.
Il doit d'abord passer par la generation assistee, puis demander validation avant application.

Commande conversationnelle :

```text
/ads-mcp
```

L'executeur IA doit demander le nom du MCP, la commande serveur et l'hote cible si ces informations manquent.

Traduction technique :

```text
python scripts/ai.py /ads-mcp C:\Work\mon-projet mon_mcp C:\chemin\vers\serveur.exe --target-agent universal
```

Si une phase depend d'une information externe ou version-sensitive, l'orchestrator doit declencher une verification controlee avant de continuer.

Points d'appui :
- `prompts/verify-docs.md`
- `rules/research.md`
- `sources.md`

Si la verification externe est impossible, l'IA doit l'annoncer et continuer seulement si le risque reste acceptable.

## Quand choisir ce mode rapidement

Choisis `auto-orchestrated` si :
- la demande de depart est deja assez claire,
- la stack est connue,
- tu veux accelerer la preparation et une partie de l'execution,
- tu sais encore verifier les hypotheses importantes avant de valider.

## Cas reel de demonstration

Nous allons prendre un cas frontend clair :

"Construire un tableau de bord admin Next.js a partir d'un mockup bien defini."

C'est un bon candidat car :
- l'interface est lisible,
- la stack est claire,
- le risque metier est plus faible qu'un chantier fortement reglemente.

## Ce que tu vas apprendre

Tu vas voir :
1. comment lancer ce mode
2. comment donner le bon cadre a l'agent
3. quand le laisser continuer
4. quand l'interrompre

## Quels agents utiliser dans ce mode

En mode auto-orchestrated, l'agent principal est `agents/orchestrator.md`.
Son role est de piloter la progression dans la conversation et de recommander le passage d'une phase a l'autre tant qu'il n'y a pas de blocage critique.

Les autres agents servent de garde-fous ou de relais specialises :

| Moment | Agent conseille | Role dans le mode auto |
| --- | --- | --- |
| Piloter le run | `agents/orchestrator.md` | guider l'enchainement des phases et s'arreter en cas de risque |
| Stabiliser l'architecture | `agents/architect.md` | eviter les choix structurants implicites |
| Produire ou corriger le plan | `agents/planner.md` | garder un plan executable par petites etapes |
| Executer une tranche | `agents/implementer.md` | realiser le changement sans depasser le scope |
| Controler avant de continuer | `agents/reviewer.md` | bloquer les hypotheses dangereuses et regressions |
| Verifier les preuves | `agents/tester.md` | confirmer que la validation couvre les risques |

Regle simple :
- `orchestrator` pilote
- `planner` organise
- `implementer` execute
- `reviewer` bloque si le risque est trop haut
- `tester` exige des preuves

## Comment utiliser les rules dans ce mode

En mode auto-orchestrated, les `rules/` doivent etre appliquees en arriere-plan par l'orchestrator et les agents specialises.
L'utilisateur ne doit pas avoir a les coller a chaque message.

En revanche, tu dois les utiliser comme points de controle quand tu interromps ou valides :
- `rules/quality-gates.md` avant d'accepter une phase
- `rules/security.md` si la tache touche des droits, donnees sensibles ou integrations
- `rules/frontend.md`, `rules/backend.md` ou `rules/api.md` selon la zone modifiee

Regle simple :
- l'agent applique les rules pendant qu'il avance
- toi, tu les utilises pour verifier qu'il n'a pas avance trop vite

## Etape 1 - Installer le systeme

Dans le chat de l'executeur IA :

```text
/ads-init
```

Traduction technique depuis le repo systeme :

```text
python scripts/ai.py init C:\Work\mon-projet
```

Si tu es deja dans le projet cible et que `.ai-dev-system/` existe, commence par :

```text
/ads-check
```

L'executeur IA doit traduire avec `.` pour designer le projet courant.

## Etape 2 - Lancer un run auto-orchestrated

Exemple avec un visuel :

Dans le chat de l'executeur IA, avec le visuel joint :

```text
/ads-image Analyser ce dashboard et preparer le run auto
```

Traduction technique depuis le repo systeme :

```text
python scripts/ai.py /ads-image C:\Work\mon-projet C:\Work\mockups\dashboard.png "Analyser ce dashboard et preparer le run auto" --mode auto-orchestrated --stack-profiles frontend-nextjs-typescript
```

Exemple avec une demande texte :

Dans le chat de l'executeur IA :

```text
/ads-auto Construire un tableau de bord admin avec liste, filtres et panneau de details
```

Traduction technique depuis le repo systeme :

```text
python scripts/ai.py /ads-auto C:\Work\mon-projet "Construire un tableau de bord admin avec liste, filtres et panneau de details" --stack-profiles fullstack-nextjs-typescript
```

Si tu travailles sur un projet Odoo + OWL avec ce mode, la logique recommandee devient :
- preferer le skill `odoo-19-workflow` si disponible
- preferer le skill `development-workflow-orchestrator` si disponible
- utiliser le MCP Odoo s'il est configure et utile pour une preuve

Important :
- le runner ne configure pas ces briques a lui seul
- l'activation depend de l'agent IA utilise et de sa configuration disponible

## Etape 3 - Comprendre les artefacts generes

Le systeme cree :
- `request.md`
- `project-spec.md` ou `ui-spec-from-image.md`
- `tech-profile.md`
- `AGENTS.md`
- `test-plan.md`
- `execution-loop.yml`
- `frontend-contract.md`
- `api-contract.md`
- `run-manifest.yml`

## Etape 4 - Lire le manifeste avant de continuer

Ouvre `run-manifest.yml`.

Tu dois y comprendre :
- le mode courant
- le type de source
- le statut global du run
- la phase active
- le prompt d'entree
- la politique de continuation
- les hypotheses, risques et decisions ouvertes
- les quality gates et les references de validation
- le prochain agent recommande
- les integrations importantes si elles ont ete declarees dans le projet

En `auto-orchestrated`, la logique est :
- le runner prepare un cadre de continuation
- l'agent IA peut avancer tant qu'aucun blocage critique n'est detecte
- l'utilisateur garde le droit de stopper ou de demander une validation

### Checklist avant de laisser l'agent avancer

Verifie ces points :
- la demande de depart est assez claire
- la stack est bien connue
- l'artefact principal est le bon
- tu comprends les hypotheses deja presentes
- tu vois le prochain agent recommande et la prochaine action
- tu sais a quel moment tu interrompras l'agent si besoin

## Etape 5 - Donner le bon cadre a l'agent

Tu utilises :
- `prompts/auto-orchestrator.md`
- `run-manifest.yml`
- `artifacts/execution-loop.yml`
- l'artefact principal
- `tech-profile.md`

### Exemple de message a envoyer a Codex, Claude Code ou Cursor

```text
Je travaille avec AI Dev System en mode auto-orchestrated.

Applique :
[colle ici .ai-dev-system/prompts/auto-orchestrator.md]

Contexte :
[colle ici run-manifest.yml]

Artefact principal :
[colle ici project-spec.md ou ui-spec-from-image.md]

Tech profile :
[colle ici tech-profile.md]

Tu peux avancer automatiquement tant qu'il n'y a pas de blocage critique.
Tu dois expliciter les hypotheses et signaler toute ambiguite importante.
Utilise execution-loop.yml pour decider si tu peux passer a l'etape suivante ou si tu dois t'arreter.
```

### Override manuel possible

Meme ici, tu peux encore dire :
- "active explicitement le MCP Odoo"
- "n'utilise pas le MCP sur cette partie"
- "force tel skill seulement pour la phase de plan"

## Etape 6 - Ce que l'agent peut faire seul

Dans ce mode, il peut souvent :
- structurer la spec,
- enrichir le tech profile,
- produire un AGENTS.md,
- construire un plan,
- proposer les premiers contrats frontend ou API,
- avancer jusqu'a la preparation de l'implementation.

Il ne le fait pas tout seul en arriere-plan : tu dois lui donner le prompt auto, le manifeste et les artefacts utiles.

## Etape 7 - Ce que tu dois surveiller

Tu dois surveiller :
- les hypotheses non justifiees,
- la derive du scope,
- les choix techniques trop lourds,
- les comportements metier inventes,
- les manques de validation.

## Etape 8 - Laisser l'agent avancer jusqu'au plan

Au debut, une bonne pratique consiste a lui laisser faire :
- la spec
- le tech profile
- le AGENTS.md
- le frontend-contract ou l'api-contract
- le plan

### Exemple de consigne

```text
Tu peux avancer jusqu'au plan tant qu'il n'y a pas de blocage critique.
Arrete-toi si :
- une decision metier importante n'est pas claire
- une hypothese touche la securite
- une zone du visuel est trop ambigue
```

## Etape 9 - Faire un premier checkpoint

Avant implementation, tu dois verifier :
- la spec est-elle credible ?
- les hypotheses sont-elles visibles ?
- le plan est-il bien decoupe ?
- le scope est-il raisonnable ?

Si oui, tu peux laisser continuer.

## Etape 10 - Lancer une ou deux etapes d'execution

Tu peux alors demander a l'agent de continuer.

### Exemple de message

```text
La spec et le plan sont acceptables.

Tu peux maintenant executer les deux premieres etapes du plan.

Contraintes :
- reste strictement dans le perimetre
- signale les limites
- prepare les tests lies a ces etapes
```

## Etape 11 - Quand interrompre

Tu interromps si :
- l'agent invente une logique produit,
- il traverse une zone de risque sans te prevenir,
- il prend un choix d'architecture fort sans justification,
- il commence a coder au-dela de l'etape demandee.

### Exemple d'interruption saine

```text
Stop ici.

Je ne veux pas que tu supposes encore le comportement detaille des filtres ni celui du panneau de details.

Reviens a la spec et laisse ces points en inconnues.
```

## Etape 12 - Faire la revue meme dans ce mode

Le mode `auto-orchestrated` n'enleve jamais la revue.

Tu utilises `prompts/review.md`.

### Exemple

```text
Applique :
[colle ici .ai-dev-system/prompts/review.md]

Je veux une revue critique de la solution produite jusqu'ici.

Contexte :
- mode auto-orchestrated
- stack connue
- objectif : aller vite sans sacrifier la qualite
```

### Comment utiliser le reviewer dans ce mode

Dans ce mode, le reviewer est ce qui t'empeche de confondre vitesse et confiance aveugle.

Il sert a verifier si l'IA :
- a respecte le scope
- a evite les hypotheses dangereuses
- a garde une structure saine
- n'a pas saute des validations importantes

Ici, le reviewer doit intervenir avant que tu autorises la suite d'une execution plus large.

Regle simple :
- plus l'IA a avance seule, plus la review doit etre prise au serieux

### Comment lire le resultat de la review

Tu regardes surtout :
- si des hypotheses critiques ont ete prises sans validation
- si des risques de regression apparaissent
- si l'agent a depasse le perimetre

Si la review remonte un probleme eleve ou critique, tu interromps la progression automatique.

## Etape 13 - Corriger puis continuer

Si la revue remonte des problemes :
- tu corriges d'abord,
- puis tu laisses reprendre l'orchestration.

## Etape 14 - Memoriser seulement ce qui est valide

En `auto-orchestrated`, il faut etre encore plus strict avec la memory.

Pourquoi ?
Parce que l'IA peut produire vite, mais tout ce qui est produit vite ne doit pas devenir une verite de projet.

Tu n'ajoutes dans `memory/` que :
- des decisions relues et acceptees
- des conventions validees
- des patterns observes comme utiles
- des anti-patterns reels

### Fichiers utilises

- `memory/decision-log.md`
- `memory/conventions.md`
- `memory/patterns.md`
- `memory/project-memory.md` si c'est une memoire propre au projet cible

### Exemple de message a envoyer a l'agent

```text
Je veux maintenant capitaliser ce qui a ete valide.

Mets a jour seulement :
- memory/decision-log.md
- memory/conventions.md si une convention stable a ete validee
- memory/patterns.md
- memory/project-memory.md si l'information est propre a ce projet

Ne memorise pas :
- les hypotheses non confirmees
- les idees provisoires
- les choix encore ambigus
```

### Exemple de contenu dans `decision-log.md`

```md
## Decision
- sujet : generation de spec depuis mockup
- decision : certaines zones de filtre restent explicitement marquees comme inconnues jusqu'a validation produit
- raison : eviter la sur-interpretation du design
- impact : meilleure fiabilite des iterations suivantes
```

### Exemple de contenu dans `patterns.md`

```md
## Anti-pattern
- nom : transformer une ambiguite visuelle en comportement metier par defaut
- contexte : generation frontend a partir d'un mockup
- consequence : derive produit et rework
```

### Checklist avant de memoriser

Verifie :
- la decision a-t-elle ete relue humainement ?
- serait-elle encore vraie si quelqu'un relisait le projet demain ?
- va-t-elle aider les prochaines iterations ?

## Erreurs frequentes a eviter

Voici les erreurs les plus courantes en mode auto-orchestrated :
- laisser l'IA avancer sans jamais relire
- confondre vitesse et absence de controle
- accepter des hypotheses importantes non validees
- laisser l'agent coder au-dela du scope courant
- oublier la revue sous pretexte que le mode est automatise

## Simulation complete simple

### Message 1

```text
Je suis en mode auto-orchestrated.
Voici le manifeste.
Voici la spec de depart.
Voici le tech profile.
Avance jusqu'au plan tant qu'il n'y a pas de blocage critique.
```

### Message 2

```text
Le plan me convient.
Tu peux executer les deux premieres etapes.
```

### Message 3

```text
Maintenant revois la solution de facon critique.
```

### Message 4

```text
Corrige uniquement les problemes remontes par la revue.
```

## Ce qu'un debutant doit retenir

Le mode auto-orchestrated est puissant, mais il faut rester vigilant.

Tu dois retenir :
- l'IA peut aller plus vite
- le systeme donne un cadre
- toi, tu gardes le droit de stopper
- la revue reste obligatoire

## Difference simple entre les 3 modes

- `manual` : toi, tu pilotes tout
- `semi-auto` : le systeme prepare, tu valides entre les phases
- `auto-orchestrated` : le runner prepare le cadre, puis l'IA avance plus librement sous controle des gates

## Resume ultra court

1. lancer le run en `auto-orchestrated`
2. lire le manifeste
3. lire `execution-loop.yml`
4. donner `auto-orchestrator.md` a l'agent
5. le laisser avancer jusqu'au plan
6. verifier
7. laisser executer une ou deux etapes si `execution-loop.yml` l'autorise
8. demander une revue
9. memoriser ce qui est valide
10. corriger si necessaire

## A retenir en une phrase

Le mode auto-orchestrated accelere beaucoup le travail, mais il reste sain seulement si tu surveilles les hypotheses et les risques critiques.

## Quand ne pas utiliser ce mode

Tu ne choisis pas `auto-orchestrated` si :
- le besoin est tres flou
- le risque metier est fort
- la securite ou la conformite sont critiques
- tu debutes completement sur le systeme

Dans ces cas, commence par :
- `docs/modes/guide-mode-manuel.md`
- ou `docs/modes/guide-mode-semi-auto.md`
