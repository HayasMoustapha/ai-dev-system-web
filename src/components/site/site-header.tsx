import Link from "next/link";

const NAV = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Docs", href: "/docs" },
  { label: "Guides", href: "/guides" },
  { label: "Changelog", href: "/changelog" },
  { label: "Sessions", href: "/sessions" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-[conic-gradient(from_140deg,#22d3ee,#5b8cff,#a78bfa,#22d3ee)] shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]">
            <span className="h-3 w-3 rounded-[3px] bg-background" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            AI&nbsp;Dev&nbsp;System
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/HayasMoustapha/ai-dev-system-universel"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground sm:inline-flex"
          >
            GitHub
          </a>
          <Link
            href="/docs"
            className="inline-flex items-center rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Get started
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
