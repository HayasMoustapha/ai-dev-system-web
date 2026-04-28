import Link from "next/link";
import { notFound } from "next/navigation";
import { SessionCopilot } from "@/components/governor/session-copilot";
import {
  getGovernorSessionDetail,
  type GovernorDashboardSection,
} from "@/lib/governor/session-read-model";

export const dynamic = "force-dynamic";

type SessionDetailPageProps = {
  params: Promise<{ sessionName: string }>;
};

function renderSectionLine(line: string) {
  if (line.startsWith("- ")) {
    return (
      <li key={line} className="ml-4 list-disc text-sm leading-7 text-stone-700">
        {line.slice(2)}
      </li>
    );
  }

  return (
    <p key={line} className="text-sm leading-7 text-stone-700">
      {line}
    </p>
  );
}

function SectionCard({ section }: { section: GovernorDashboardSection }) {
  return (
    <section className="rounded-[1.75rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_24px_80px_-44px_rgba(40,28,18,0.35)]">
      <h2 className="text-lg font-semibold text-stone-950">{section.title}</h2>
      <div className="mt-4 space-y-3">
        {section.lines.map((line) => renderSectionLine(line))}
      </div>
    </section>
  );
}

export default async function SessionDetailPage({
  params,
}: SessionDetailPageProps) {
  const { sessionName } = await params;
  const session = await getGovernorSessionDetail(sessionName);
  const gatewayConfigured = Boolean(
    process.env.AI_GATEWAY_API_KEY && process.env.AI_GATEWAY_MODEL,
  );

  if (!session) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4efe4_0%,#e7dfd3_100%)] text-stone-900">
      <main className="mx-auto flex w-full max-w-7xl flex-col px-6 py-12 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-stone-300/80 pb-8">
          <Link
            href="/sessions"
            className="inline-flex w-fit rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-stone-600"
          >
            Retour aux sessions
          </Link>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">
                Session active
              </div>
              <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {session.index.name}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-stone-700">
                {session.index.objective}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-stone-300/70 bg-stone-950 p-6 text-stone-50 shadow-[0_24px_80px_-40px_rgba(17,13,10,0.55)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-stone-300">
                    Statut
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                    {session.index.status}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-stone-300">
                    Executant
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                    {session.index.executionAgent}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-stone-300">
                    Gouvernance
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                    {session.index.governanceLevel}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-stone-300">
                    Prochaine action
                  </div>
                  <div className="mt-2 text-sm leading-6 text-stone-100">
                    {session.index.nextAction}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {session.dashboardSections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>

          <aside className="space-y-6">
            <section className="rounded-[1.75rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_24px_80px_-44px_rgba(40,28,18,0.35)]">
              <h2 className="text-lg font-semibold text-stone-950">
                Contexte de session
              </h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    Project root
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-stone-700">
                    {session.projectRoot}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    System root
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-stone-700">
                    {session.systemRoot}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    Project context
                  </dt>
                  <dd className="mt-1 text-sm leading-7 text-stone-700">
                    {session.projectContext}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="rounded-[1.75rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_24px_80px_-44px_rgba(40,28,18,0.35)]">
              <h2 className="text-lg font-semibold text-stone-950">
                Contraintes actives
              </h2>
              <ul className="mt-4 space-y-3">
                {session.constraints.map((constraint) => (
                  <li
                    key={constraint}
                    className="rounded-2xl bg-stone-100 px-4 py-3 text-sm leading-7 text-stone-700"
                  >
                    {constraint}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[1.75rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_24px_80px_-44px_rgba(40,28,18,0.35)]">
              <h2 className="text-lg font-semibold text-stone-950">
                Journal append-only
              </h2>
              <div className="mt-5 space-y-4">
                {session.events.map((event) => (
                  <article
                    key={`${event.at}-${event.type}-${event.summary}`}
                    className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.18em] text-stone-500">
                          {event.type ?? "event"}
                        </div>
                        <h3 className="mt-2 text-sm font-semibold text-stone-950">
                          {event.summary ?? "Evenement sans resume"}
                        </h3>
                      </div>
                      <div className="text-right text-xs text-stone-500">
                        {event.at ?? "date non renseignee"}
                      </div>
                    </div>
                    {event.decision ? (
                      <p className="mt-3 text-sm leading-7 text-stone-700">
                        Decision : {event.decision}
                      </p>
                    ) : null}
                    {event.next_action ? (
                      <p className="mt-2 text-sm leading-7 text-stone-700">
                        Next action : {event.next_action}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_24px_80px_-44px_rgba(40,28,18,0.35)]">
              <h2 className="text-lg font-semibold text-stone-950">
                Artefacts relies
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                <li>{session.manifestPath}</li>
                <li>{session.dashboardPath}</li>
                <li>{session.eventLogPath}</li>
                <li>{session.resumeBriefPath}</li>
              </ul>
            </section>

            <SessionCopilot
              sessionName={session.index.name}
              gatewayConfigured={gatewayConfigured}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
