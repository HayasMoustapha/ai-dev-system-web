import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/site/site-shell";
import {
  CAPABILITY_GROUPS,
  getCapability,
  getAdjacentCapabilities,
} from "../../../lib/capabilities";
import { getDocPage } from "../../../lib/docs";

export function generateStaticParams() {
  return CAPABILITY_GROUPS.flatMap((g) => g.items).map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cap = getCapability(id);
  if (!cap) return { title: "Capacité · AI Dev System" };
  return {
    title: cap.title,
    description: cap.description,
    alternates: { canonical: `/capabilities/${cap.id}` },
    openGraph: { title: cap.title, description: cap.description, url: `/capabilities/${cap.id}` },
    twitter: { title: cap.title, description: cap.description },
  };
}

const ACCENT_DOT: Record<string, string> = {
  cyan: "bg-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]",
  violet: "bg-violet shadow-[0_0_12px_2px_rgba(167,139,250,0.7)]",
  blue: "bg-blue shadow-[0_0_12px_2px_rgba(91,140,255,0.7)]",
};
const ACCENT_LINE: Record<string, string> = {
  cyan: "from-cyan/50",
  violet: "from-violet/50",
  blue: "from-blue/50",
};

export default async function CapabilityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cap = getCapability(id);
  if (!cap) notFound();

  const { prev, next } = getAdjacentCapabilities(id);
  const doc = cap.docSlug ? getDocPage(cap.docSlug) : undefined;

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <Link href="/capabilities" className="text-sm text-muted transition-colors hover:text-foreground">
          ← Toutes les capacités
        </Link>

        <header className="mt-6">
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${ACCENT_DOT[cap.accent]}`} />
            {cap.category && (
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {cap.category}
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-muted">depuis {cap.since}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            {cap.title}
          </h1>
          <p className="mt-3 text-lg font-medium text-foreground/85">{cap.tagline}</p>
          <p className="mt-4 text-pretty leading-7 text-muted">{cap.description}</p>
          <div className={`mt-6 h-px w-full bg-gradient-to-r ${ACCENT_LINE[cap.accent]} to-transparent`} />
        </header>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Pourquoi ça compte</h2>
          <p className="mt-3 text-pretty leading-7 text-foreground/90">{cap.why}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Comment ça marche</h2>
          <ul className="mt-4 space-y-3">
            {cap.how.map((step, i) => (
              <li key={i} className="glass flex items-start gap-4 rounded-2xl p-4">
                <span className="text-gradient font-mono text-sm font-semibold">{i + 1}</span>
                <span className="text-sm leading-6 text-foreground/90">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <div className="glass glow-cyan rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan/90">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.8)]" />
              La garantie
            </h2>
            <p className="mt-3 text-pretty leading-7 text-foreground/90">{cap.proof}</p>
          </div>
        </section>

        {cap.commands && cap.commands.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">À l&apos;œuvre</h2>
            <div className="mt-4 space-y-2">
              {cap.commands.map((cmd) => (
                <pre
                  key={cmd}
                  className="overflow-x-auto rounded-xl border border-border bg-black/40 px-4 py-3 font-mono text-[13px] text-foreground/90"
                >
                  <code>
                    <span className="text-cyan/70">❯ </span>
                    {cmd}
                  </code>
                </pre>
              ))}
            </div>
          </section>
        )}

        {doc && (
          <section className="mt-10">
            <Link
              href={`/docs/${doc.slug}`}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:bg-white/[0.06]"
            >
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-muted">Documentation liée</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{doc.title}</div>
                <div className="mt-0.5 text-sm text-muted">{doc.summary}</div>
              </div>
              <span className="ml-auto text-cyan/80 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </section>
        )}

        <nav className="mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/capabilities/${prev.id}`}
              className="glass rounded-2xl p-4 transition-colors hover:bg-white/[0.06]"
            >
              <div className="text-xs text-muted">← Précédent</div>
              <div className="mt-1 text-sm font-medium text-foreground">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/capabilities/${next.id}`}
              className="glass rounded-2xl p-4 text-right transition-colors hover:bg-white/[0.06]"
            >
              <div className="text-xs text-muted">Suivant →</div>
              <div className="mt-1 text-sm font-medium text-foreground">{next.title}</div>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </SiteShell>
  );
}
