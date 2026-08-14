import { existsSync, readFileSync } from "fs"
import path from "path"
import { get } from "@vercel/blob"
import type { NextRequest } from "next/server"
import { rateLimit } from "@/lib/security/rate-limit"
import { isAllowedRecaptchaHostname } from "@/lib/security/recaptcha-hosts"

export const runtime = "nodejs"

const CV_DOWNLOAD_FILENAME =
  process.env.CV_DOWNLOAD_FILENAME?.trim() || "cv.pdf"

const CV_LOCAL_PATH = path.join(
  process.cwd(),
  "private",
  "cv",
  process.env.CV_LOCAL_FILENAME?.trim() || "cv.pdf",
)

const CV_RATE_LIMIT = 8
const CV_RATE_WINDOW_MS = 60_000

type SiteVerifyResponse = {
  success: boolean
  hostname?: string
  "error-codes"?: string[]
}

type CvBody = {
  body: ReadableStream<Uint8Array> | Blob
  size?: number
}

type LoadCvResult =
  | { ok: true; cv: CvBody }
  | { ok: false; error: "cv_not_configured" | "cv_blob_unavailable" | "cv_missing" }

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

async function verifyRecaptcha(
  token: string,
  secret: string,
): Promise<{ ok: true; hostname: string } | { ok: false }> {
  const body = new URLSearchParams({
    secret,
    response: token,
  })
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })
  if (!res.ok) return { ok: false }
  const data = (await res.json()) as SiteVerifyResponse
  if (data.success !== true) return { ok: false }
  if (!isAllowedRecaptchaHostname(data.hostname)) return { ok: false }
  return { ok: true, hostname: data.hostname! }
}

function blobRef(): string | null {
  const url = process.env.CV_BLOB_URL?.trim()
  if (url) return url
  const pathname = process.env.CV_BLOB_PATHNAME?.trim()
  if (pathname) return pathname
  return null
}

function blobAccessOrder(): Array<"private" | "public"> {
  const forced = process.env.CV_BLOB_ACCESS?.trim()
  if (forced === "public") return ["public"]
  if (forced === "private") return ["private"]
  const ref = blobRef()
  if (ref?.includes(".public.blob.")) return ["public", "private"]
  return ["private", "public"]
}

async function loadFromBlobRef(ref: string): Promise<CvBody | null> {
  for (const access of blobAccessOrder()) {
    try {
      const result = await get(ref, { access })
      if (result?.statusCode === 200 && result.stream) {
        return {
          body: result.stream,
          size: result.blob.size,
        }
      }
    } catch {
      // try next access level
    }
  }

  if (/^https?:\/\//i.test(ref)) {
    try {
      const res = await fetch(ref)
      if (res.ok && res.body) {
        const len = res.headers.get("content-length")
        return {
          body: res.body,
          size: len ? Number(len) : undefined,
        }
      }
    } catch {
      // ignore
    }
  }

  return null
}

async function loadCv(): Promise<LoadCvResult> {
  const ref = blobRef()
  if (ref) {
    const cv = await loadFromBlobRef(ref)
    if (cv) return { ok: true, cv }
    return { ok: false, error: "cv_blob_unavailable" }
  }

  if (existsSync(CV_LOCAL_PATH)) {
    const bytes = readFileSync(CV_LOCAL_PATH)
    return {
      ok: true,
      cv: {
        body: new Blob([bytes], { type: "application/pdf" }),
        size: bytes.byteLength,
      },
    }
  }

  return { ok: false, error: "cv_not_configured" }
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request)
  const limited = rateLimit(`cv:${ip}`, {
    limit: CV_RATE_LIMIT,
    windowMs: CV_RATE_WINDOW_MS,
  })
  if (!limited.ok) {
    return Response.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(limited.retryAfterSec),
          "Cache-Control": "no-store",
        },
      },
    )
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    return Response.json({ error: "recaptcha_not_configured" }, { status: 503 })
  }

  let token: string | undefined
  try {
    const json = (await request.json()) as { token?: unknown }
    token = typeof json.token === "string" ? json.token : undefined
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 })
  }

  if (!token || token.length > 4096) {
    return Response.json({ error: "missing_token" }, { status: 400 })
  }

  const captcha = await verifyRecaptcha(token, secret)
  if (!captcha.ok) {
    return Response.json({ error: "captcha_failed" }, { status: 403 })
  }

  const loaded = await loadCv()
  if (!loaded.ok) {
    const status = loaded.error === "cv_not_configured" ? 503 : 404
    return Response.json({ error: loaded.error }, { status })
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${CV_DOWNLOAD_FILENAME}"`,
    "X-Filename": CV_DOWNLOAD_FILENAME,
    "Cache-Control": "no-store",
  }
  if (typeof loaded.cv.size === "number" && !Number.isNaN(loaded.cv.size)) {
    headers["Content-Length"] = String(loaded.cv.size)
  }

  return new Response(loaded.cv.body, {
    status: 200,
    headers,
  })
}
