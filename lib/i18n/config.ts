/** Locales suportados — allowlist (nunca confiar em cookie/header cru). */

export const locales = ["en", "pt"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "pt"

export const LOCALE_COOKIE = "NEXT_LOCALE"

export function parseLocale(value: string | null | undefined): Locale | null {
  if (value === "en" || value === "pt") return value
  return null
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "pt"
}
