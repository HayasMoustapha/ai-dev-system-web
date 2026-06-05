import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOC_PAGES, getDocPage, getAdjacentDocs, DOC_SECTIONS } from "../../../lib/docs";
import { loadDoc } from "../../../lib/doc-content";
import { Markdown } from "../../../components/docs/markdown";
import { DocToc } from "../../../components/docs/doc-toc";

export function generateStaticParams() {
  return DOC_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) return { title: "Docs · AI Dev System" };
  return {
    title: `${page.title} · Docs · AI Dev System`,
    description: page.summary,
  };
}

function sectionOf(slug: string) {
  return DOC_SECTIONS.find((s) => s.pages.some((p) => p.slug === slug));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) notFound();

  const doc = await loadDoc(slug);
  if (!doc) notFound();

  const { prev, next } = getAdjacentDocs(slug);
  const section = sectionOf(slug);

  return (
    <div className="flex gap-12">
      <article className="doc-prose min-w-0 max-w-3xl flex-1">
        <header className="not-prose mb-8">
          {section && (
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan/80">
              {section.title}
            </p>
          )}
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-foreground">
            {page.title}
          </h1>
          <p className="mt-3 text-pretty text-lg leading-7 text-muted">{page.summary}</p>
          <div className="mt-5 h-px w-full bg-gradient-to-r from-cyan/40 via-violet/30 to-transparent" />
        </header>

        <Markdown>{doc.body}</Markdown>

        <nav className="not-prose mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="glass rounded-2xl p-4 transition-colors hover:bg-white/[0.06]"
            >
              <div className="text-xs text-muted">← Précédent</div>
              <div className="mt-1 text-sm font-medium text-foreground">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="glass rounded-2xl p-4 text-right transition-colors hover:bg-white/[0.06]"
            >
              <div className="text-xs text-muted">Suivant →</div>
              <div className="mt-1 text-sm font-medium text-foreground">{next.title}</div>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <aside className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
          <DocToc items={doc.toc} />
        </div>
      </aside>
    </div>
  );
}
