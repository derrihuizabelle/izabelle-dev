import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Dialog from "@/components/Dialog"

const defaultProps = {
  id: "test-dialog",
  title: "Test.exe",
  color: "#7c3aed",
  isOpen: true,
  zIndex: 20,
  defaultPosition: { x: 100, y: 100 },
  onClose: jest.fn(),
  onFocus: jest.fn(),
  children: <p>dialog content</p>,
}

beforeEach(() => jest.clearAllMocks())

describe("Dialog — visibility", () => {
  it("renders when isOpen is true", () => {
    render(<Dialog {...defaultProps} />)
    expect(screen.getByText("dialog content")).toBeInTheDocument()
  })

  it("does not render when isOpen is false", () => {
    render(<Dialog {...defaultProps} isOpen={false} />)
    expect(screen.queryByText("dialog content")).not.toBeInTheDocument()
  })

  it("shows the title in the title bar", () => {
    render(<Dialog {...defaultProps} />)
    expect(screen.getByText("Test.exe")).toBeInTheDocument()
  })
})

describe("Dialog — initial position", () => {
  it("renders at the defaultPosition via transform", () => {
    const { container } = render(
      <Dialog {...defaultProps} defaultPosition={{ x: 200, y: 80 }} />
    )
    const root = container.firstChild as HTMLElement
    expect(root.style.transform).toBe("translate(200px, 80px)")
  })

  it("renders at (0, 0) when defaultPosition is origin", () => {
    const { container } = render(
      <Dialog {...defaultProps} defaultPosition={{ x: 0, y: 0 }} />
    )
    const root = container.firstChild as HTMLElement
    expect(root.style.transform).toBe("translate(0px, 0px)")
  })
})

describe("Dialog — interactions", () => {
  it("calls onClose when the close dot is clicked", async () => {
    const onClose = jest.fn()
    const user = userEvent.setup()
    render(<Dialog {...defaultProps} onClose={onClose} />)

    await user.click(screen.getByRole("button"))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not trigger drag when close button is clicked", async () => {
    const user = userEvent.setup()
    const { container } = render(<Dialog {...defaultProps} />)
    const root = container.firstChild as HTMLElement
    const initialTransform = root.style.transform

    await user.click(screen.getByRole("button"))

    expect(root.style.transform).toBe(initialTransform)
  })

  it("calls onFocus when the outer dialog area is clicked", async () => {
    const onFocus = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<Dialog {...defaultProps} onFocus={onFocus} />)

    await user.click(container.firstChild as HTMLElement)

    expect(onFocus).toHaveBeenCalled()
  })

  it("applies the correct zIndex", () => {
    const { container } = render(<Dialog {...defaultProps} zIndex={42} />)
    const root = container.firstChild as HTMLElement
    expect(root.style.zIndex).toBe("42")
  })

  it("uses the color prop on the title bar background", () => {
    const { container } = render(<Dialog {...defaultProps} color="#db2777" />)
    const titleBar = container.querySelector('[style*="db2777"]')
    expect(titleBar).toBeInTheDocument()
  })
})

describe("Dialog — drag", () => {
  it("updates transform on mousemove after mousedown on title bar", () => {
    const { container } = render(
      <Dialog {...defaultProps} defaultPosition={{ x: 100, y: 100 }} />
    )
    const root = container.firstChild as HTMLElement
    const titleBar = root.querySelector('[style*="cursor: move"]') as HTMLElement

    fireEvent.mouseDown(titleBar, { clientX: 100, clientY: 100 })
    fireEvent.mouseMove(window, { clientX: 200, clientY: 150 })

    expect(root.style.transform).toBe("translate(200px, 150px)")
  })

  it("stops moving after mouseup", () => {
    const { container } = render(
      <Dialog {...defaultProps} defaultPosition={{ x: 0, y: 0 }} />
    )
    const root = container.firstChild as HTMLElement
    const titleBar = root.querySelector('[style*="cursor: move"]') as HTMLElement

    fireEvent.mouseDown(titleBar, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 50, clientY: 50 })
    fireEvent.mouseUp(window)

    const transformAfterUp = root.style.transform

    fireEvent.mouseMove(window, { clientX: 999, clientY: 999 })
    expect(root.style.transform).toBe(transformAfterUp)
  })
})
