import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

/**
 * Gera /robots.txt automaticamente.
 * Diz aos crawlers o que indexar e onde está o sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
