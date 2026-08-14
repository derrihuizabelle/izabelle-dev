import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NowPlaying from "@/components/NowPlaying"
import { songs } from "@/lib/content"

describe("NowPlaying", () => {
  it("renders the first song on mount", () => {
    render(<NowPlaying />)
    expect(screen.getByText(songs[0])).toBeInTheDocument()
  })

  it("shows the 'currently playing' label", () => {
    render(<NowPlaying />)
    expect(screen.getByText(/currently playing/i)).toBeInTheDocument()
  })

  it("cycles to the next song on click", async () => {
    const user = userEvent.setup({ delay: null })
    render(<NowPlaying />)
    await user.click(screen.getByRole("button"))
    expect(screen.getByText(songs[1])).toBeInTheDocument()
  })

  it("wraps around to the first song after all songs are cycled", async () => {
    const user = userEvent.setup({ delay: null })
    render(<NowPlaying />)
    const btn = screen.getByRole("button")
    for (let i = 0; i < songs.length; i++) await user.click(btn)
    expect(screen.getByText(songs[0])).toBeInTheDocument()
  })

  it("the green spotify icon is visible", () => {
    const { container } = render(<NowPlaying />)
    const icon = container.querySelector('[style*="1db954"]')
    expect(icon).toBeInTheDocument()
  })
})
