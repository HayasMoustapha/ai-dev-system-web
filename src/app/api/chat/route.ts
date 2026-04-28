import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  gateway,
  streamText,
  type UIMessage,
} from "ai";
import { getGovernorSessionDetail } from "@/lib/governor/session-read-model";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

type ChatRequestBody = {
  messages: UIMessage[];
  sessionName?: string;
};

function buildSessionContextBlock(sessionName: string | undefined, sessionContext: string) {
  return [
    "Tu es le copilote web local de Governor.",
    "Tu travailles uniquement a partir d'une session Governor locale du projet web courant.",
    "Tu ne dois ni inventer d'API coeur inexistante, ni proposer de dupliquer le noyau Python.",
    "Si une demande impose un changement coeur Governor, renvoie explicitement vers le repo source ai-dev-system-universel.",
    sessionName ? `Session courante : ${sessionName}` : "Session courante : non renseignee",
    `Contexte session : ${sessionContext}`,
  ].join("\n");
}

function fallbackResponse(sessionName?: string) {
  const textId = "copilot-fallback";
  const message = sessionName
    ? `Le copilote AI SDK est cable pour la session ${sessionName}, mais aucun provider n'est configure. Definis AI_GATEWAY_API_KEY et AI_GATEWAY_MODEL pour activer le streaming modele.`
    : "Le copilote AI SDK est cable, mais aucun provider n'est configure. Definis AI_GATEWAY_API_KEY et AI_GATEWAY_MODEL pour activer le streaming modele.";

  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writer.write({ type: "start", messageId: "msg-copilot-fallback" });
      writer.write({ type: "text-start", id: textId });
      writer.write({ type: "text-delta", id: textId, delta: message });
      writer.write({ type: "text-end", id: textId });
      writer.write({ type: "finish" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(request: Request) {
  const { messages, sessionName }: ChatRequestBody = await request.json();

  const session =
    sessionName ? await getGovernorSessionDetail(sessionName) : null;
  const sessionContext = session
    ? [
        `Objectif : ${session.index.objective}`,
        `Statut : ${session.index.status}`,
        `Prochaine action : ${session.index.nextAction}`,
        `Contraintes : ${session.constraints.join(" | ") || "aucune"}`,
      ].join("\n")
    : "Aucune session detaillee n'a ete fournie.";

  const gatewayKey = process.env.AI_GATEWAY_API_KEY;
  const gatewayModel = process.env.AI_GATEWAY_MODEL;

  if (!gatewayKey || !gatewayModel) {
    return fallbackResponse(sessionName);
  }

  const result = streamText({
    model: gateway(gatewayModel),
    system: buildSessionContextBlock(sessionName, sessionContext),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
