import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site/site-header";
import { SiteFooter } from "../components/site/site-footer";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/docs", label: "Documentation", desc: "33 pages, du démarrage aux contrats internes." },
  { href: "/capabilities", label: "Capacités", desc: "Les 16 capacités gouvernées, en détail." },
  { href: "/guides", label: "Guides", desc: "Parcours pas à pas + simulation en direct." },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center lg:px-10">
        <p className="text-gradient font-mono text-7xl font-semibold tracking-tight">404</p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Cette page n&apos;a pas pu être prouvée
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-muted">
          Le lien est cassé ou la page a été déplacée. Rien n&apos;est perdu — reprends le fil
          depuis l&apos;une de ces sections.
        </p>

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="glass group rounded-2xl p-5 text-left transition-colors hover:bg-white/[0.06]"
            >
              <div className="text-sm font-semibold text-foreground">{l.label}</div>
              <div className="mt-1.5 text-xs leading-5 text-muted">{l.desc}</div>
              <span className="mt-3 inline-block text-xs text-cyan/80 opacity-0 transition-opacity group-hover:opacity-100">
                Aller →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-[#05060a] transition-transform hover:-translate-y-0.5"
        >
          ← Retour à l&apos;accueil
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
