import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../../components/site/site-shell";
import { PageHeader } from "../../components/site/page-header";
import { Reveal } from "../../components/site/reveal";

export const metadata: Metadata = {
  title: "Guides — AI Dev System",
  description: "Prise en main d'AI Dev System et Governor, étape par étape.",
};

const STEPS = [
  {
    n: "01",
    title: "Installer le système dans un projet",
    body: "Une commande pose l'instance gouvernée dans ton projet, sans dupliquer le cœur.",
    code: "python scripts/ai.py install <projet>",
  },
  {
    n: "02",
    title: "Donner ton besoin à Governor",
    body: "Governor cadre le besoin, prédit le risque, sélectionne les capacités utiles et prépare une tranche exécutable.",
    code: 'python scripts/ai.py /ads-go "Décris ton besoin"',
  },
  {
    n: "03",
    title: "Laisser Governor piloter",
    body: "L'exécuteur agit sous Governor (allégeance imposée), enchaîne les tranches en mode autopilot et ne s'arrête que sur un vrai bloqueur.",
    code: "python scripts/ai.py governor-autopilot <projet> --until-done",
  },
  {
    n: "04",
    title: "Vérifier la flotte",
    body: "Garde toutes tes instances à jour et alignées, en un seul geste gouverné.",
    code: "python scripts/ai.py governor-fleet --root <dossier>",
  },
];

export default function GuidesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Getting started"
        title="Prise en main"
        subtitle="De zéro à une livraison gouvernée : donne le besoin, Governor fait le reste — et le prouve."
      />

      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6 sm:p-7">
                <div className="flex items-start gap-5">
                  <span className="text-gradient font-mono text-2xl font-semibold">{s.n}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
                    <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-black/40 px-4 py-3 font-mono text-[13px] text-foreground/90">
                      <code>{s.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-6 text-center">
          <p className="text-sm text-muted">
            Pour aller plus loin, lis la{" "}
            <Link href="/docs" className="text-foreground underline decoration-cyan/50 underline-offset-4">
              documentation complète
            </Link>{" "}
            ou explore les{" "}
            <Link href="/capabilities" className="text-foreground underline decoration-violet/50 underline-offset-4">
              capacités
            </Link>
            .
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
