"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { Dictionary, HeroTabId } from "@/lib/i18n/types"

const TAB_IDS: HeroTabId[] = ["status", "stack"]

type Props = {
  hero: Dictionary["hero"]
}

type Indicator = { left: number; width: number }

function measureTab(
  tablist: HTMLElement,
  tab: HTMLElement,
): Indicator {
  const listBox = tablist.getBoundingClientRect()
  const tabBox = tab.getBoundingClientRect()
  return {
    left: tabBox.left - listBox.left,
    width: tabBox.width,
  }
}

export default function HeroWindow({ hero }: Props) {
  const [active, setActive] = useState<HeroTabId>("status")
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0 })
  const tablistRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Partial<Record<HeroTabId, HTMLButtonElement | null>>>({})
  const prevActive = useRef<HeroTabId>(active)
  const reduceMotion = useRef(false)
  const panel = hero.panels[active]

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
  }, [])

  const snapToActive = () => {
    const tablist = tablistRef.current
    const tab = tabRefs.current[active]
    if (!tablist || !tab) return
    setIndicator(measureTab(tablist, tab))
  }

  useLayoutEffect(() => {
    const tablist = tablistRef.current
    const nextTab = tabRefs.current[active]
    if (!tablist || !nextTab) return

    const next = measureTab(tablist, nextTab)
    const fromId = prevActive.current
    const prevTab = tabRefs.current[fromId]

    if (reduceMotion.current || fromId === active || !prevTab) {
      setIndicator(next)
      prevActive.current = active
      return
    }

    const prev = measureTab(tablist, prevTab)
    const stretchLeft = Math.min(prev.left, next.left)
    const stretchRight = Math.max(prev.left + prev.width, next.left + next.width)

    // 1) alonga cobrindo origem + destino
    setIndicator({ left: stretchLeft, width: stretchRight - stretchLeft })
    prevActive.current = active

    // 2) encolhe na aba ativa (vai e vem)
    const settle = window.setTimeout(() => {
      setIndicator(next)
    }, 160)

    return () => window.clearTimeout(settle)
  }, [active, hero.tabs])

  useEffect(() => {
    const onResize = () => snapToActive()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [active])

  return (
    <div className="hero-window">
      <div className="hero-window-bar">
        <span>{hero.windowBar}</span>
        <div
          className="hero-window-tabs"
          role="tablist"
          aria-label={hero.windowBar}
          ref={tablistRef}
        >
          {TAB_IDS.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`hero-tab-${id}`}
              ref={(el) => {
                tabRefs.current[id] = el
              }}
              aria-selected={active === id}
              aria-controls="hero-window-panel"
              className={active === id ? "active" : undefined}
              onClick={() => setActive(id)}
            >
              {hero.tabs[id]}
            </button>
          ))}
          <span
            className="hero-window-tabs-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
        </div>
      </div>
      <div
        className="hero-window-body"
        role="tabpanel"
        id="hero-window-panel"
        aria-labelledby={`hero-tab-${active}`}
      >
        <div className="hero-service">
          <p className="hero-service-name">{hero.serviceName}</p>
          <span className="hero-badge">{panel.badge}</span>
        </div>
        <ul className="hero-logs">
          {panel.logs.map((line) => (
            <li key={line.t + line.msg}>
              <span>{line.t}</span>
              <span className={line.ok === false ? "msg" : "ok msg"}>
                {line.msg}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
