/**
 * Rate limit in-memory por chave (ex.: IP).
 * Em serverless multi-instância é best-effort; para limite global use Redis.
 */

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number; retryAfterSec: number }

export function rateLimit(
  key: string,
  {
    limit,
    windowMs,
    now = Date.now(),
  }: { limit: number; windowMs: number; now?: number },
): RateLimitResult {
  const existing = buckets.get(key)
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return { ok: true, remaining: limit - 1, resetAt }
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    }
  }

  existing.count += 1
  return {
    ok: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  }
}

/** Exposed for tests. */
export function __resetRateLimitForTests() {
  buckets.clear()
}
