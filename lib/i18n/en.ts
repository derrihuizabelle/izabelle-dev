import { CONTACT_EMAIL, LINKEDIN_DISPLAY, LINKEDIN_URL } from "@/lib/contact"
import type { Dictionary } from "./types"

export const en: Dictionary = {
  meta: {
    title: "Freelance Programmer in Nova Friburgo · Izabelle Derrihú",
    description:
      "Freelance software engineer and programmer based in Nova Friburgo, RJ, Brazil. Backend, distributed systems, payments, and web — experience from big tech (Nubank, Stone). Available for local and remote projects.",
    keywords: [
      "freelance programmer Nova Friburgo",
      "freelance developer Nova Friburgo",
      "software engineer Nova Friburgo",
      "freelancer Nova Friburgo RJ",
      "web developer Nova Friburgo",
      "hire freelance programmer Brazil",
      "Izabelle Derrihú",
      "backend",
      "Clojure",
      "Kafka",
      "software engineering",
      "AI-assisted development",
    ],
  },
  nav: {
    ariaPrimary: "Primary",
    howIWork: "Day to day",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
  },
  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },
  lang: {
    switchTo: "Português",
    label: "Language",
  },
  hero: {
    aria: "Introduction",
    eyebrow: "Freelance programmer · Nova Friburgo",
    sub: "Systems at scale and solutions for your business — bringing big-tech experience from Nubank and Stone Group to local projects in Nova Friburgo and remote work.",
    ctaHowIWork: "Day to day →",
    ctaProjects: "Projects",
    ctaBlog: "Blog",
    ctaContact: "Contact",
    ctaCv: "Download CV",
    cvModal: {
      title: "Verification before download",
      body: "Complete the captcha to download the résumé. This reduces automated downloads.",
      confirm: "Download",
      cancel: "Cancel",
      error: "Verification failed. Please try again.",
      missingConfig: "Download is not configured yet (missing reCAPTCHA keys).",
    },
    windowBar: "status / now",
    serviceName: "backend",
    tabs: {
      status: "Status",
      stack: "Stack",
    },
    panels: {
      status: {
        badge: "Online",
        logs: [
          { t: "local", msg: "Rio de Janeiro, BR" },
          { t: "work mode", msg: "Remote / Remote first" },
          { t: "working on", msg: "Payments and products on distributed systems - Nubank" },
          { t: "project focus", msg: "Data-driven and scalable projects" },
        ],
      },
      stack: {
        badge: "Always evolving",
        logs: [
          { t: "lang", msg: "Clojure · TypeScript · Java" },
          { t: "data", msg: "Kafka · Datomic · SQL · MongoDB" },
          { t: "ai", msg: "Claude · Cursor · Gemini" },
          { t: "ops", msg: "AWS · Observability · CI/CD" },
        ],
      },
    },
  },
  howIWork: {
    eyebrow: "My process",
    title: "My day to day",
    sub: "How I work by applying software engineering and architecture concepts to deliver value efficiently and at scale.",
    steps: [
      {
        id: "discovery",
        title: "Discovery",
        body: "I start by understanding the problem and its impact before proposing a solution: what the client needs, what can break, what “better” means, and how we can reduce costs. Whether it’s a simple site or a more complex system, the initial approach always has the same pillars. Discovery is an initial hypothesis, based on facts, that needs to be validated through the project’s development.",
      },
      {
        id: "planning",
        title: "Planning",
        body: "I break the work into reversible steps, surface risks early, and align on success criteria so delivery isn’t a surprise. From my experience in big tech, I learned that a small blocker should be removed as soon as it’s confirmed, so costs and risks don’t pile up and the path can be recalculated.",
      },
      {
        id: "shipping",
        title: "Shipping",
        body: "I prefer small, gradual changes—well analyzed and tested—with a clear rollback path. If the client doesn’t have that environment ready, we create an action plan and a roadmap to build it, from buying the domain to configuring the server, fully oriented to the project’s needs without inflating costs.",
      },
      {
        id: "observability",
        title: "Observability",
        body: "I define how we’ll know it worked: which signals to watch, which failures to expect, and when to call the work done. I also prepare an alerting plan: if something unexpected happens in production, we’ll be notified and can take immediate action.",
      },
      {
        id: "analytics",
        title: "Data analysis",
        body: "These days, shipping an application or website alone is no longer enough. We live in an era where collecting data and testing hypotheses is essential: how did your audience react? How can we improve reach? We learn together from the data and adjust the strategy to improve the outcome.",
      },
      {
        id: "docs",
        title: "Documentation and handoff",
        body: "The most important thing in my career is empowering the client to make decisions and understand what was built, how to update it, and what to do if something unexpected happens—without depending on me for every decision. Your project is delivered with all the documentation needed for maintenance and evolution. Whenever possible, I train the client myself so they can make decisions and take ownership of the project.",
      },
    ],
  },
  projects: {
    eyebrow: "Selected work",
    title: "Projects and experience",
    sub: "A few chapters that shaped how I build software and develop products.",
    items: [
      {
        name: "Payment products — Nubank",
        description:
          "I ship new features that help users manage their financial lives across Brazil, using Clojure, microservice communication, cloud solutions, and applied AI engineering. Every day I work in a highly distributed, scalable environment, with planned and tested deliveries, verified data, and well-structured documentation. There’s no room for guesswork: the only way to deliver value is through data and tests.",
        tags: ["Nubank", "payments", "product", "Clojure", "microservices", "events", "applied AI engineering"],
      },
      {
        name: "Usage-based billing platform — idwall",
        description:
          "I worked on a billing system that combined data lake and HTTP sources to charge clients for usage. I built the React front end and Java and Node.js APIs so the collections team could manage that data.",
        tags: ["idwall", "billing", "React", "Java", "Node.js"],
      },
      {
        name: "API Gateway and payment processing — Stone Group (Tag IMF)",
        description:
          "I built an API gateway and worked on systems that computed payment flows from card machines; I took part in building infrastructure that handled billions of reais processed.",
        tags: ["Stone", "API Gateway", "payments", "backend", "microservices"],
      },
    ],
  },
  blog: {
    eyebrow: "Writing",
    title: "Blog",
    sub: "Notes on performance, delivery, and what experiments teach about code.",
    items: [
      {
        n: "01",
        title: "Why 2 calls were faster than 1",
        tags: "performance · distributed systems",
      },
      {
        n: "02",
        title: "Measuring success of engineering deliveries",
        tags: "observability · process",
      },
      {
        n: "03",
        title: "What A/B testing taught me about writing code",
        tags: "experimentation · kafka",
      },
    ],
  },
  contact: {
    eyebrow: "Questions, opportunities, or just a chat?",
    title: "Contact",
    sub: LINKEDIN_URL
      ? "Freelancer in Nova Friburgo (RJ) — reach me on LinkedIn or by email."
      : "Freelancer in Nova Friburgo (RJ) — reach me by email.",
    items: [
      ...(LINKEDIN_URL
        ? [
            {
              label: "LinkedIn",
              value: LINKEDIN_DISPLAY || "LinkedIn",
              href: LINKEDIN_URL,
              icon: "in",
            },
          ]
        : []),
      {
        label: "Email",
        value: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
        icon: "@",
      },
    ],
  },
  footer: "Izabelle Derrihú · Nova Friburgo, RJ",
  seoFallback: {
    aria: "About Izabelle Derrihú",
    about:
      "Freelance software engineer and programmer based in Nova Friburgo, Rio de Janeiro, Brazil. Builds backend systems, distributed systems, payments, and web products, with big-tech experience. Available for projects in Nova Friburgo and remote work.",
    howIWorkHeading: "How I work",
    workHeading: "Selected work",
    writingHeading: "Writing",
    contactHeading: "Contact",
  },
}
