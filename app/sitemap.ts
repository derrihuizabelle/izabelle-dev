import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n/config"
import { SITE_URL } from "@/lib/seo"

/**
 * Gera /sitemap.xml — uma URL por locale (+ hreflang via metadata na página).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "pt" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`]),
      ),
    },
  }))
}
