/**
 * Página completa — Server Component (sem "use client").
 * Protagonistas: Hero + Como eu trabalho. Projetos e Contato em seguida.
 */

import Constellations from "@/components/Constellations"
import CvDownloadButton from "@/components/CvDownloadButton"
import HeroWindow from "@/components/HeroWindow"
import LanguageToggle from "@/components/LanguageToggle"
import ThemeToggle from "@/components/ThemeToggle"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/types"

type Props = {
  locale: Locale
  dict: Dictionary
}

export default function Home({ locale, dict }: Props) {
  const navLinks = [
    { id: "how-i-work", label: dict.nav.howIWork, href: "#how-i-work" },
    { id: "projects", label: dict.nav.projects, href: "#projects" },
    { id: "contact", label: dict.nav.contact, href: "#contact" },
  ] as const

  return (
    <>
      <Constellations />
      <div className="site">
        <header className="topnav">
          <a href={`/${locale}`} className="topnav-brand">
            Izabelle Derrihú
          </a>
          <div className="topnav-end">
            <nav className="topnav-links" aria-label={dict.nav.ariaPrimary}>
              {navLinks.map((link) => (
                <a key={link.id} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <LanguageToggle
              locale={locale}
              switchLabel={dict.lang.switchTo}
              ariaLabel={`${dict.lang.label}: ${dict.lang.switchTo}`}
            />
            <ThemeToggle
              labelToLight={dict.theme.toLight}
              labelToDark={dict.theme.toDark}
            />
          </div>
        </header>

        <main>
          <section className="hero" aria-label={dict.hero.aria}>
            <div className="hero-copy">
              <p className="hero-eyebrow">{dict.hero.eyebrow}</p>
              <h1 className="hero-title">Izabelle Derrihú</h1>
              <p className="hero-sub">{dict.hero.sub}</p>
              <div className="hero-ctas">
                <a href="#how-i-work" className="hero-btn-ghost">
                  {dict.hero.ctaHowIWork}
                </a>
                <a href="#projects" className="hero-btn-ghost">
                  {dict.hero.ctaProjects}
                </a>
                <a href="#contact" className="hero-btn-primary">
                  {dict.hero.ctaContact}
                </a>
              </div>
            </div>

            <HeroWindow hero={dict.hero} />

            <div className="cv-download-row">
              <CvDownloadButton
                labels={{
                  cta: dict.hero.ctaCv,
                  title: dict.hero.cvModal.title,
                  body: dict.hero.cvModal.body,
                  confirm: dict.hero.cvModal.confirm,
                  cancel: dict.hero.cvModal.cancel,
                  error: dict.hero.cvModal.error,
                  missingConfig: dict.hero.cvModal.missingConfig,
                }}
              />
            </div>
          </section>

          <section id="how-i-work" className="section">
            <div className="section-inner">
              <p className="section-eyebrow">{dict.howIWork.eyebrow}</p>
              <h2 className="section-title">{dict.howIWork.title}</h2>
              <p className="section-sub">{dict.howIWork.sub}</p>
              <ol className="process-list">
                {dict.howIWork.steps.map((step, index) => (
                  <li key={step.id} className="process-step">
                    <span className="process-n" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="process-title">{step.title}</h3>
                      <p className="process-body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="projects" className="section section-alt">
            <div className="section-inner">
              <p className="section-eyebrow">{dict.projects.eyebrow}</p>
              <h2 className="section-title">{dict.projects.title}</h2>
              <p className="section-sub">{dict.projects.sub}</p>
              <ul className="project-list">
                {dict.projects.items.map((project) => (
                  <li key={project.name} className="project-row">
                    <div className="project-row-main">
                      <h3 className="project-name">{project.name}</h3>
                      <p className="project-desc">{project.description}</p>
                      <ul className="tag-list">
                        {project.tags.map((tag) => (
                          <li key={tag} className="tag">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="contact" className="section">
            <div className="section-inner">
              <p className="section-eyebrow">{dict.contact.eyebrow}</p>
              <h2 className="section-title">{dict.contact.title}</h2>
              <p className="section-sub">{dict.contact.sub}</p>
              <ul className="contact-list">
                {dict.contact.items.map((c) => {
                  const isExternal = c.href.startsWith("http")
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        className="contact-link"
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                      >
                        <span className="contact-icon" aria-hidden="true">
                          {c.icon}
                        </span>
                        <span>
                          <span className="contact-label">{c.label}</span>
                          <span className="contact-value">{c.value}</span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <p>{dict.footer}</p>
        </footer>
      </div>
    </>
  )
}
