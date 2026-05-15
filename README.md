# Better Write

A Raycast extension that rewrites whatever text you have selected — fix grammar, rephrase, make it friendlier, or make it more professional — using any OpenAI-compatible LLM provider with your own API key.

<img width="749" height="292" alt="image" src="https://github.com/user-attachments/assets/dea86a96-eb89-4111-98b9-220bf9817d80" />



## Features

- **Fix Grammar** — corrects grammar, spelling, and punctuation while preserving your voice.
- **Rephrase** — rewrites for clarity and flow at similar length.
- **Make Friendly** — warmer, more conversational tone.
- **Make Professional** — clean, business-appropriate tone.

Each action is a separate Raycast command, so you can assign a different hotkey to each one. The selection is replaced in place with the rewrite — no extra confirmation step.

## How it works

1. Highlight text in any app.
2. Trigger one of the four commands from Raycast.
3. The extension calls your configured LLM, then pastes the rewrite over the selection.

## Supported providers

Anything that speaks the OpenAI `POST /chat/completions` API works. Set the **Base URL** and **Model** in preferences to point at the provider you want:

| Provider               | Base URL                         | Example Model                |
| ---------------------- | -------------------------------- | ---------------------------- |
| OpenAI                 | `https://api.openai.com/v1`      | `gpt-4o-mini`                |
| OpenRouter             | `https://openrouter.ai/api/v1`   | `anthropic/claude-3.5-haiku` |
| Groq                   | `https://api.groq.com/openai/v1` | `llama-3.1-8b-instant`       |
| DeepSeek               | `https://api.deepseek.com/v1`    | `deepseek-chat`              |
| Anthropic (OAI-compat) | `https://api.anthropic.com/v1`   | `claude-haiku-4-5-20251001`  |
| Ollama (local)         | `http://localhost:11434/v1`      | `llama3.2`                   |
| LM Studio (local)      | `http://localhost:1234/v1`       | _your loaded model_          |

## Setup

1. Install the extension (or run it in dev mode — see below).
2. Open the extension's preferences in Raycast.
3. Fill in:
   - **API Key** — your provider's key.
   - **Base URL** — defaults to OpenAI; change to match your provider.
   - **Model** — model name as your provider expects it.
4. (Optional) Customize the system prompt for any of the four actions.

## Preferences

| Field               | Required | Default                     | Notes                                     |
| ------------------- | -------- | --------------------------- | ----------------------------------------- |
| API Key             | yes      | —                           | Stored securely by Raycast                |
| Base URL            | no       | `https://api.openai.com/v1` | OpenAI-compatible endpoint                |
| Model               | yes      | `gpt-4o-mini`               | Provider-specific model id                |
| Fix Grammar Prompt  | no       | built-in                    | System prompt for the Fix Grammar command |
| Rephrase Prompt     | no       | built-in                    | System prompt for the Rephrase command    |
| Friendly Prompt     | no       | built-in                    | System prompt for Make Friendly           |
| Professional Prompt | no       | built-in                    | System prompt for Make Professional       |

## Development

```bash
npm install
npm run dev   # loads the extension into Raycast with hot reload
npm run lint  # validate package.json, icons, ESLint, Prettier
npm run build # production build
```

## Project layout

```
src/
├── lib/
│   ├── llm.ts          # OpenAI-compatible chat completions client
│   ├── prompts.ts      # Default system prompts + action keys
│   └── runAction.ts    # Shared workflow: getSelectedText → llm → paste → HUD
├── fix-grammar.ts      # Command entry: Fix Grammar
├── rephrase.ts         # Command entry: Rephrase
├── make-friendly.ts    # Command entry: Make Friendly
└── make-professional.ts# Command entry: Make Professional
```

All four commands are thin wrappers around a single shared runner; they only differ by which action key they pass in.

## Privacy

Your selection is sent to whichever provider you configure. Nothing is logged or sent anywhere else. Run a local provider (Ollama, LM Studio) if you want zero data egress.

## License

MIT
