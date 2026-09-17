'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

const emptySubscribe = () => () => {};

function getIsMounted(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Wraps children so they only render on the client after hydration.
 * This prevents hydration mismatches from:
 *   - Framer Motion initial styles (opacity, transform)
 *   - Browser extensions injecting attributes (e.g., fdprocessedid)
 *   - Date.now() / Math.random() differences between server and client
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, getIsMounted, getServerSnapshot);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
