"use client"

import { useState } from "react"
import { songs } from "@/lib/content"

/** Easter egg opcional — não montado na home atual; mantido para reuso/testes. */
export default function NowPlaying() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [fade, setFade] = useState(false)

  const go = (dir: 1 | -1) => {
    setFade(true)
    setTimeout(() => {
      setIdx((i) => (i + dir + songs.length) % songs.length)
      setFade(false)
    }, 130)
  }

  const btn = (onClick: () => void, children: React.ReactNode, title: string) => (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px 6px",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#c4b5fd",
        fontSize: 13,
        lineHeight: 1,
        transition: "color 0.1s",
      }}
    >
      {children}
    </button>
  )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #7c3aed44",
        background: "#1a003088",
        backdropFilter: "blur(8px)",
        width: 220,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, background: "#1db954", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
        }}>
          ♪
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
            currently playing
          </div>
          <div style={{
            fontSize: 12, fontWeight: 500, color: "#e879f9",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            transition: "opacity 0.13s",
            opacity: fade ? 0 : 1,
          }}>
            {songs[idx]}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14, flexShrink: 0 }}>
          {[8, 12, 5].map((h, i) => (
            <span key={i} style={{
              width: 3, height: h, background: "#1db954", borderRadius: 2,
              animation: playing ? `bar${i} 0.8s ease-in-out infinite alternate` : "none",
            }} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        {btn(() => go(-1), "⏮", "Previous")}
        {btn(() => setPlaying((p) => !p), playing ? "⏸" : "▶", playing ? "Pause" : "Play")}
        {btn(() => go(1), "⏭", "Next")}
      </div>

      <style>{`
        @keyframes bar0 { from { height: 4px } to { height: 10px } }
        @keyframes bar1 { from { height: 8px } to { height: 14px } }
        @keyframes bar2 { from { height: 3px } to { height: 8px }  }
      `}</style>
    </div>
  )
}
