"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Docs", href: "/docs" },
  { label: "Guides", href: "/guides" },
  { label: "Changelog", href: "/changelog" },
  { label: "Sessions", href: "/sessions" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-border bg-[rgba(5,6,10,0.82)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-[conic-gradient(from_140deg,#22d3ee,#5b8cff,#a78bfa,#22d3ee)] shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]">
            <span className="h-3 w-3 rounded-[3px] bg-background" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            AI&nbsp;Dev&nbsp;System
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active ? "text-foreground" : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/HayasMoustapha/ai-dev-system-universel"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-3.5 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-white/5 hover:text-foreground sm:inline-flex"
          >
            GitHub
          </a>
          <Link
            href="/docs"
            className="inline-flex items-center rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Get started
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="glass flex h-9 w-9 items-center justify-center rounded-lg text-foreground md:hidden"
          >
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-[rgba(5,6,10,0.92)] px-6 py-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
