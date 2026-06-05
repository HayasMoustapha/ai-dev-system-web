import type { Metadata } from "next";
import Link from "next/link";
import { DOC_SECTIONS, DOC_PAGE_COUNT } from "../../lib/docs";

export const metadata: Metadata = {
  title: "Documentation · AI Dev System",
  description:
    "La documentation complète d'AI Dev System et Governor : démarrage, concepts, Governor, modes, continuité et intégrations.",
};

const SECTION_ACCENT: Record<string, string> = {
  demarrer: "from-cyan/60",
  concepts: "from-violet/60",
  governor: "from-blue/60",
  modes: "from-cyan/60",
  continuite: "from-violet/60",
  integrations: "from-blue/60",
};

export default function DocsIndexPage() {
  return (
    <div className="min-w-0">
      <header className="mb-12 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan/80">Documentation</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
          Tout le système, expliqué
        </h1>
        <p className="mt-4 text-pretty text-lg leading-8 text-muted">
          <strong className="text-foreground">AI Dev System</strong> pilote n&apos;importe quel
          exécuteur IA (Codex, Claude Code, Cursor, Windsurf…) sous une gouvernance déterministe,
          intelligente et prouvée. Cette documentation couvre {DOC_PAGE_COUNT} pages — du premier
          démarrage aux contrats internes — pour les profils techniques comme non-techniques.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/docs/getting-started"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Démarrer maintenant
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/docs/governor-15-minutes"
            className="glass inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07]"
          >
            Governor en 15 minutes
          </Link>
        </div>
      </header>

      <div className="space-y-10">
        {DOC_SECTIONS.map((section) => (
          <section key={section.id}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              <span className="font-mono text-xs text-muted">{section.pages.length} pages</span>
            </div>
            <p className="mt-1 text-sm text-muted">{section.blurb}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/docs/${page.slug}`}
                  className={`glass group relative overflow-hidden rounded-2xl p-5 transition-colors hover:bg-white/[0.06]`}
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${
                      SECTION_ACCENT[section.id] ?? "from-cyan/60"
                    } to-transparent`}
                  />
                  <h3 className="text-sm font-semibold text-foreground">{page.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{page.summary}</p>
                  <span className="mt-3 inline-block text-xs text-cyan/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Lire →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
