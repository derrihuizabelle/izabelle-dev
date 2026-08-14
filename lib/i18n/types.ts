export type ProjectItem = {
  name: string
  description: string
  tags: string[]
  metricTags?: string[]
}

export type BlogItem = {
  n: string
  title: string
  tags: string
}

export type ContactItem = {
  label: string
  value: string
  href: string
  icon: string
}

export type ProcessStep = {
  id: string
  title: string
  body: string
}

export type HeroLogLine = {
  t: string
  msg: string
  ok?: boolean
}

export type HeroWindowPanel = {
  badge: string
  logs: HeroLogLine[]
}

export type HeroTabId = "status" | "stack"

export type Dictionary = {
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  nav: {
    ariaPrimary: string
    howIWork: string
    projects: string
    blog: string
    contact: string
  }
  theme: {
    toLight: string
    toDark: string
  }
  lang: {
    switchTo: string
    label: string
  }
  hero: {
    aria: string
    eyebrow: string
    sub: string
    ctaHowIWork: string
    ctaProjects: string
    ctaBlog: string
    ctaContact: string
    ctaCv: string
    cvModal: {
      title: string
      body: string
      confirm: string
      cancel: string
      error: string
      missingConfig: string
    }
    windowBar: string
    serviceName: string
    tabs: { status: string; stack: string }
    panels: {
      status: HeroWindowPanel
      stack: HeroWindowPanel
    }
  }
  howIWork: {
    eyebrow: string
    title: string
    sub: string
    steps: ProcessStep[]
  }
  projects: {
    eyebrow: string
    title: string
    sub: string
    items: ProjectItem[]
  }
  blog: {
    eyebrow: string
    title: string
    sub: string
    items: BlogItem[]
  }
  contact: {
    eyebrow: string
    title: string
    sub: string
    items: ContactItem[]
  }
  footer: string
  seoFallback: {
    aria: string
    about: string
    howIWorkHeading: string
    workHeading: string
    writingHeading: string
    contactHeading: string
  }
}
