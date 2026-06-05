/**
 * Hero focal glow. The animated neural network + aurora now live in the global
 * SiteBackground (fixed, behind every page), so the hero only adds a soft focal
 * radial to lift the headline.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.10),transparent_60%)]" />
    </div>
  );
}
