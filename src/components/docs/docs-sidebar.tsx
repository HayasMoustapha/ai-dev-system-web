"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const DOCS_NAV = [
  {
    title: "Démarrer",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Getting started", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Concepts",
    items: [
      { label: "Architecture", href: "/docs/architecture" },
      { label: "Capacités", href: "/capabilities" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <nav className="space-y-7">
      {DOCS_NAV.map((group) => (
        <div key={group.title}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {group.title}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-white/[0.07] text-foreground"
                        : "text-muted hover:bg-white/[0.04] hover:text-foreground"
                    }`}
                  >
                    {active && <span className="mr-2 text-cyan">›</span>}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
