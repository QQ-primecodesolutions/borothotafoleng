/**
 * The quote modal is opened by a global DOM event rather than props or context,
 * so any button anywhere on the page can trigger it without threading state
 * through the tree.
 *
 * Import `openQuoteModal` instead of dispatching the event by hand — that keeps
 * the event name in one place rather than as a string literal in every CTA.
 */

export const QUOTE_MODAL_EVENT = "open-quote-modal";

/** Opens the quote modal. No-op during SSR. */
export function openQuoteModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(QUOTE_MODAL_EVENT));
}
