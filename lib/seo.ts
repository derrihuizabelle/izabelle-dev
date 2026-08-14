/**
 * Constantes de SEO reutilizáveis.
 * Descrições por idioma: lib/i18n/{en,pt}.ts → meta.description
 */

import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/contact"

function env(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value || undefined
}

/**
 * URL canônica do site.
 * `??` não cobre string vazia — na Vercel, `NEXT_PUBLIC_SITE_URL=` quebra `new URL("")`.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, "")

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "").replace(/\/+$/, "")
    return `https://${host}`
  }

  return "http://localhost:3000"
}

export const SITE_URL = resolveSiteUrl()

export const SITE_NAME = "Izabelle Derrihú"

export const SITE_LOCALITY = "Nova Friburgo"
export const SITE_REGION = "RJ"
export const SITE_COUNTRY = "BR"

const GITHUB_URL = env("NEXT_PUBLIC_GITHUB_URL")

/** Fallback EN (metadata root / JSON-LD base). */
export const SITE_DESCRIPTION =
  "Freelance software engineer and programmer in Nova Friburgo, RJ — backend, distributed systems, payments, Clojure, Kafka, and AWS. Available for remote and local projects."

const personId = `${SITE_URL}/#person`
const serviceId = `${SITE_URL}/#freelance-dev`

/** JSON-LD Person + ProfessionalService (local freelance / Nova Friburgo). */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      jobTitle: [
        "Software Engineer",
        "Freelance Programmer",
        "Programadora Freelancer",
      ],
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_LOCALITY,
        addressRegion: SITE_REGION,
        addressCountry: SITE_COUNTRY,
      },
      areaServed: [
        {
          "@type": "City",
          name: SITE_LOCALITY,
          containedInPlace: {
            "@type": "State",
            name: "Rio de Janeiro",
          },
        },
        {
          "@type": "Country",
          name: "Brazil",
        },
      ],
      knowsAbout: [
        "Freelance software development",
        "Backend engineering",
        "Distributed systems",
        "Apache Kafka",
        "Payments",
        "Clojure",
        "AWS",
        "Web development",
        "Nova Friburgo",
      ],
      sameAs: [
        ...(LINKEDIN_URL ? [LINKEDIN_URL] : []),
        ...(GITHUB_URL ? [GITHUB_URL] : []),
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: `${SITE_NAME} — Desenvolvimento de Software Freelancer`,
      url: SITE_URL,
      image: `${SITE_URL}/favicon.png`,
      description: SITE_DESCRIPTION,
      provider: { "@id": personId },
      areaServed: {
        "@type": "City",
        name: SITE_LOCALITY,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Rio de Janeiro",
        },
      },
      serviceType: [
        "Freelance programming",
        "Software development",
        "Backend development",
        "Web development",
      ],
      availableLanguage: ["Portuguese", "English"],
    },
  ],
}
