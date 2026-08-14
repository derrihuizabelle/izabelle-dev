import {
  __resetRateLimitForTests,
  rateLimit,
} from "@/lib/security/rate-limit"
import { isAllowedRecaptchaHostname } from "@/lib/security/recaptcha-hosts"

describe("rateLimit", () => {
  beforeEach(() => {
    __resetRateLimitForTests()
  })

  it("allows up to the limit within the window", () => {
    const now = 1_000_000
    expect(rateLimit("ip", { limit: 2, windowMs: 60_000, now }).ok).toBe(true)
    expect(rateLimit("ip", { limit: 2, windowMs: 60_000, now }).ok).toBe(true)
    const blocked = rateLimit("ip", { limit: 2, windowMs: 60_000, now })
    expect(blocked.ok).toBe(false)
    if (!blocked.ok) expect(blocked.retryAfterSec).toBeGreaterThan(0)
  })

  it("resets after the window", () => {
    const now = 1_000_000
    rateLimit("ip", { limit: 1, windowMs: 1000, now })
    expect(rateLimit("ip", { limit: 1, windowMs: 1000, now }).ok).toBe(false)
    expect(rateLimit("ip", { limit: 1, windowMs: 1000, now: now + 1001 }).ok).toBe(
      true,
    )
  })
})

describe("isAllowedRecaptchaHostname", () => {
  const env = {
    NEXT_PUBLIC_SITE_URL: "https://example.com",
    VERCEL_URL: "portfolio-abc.vercel.app",
  } as unknown as NodeJS.ProcessEnv

  it("accepts site host and www", () => {
    expect(isAllowedRecaptchaHostname("example.com", env)).toBe(true)
    expect(isAllowedRecaptchaHostname("www.example.com", env)).toBe(true)
  })

  it("accepts localhost and vercel previews", () => {
    expect(isAllowedRecaptchaHostname("localhost", env)).toBe(true)
    expect(isAllowedRecaptchaHostname("portfolio-abc.vercel.app", env)).toBe(
      true,
    )
    expect(isAllowedRecaptchaHostname("other.vercel.app", env)).toBe(true)
  })

  it("rejects unknown hosts", () => {
    expect(isAllowedRecaptchaHostname("evil.example", env)).toBe(false)
    expect(isAllowedRecaptchaHostname(undefined, env)).toBe(false)
  })
})
