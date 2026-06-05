# Acquisition Web De Capacites

## Principe

Governor peut chercher une capacite sur le web pendant une mission si elle manque localement. Cette recherche ne donne jamais le droit d'activer directement du code externe.

## Pipeline

```text
besoin detecte
  -> gap qualifie
  -> recherche locale
  -> recherche sources approuvees
  -> recherche web/GitHub/registry si necessaire
  -> fiche candidate
  -> revue risque
  -> quarantaine ou rejet
  -> plan d'installation
  -> verification
  -> lock
  -> activation policy-bound
```

## Modes

- `discover_only` : chercher et proposer, sans telecharger ni activer.
- `quarantine_install` : materialiser une fiche et un plan, sans activation.
- `auto_install_safe` : installer automatiquement si source approuvee, risque bas/moyen, pas de secrets et validation OK.
- `auto_install_with_approval` : preparer mais demander arbitrage pour secrets, OAuth, shell, ecriture large ou global config.
- `fully_autonomous_policy_bound` : autorise seulement pour sources preapprouvees, lockees, rollbackables.

## Refus Obligatoires

Governor refuse ou met en quarantaine si :

- binaire inconnu ;
- script remote non verrouille ;
- licence inconnue pour distribution ;
- secret ou OAuth requis sans politique explicite ;
- ecriture globale host ;
- outil destructif sans rollback ;
- validation echouee.

## Donnees De Preuve

Chaque candidate externe doit produire :

- `capability-bank/quarantine/<id>.candidate.yml`
- `capability-bank/reviews/<id>.review.yml`
- `capability-bank/projections/<id>/<host>-install-plan.yml`
- `capability-bank/locks/<id>.lock.yml` quand elle devient installable.
