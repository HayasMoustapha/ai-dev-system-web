import Link from "next/link";

const COLS = [
  {
    title: "Produit",
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "Changelog", href: "/changelog" },
      { label: "Sessions live", href: "/sessions" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Getting started", href: "/guides" },
      { label: "Architecture", href: "/docs/architecture" },
    ],
  },
  {
    title: "Projet",
    links: [
      { label: "GitHub", href: "https://github.com/HayasMoustapha/ai-dev-system-universel" },
      { label: "Releases", href: "/changelog" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-[conic-gradient(from_140deg,#22d3ee,#5b8cff,#a78bfa,#22d3ee)]" />
            <span className="text-sm font-semibold">AI Dev System</span>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted">
            Le système de livraison gouverné : automatisé, intelligent, prédictif — et
            prouvé à chaque étape.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-10 text-xs text-muted lg:px-10">
        © {new Date().getFullYear()} AI Dev System · Governed delivery, by construction.
      </div>
    </footer>
  );
}
