import Link from "next/link";
import { SiteHeader } from "../components/site/site-header";
import { SiteFooter } from "../components/site/site-footer";
import { Hero } from "../components/site/hero";
import { HowItWorks } from "../components/home/how-it-works";
import { FeatureRows } from "../components/home/feature-rows";
import { Audience } from "../components/home/audience";
import { CtaBand } from "../components/home/cta-band";
import { Reveal } from "../components/site/reveal";
import { CAPABILITY_COUNT, CAPABILITY_GROUPS } from "../lib/capabilities";

// Une capacité phare par famille, tirée de la SOURCE DE VÉRITÉ (lib/capabilities)
// -> cartes navigables vers le détail. Connecte /capabilities (plus orpheline)
// et garantit que l'accueil reflète les vraies capacités, jamais périmées.
const FEATURED = CAPABILITY_GROUPS.map((g) => g.items[0]).filter(Boolean).slice(0, 6);

const ACCENT: Record<string, string> = {
  cyan: "before:bg-cyan",
  violet: "before:bg-violet",
  blue: "before:bg-blue",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <HowItWorks />

        <FeatureRows />

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/80">
                {CAPABILITY_COUNT} capacités, {CAPABILITY_GROUPS.length} familles
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Une gouvernance qui se prouve
              </h2>
              <p className="mt-4 text-pretty text-muted">
                Chaque capacité est déterministe, testée et gatée. Pas de promesse — des
                garanties par construction.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((cap, i) => (
              <Reveal key={cap.id} delay={(i % 3) * 0.06}>
                <Link
                  href={`/capabilities/${cap.id}`}
                  className={`glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors hover:bg-white/[0.06] before:absolute before:left-0 before:top-0 before:h-full before:w-px ${ACCENT[cap.accent]} before:opacity-60`}
                >
                  <h3 className="text-base font-semibold text-foreground">{cap.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-muted">{cap.tagline}</p>
                  <span className="mt-3 inline-block text-xs text-cyan/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Découvrir →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/capabilities"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-white/[0.07]"
            >
              Voir les {CAPABILITY_COUNT} capacités →
            </Link>
          </div>
        </section>

        <Audience />

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
