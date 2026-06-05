import Link from "next/link";
import { Reveal } from "../site/reveal";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-8 lg:px-10">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-violet/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-blue/20 blur-3xl" />
          </div>
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Donne le besoin. Le système fait le reste — et le prouve.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Quinze minutes pour comprendre, une commande pour démarrer. La gouvernance
            n&apos;est plus un effort : c&apos;est par construction.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/docs/getting-started"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-[#05060a] transition-transform hover:-translate-y-0.5"
            >
              Démarrer en 15 minutes
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/docs"
              className="glass inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07]"
            >
              Parcourir la documentation
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
