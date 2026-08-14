import type { Locale } from "./config"
import { en } from "./en"
import { pt } from "./pt"
import type { Dictionary } from "./types"

const dictionaries: Record<Locale, Dictionary> = { en, pt }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
