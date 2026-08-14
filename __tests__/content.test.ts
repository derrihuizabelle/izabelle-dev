import {
  songs,
  projects,
  contacts,
  navLinks,
} from "@/lib/content"

describe("songs", () => {
  it("has at least 3 songs", () => {
    expect(songs.length).toBeGreaterThanOrEqual(3)
  })

  it("contains no empty strings", () => {
    songs.forEach((s) => expect(s.trim().length).toBeGreaterThan(0))
  })

  it("all songs are unique", () => {
    expect(new Set(songs).size).toBe(songs.length)
  })
})

describe("navLinks", () => {
  it("has how-i-work, projects and contact anchors", () => {
    const ids = navLinks.map((l) => l.id)
    expect(ids).toEqual(["how-i-work", "projects", "contact"])
    navLinks.forEach((l) => {
      expect(l.href).toBe(`#${l.id}`)
    })
  })
})

describe("projects / contacts", () => {
  it("has project entries with name, description and tags", () => {
    expect(projects.length).toBeGreaterThan(0)
    projects.forEach((p) => {
      expect(p.name.trim().length).toBeGreaterThan(0)
      expect(p.description.trim().length).toBeGreaterThan(0)
      expect(p.tags.length).toBeGreaterThan(0)
    })
  })

  it("contacts have safe hrefs (http(s) or mailto)", () => {
    contacts.forEach((c) => {
      expect(c.href).toMatch(/^(https?:\/\/|mailto:)/)
      expect(c.label.trim().length).toBeGreaterThan(0)
      expect(c.value.trim().length).toBeGreaterThan(0)
    })
  })
})
