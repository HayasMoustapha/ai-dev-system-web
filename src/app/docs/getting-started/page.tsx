import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — Getting started · AI Dev System",
  description: "Installer, donner un besoin, et laisser Governor piloter.",
};

export default function GettingStartedPage() {
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Démarrer</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-foreground">Getting started</h1>

      <p>De zéro à une livraison gouvernée, en quatre étapes.</p>

      <h2>1. Installer dans un projet</h2>
      <p>Pose l&apos;instance gouvernée dans ton projet, sans dupliquer le cœur Python.</p>
      <pre>
        <code>python scripts/ai.py install &lt;projet&gt;</code>
      </pre>

      <h2>2. Donner un besoin</h2>
      <p>
        Governor cadre le besoin, <strong>prédit le risque</strong>, sélectionne les capacités utiles et
        prépare une tranche exécutable et vérifiable.
      </p>
      <pre>
        <code>python scripts/ai.py /ads-go &quot;Décris ton besoin&quot;</code>
      </pre>

      <h2>3. Laisser Governor piloter</h2>
      <p>
        L&apos;exécuteur agit <strong>sous Governor</strong> (allégeance imposée), enchaîne les tranches en
        autopilot et ne s&apos;arrête que sur un vrai bloqueur ou une décision qui te revient.
      </p>
      <pre>
        <code>python scripts/ai.py governor-autopilot &lt;projet&gt; --until-done</code>
      </pre>

      <h2>4. Garder la flotte à jour</h2>
      <p>Aligne toutes tes instances en un seul geste gouverné.</p>
      <pre>
        <code>python scripts/ai.py governor-fleet-upgrade --root &lt;dossier&gt; --apply</code>
      </pre>

      <h2>Suite</h2>
      <p>
        Comprendre comment ça tient ensemble : <Link href="/docs/architecture">architecture</Link>.
      </p>
    </>
  );
}
