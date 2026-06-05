# AI Dev System Web

Interface web dediee pour AI Dev System / Governor.

## Purpose

Ce repo porte :

- la surface web navigateur ;
- l'experience de chat, de streaming et de pilotage ;
- l'integration `ai-sdk.dev` cote interface ;
- les projections UI des sessions Governor.

Ce repo ne porte pas :

- le noyau Python Governor ;
- l'upgrade system ;
- la logique coeur des sessions ;
- une copie de `ai-dev-system-universel`.

Le repo source du coeur Governor reste :

- `C:\Users\moust\Documents\Work\tools\ai-dev-system-universel`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- npm

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Environment

Le copilote de session fonctionne en mode fallback sans credentials, mais pour activer un vrai stream modele il faut configurer un provider.

Configuration recommandee pour vos tests avec une cle OpenAI directe :

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5-nano
```

`gpt-5-nano` est le choix le plus leger et le moins couteux pour les tests rapides. Si vous preferez passer plus tard par Vercel AI Gateway, vous pouvez utiliser a la place :

```env
AI_GATEWAY_API_KEY=...
AI_GATEWAY_MODEL=openai/gpt-5-nano
```

Etapes locales :

```bash
copy .env.example .env.local
npm run dev
```

Important :

- `AI_GATEWAY_API_KEY` attend une cle Vercel AI Gateway, pas une cle OpenAI directe.
- ce repo ne versionne pas `.env.local`.
- la session Governor locale reste sous `.ai-dev-system/` et pilote le chantier web localement.

## Public Platform Site

The marketing/documentation surface (deep-space / neural design) lives under `src/app` and `src/components`:

| Route | Contenu |
| --- | --- |
| `/` | Hero 3D-like (neural canvas + aurora), how-it-works, capability deep-dive, audience split, CTA |
| `/docs` + `/docs/[slug]` | Documentation hyper-riche : 33 docs curés du corpus `ai-dev-system-universel/docs`, rendus via une pipeline markdown (TOC, GFM tables, prev/next) |
| `/capabilities` + `/capabilities/[id]` | Les 16 capacités, chacune avec une page de détail (pourquoi / mécanisme / garantie / commandes / doc liée) |
| `/guides` | Parcours double-piste (tech / non-tech), simulation animée d'une session Governor, cas pratique |
| `/changelog` | Timeline des releases |

Design system : `src/app/globals.css` (Tailwind v4 `@theme`, deep-space dark, glass, aurora). The animated neural background is global and fixed (`src/components/site/site-background.tsx`) with an on/off toggle persisted in `localStorage` (respects `prefers-reduced-motion`).

SEO/social is built-in: per-page OpenGraph/Twitter, a generated OG image (`src/app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt`, web manifest and a branded icon. Set `NEXT_PUBLIC_SITE_URL` so absolute URLs are correct.

### To vendor / refresh docs

Curated docs are vendored into `src/content/docs/<slug>.md` and declared in `src/lib/docs.ts`. To add or refresh a page: add an entry to the manifest, then copy the source markdown from `ai-dev-system-universel/docs` into `src/content/docs/<slug>.md`.

## Deployment

The site is a standard Next.js App Router app — zero-config on Vercel.

**Option A — GitHub → Vercel (recommended):** import this repo on [vercel.com/new](https://vercel.com/new). Add the env var `NEXT_PUBLIC_SITE_URL` (your final domain). If you use the session copilot (`/api/chat`, `/sessions`), also set `OPENAI_API_KEY` (+ `OPENAI_MODEL`) or the AI Gateway vars.

**Option B — Vercel CLI:**

```bash
npx vercel login
npx vercel --prod
```

After deploy, set `NEXT_PUBLIC_SITE_URL` in the project's Environment Variables and redeploy so OpenGraph/sitemap absolute URLs resolve to the live domain.

## Source Of Truth

Lire en priorite :

- [AGENTS.md](./AGENTS.md)
- [research/source_inventory.md](./research/source_inventory.md)
- [research/open_questions.md](./research/open_questions.md)
- [specs/implementation_plan.md](./specs/implementation_plan.md)

## Boundary With The Core Repo

Si une demande impose de modifier :

- les scripts Python Governor ;
- les contrats coeur de session ;
- les artefacts natifs du systeme ;
- la logique d'upgrade ;

alors cette evolution doit repartir dans `ai-dev-system-universel`, puis revenir ici si necessaire.
