import { Reveal } from "../site/reveal";

type Row = {
  kicker: string;
  title: string;
  body: string;
  points: string[];
  visual: React.ReactNode;
};

function JournalVisual() {
  return (
    <div className="font-mono text-[11px] leading-relaxed text-muted">
      <div className="flex items-center gap-2 text-cyan/90">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        journal.ndjson
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="truncate">{`{"t":"task","id":"s3","status":"done"}`}</div>
        <div className="truncate">{`{"t":"decision","gate":"tests","pass":true}`}</div>
        <div className="truncate text-foreground/70">{`{"t":"task","id":"s4","status":"running"}`}</div>
        <div className="truncate text-red-300/70">{`{"t":"task","id":"s4","stat…  ✕ crash`}</div>
      </div>
      <div className="mt-3 rounded-lg border border-cyan/20 bg-cyan/[0.05] px-3 py-2 text-cyan/90">
        ↻ rejeu → reprise exacte sur <span className="text-foreground">s4</span>
      </div>
    </div>
  );
}

function AttestVisual() {
  return (
    <div className="font-mono text-[11px] leading-relaxed text-muted">
      <div className="text-violet/90">attestation.sig</div>
      <div className="mt-3 space-y-1">
        <div>block 0 · <span className="text-foreground/70">9f2a…c41</span></div>
        <div>block 1 · <span className="text-foreground/70">prev 9f2a…c41</span></div>
        <div>block 2 · <span className="text-foreground/70">prev 1b77…e09</span></div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-violet/20 bg-violet/[0.05] px-3 py-2 text-violet/90">
        <span>HMAC-SHA256</span>
        <span className="ml-auto text-foreground">✓ vérifié hors-ligne</span>
      </div>
    </div>
  );
}

function PredictiveVisual() {
  return (
    <div className="font-mono text-[11px] leading-relaxed text-muted">
      <div className="text-blue/90">risk-forecast</div>
      <div className="mt-3 space-y-2">
        {[
          { l: "migration schéma", v: 86, c: "bg-red-400/70" },
          { l: "refactor interne", v: 52, c: "bg-amber-300/70" },
          { l: "copy / docs", v: 14, c: "bg-cyan/70" },
        ].map((r) => (
          <div key={r.l}>
            <div className="flex justify-between">
              <span>{r.l}</span>
              <span className="text-foreground/70">{r.v}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-blue/20 bg-blue/[0.05] px-3 py-2 text-blue/90">
        plancher gouvernance relevé → revue + strictesse
      </div>
    </div>
  );
}

const ROWS: Row[] = [
  {
    kicker: "Reprise & continuité",
    title: "Ne perds jamais le fil — même après un crash de plusieurs jours",
    body: "Chaque tâche, décision et porte est écrite au moment où elle survient (append + fsync). Une interruption n'abîme que la dernière ligne, ignorée au rejeu. Le journal est ensuite relu pour reconstruire le fil complet et la prochaine action exacte.",
    points: [
      "Write-ahead log crash-safe, instantané",
      "Reprise sur l'action exacte, pas « quelque part avant »",
      "Voyage temporel & fork depuis n'importe quel point",
    ],
    visual: <JournalVisual />,
  },
  {
    kicker: "Preuve & confiance",
    title: "Des garanties cryptographiques, pas des promesses",
    body: "Le fil de livraison est scellé dans une chaîne de hachage signée HMAC-SHA256, régénérée à chaque refresh. Toute altération, réordonnancement ou troncature est détecté — hors-ligne, sans faire confiance au serveur.",
    points: [
      "Hash chain tamper-evident sur le journal",
      "Vérifiable hors-ligne, infalsifiable",
      "Pack de conformité signé : SOC2 · ISO27001 · EU-AI-Act · NIST · OWASP",
    ],
    visual: <AttestVisual />,
  },
  {
    kicker: "Gouvernance intelligente",
    title: "Strict là où c'est vital, léger là où c'est sûr — automatiquement",
    body: "Le risque d'une tranche est prédit avant exécution à partir de signaux et de l'expérience passée. Un risque élevé relève le plancher de gouvernance, le profil, la revue et la strictesse. Un risque faible laisse le travail propre avancer vite.",
    points: [
      "Risque prédit avant exécution",
      "Profil, revue et strictesse calibrés automatiquement",
      "Zone rouge hard-enforced : rien de catastrophique ne passe",
    ],
    visual: <PredictiveVisual />,
  },
];

export function FeatureRows() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="space-y-20">
        {ROWS.map((r, i) => (
          <div
            key={r.title}
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan/80">{r.kicker}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{r.title}</h3>
              <p className="mt-4 text-pretty leading-7 text-muted">{r.body}</p>
              <ul className="mt-6 space-y-3">
                {r.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-foreground/90">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan to-violet" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="glass glow-cyan rounded-3xl p-6 sm:p-8">{r.visual}</div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
