"use client"

/**
 * Botão de download do CV com Google reCAPTCHA v2.
 * O PDF fica fora de /public e só é servido após verificação no servidor.
 */

import { useCallback, useEffect, useId, useRef, useState } from "react"

type Labels = {
  cta: string
  title: string
  body: string
  confirm: string
  cancel: string
  error: string
  missingConfig: string
}

type Props = {
  labels: Labels
}

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          theme?: "light" | "dark"
        },
      ) => number
      reset: (widgetId?: number) => void
      ready: (cb: () => void) => void
    }
    __recaptchaOnLoad?: () => void
  }
}

const SCRIPT_ID = "google-recaptcha-v2"
const SCRIPT_SRC =
  "https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit"

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (window.grecaptcha?.render) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      window.__recaptchaOnLoad = () => resolve()
      if (window.grecaptcha?.render) resolve()
      return
    }

    window.__recaptchaOnLoad = () => resolve()
    const script = document.createElement("script")
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"))
    document.head.appendChild(script)
  })
}

export default function CvDownloadButton({ labels }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const widgetId = useRef<number | null>(null)
  const captchaHost = useRef<HTMLDivElement | null>(null)
  const titleId = useId()

  const close = useCallback(() => {
    setOpen(false)
    setToken(null)
    setError(null)
    setBusy(false)
    if (widgetId.current != null && window.grecaptcha) {
      window.grecaptcha.reset(widgetId.current)
    }
  }, [])

  useEffect(() => {
    if (!open || !siteKey) return
    let cancelled = false

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !captchaHost.current || !window.grecaptcha) return
        window.grecaptcha.ready(() => {
          if (cancelled || !captchaHost.current || !window.grecaptcha) return
          if (widgetId.current != null) {
            window.grecaptcha.reset(widgetId.current)
            return
          }
          captchaHost.current.innerHTML = ""
          widgetId.current = window.grecaptcha.render(captchaHost.current, {
            sitekey: siteKey,
            callback: (t) => {
              setToken(t)
              setError(null)
            },
            "expired-callback": () => setToken(null),
            theme:
              document.documentElement.getAttribute("data-theme") === "light"
                ? "light"
                : "dark",
          })
        })
      })
      .catch(() => {
        if (!cancelled) setError(labels.error)
      })

    return () => {
      cancelled = true
    }
  }, [open, siteKey, labels.error])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  const download = async () => {
    if (!token || busy) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
      if (!res.ok) {
        setError(labels.error)
        setToken(null)
        if (widgetId.current != null) window.grecaptcha?.reset(widgetId.current)
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download =
        res.headers.get("X-Filename")?.replace(/[^\w.\-]+/g, "") ||
        "izabelle-derrihu-cv.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      close()
    } catch {
      setError(labels.error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="hero-btn-ghost"
        onClick={() => setOpen(true)}
      >
        {labels.cta}
      </button>

      {open ? (
        <div
          className="cv-modal-backdrop"
          role="presentation"
          onClick={close}
        >
          <div
            className="cv-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={titleId} className="cv-modal-title">
              {labels.title}
            </h2>
            <p className="cv-modal-body">{labels.body}</p>

            {!siteKey ? (
              <p className="cv-modal-error">{labels.missingConfig}</p>
            ) : (
              <div className="cv-modal-captcha" ref={captchaHost} />
            )}

            {error ? <p className="cv-modal-error">{error}</p> : null}

            <div className="cv-modal-actions">
              <button
                type="button"
                className="hero-btn-ghost"
                onClick={close}
                disabled={busy}
              >
                {labels.cancel}
              </button>
              <button
                type="button"
                className="hero-btn-primary"
                onClick={download}
                disabled={!token || busy || !siteKey}
              >
                {labels.confirm}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
