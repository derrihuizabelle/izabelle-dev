import { notFound } from "next/navigation"
import { isLocale, locales } from "@/lib/i18n/config"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/**
 * Valida o segmento da URL e ajusta <html lang> sem forçar o root layout a ser dinâmico.
 * locale já passou por isLocale (allowlist) antes do JSON.stringify.
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) notFound()

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(params.locale)};`,
        }}
      />
      {children}
    </>
  )
}
