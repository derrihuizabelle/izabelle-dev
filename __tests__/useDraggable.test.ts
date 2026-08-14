import { renderHook, act } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
import { useDraggable } from "@/hooks/useDraggable"

describe("useDraggable", () => {
  it("returns pos and onMouseDown", () => {
    const { result } = renderHook(() => useDraggable({ x: 0, y: 0 }))
    expect(result.current.pos).toBeDefined()
    expect(result.current.onMouseDown).toBeInstanceOf(Function)
  })

  it("initialises pos with the given position", () => {
    const { result } = renderHook(() => useDraggable({ x: 50, y: 80 }))
    expect(result.current.pos).toEqual({ x: 50, y: 80 })
  })

  it("updates pos on mousemove after mousedown", () => {
    const { result } = renderHook(() => useDraggable({ x: 0, y: 0 }))

    act(() => {
      result.current.onMouseDown({
        clientX: 100,
        clientY: 100,
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent)
    })

    act(() => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 160 })
    })

    // moved by delta (100, 60)
    expect(result.current.pos).toEqual({ x: 100, y: 60 })
  })

  it("stops updating pos after mouseup", () => {
    const { result } = renderHook(() => useDraggable({ x: 0, y: 0 }))

    act(() => {
      result.current.onMouseDown({
        clientX: 0,
        clientY: 0,
        preventDefault: jest.fn(),
      } as unknown as React.MouseEvent)
    })

    act(() => {
      fireEvent.mouseMove(window, { clientX: 50, clientY: 50 })
      fireEvent.mouseUp(window)
    })

    const posAfterUp = result.current.pos

    act(() => {
      fireEvent.mouseMove(window, { clientX: 999, clientY: 999 })
    })

    expect(result.current.pos).toEqual(posAfterUp)
  })

  it("handles multiple drag sessions correctly", () => {
    const { result } = renderHook(() => useDraggable({ x: 0, y: 0 }))

    // First drag
    act(() => {
      result.current.onMouseDown({ clientX: 0, clientY: 0, preventDefault: jest.fn() } as unknown as React.MouseEvent)
    })
    act(() => { fireEvent.mouseMove(window, { clientX: 100, clientY: 100 }) })
    act(() => { fireEvent.mouseUp(window) })
    expect(result.current.pos).toEqual({ x: 100, y: 100 })

    // Second drag from current position
    act(() => {
      result.current.onMouseDown({ clientX: 100, clientY: 100, preventDefault: jest.fn() } as unknown as React.MouseEvent)
    })
    act(() => { fireEvent.mouseMove(window, { clientX: 150, clientY: 120 }) })
    act(() => { fireEvent.mouseUp(window) })
    expect(result.current.pos).toEqual({ x: 150, y: 120 })
  })
})
