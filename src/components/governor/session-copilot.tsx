"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

type SessionCopilotProps = {
  sessionName: string;
  gatewayConfigured: boolean;
};

function renderMessageText(message: UIMessage) {
  return message.parts
    .map((part) => {
      if (part.type === "text") {
        return part.text;
      }

      return null;
    })
    .filter(Boolean)
    .join("\n");
}

export function SessionCopilot({
  sessionName,
  gatewayConfigured,
}: SessionCopilotProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { sessionName },
    }),
  });

  const disabled = status !== "ready" || input.trim().length === 0;

  return (
    <section className="rounded-[1.75rem] border border-stone-300/70 bg-white/85 p-6 shadow-[0_24px_80px_-44px_rgba(40,28,18,0.35)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-stone-950">
            Copilote AI SDK
          </h2>
          <p className="mt-2 text-sm leading-7 text-stone-700">
            Premier point d&apos;entree UI agentique pour relire et expliquer la
            session locale courante.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] ${
            gatewayConfigured
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {gatewayConfigured ? "provider on" : "provider off"}
        </span>
      </div>

      <div className="mt-5 rounded-2xl bg-stone-100 p-4 text-sm leading-7 text-stone-700">
        {gatewayConfigured
          ? "Le transport AI SDK est configure. Tu peux poser une question courte sur la session courante."
          : "Le transport AI SDK est cable, mais aucun provider n'est configure. La route renverra un message de repli tant que AI_GATEWAY_API_KEY et AI_GATEWAY_MODEL ne sont pas definis."}
      </div>

      <div className="mt-6 space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-4 text-sm leading-7 text-stone-600">
            Suggestions : &quot;Resume cette session&quot;, &quot;Quels sont les
            risques ouverts ?&quot;, &quot;Quelle est la prochaine tranche
            recommandee ?&quot;
          </div>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className={`rounded-2xl p-4 text-sm leading-7 ${
                message.role === "user"
                  ? "ml-8 bg-stone-950 text-stone-50"
                  : "mr-8 bg-stone-100 text-stone-800"
              }`}
            >
              <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] opacity-70">
                {message.role}
              </div>
              <div className="whitespace-pre-wrap">{renderMessageText(message)}</div>
            </article>
          ))
        )}
      </div>

      <form
        className="mt-6 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (disabled) {
            return;
          }

          void sendMessage({ text: input });
          setInput("");
        }}
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          rows={4}
          placeholder="Pose une question borne e sur la session Governor courante..."
          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-stone-500"
        />
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs uppercase tracking-[0.18em] text-stone-500">
            statut : {status}
            {error ? " / erreur" : ""}
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="rounded-full bg-stone-950 px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-stone-50 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            Envoyer
          </button>
        </div>
      </form>
    </section>
  );
}
