export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 grid-noise" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:px-10">
        {eyebrow && (
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
