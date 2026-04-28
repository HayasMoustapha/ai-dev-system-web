import { NextResponse } from "next/server";
import { getGovernorSessionDetail } from "@/lib/governor/session-read-model";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ sessionName: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { sessionName } = await context.params;
  const session = await getGovernorSessionDetail(sessionName);

  if (!session) {
    return NextResponse.json(
      { error: "Session Governor introuvable." },
      { status: 404 },
    );
  }

  return NextResponse.json(session);
}
