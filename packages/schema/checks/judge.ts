/**
 * Judge — LLM-as-Judge verification
 *
 * Defines how an LLM evaluates agent output against rules.
 * Not just "pass/fail" — the protocol standardizes:
 *
 * - Which model evaluates (judge model config)
 * - What prompt/criteria it uses (linked to rules.ts)
 * - How scoring is structured (rubric, scale, binary)
 * - What threshold determines pass/fail
 * - How the evaluation result feeds back (to audit.ts, to runs/approval.ts)
 *
 * The protocol is agnostic about implementation (could be LLM, regex, human)
 * but LLM-as-judge is a first-class pattern worth standardizing because
 * it requires its own configuration surface.
 *
 * Status: Extension (draft)
 */
