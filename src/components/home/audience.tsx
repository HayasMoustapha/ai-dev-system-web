import Link from "next/link";
import { Reveal } from "../site/reveal";

const TECH = [
  "Pilote n'importe quel exécuteur IA (Claude Code, Codex…) sous contrat d'allégeance",
  "Gates hôte, journal NDJSON, attestation HMAC vérifiable en CI",
  "Fleet control plane : drift, plan d'upgrade, propagation en un geste",
  "Orchestration parallèle à ownership disjoint, mode économe par défaut",
];

const NONTECH = [
  "Tu décris ton besoin en une phrase — pas de jargon requis",
  "Le système choisit seul le bon niveau de prudence",
  "Tu vois ce qui est fait, prouvé, et ce qui reste — clairement",
  "Rien n'est annoncé « terminé » sans preuve à l'appui",
];

function Col({
  badge,
  title,
  items,
  cta,
  href,
  accent,
}: {
  badge: string;
  title: string;
  items: string[];
  cta: string;
  href: string;
  accent: "cyan" | "violet";
}) {
  const ring = accent === "cyan" ? "glow-cyan" : "glow-violet";
  const dot = accent === "cyan" ? "bg-cyan" : "bg-violet";
  return (
    <div className={`glass ${ring} flex h-full flex-col rounded-3xl p-8`}>
      <span className={`inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {badge}
      </span>
      <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
      <ul className="mt-5 flex-1 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-sm leading-6 text-muted">
            <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${dot}`} />
            <span className="text-foreground/85">{it}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-transform hover:translate-x-0.5"
      >
        {cta} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export function Audience() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet/80">Pour qui</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Conçu pour les deux bouts de la table
          </h2>
          <p className="mt-4 text-muted">
            La même gouvernance, deux lectures : la profondeur technique pour qui la veut,
            la simplicité pour qui n&apos;en a pas besoin.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Col
            badge="Pour les informaticiens"
            title="Le control plane que tu aurais voulu écrire"
            items={TECH}
            cta="Lire l'architecture"
            href="/docs/architecture"
            accent="cyan"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Col
            badge="Pour les non-informaticiens"
            title="Tu décris. Le système livre, et le prouve"
            items={NONTECH}
            cta="Suivre le guide pas à pas"
            href="/guides"
            accent="violet"
          />
        </Reveal>
      </div>
    </section>
  );
}
