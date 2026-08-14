import { NextRequest, NextResponse } from "next/server"
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  parseLocale,
  type Locale,
} from "@/lib/i18n/config"

function preferredLocale(request: NextRequest): Locale {
  const fromCookie = parseLocale(request.cookies.get(LOCALE_COOKIE)?.value)
  if (fromCookie) return fromCookie

  const accept = request.headers.get("accept-language") ?? ""
  // Prefer pt if browser lists Portuguese first among supported locales
  const lower = accept.toLowerCase()
  if (lower.includes("pt")) return "pt"
  if (lower.includes("en")) return "en"
  return defaultLocale
}

const localeCookieAttrs = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const segment = pathname.split("/")[1]
  if (isLocale(segment)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-locale", segment)
    const res = NextResponse.next({ request: { headers: requestHeaders } })
    // refresh preference when visiting a locale URL
    res.cookies.set(LOCALE_COOKIE, segment, localeCookieAttrs)
    return res
  }

  // `/` → redirect to preferred locale
  if (pathname === "/") {
    const locale = preferredLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`
    const res = NextResponse.redirect(url)
    res.cookies.set(LOCALE_COOKIE, locale, localeCookieAttrs)
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // skip next internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
}
