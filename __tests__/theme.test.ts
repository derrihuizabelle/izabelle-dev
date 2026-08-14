import { parseTheme } from "@/lib/theme"

describe("parseTheme", () => {
  it("accepts allowlisted values", () => {
    expect(parseTheme("light")).toBe("light")
    expect(parseTheme("dark")).toBe("dark")
  })

  it("rejects anything else", () => {
    expect(parseTheme("system")).toBeNull()
    expect(parseTheme("Light")).toBeNull()
    expect(parseTheme("")).toBeNull()
    expect(parseTheme(null)).toBeNull()
    expect(parseTheme(undefined)).toBeNull()
  })
})
