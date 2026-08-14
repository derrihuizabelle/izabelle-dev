import { useRef, useCallback, useState } from "react"

export function useDraggable(initialPos: { x: number; y: number }) {
  const [pos, setPos] = useState(initialPos)
  const posRef = useRef(initialPos)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    const startX = e.clientX - posRef.current.x
    const startY = e.clientY - posRef.current.y

    const onMove = (ev: MouseEvent) => {
      const next = { x: ev.clientX - startX, y: ev.clientY - startY }
      posRef.current = next
      setPos(next)
    }

    const onUp = () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }, [])

  return { pos, onMouseDown }
}
