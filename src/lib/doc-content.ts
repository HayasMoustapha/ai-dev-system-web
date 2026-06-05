import "server-only";
import { promises as fs } from "fs";
import path from "path";
import GithubSlugger from "github-slugger";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "docs");

export type TocItem = { id: string; text: string; depth: 2 | 3 };

export type LoadedDoc = {
  /** Markdown body with the leading H1 removed (we render the title from the manifest). */
  body: string;
  /** First H1 found, if any. */
  h1: string | null;
  toc: TocItem[];
};

/** Strip an optional YAML frontmatter block. */
function stripFrontmatter(md: string): string {
  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) {
      const after = md.indexOf("\n", end + 1);
      return after !== -1 ? md.slice(after + 1) : "";
    }
  }
  return md;
}

/** Pull H1 out (rendered separately) and collect H2/H3 for the table of contents. */
function extractHeadings(md: string): { body: string; h1: string | null; toc: TocItem[] } {
  const slugger = new GithubSlugger();
  const lines = md.split("\n");
  const toc: TocItem[] = [];
  let h1: string | null = null;
  let h1Removed = false;
  let inFence = false;
  const out: string[] = [];

  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence) {
      const m1 = /^#\s+(.+?)\s*$/.exec(line);
      if (m1 && !h1Removed) {
        h1 = m1[1];
        h1Removed = true;
        continue; // drop the H1 line from the body
      }
      const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
      if (m) {
        const depth = m[1].length as 2 | 3;
        const text = m[2].replace(/[*_`]/g, "").trim();
        toc.push({ id: slugger.slug(text), text, depth });
      }
    }
    out.push(line);
  }
  return { body: out.join("\n"), h1, toc };
}

export async function loadDoc(slug: string): Promise<LoadedDoc | null> {
  // Guard against path traversal; slugs are simple kebab-case tokens.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
  const { body, h1, toc } = extractHeadings(stripFrontmatter(raw));
  return { body, h1, toc };
}
