import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { SOURCE_BASENAME_TO_SLUG } from "../../lib/docs";

/** Resolve an in-corpus markdown link to a public docs route, when we host it. */
function resolveInternalHref(href: string): string | null {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean.endsWith(".md")) return null;
  const base = clean.split("/").pop() as string;
  const slug = SOURCE_BASENAME_TO_SLUG[base];
  return slug ? `/docs/${slug}` : null;
}

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        a({ href, children, ...props }) {
          const raw = typeof href === "string" ? href : "";
          if (raw.startsWith("http")) {
            return (
              <a href={raw} target="_blank" rel="noreferrer noopener" {...props}>
                {children}
              </a>
            );
          }
          const internal = resolveInternalHref(raw);
          if (internal) {
            return <Link href={internal}>{children}</Link>;
          }
          if (raw.endsWith(".md")) {
            // In-corpus reference we don't publish as a standalone page.
            return <span className="text-foreground/70">{children}</span>;
          }
          return (
            <a href={raw} {...props}>
              {children}
            </a>
          );
        },
        table({ children, ...props }) {
          return (
            <div className="doc-table-wrap">
              <table {...props}>{children}</table>
            </div>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
