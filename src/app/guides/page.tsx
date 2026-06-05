import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../../components/site/site-shell";
import { PageHeader } from "../../components/site/page-header";
import { Reveal } from "../../components/site/reveal";
import { GovernorSimulation } from "../../components/guides/governor-simulation";
import { AudienceTabs } from "../../components/guides/audience-tabs";

export const metadata: Metadata = {
  title: "Guides — AI Dev System",
  description:
    "Prise en main pas à pas, pour informaticiens et non-informaticiens : parcours, cas pratique et simulation d'une session Governor.",
};

/* ---------- Journey: non-technical track ---------- */
const NON_TECH_STEPS = [
  {
    n: "1",
    title: "Tu décris ce que tu veux",
    body: "Une phrase normale suffit, comme à un collègue : « Ajoute une page de contact avec un formulaire ». Aucun terme technique requis.",
    example: "« Ajoute une page de contact avec un formulaire validé »",
  },
  {
    n: "2",
    title: "Governor réfléchit avant d'agir",
    body: "Il découpe le travail en petites étapes, estime le risque, et décide tout seul d'être prudent là où il le faut.",
    example: "Risque estimé : modéré → vérifications renforcées sur l'envoi d'e-mail",
  },
  {
    n: "3",
    title: "Il travaille étape par étape",
    body: "À chaque étape, il vérifie son propre travail (tests, qualité). Si une vérification échoue, il corrige avant de continuer.",
    example: "Étape 1 ✓ · Étape 2 ✓ · Étape 3 en attente d'une info de ta part",
  },
  {
    n: "4",
    title: "Il s'arrête quand c'est important",
    body: "Pour tout ce qui est sensible (un mot de passe, un envoi réel), il te demande avant. Il ne devine jamais.",
    example: "« Il me faut l'adresse d'envoi des e-mails pour continuer »",
  },
  {
    n: "5",
    title: "Tu reçois une preuve, pas une promesse",
    body: "À la fin, tu obtiens un récapitulatif vérifiable : ce qui a été fait, testé, et signé. Rien n'est dit « terminé » sans preuve.",
    example: "Livré · 3 étapes prouvées · 0 régression · rapport signé",
  },
];

/* ---------- Journey: technical track ---------- */
const TECH_STEPS = [
  {
    n: "1",
    title: "Installer l'instance gouvernée",
    body: "Pose le `.ai-dev-system/` dans le projet sans dupliquer le cœur. L'instance porte les sessions, runs, handoff et artefacts.",
    code: "python scripts/ai.py install <projet>",
  },
  {
    n: "2",
    title: "Ouvrir une session sur le besoin",
    body: "Governor cadre, prédit le risque, relève le plancher de gouvernance, sélectionne les capacités et écrit la première tranche exécutable.",
    code: 'python scripts/ai.py /ads-go "Décris ton besoin"',
  },
  {
    n: "3",
    title: "Piloter en autopilot gouverné",
    body: "L'exécuteur agit sous contrat d'allégeance : gate hôte, journal NDJSON, vérification au retour, attestation. Il enchaîne jusqu'au vrai bloqueur.",
    code: "python scripts/ai.py governor-autopilot <projet> --until-done",
  },
  {
    n: "4",
    title: "Reprendre exactement après interruption",
    body: "Le journal de continuité rejoue le fil et reconstruit la next-action exacte. Le manifest périmé ne fait jamais foi contre le journal.",
    code: "python scripts/ai.py /ads-go --resume",
  },
  {
    n: "5",
    title: "Aligner et prouver la flotte",
    body: "Découvre les instances, évalue le drift/version, et propage l'upgrade en un geste. Le pack de conformité est généré depuis les preuves réelles.",
    code: "python scripts/ai.py governor-fleet --root <dossier>",
  },
];

