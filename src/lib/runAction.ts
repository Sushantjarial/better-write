import { Clipboard, getPreferenceValues, getSelectedText, showHUD, showToast, Toast } from "@raycast/api";
import { ACTION_TITLES, ActionKey, DEFAULT_PROMPTS } from "./prompts";
import { chatComplete } from "./llm";

interface Preferences {
  apiKey: string;
  baseUrl: string;
  model: string;
  fixGrammarPrompt?: string;
  rephrasePrompt?: string;
  friendlyPrompt?: string;
  professionalPrompt?: string;
  expandPrompt?: string;
}

const PROMPT_PREF_KEY: Record<ActionKey, keyof Preferences> = {
  fixGrammar: "fixGrammarPrompt",
  rephrase: "rephrasePrompt",
  friendly: "friendlyPrompt",
  professional: "professionalPrompt",
  expand: "expandPrompt",
};

export async function runAction(action: ActionKey): Promise<void> {
  const prefs = getPreferenceValues<Preferences>();
  const title = ACTION_TITLES[action];

  let selected: string;
  try {
    selected = await getSelectedText();
  } catch {
    await showHUD("No text selected");
    return;
  }

  if (!selected.trim()) {
    await showHUD("Empty selection");
    return;
  }

  const toast = await showToast({ style: Toast.Style.Animated, title });

  try {
    const customPrompt = prefs[PROMPT_PREF_KEY[action]];
    const systemPrompt = (typeof customPrompt === "string" && customPrompt.trim()) || DEFAULT_PROMPTS[action];

    const rewritten = await chatComplete({
      baseUrl: prefs.baseUrl || "https://api.openai.com/v1",
      apiKey: prefs.apiKey,
      model: prefs.model,
      systemPrompt,
      userText: selected,
    });

    await Clipboard.paste(rewritten);
    await toast.hide();
    await showHUD(`✓ ${title}`);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    toast.style = Toast.Style.Failure;
    toast.title = "Failed";
    toast.message = message.slice(0, 200);
  }
}
