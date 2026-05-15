export type ActionKey = "fixGrammar" | "rephrase" | "friendly" | "professional" | "expand";

export const ACTION_TITLES: Record<ActionKey, string> = {
  fixGrammar: "Fix Grammar",
  rephrase: "Rephrase",
  friendly: "Make Friendly",
  professional: "Make Professional",
  expand: "Expand",
};

export const DEFAULT_PROMPTS: Record<ActionKey, string> = {
  fixGrammar:
    "Fix grammar, spelling, and punctuation in the user's text. Preserve meaning, voice, and formatting. Return only the corrected text, with no preamble, explanation, or quotation marks.",
  rephrase:
    "Rephrase the user's text to improve clarity and flow while keeping the meaning and approximate length. Return only the rewritten text, with no preamble, explanation, or quotation marks.",
  friendly:
    "Rewrite the user's text in a warm, friendly, conversational tone. Keep the meaning intact. Return only the rewritten text, with no preamble, explanation, or quotation marks.",
  professional:
    "Rewrite the user's text in a clear, professional tone suitable for business communication. Keep the meaning intact. Return only the rewritten text, with no preamble, explanation, or quotation marks.",
  expand:
    "Expand the user's text to provide more detail and depth while maintaining the original meaning. Return only the expanded text, with no preamble, explanation, or quotation marks.",
};
