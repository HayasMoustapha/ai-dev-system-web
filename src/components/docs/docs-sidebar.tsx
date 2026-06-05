"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_SECTIONS } from "../../lib/docs";

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <nav className="space-y-6">
      <Link
        href="/docs"
        className={`block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
          pathname === "/docs"
            ? "bg-white/[0.07] text-foreground"
            : "text-muted hover:bg-white/[0.04] hover:text-foreground"
        }`}
      >
        Introduction
      </Link>

      {DOC_SECTIONS.map((section) => (
        <div key={section.id}>
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {section.title}
          </div>
          <ul className="space-y-0.5">
            {section.pages.map((page) => {
              const href = `/docs/${page.slug}`;
              const active = pathname === href;
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-white/[0.07] text-foreground"
                        : "text-muted hover:bg-white/[0.04] hover:text-foreground"
                    }`}
                  >
                    {active && <span className="mr-1.5 text-cyan">›</span>}
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="border-t border-border pt-4">
        <Link
          href="/capabilities"
          className="block rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-foreground"
        >
          Capacités
        </Link>
        <Link
          href="/changelog"
          className="block rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-foreground"
        >
          Changelog
        </Link>
      </div>
    </nav>
  );
}
