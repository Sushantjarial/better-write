export interface ChatCompleteOptions {
  baseUrl: string;
  apiKey: string;
  model: string;
  systemPrompt: string;
  userText: string;
  signal?: AbortSignal;
}

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
}

export async function chatComplete(opts: ChatCompleteOptions): Promise<string> {
  const url = `${opts.baseUrl.replace(/\/$/, "")}/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify({
      model: opts.model,
      temperature: 0.3,
      stream: false,
      messages: [
        { role: "system", content: opts.systemPrompt },
        { role: "user", content: opts.userText },
      ],
    }),
    signal: opts.signal,
  });

  const raw = await res.text();
  let data: ChatCompletionResponse = {};
  try {
    data = raw ? (JSON.parse(raw) as ChatCompletionResponse) : {};
  } catch {
    // non-JSON body
  }

  if (!res.ok) {
    const detail = data?.error?.message || raw.slice(0, 300) || res.statusText;
    throw new Error(`${res.status} ${detail}`);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from model");
  }

  return content.trim().replace(/^["']|["']$/g, "");
}
