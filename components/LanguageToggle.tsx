"use client"

/**
 * Troca EN ↔ PT via navegação para /en ou /pt.
 * O middleware grava o cookie allowlisted NEXT_LOCALE.
 */

import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"

type Props = {
  locale: Locale
  switchLabel: string
  ariaLabel: string
}

export default function LanguageToggle({ locale, switchLabel, ariaLabel }: Props) {
  const next: Locale = locale === "en" ? "pt" : "en"

  return (
    <Link
      href={`/${next}`}
      className="lang-toggle"
      hrefLang={next}
      aria-label={ariaLabel}
      title={switchLabel}
    >
      {next.toUpperCase()}
    </Link>
  )
}
