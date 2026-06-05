import Link from "next/link";
import { SiteHeader } from "../components/site/site-header";
import { SiteFooter } from "../components/site/site-footer";
import { Hero } from "../components/site/hero";

const FEATURES = [
  {
    title: "Reprise exacte",
    desc: "Journal de continuité crash-safe : reprends exactement où ça s'est arrêté, même après des jours.",
    accent: "cyan",
  },
  {
    title: "Attestation cryptographique",
    desc: "Chaîne de hachage signée du fil de livraison — vérifiable hors-ligne, infalsifiable.",
    accent: "violet",
  },
  {
    title: "Gouvernance prédictive",
    desc: "Le risque d'une tranche est prédit avant exécution et calibre profil, revue et strictesse.",
    accent: "blue",
  },
  {
    title: "Allégeance imposée",
    desc: "L'exécuteur agit toujours sous Governor — contrat, gate hôte, vérification, attestation.",
    accent: "cyan",
  },
  {
    title: "Strictesse ciblée",
    desc: "Zone rouge hard-enforced : rien de catastrophique ne passe, sans étouffer le travail propre.",
    accent: "violet",
  },
  {
    title: "Mode économe",
    desc: "Le minimum de crédits par défaut, escalade uniquement sur échec de gate. Qualité garantie.",
    accent: "blue",
  },
];

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

        <section className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Une gouvernance qui se prouve
            </h2>
            <p className="mt-4 text-pretty text-muted">
              Chaque capacité est déterministe, testée et gatée. Pas de promesse — des
              garanties par construction.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:bg-white/[0.06] before:absolute before:left-0 before:top-0 before:h-full before:w-px ${ACCENT[f.accent]} before:opacity-60`}
              >
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-muted">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/capabilities"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-white/[0.07]"
            >
              Voir les 16 capacités →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
