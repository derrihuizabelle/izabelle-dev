"use client"

import { useState } from "react"
import { useDraggable } from "@/hooks/useDraggable"

interface DialogProps {
  id: string
  title: string
  color: string
  isOpen: boolean
  zIndex: number
  defaultPosition: { x: number; y: number }
  onClose: () => void
  onFocus: () => void
  children: React.ReactNode
}

export default function Dialog({
  title,
  color,
  isOpen,
  zIndex,
  defaultPosition,
  onClose,
  onFocus,
  children,
}: DialogProps) {
  const { pos, onMouseDown } = useDraggable(defaultPosition)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)

  if (!isOpen) return null

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMinimized((m) => !m)
    setMaximized(false)
  }

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMaximized((m) => !m)
    setMinimized(false)
  }

  return (
    <div
      onMouseDown={onFocus}
      style={
        maximized
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex,
              borderRadius: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "none",
              transition: "all 0.18s ease",
            }
          : {
              position: "absolute",
              top: 0,
              left: 0,
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              zIndex,
              borderRadius: minimized ? 8 : 8,
              overflow: "hidden",
              minWidth: 240,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.08)",
              transition: "box-shadow 0.15s ease",
            }
      }
    >
      {/* title bar — drag handle */}
      <div
        onMouseDown={(e) => {
          if (maximized) return
          onMouseDown(e)
          onFocus()
        }}
        style={{
          background: color,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: maximized ? "default" : "move",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {/* red — close */}
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onClose() }}
            title="Close"
            style={{
              width: 11, height: 11, borderRadius: "50%",
              background: "#f87171", border: "none",
              cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, color: "rgba(0,0,0,0.5)",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          {/* yellow — minimize */}
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleMinimize}
            title={minimized ? "Restore" : "Minimize"}
            style={{
              width: 11, height: 11, borderRadius: "50%",
              background: "#fbbf24", border: "none",
              cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: "rgba(0,0,0,0.5)",
              lineHeight: 1,
            }}
          >
            −
          </button>
          {/* green — maximize */}
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleMaximize}
            title={maximized ? "Restore" : "Maximize"}
            style={{
              width: 11, height: 11, borderRadius: "50%",
              background: "#4ade80", border: "none",
              cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, color: "rgba(0,0,0,0.5)",
              lineHeight: 1,
            }}
          >
            {maximized ? "⤡" : "⤢"}
          </button>
        </div>
        <span style={{ fontSize: 11, color: "#fff", opacity: 0.9, letterSpacing: "0.04em" }}>
          {title}
        </span>
      </div>

      {/* body — hidden when minimized */}
      {!minimized && (
        <div style={{
          background: "#fff",
          padding: 16,
          flex: maximized ? 1 : undefined,
          overflow: maximized ? "auto" : undefined,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
