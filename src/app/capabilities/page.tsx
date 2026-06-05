import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../../components/site/site-shell";
import { PageHeader } from "../../components/site/page-header";
import { Reveal } from "../../components/site/reveal";
import { CAPABILITY_GROUPS, CAPABILITY_COUNT } from "../../lib/capabilities";

export const metadata: Metadata = {
  title: "Capabilities — AI Dev System",
  description:
    "Les capacités de Governor : reprise exacte, attestation, gouvernance prédictive, allégeance, strictesse, fleet, économie et plus — déterministes, testées, gatées.",
};

const ACCENT_BAR: Record<string, string> = {
  cyan: "from-cyan/70",
  violet: "from-violet/70",
  blue: "from-blue/70",
};
const ACCENT_DOT: Record<string, string> = {
  cyan: "bg-cyan shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]",
  violet: "bg-violet shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]",
  blue: "bg-blue shadow-[0_0_10px_2px_rgba(91,140,255,0.7)]",
};

export default function CapabilitiesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow={`${CAPABILITY_COUNT} capacités gouvernées`}
        title="Tout ce que Governor fait — et prouve"
        subtitle="Chaque capacité est déterministe (zéro token de gouvernance), testée et tenue par une porte CI. Des garanties par construction, pas des promesses."
      />

      <div className="mx-auto max-w-7xl space-y-20 px-6 py-20 lg:px-10">
        {CAPABILITY_GROUPS.map((group) => (
          <section key={group.category}>
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{group.category}</h2>
              <p className="text-muted">{group.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((cap, i) => (
                <Reveal key={cap.id} delay={i * 0.05}>
                  <Link
                    href={`/capabilities/${cap.id}`}
                    className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors hover:bg-white/[0.06]"
                  >
                    <div
                      className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${ACCENT_BAR[cap.accent]} to-transparent opacity-70`}
                    />
                    <div className="flex items-center justify-between">
                      <span className={`h-2 w-2 rounded-full ${ACCENT_DOT[cap.accent]}`} />
                      <span className="font-mono text-[11px] text-muted">{cap.since}</span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">{cap.title}</h3>
                    <p className="mt-1 text-sm font-medium text-foreground/80">{cap.tagline}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{cap.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-cyan/80 opacity-0 transition-opacity group-hover:opacity-100">
                      Lire en détail
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteShell>
  );
}
