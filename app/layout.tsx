import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Instrument_Serif, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { defaultLocale } from "@/lib/i18n/config"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"

/**
 * next/font:
 * - baixa a fonte no build
 * - self-host (sem request ao Google no runtime → melhor privacidade + performance)
 * - evita layout shift (CLS) com size-adjust automático
 */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
})

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

/** Serif elegante para o hero (inspirada no Railway). */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Engenharia de Software Aplicada`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  // Servir de /public — app/icon.png do Next achata alpha em fundo branco
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0614" },
  ],
  width: "device-width",
  initialScale: 1,
}

/** Aplica tema salvo antes do paint (evita flash). Só aceita light|dark. */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={defaultLocale}
      className={`${mono.variable} ${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  )
}
