/**
 * Contato público (client + server). Use NEXT_PUBLIC_* no .env.local.
 * LinkedIn só aparece se a env estiver definida — sem URL hardcoded.
 */

function env(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value || undefined
}

export const LINKEDIN_URL = env("NEXT_PUBLIC_LINKEDIN_URL")

/** Texto do card; opcional se LINKEDIN_URL existir. */
export const LINKEDIN_DISPLAY = env("NEXT_PUBLIC_LINKEDIN_DISPLAY")

export const CONTACT_EMAIL =
  env("NEXT_PUBLIC_CONTACT_EMAIL") ?? "contact@example.com"
