import { NextResponse } from "next/server";
import { listGovernorSessions } from "@/lib/governor/session-read-model";

export const dynamic = "force-dynamic";

export async function GET() {
  const sessions = await listGovernorSessions();

  return NextResponse.json({
    sessions,
    count: sessions.length,
  });
}
