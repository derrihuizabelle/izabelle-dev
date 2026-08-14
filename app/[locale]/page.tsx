import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Home from "@/components/Home"
import { isLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { personJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo"

type Props = {
  params: { locale: string }
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isLocale(params.locale)) return {}
  const locale = params.locale
  const dict = getDictionary(locale)
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US"

  return {
    title: {
      absolute: dict.meta.title,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        "pt-BR": `${SITE_URL}/pt`,
        pt: `${SITE_URL}/pt`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/pt`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    other: {
      "geo.region": "BR-RJ",
      "geo.placename": "Nova Friburgo",
    },
  }
}

export default function LocaleHomePage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const dict = getDictionary(locale)

  const jsonLd = {
    ...personJsonLd,
    "@graph": personJsonLd["@graph"].map((node) => ({
      ...node,
      description: dict.meta.description,
      url: `${SITE_URL}/${locale}`,
      ...(node["@type"] === "Person"
        ? { inLanguage: locale === "pt" ? "pt-BR" : "en" }
        : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="seo-fallback" aria-label={dict.seoFallback.aria}>
        <p>{dict.seoFallback.about}</p>
        <h2>{dict.seoFallback.howIWorkHeading}</h2>
        <ol>
          {dict.howIWork.steps.map((step) => (
            <li key={step.id}>
              {step.title} — {step.body}
            </li>
          ))}
        </ol>
        <h2>{dict.seoFallback.workHeading}</h2>
        <ul>
          {dict.projects.items.map((p) => (
            <li key={p.name}>
              {p.name} — {p.description}
            </li>
          ))}
        </ul>
        <h2>{dict.seoFallback.contactHeading}</h2>
        <ul>
          {dict.contact.items.map((c) => (
            <li key={c.label}>
              <a href={c.href}>
                {c.href.startsWith("mailto:") ? c.value : c.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Home locale={locale} dict={dict} />
    </>
  )
}
