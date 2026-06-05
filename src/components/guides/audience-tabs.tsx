"use client";

import { useState } from "react";

export type TabItem = { id: string; label: string; hint?: string; panel: React.ReactNode };

export function AudienceTabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div>
      <div className="glass inline-flex rounded-full p-1">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => setActive(it.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                on ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      {items.map((it) =>
        it.id === active ? (
          <div key={it.id} className="mt-6">
            {it.hint && <p className="mb-4 text-sm text-muted">{it.hint}</p>}
            {it.panel}
          </div>
        ) : null,
      )}
    </div>
  );
}
