import type { Metadata } from "next";
import { SiteShell } from "../../components/site/site-shell";
import { PageHeader } from "../../components/site/page-header";
import { Reveal } from "../../components/site/reveal";
import { RELEASES, LATEST_RELEASE } from "../../lib/releases";

export const metadata: Metadata = {
  title: "Changelog",
  description: "L'historique des releases gouvernées d'AI Dev System / Governor — chaque version testée, gatée et propagée à la flotte.",
};

const DOT: Record<string, string> = {
  cyan: "bg-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]",
  violet: "bg-violet shadow-[0_0_12px_2px_rgba(167,139,250,0.7)]",
  blue: "bg-blue shadow-[0_0_12px_2px_rgba(91,140,255,0.7)]",
};
const TAG: Record<string, string> = {
  cyan: "border-cyan/25 text-cyan/90",
  violet: "border-violet/25 text-violet/90",
  blue: "border-blue/25 text-blue/90",
};

const STATS = [
  { value: `v${LATEST_RELEASE.version}`, label: "dernière release" },
  { value: `${RELEASES.length}`, label: "releases listées" },
  { value: "9", label: "instances alignées" },
  { value: "0", label: "régression tolérée" },
];

export default function ChangelogPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Changelog"
        title="L'évolution du système, prouvée"
        subtitle="Chaque release est déterministe, testée, gatée en CI, puis propagée à toute la flotte en un geste gouverné. Rien n'est livré sans preuve."
      />

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center">
              <div className="text-2xl font-semibold tracking-tight text-foreground">{s.value}</div>
              <div className="mt-1 text-xs leading-5 text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <ol className="relative space-y-5 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
          {RELEASES.map((r, i) => (
            <Reveal key={r.version} delay={Math.min(i * 0.03, 0.2)}>
              <li className="relative pl-10">
                <span className={`absolute left-0 top-6 h-3.5 w-3.5 rounded-full ${DOT[r.accent]}`} />
                <div className="glass rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-mono text-sm font-semibold text-foreground">v{r.version}</span>
                    <span className="font-mono text-xs text-muted">{r.date}</span>
                    <span
                      className={`ml-auto inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TAG[r.accent]}`}
                    >
                      {r.tag}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-foreground">{r.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-sm leading-6 text-muted">
                        <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${DOT[r.accent]}`} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <p className="mt-12 text-center text-sm text-muted">
          Versionnage sémantique · chaque entrée correspond à un chantier livré, gaté et propagé.
        </p>
      </div>
    </SiteShell>
  );
}
