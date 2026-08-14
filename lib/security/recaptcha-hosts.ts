/**
 * Hostnames aceitos no retorno do Google siteverify (campo `hostname`).
 */

function hostnameFromUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`
    return new URL(withScheme).hostname.toLowerCase()
  } catch {
    return null
  }
}

export function allowedRecaptchaHostnames(
  env: NodeJS.ProcessEnv = process.env,
): Set<string> {
  const hosts = new Set<string>(["localhost", "127.0.0.1"])

  const site = hostnameFromUrl(env.NEXT_PUBLIC_SITE_URL)
  if (site) {
    hosts.add(site)
    if (site.startsWith("www.")) hosts.add(site.slice(4))
    else hosts.add(`www.${site}`)
  }

  const vercel = hostnameFromUrl(env.VERCEL_URL)
  if (vercel) hosts.add(vercel)

  const extra = env.RECAPTCHA_ALLOWED_HOSTNAMES
  if (extra) {
    for (const part of extra.split(",")) {
      const h = part.trim().toLowerCase()
      if (h) hosts.add(h)
    }
  }

  return hosts
}

export function isAllowedRecaptchaHostname(
  hostname: string | undefined,
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  if (!hostname) return false
  const host = hostname.toLowerCase()
  const allowed = allowedRecaptchaHostnames(env)
  if (allowed.has(host)) return true
  // Preview Vercel: *.vercel.app
  if (host.endsWith(".vercel.app")) return true
  return false
}
