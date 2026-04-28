import { promises as fs } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { z } from "zod";

const sessionManifestSchema = z
  .object({
    session: z
      .object({
        name: z.string(),
        created_at: z.string().optional(),
        status: z.string().optional(),
        project_root: z.string().optional(),
        system_root: z.string().optional(),
      })
      .passthrough(),
    governor: z
      .object({
        mode: z.string().optional(),
        profile: z.string().optional(),
        governance_level: z.string().optional(),
        execution_agent_label: z.string().optional(),
      })
      .passthrough()
      .optional(),
    request: z
      .object({
        need: z.string().optional(),
        project_context: z.string().optional(),
        constraints: z.array(z.string()).optional(),
      })
      .passthrough()
      .optional(),
    state: z
      .object({
        next_action: z.string().optional(),
        active_task_status: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

const sessionEventSchema = z
  .object({
    at: z.string().optional(),
    type: z.string().optional(),
    summary: z.string().optional(),
    session_status: z.string().optional(),
    decision: z.string().optional(),
    next_action: z.string().optional(),
    details: z.array(z.string()).optional(),
  })
  .passthrough();

const sessionEventLogSchema = z.object({
  events: z.array(sessionEventSchema).default([]),
});

export type GovernorSessionIndexItem = {
  name: string;
  status: string;
  updatedAt: string | null;
  objective: string;
  nextAction: string;
  governanceLevel: string;
  executionAgent: string;
};

export type GovernorDashboardSection = {
  id: string;
  title: string;
  lines: string[];
};

export type GovernorSessionDetail = {
  index: GovernorSessionIndexItem;
  manifestPath: string;
  dashboardPath: string;
  eventLogPath: string;
  resumeBriefPath: string;
  projectRoot: string;
  systemRoot: string;
  projectContext: string;
  constraints: string[];
  dashboardSections: GovernorDashboardSection[];
  events: Array<z.infer<typeof sessionEventSchema>>;
};

const sessionsRoot = path.join(
  process.cwd(),
  ".ai-dev-system",
  "governor",
  "sessions",
);

function ensureSafeSessionName(sessionName: string) {
  if (!/^[a-zA-Z0-9._-]+$/.test(sessionName)) {
    throw new Error(`Invalid session name: ${sessionName}`);
  }

  return sessionName;
}

async function readTextIfExists(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

function parseYaml<T>(content: string | null, schema: z.ZodType<T>, fallback: T): T {
  if (!content) {
    return fallback;
  }

  const parsed = parse(content);
  const result = schema.safeParse(parsed);
  if (!result.success) {
    return fallback;
  }

  return result.data;
}

function parseDashboardSections(markdown: string | null): GovernorDashboardSection[] {
  if (!markdown) {
    return [];
  }

  return markdown
    .split(/\n## /g)
    .map((block, index) => (index === 0 ? block.replace(/^#.*\n?/m, "").trim() : block.trim()))
    .filter(Boolean)
    .map((block) => {
      const [rawTitle, ...rest] = block.split("\n");
      const title = rawTitle.trim();
      const lines = rest.map((line) => line.trim()).filter(Boolean);

      return {
        id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title,
        lines,
      };
    });
}

async function readSessionIndex(sessionName: string): Promise<GovernorSessionIndexItem> {
  const safeName = ensureSafeSessionName(sessionName);
  const sessionPath = path.join(sessionsRoot, safeName);
  const manifestPath = path.join(sessionPath, "session-manifest.yml");

  const [manifestRaw, stats] = await Promise.all([
    readTextIfExists(manifestPath),
    fs.stat(sessionPath),
  ]);

  const manifest = parseYaml(manifestRaw, sessionManifestSchema, {
    session: { name: safeName },
  });

  return {
    name: manifest.session.name,
    status: manifest.session.status ?? "unknown",
    updatedAt: stats.mtime.toISOString(),
    objective: manifest.request?.need?.trim() ?? "Objectif non renseigne",
    nextAction:
      manifest.state?.next_action?.trim() ?? "Prochaine action non renseignee",
    governanceLevel:
      manifest.governor?.governance_level?.trim() ?? "non renseigne",
    executionAgent:
      manifest.governor?.execution_agent_label?.trim() ?? "non renseigne",
  };
}

export async function listGovernorSessions(): Promise<GovernorSessionIndexItem[]> {
  const rootStats = await fs.stat(sessionsRoot).catch(() => null);
  if (!rootStats?.isDirectory()) {
    return [];
  }

  const entries = await fs.readdir(sessionsRoot, { withFileTypes: true });
  const sessions = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => readSessionIndex(entry.name)),
  );

  return sessions.sort((left, right) => {
    const leftTime = left.updatedAt ? Date.parse(left.updatedAt) : 0;
    const rightTime = right.updatedAt ? Date.parse(right.updatedAt) : 0;
    return rightTime - leftTime;
  });
}

export async function getGovernorSessionDetail(
  sessionName: string,
): Promise<GovernorSessionDetail | null> {
  const safeName = ensureSafeSessionName(sessionName);
  const sessionPath = path.join(sessionsRoot, safeName);
  const sessionStats = await fs.stat(sessionPath).catch(() => null);
  if (!sessionStats?.isDirectory()) {
    return null;
  }

  const manifestPath = path.join(sessionPath, "session-manifest.yml");
  const dashboardPath = path.join(sessionPath, "session-dashboard.md");
  const eventLogPath = path.join(sessionPath, "session-event-log.yml");
  const resumeBriefPath = path.join(sessionPath, "resume-brief.md");

  const [manifestRaw, dashboardRaw, eventLogRaw] = await Promise.all([
    readTextIfExists(manifestPath),
    readTextIfExists(dashboardPath),
    readTextIfExists(eventLogPath),
  ]);

  const manifest = parseYaml(manifestRaw, sessionManifestSchema, {
    session: { name: safeName },
  });
  const eventLog = parseYaml(eventLogRaw, sessionEventLogSchema, { events: [] });

  const index = await readSessionIndex(safeName);

  return {
    index,
    manifestPath,
    dashboardPath,
    eventLogPath,
    resumeBriefPath,
    projectRoot: manifest.session.project_root?.trim() ?? "non renseigne",
    systemRoot: manifest.session.system_root?.trim() ?? "non renseigne",
    projectContext: manifest.request?.project_context?.trim() ?? "non renseigne",
    constraints: manifest.request?.constraints ?? [],
    dashboardSections: parseDashboardSections(dashboardRaw),
    events: [...eventLog.events].reverse(),
  };
}
