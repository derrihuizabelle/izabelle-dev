/** Preferência de tema — allowlist (nunca confiar em string crua do storage). */

export type Theme = "light" | "dark"

export const THEME_STORAGE_KEY = "theme"

export function parseTheme(value: string | null | undefined): Theme | null {
  if (value === "light" || value === "dark") return value
  return null
}
