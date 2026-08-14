/**
 * Conteúdo das janelas — só renderiza a partir de dados de lib/content.
 * Sem "use client": não usa hooks nem browser APIs.
 */

import {
  blogPosts,
  contacts,
  projects,
  type DialogId,
} from "@/lib/content"

type Props = {
  id: DialogId
}

export default function DialogContent({ id }: Props) {
  const s = { fontSize: 12, color: "#374151" }
  const muted = { fontSize: 11, color: "#9ca3af" }
  const divider = {
    borderBottom: "0.5px solid #f3f4f6",
    paddingBottom: 12,
    marginBottom: 12,
  }

  if (id === "projects") {
    return (
      <div style={{ width: 290 }}>
        {projects.map((project, index) => (
          <article
            key={project.name}
            style={index < projects.length - 1 ? divider : undefined}
          >
            <h2
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#111",
                marginBottom: 5,
              }}
            >
              {project.name}
            </h2>
            <p style={{ ...s, lineHeight: 1.6, margin: 0 }}>{project.description}</p>
            <ul
              style={{
                display: "flex",
                gap: 5,
                marginTop: 8,
                flexWrap: "wrap",
                listStyle: "none",
                padding: 0,
              }}
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  style={{
                    padding: "2px 8px",
                    fontSize: 10,
                    borderRadius: 20,
                    background: "#fef3c7",
                    color: "#92400e",
                  }}
                >
                  {tag}
                </li>
              ))}
              {project.metricTags?.map((tag) => (
                <li
                  key={tag}
                  style={{
                    padding: "2px 8px",
                    fontSize: 10,
                    borderRadius: 20,
                    background: "#ecfdf5",
                    color: "#065f46",
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    )
  }

  if (id === "blog") {
    return (
      <div style={{ width: 240 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {blogPosts.map((post) => (
            <li
              key={post.n}
              style={{
                display: "flex",
                gap: 10,
                padding: "8px 0",
                borderBottom: "0.5px solid #f3f4f6",
              }}
            >
              <span style={{ ...muted, flexShrink: 0, marginTop: 1 }}>{post.n}</span>
              <div>
                <h2
                  style={{
                    ...s,
                    lineHeight: 1.5,
                    fontSize: 12,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {post.title}
                </h2>
                <p style={{ ...muted, marginTop: 2, marginBottom: 0 }}>{post.tags}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (id === "contact") {
    return (
      <div style={{ width: 220 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {contacts.map((c) => {
            const isExternal = c.href.startsWith("http")
            return (
              <li
                key={c.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "0.5px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "#f3e8ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#7c3aed",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {c.icon}
                </div>
                <div>
                  <div style={{ ...muted }}>{c.label}</div>
                  <a
                    href={c.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    style={{
                      ...s,
                      fontWeight: 500,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {c.value}
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return null
}
