import { render, screen } from "@testing-library/react"
import Home from "@/components/Home"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const en = getDictionary("en")
const pt = getDictionary("pt")

describe("Home page sections (en)", () => {
  it("renders the brand in the hero", () => {
    render(<Home locale="en" dict={en} />)
    expect(screen.getByRole("heading", { level: 1, name: /Izabelle Derrihú/i })).toBeInTheDocument()
  })

  it("has sticky nav links to section anchors", () => {
    render(<Home locale="en" dict={en} />)
    const nav = screen.getByRole("navigation", { name: /Primary/i })
    expect(nav).toBeInTheDocument()
    expect(nav.querySelector('a[href="#how-i-work"]')).toHaveTextContent(/^Day to day$/i)
    expect(nav.querySelector('a[href="#projects"]')).toHaveTextContent(/^Projects$/i)
    expect(nav.querySelector('a[href="#contact"]')).toHaveTextContent(/^Contact$/i)
  })

  it("has theme and language toggles in the nav", () => {
    render(<Home locale="en" dict={en} />)
    expect(screen.getByRole("button", { name: /switch to (light|dark) theme/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /language: português/i })).toHaveAttribute("href", "/pt")
  })

  it("renders day-to-day as the process section", () => {
    render(<Home locale="en" dict={en} />)
    expect(document.getElementById("how-i-work")).toBeTruthy()
    expect(screen.getByRole("heading", { level: 2, name: /^My day to day$/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: /^Discovery$/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: /^Planning$/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: /^Shipping$/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: /^Observability$/i })).toBeInTheDocument()
  })

  it("renders Projects and Contact; no Blog", () => {
    render(<Home locale="en" dict={en} />)
    expect(document.getElementById("projects")).toBeTruthy()
    expect(document.getElementById("blog")).toBeFalsy()
    expect(document.getElementById("contact")).toBeTruthy()
  })

  it("hero CTAs go to how I work, projects and contact", () => {
    render(<Home locale="en" dict={en} />)
    const hero = screen.getByRole("region", { name: /Introduction/i })
    expect(hero.querySelector('a[href="#how-i-work"]')).toHaveTextContent(/Day to day →/i)
    expect(hero.querySelector('a[href="#projects"]')).toHaveTextContent(/^Projects$/i)
    expect(hero.querySelector('a[href="#contact"]')).toHaveTextContent(/^Contact$/i)
  })
})

describe("Home page sections (pt)", () => {
  it("renders Portuguese day-to-day section", () => {
    render(<Home locale="pt" dict={pt} />)
    expect(screen.getByRole("navigation", { name: /Principal/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: /^Meu dia a dia$/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /idioma: english/i })).toHaveAttribute("href", "/en")
  })
})
