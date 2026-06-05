import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — Architecture · AI Dev System",
  description: "Le journal de continuité, l'attestation, le prédictif, l'allégeance et la strictesse.",
};

export default function ArchitecturePage() {
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Concepts</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-foreground">Architecture</h1>

      <p>
        Tout repose sur une idée : <strong>gouverné par construction</strong>. Les garanties ne sont pas
        déclarées, elles sont imposées à la frontière, détectées et prouvées.
      </p>

      <h2>Journal de continuité</h2>
      <p>
        Un write-ahead log <strong>append-only et crash-safe</strong> par session : chaque tâche, décision et
        processus est écrit instantanément. Une interruption ne peut abîmer que la dernière ligne, ignorée au
        rejeu. La reprise rejoue le journal pour restituer le fil complet et la next-action exacte — le
        manifest n&apos;est qu&apos;une vue humaine ; le journal fait foi.
      </p>

      <h2>Attestation cryptographique</h2>
      <p>
        Une chaîne de hachage tamper-evident est repliée sur les événements et signée (HMAC-SHA256). Toute
        édition, réordonnancement ou troncature du préfixe attesté est détecté hors-ligne — la croissance
        append-only légitime, elle, ne déclenche pas de fausse alerte.
      </p>

      <h2>Gouvernance prédictive</h2>
      <p>
        Avant exécution, le risque d&apos;une tranche est prédit (signaux intrinsèques + expérience des échecs
        passés). Un risque élevé relève le plancher de gouvernance, force un profil prudent, une revue
        systématique et un cadran de strictesse <code>strict</code>.
      </p>

      <h2>Allégeance exécuteur</h2>
      <p>
        Quatre couches garantissent que l&apos;exécuteur agit toujours sous Governor : un{" "}
        <strong>contrat</strong> d&apos;allégeance, un <strong>gate hôte</strong> qui refuse le hors-bande, un{" "}
        <strong>vérificateur</strong> de conformité au retour, et une <strong>attestation signée</strong>.
        L&apos;enforcement ne dépend pas de la discipline de l&apos;agent.
      </p>

      <h2>Strictesse ciblée</h2>
      <p>
        Une <strong>zone rouge</strong> non-négociable (force-push, drop BDD, secrets, config globale, édition
        hors-bande de session) est refusée <strong>toujours</strong>, même en break-glass. Un cadran
        strict/balanced/relaxed — lié au niveau de gouvernance — module la zone grise. Strict là où c&apos;est
        vital, léger là où c&apos;est sûr.
      </p>

      <h2>Mode économe</h2>
      <p>
        Le minimum de crédits par défaut (contexte minimal, tiering de modèle), avec escalade{" "}
        <strong>uniquement</strong> sur échec de gate — la qualité reste garantie par les gates déterministes.
      </p>

      <p>
        Voir toutes les <Link href="/capabilities">capacités</Link> ou l&apos;historique dans le{" "}
        <Link href="/changelog">changelog</Link>.
      </p>
    </>
  );
}
