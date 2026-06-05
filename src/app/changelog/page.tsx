import type { Metadata } from "next";
import { SiteShell } from "../../components/site/site-shell";
import { PageHeader } from "../../components/site/page-header";
import { Reveal } from "../../components/site/reveal";
import { RELEASES } from "../../lib/releases";

export const metadata: Metadata = {
  title: "Changelog — AI Dev System",
  description: "L'historique des releases gouvernées d'AI Dev System / Governor.",
};

const DOT: Record<string, string> = {
  cyan: "bg-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]",
  violet: "bg-violet shadow-[0_0_12px_2px_rgba(167,139,250,0.7)]",
  blue: "bg-blue shadow-[0_0_12px_2px_rgba(91,140,255,0.7)]",
};

export default function ChangelogPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow={`${RELEASES.length}+ releases`}
        title="Changelog"
        subtitle="Chaque release est testée, gatée et propagée à la flotte. Voici l'évolution récente du système."
      />

      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <ol className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
          {RELEASES.map((r, i) => (
            <Reveal key={r.version} delay={Math.min(i * 0.03, 0.2)}>
              <li className="relative pl-10">
                <span className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ${DOT[r.accent]}`} />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-sm font-semibold text-foreground">v{r.version}</span>
                  <span className="font-mono text-xs text-muted">{r.date}</span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">{r.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm leading-6 text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </SiteShell>
  );
}
