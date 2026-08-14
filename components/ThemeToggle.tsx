"use client"

/**
 * Alterna light ↔ dark e persiste em localStorage.
 * Sem preferência salva, o CSS segue prefers-color-scheme (sistema).
 */

import { useEffect, useState } from "react"
import { THEME_STORAGE_KEY, parseTheme, type Theme } from "@/lib/theme"

function systemTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark"
}

function applyTheme(theme: Theme | null) {
  const root = document.documentElement
  if (theme) {
    root.setAttribute("data-theme", theme)
  } else {
    root.removeAttribute("data-theme")
  }
}

type Props = {
  labelToLight: string
  labelToDark: string
}

export default function ThemeToggle({ labelToLight, labelToDark }: Props) {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = parseTheme(localStorage.getItem(THEME_STORAGE_KEY))
    setTheme(stored)
    setMounted(true)
  }, [])

  const effective: Theme = theme ?? systemTheme()

  const toggle = () => {
    const next: Theme = effective === "light" ? "dark" : "light"
    setTheme(next)
    applyTheme(next)
    localStorage.setItem(THEME_STORAGE_KEY, next)
  }

  const label = effective === "light" ? labelToDark : labelToLight

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {!mounted ? "◐" : effective === "light" ? "☾" : "☀"}
      </span>
    </button>
  )
}
