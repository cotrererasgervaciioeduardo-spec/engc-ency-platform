/**
 * OpenRouter server-only client.
 * The API key is read only from server environment variables.
 */
export type ChatRole = "user" | "assistant";

export type ChatTurn = {
  role: ChatRole;
  content: string;
};

export type OpenRouterResult = {
  connected: true;
  content: string;
  model: string;
};

const SYSTEM_PROMPT =
  "Eres ENGC ENCY, un asistente útil y respetuoso que responde en español claro. " +
  "Ayuda con aprendizaje, escritura, programación y productividad. " +
  "Si no sabes algo, dilo claramente. No afirmes haber realizado acciones que no hiciste.";

export function isOpenRouterConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY?.trim());
}

export function getConfiguredModel(): string {
  return process.env.OPENROUTER_MODEL?.trim() || "openrouter/free";
}

export async function createChatCompletion(
  messages: ChatTurn[],
): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENROUTER_NOT_CONFIGURED");
  }

  const model = getConfiguredModel();
  const siteUrl = process.env.SITE_URL?.trim();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "X-OpenRouter-Title": "ENGC ENCY",
  };
  if (siteUrl && /^https?:\/\//i.test(siteUrl)) {
    headers["HTTP-Referer"] = siteUrl;
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 700,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30_000),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    // Do not log or return provider response bodies: they can contain details
    // that should not be exposed to visitors.
    throw new Error(`OPENROUTER_HTTP_${response.status}`);
  }

  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== "object" ||
    !("choices" in data) ||
    !Array.isArray(data.choices)
  ) {
    throw new Error("OPENROUTER_INVALID_RESPONSE");
  }

  const first = data.choices[0] as
    | { message?: { content?: unknown } }
    | undefined;
  const content = first?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("OPENROUTER_EMPTY_RESPONSE");
  }

  return { connected: true, content: content.trim(), model };
}
