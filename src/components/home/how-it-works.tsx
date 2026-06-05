import { Reveal } from "../site/reveal";

const STEPS = [
  {
    n: "1",
    title: "Tu donnes le besoin",
    body: "Une phrase suffit. Governor cadre, prédit le risque, et choisit le niveau de gouvernance adapté — strict là où c'est vital, léger là où c'est sûr.",
    accent: "from-cyan/60",
  },
  {
    n: "2",
    title: "Governor sélectionne & pilote",
    body: "Il active automatiquement les bonnes capacités selon le besoin, prépare une tranche exécutable, et pilote l'exécuteur IA sous allégeance imposée.",
    accent: "from-violet/60",
  },
  {
    n: "3",
    title: "Preuve, puis propagation",
    body: "Chaque tranche est prouvée (gates, journal, attestation) avant de continuer. Rien n'est marqué « fait » sans preuve. La flotte s'aligne en un geste.",
    accent: "from-blue/60",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/80">Comment ça marche</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Tu pilotes l&apos;intention. Governor pilote le reste.
        </h2>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="glass relative h-full overflow-hidden rounded-3xl p-7">
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.accent} to-transparent`} />
              <div className="text-gradient font-mono text-5xl font-semibold leading-none">{s.n}</div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
