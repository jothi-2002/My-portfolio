/** True when the visitor asks the OS/browser to minimise motion. Safe where matchMedia is missing (SSR, jsdom). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}
