/**
 * Dados compartilhados / legado (NowPlaying, DialogContent).
 * Conteúdo localizado vive em lib/i18n/{en,pt}.ts
 */

import { en } from "@/lib/i18n/en"

export type { BlogItem, ContactItem, ProjectItem } from "@/lib/i18n/types"

/** Legado — DialogContent (não montado na home). */
export type DialogId = "projects" | "blog" | "contact"

export const songs = [
  "Kafka consumer groups on prod",
  "ADR 0045 (feat. 5 alternatives)",
  "P99 went brrr",
  "why 2 calls were faster than 1",
  "deploy to prod on a Friday 💀",
  "distributed systems & chill",
] as const

/** @deprecated Prefira getDictionary(locale).nav — mantido para testes/legado */
export const navLinks = [
  { id: "how-i-work", label: en.nav.howIWork, href: "#how-i-work" },
  { id: "projects", label: en.nav.projects, href: "#projects" },
  { id: "contact", label: en.nav.contact, href: "#contact" },
] as const

export const projects = en.projects.items
export const blogPosts = en.blog.items
export const contacts = en.contact.items
