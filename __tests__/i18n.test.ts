import { isLocale, parseLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"

describe("parseLocale / isLocale", () => {
  it("accepts allowlisted locales", () => {
    expect(parseLocale("en")).toBe("en")
    expect(parseLocale("pt")).toBe("pt")
    expect(isLocale("en")).toBe(true)
    expect(isLocale("pt")).toBe(true)
  })

  it("rejects anything else", () => {
    expect(parseLocale("es")).toBeNull()
    expect(parseLocale("EN")).toBeNull()
    expect(parseLocale("")).toBeNull()
    expect(isLocale("fr")).toBe(false)
  })
})

describe("dictionaries", () => {
  it("en and pt expose the same structural keys for content lists", () => {
    const en = getDictionary("en")
    const pt = getDictionary("pt")
    expect(en.howIWork.steps.length).toBeGreaterThanOrEqual(4)
    expect(pt.howIWork.steps.length).toBeGreaterThanOrEqual(4)
    expect(en.projects.items.length).toBe(3)
    expect(pt.projects.items.length).toBe(3)
    expect(en.contact.items.length).toBeGreaterThan(0)
    expect(pt.contact.items.length).toBeGreaterThan(0)
  })

  it("has non-empty meta descriptions", () => {
    expect(getDictionary("en").meta.description.trim().length).toBeGreaterThan(20)
    expect(getDictionary("pt").meta.description.trim().length).toBeGreaterThan(20)
  })
})
