/**
 * Minimal in-memory rate limiter for the enquiry endpoint.
 *
 * Deliberately simple: this site runs as a single Node process, and a cleaning
 * company in QwaQwa gets enquiries in the dozens per week, not per second. The
 * counters live in module memory, so they reset on deploy and are per-instance
 * — if the site is ever scaled to multiple instances or a serverless platform,
 * swap this for Upstash Redis or the platform's own rate limiting.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5; // enquiries per IP per window
const MAX_TRACKED_IPS = 5_000; // ceiling so the map can't grow without bound

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function evictExpired(now: number) {
  for (const [ip, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(ip);
  }
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_IPS) evictExpired(now);
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test seam — drops all counters. */
export function resetRateLimits() {
  buckets.clear();
}
