"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "../../lib/doc-content";

export function DocToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <div className="text-sm">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        Sur cette page
      </div>
      <ul className="space-y-1.5 border-l border-border">
        {items.map((it) => (
          <li key={it.id} className={it.depth === 3 ? "pl-3" : ""}>
            <a
              href={`#${it.id}`}
              className={`-ml-px block border-l-2 pl-3 leading-snug transition-colors ${
                active === it.id
                  ? "border-cyan text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
