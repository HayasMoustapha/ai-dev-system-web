import Link from "next/link";
import { listGovernorSessions } from "@/lib/governor/session-read-model";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) {
    return "Date non renseignee";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function SessionsPage() {
  const sessions = await listGovernorSessions();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f1e6_0%,#ece6db_100%)] text-stone-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-stone-300/80 pb-8">
          <span className="inline-flex w-fit rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-stone-600">
            Governor Sessions
          </span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Premiere surface web read-only des sessions locales.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-stone-700">
              Cette page projette les artefacts Governor existants sans toucher au
              noyau Python. Elle constitue le premier read model cible du chantier
              web.
            </p>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-stone-300 bg-white/70 p-8 text-stone-700">
            Aucune session Governor locale detectee dans `.ai-dev-system/governor/sessions`.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {sessions.map((session) => (
              <Link
                key={session.name}
                href={`/sessions/${session.name}`}
                className="group rounded-[2rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_24px_80px_-40px_rgba(40,28,18,0.35)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
                      {session.status}
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-stone-950">
                      {session.name}
                    </h2>
                  </div>
                  <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-stone-50">
                    {session.governanceLevel}
                  </span>
                </div>

                <p className="mt-5 line-clamp-3 text-sm leading-7 text-stone-700">
                  {session.objective}
                </p>

                <div className="mt-6 rounded-2xl bg-stone-100 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                    Prochaine action
                  </div>
                  <p className="mt-2 text-sm leading-7 text-stone-800">
                    {session.nextAction}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-stone-500">
                  <span>{session.executionAgent}</span>
                  <span>{formatDate(session.updatedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
