# Open Questions

## Questions A Resoudre

1. Le premier mode d'integration doit-il etre lecture seule des artefacts Governor ou inclure rapidement des actions web qui declenchent des commandes Python bornees ?
2. Le backend Next.js doit-il parser directement `session-dashboard.md` et `session-event-log.yml`, ou faut-il introduire tres tot un petit adaptateur local plus stable ?
3. Le streaming web doit-il commencer comme simple chat AI SDK local, ou directement comme surface de pilotage Governor compatible avec le protocole de stream UI ?
4. Quel fournisseur LLM initial faut-il supporter en premier : AI Gateway, OpenAI direct, ou abstraction sans provider active par defaut ?
5. Veut-on des pages multi-sessions des le P1, ou seulement une vue single-session au demarrage ?
6. Quel niveau de securite locale est obligatoire avant d'autoriser des actions systeme depuis l'interface web ?

## Questions Explicitement Hors Scope Pour Le Bootstrap

- auth multi-utilisateur
- deploiement cloud production
- federation inter-machines
- remplacement du coeur Python Governor