function NonTechPanel() {
  return (
    <div className="space-y-3">
      {NON_TECH_STEPS.map((s) => (
        <div key={s.n} className="glass rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="text-gradient font-mono text-xl font-semibold">{s.n}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
              <div className="mt-3 rounded-xl border border-cyan/15 bg-cyan/[0.04] px-4 py-2.5 text-sm text-foreground/85">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan/70">exemple</span>
                <div className="mt-1">{s.example}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TechPanel() {
  return (
    <div className="space-y-3">
      {TECH_STEPS.map((s) => (
        <div key={s.n} className="glass rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="text-gradient font-mono text-xl font-semibold">{s.n}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-black/40 px-4 py-3 font-mono text-[13px] text-foreground/90">
                <code>{s.code}</code>
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Practical case phases ---------- */
const CASE_PHASES = [
  {
    phase: "Phase 1",
    title: "Le besoin",
    you: "Tu écris une phrase : « Ajoute une page de contact avec un formulaire validé ».",
    governor: "Cadrage du besoin, prédiction du risque (38/100), choix du profil balanced et sélection des capacités (validation, anti-spam, tests).",
    proof: "Session ouverte + plan de 3 tranches écrit dans le journal de continuité.",
  },
  {
    phase: "Phase 2",
    title: "Le travail prouvé",
    you: "Rien à faire — tu regardes avancer.",
    governor: "Tranche 1 (formulaire) puis tranche 2 (validation + anti-spam), chacune passant ses portes : lint, types, tests, revue ciblée.",
    proof: "Chaque porte verte est journalisée ; un échec corrige avant de continuer.",
  },
  {
    phase: "Phase 3",
    title: "L'arrêt gouverné",
    you: "Tu fournis le secret demandé (SMTP_URL) — la seule zone sensible.",
    governor: "Sur l'envoi e-mail, le secret manque : arrêt gouverné. Governor ne devine jamais un secret ni n'envoie à l'aveugle.",
    proof: "Décision tracée ; reprise exacte sur la tranche 3 après ta réponse.",
  },
  {
    phase: "Phase 4",
    title: "La livraison",
    you: "Tu reçois un récapitulatif vérifiable.",
    governor: "Tests complets verts, attestation signée HMAC-SHA256, pack de conformité généré depuis les preuves réelles.",
    proof: "3/3 tranches prouvées · 0 régression · rapport signé, vérifiable hors-ligne.",
  },
];

export default function GuidesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Guides"
        title="Prise en main, pas à pas"
        subtitle="De zéro à une livraison gouvernée. Le même parcours, expliqué pour les non-informaticiens comme pour les informaticiens — avec un cas pratique et une simulation."
      />

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        {/* Journey, dual-track */}
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Le parcours en 5 étapes</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Choisis ta lecture. Les deux décrivent exactement le même système — l&apos;une en langage
              clair, l&apos;autre avec les commandes.
            </p>
            <div className="mt-6">
              <AudienceTabs
                items={[
                  {
                    id: "non-tech",
                    label: "Non-informaticien",
                    hint: "Aucun jargon. Tu décris, le système fait et prouve.",
                    panel: <NonTechPanel />,
                  },
                  {
                    id: "tech",
                    label: "Informaticien",
                    hint: "Les commandes, contrats et garanties, étape par étape.",
                    panel: <TechPanel />,
                  },
                ]}
              />
            </div>
          </section>
        </Reveal>

        {/* Simulation */}
        <Reveal>
          <section className="mt-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/80">Simulation</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Une session Governor, en direct
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Regarde se dérouler une livraison réelle : cadrage, tranches prouvées, arrêt gouverné sur
              une zone sensible, reprise, puis attestation. (Reconstitution fidèle du comportement.)
            </p>
            <div className="mt-6">
              <GovernorSimulation />
            </div>
          </section>
        </Reveal>

        {/* Practical case */}
        <Reveal>
          <section className="mt-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet/80">Cas pratique</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Ajouter une page de contact, décortiqué
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Le même scénario que la simulation, phase par phase : ce que <strong className="text-foreground">tu</strong> fais,
              ce que <strong className="text-foreground">Governor</strong> fait, et la <strong className="text-foreground">preuve</strong> produite.
            </p>

            <div className="mt-6 space-y-3">
              {CASE_PHASES.map((p) => (
                <div key={p.phase} className="glass rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan/80">
                      {p.phase}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted">Ce que tu fais</div>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/85">{p.you}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted">Ce que Governor fait</div>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/85">{p.governor}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-cyan/70">Preuve produite</div>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/85">{p.proof}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Next */}
        <Reveal>
          <div className="mt-16 glass rounded-2xl p-6 text-center">
            <p className="text-sm text-muted">
              Pour aller plus loin :{" "}
              <Link href="/docs/getting-started" className="text-foreground underline decoration-cyan/50 underline-offset-4">
                démarrage ultra-simple
              </Link>
              ,{" "}
              <Link href="/docs/governor-15-minutes" className="text-foreground underline decoration-violet/50 underline-offset-4">
                Governor en 15 minutes
              </Link>
              , ou la{" "}
              <Link href="/docs" className="text-foreground underline decoration-blue/50 underline-offset-4">
                documentation complète
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </SiteShell>
  );
}
