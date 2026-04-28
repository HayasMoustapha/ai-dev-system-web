import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f4f1e8,transparent_42%),linear-gradient(180deg,#fbf8f1_0%,#f0ebe1_100%)] text-stone-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 sm:px-10 lg:px-12">
        <section className="grid flex-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-stone-300/70 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-stone-600 backdrop-blur">
              AI Dev System Web
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                Control surface web dediee pour Governor.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">
                Ce repo porte l&apos;interface navigateur, le streaming UI et la
                future integration AI SDK. Le noyau Python Governor reste dans
                le repo source et n&apos;est pas duplique ici.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-stone-300/70 bg-white/80 p-5 shadow-[0_20px_60px_-30px_rgba(66,54,37,0.35)] backdrop-blur">
                <div className="text-sm font-medium uppercase tracking-[0.22em] text-stone-500">
                  Repo web
                </div>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  Next.js App Router, TypeScript, Tailwind et AI SDK cote UI.
                </p>
              </div>
              <div className="rounded-3xl border border-stone-300/70 bg-stone-950 p-5 text-stone-50 shadow-[0_20px_60px_-30px_rgba(25,22,18,0.6)]">
                <div className="text-sm font-medium uppercase tracking-[0.22em] text-stone-300">
                  Repo source
                </div>
                <p className="mt-3 text-sm leading-7 text-stone-200">
                  `ai-dev-system-universel` reste la source de verite du coeur
                  Governor, des contrats de session et des scripts Python.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sessions"
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-medium uppercase tracking-[0.22em] text-stone-50 transition-transform duration-200 hover:-translate-y-0.5"
              >
                Ouvrir les sessions
              </Link>
              <div className="inline-flex items-center justify-center rounded-full border border-stone-300/70 bg-white/70 px-6 py-3 text-sm uppercase tracking-[0.2em] text-stone-600">
                Read-only P0
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_30px_80px_-35px_rgba(42,33,20,0.35)] backdrop-blur">
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">
              P0 en cours
            </div>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
              <li>Bootstrap du repo web separe</li>
              <li>Definition des frontieres avec le coeur Governor</li>
              <li>Preparation de la couche AI SDK UI</li>
              <li>Lecture web initiale de `session-dashboard.md` et `session-event-log.yml`</li>
            </ul>
            <div className="mt-8 rounded-2xl bg-stone-100 p-4 text-sm leading-7 text-stone-700">
              Prochaine tranche recommandee : ajouter les dependances AI SDK,
              puis construire une premiere vue web de session Governor sans
              toucher au noyau Python.
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
