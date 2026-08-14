import { CONTACT_EMAIL, LINKEDIN_DISPLAY, LINKEDIN_URL } from "@/lib/contact"
import type { Dictionary } from "./types"

export const pt: Dictionary = {
  meta: {
    title: "Izabelle Derrihú · Engenharia de Software Aplicada",
    description:
      "Engenharia de software aplicada e consultoria — programadora freelancer em Nova Friburgo (RJ). Backend, sistemas distribuídos, pagamentos e web, com experiência em big techs (Nubank, Stone). Projetos locais e remotos.",
    keywords: [
      "engenharia de software aplicada",
      "consultoria de software",
      "consultoria em engenharia de software",
      "programadora freelancer Nova Friburgo",
      "programador freelancer Nova Friburgo",
      "desenvolvedora freelancer Nova Friburgo",
      "freelancer Nova Friburgo",
      "criação de sites Nova Friburgo",
      "desenvolvimento de software Nova Friburgo",
      "programadora Nova Friburgo RJ",
      "engenheira de software freelancer",
      "Izabelle Derrihú",
      "backend",
      "Clojure",
      "Kafka",
      "desenvolvimento web",
      "programação",
      "inteligência artificial",
    ],
  },
  nav: {
    ariaPrimary: "Principal",
    howIWork: "Dia a dia",
    projects: "Projetos",
    blog: "Blog",
    contact: "Contato",
  },
  theme: {
    toLight: "Mudar para tema claro",
    toDark: "Mudar para tema escuro",
  },
  lang: {
    switchTo: "English",
    label: "Idioma",
  },
  hero: {
    aria: "Introdução",
    eyebrow: "Engenheira de software aplicada",
    sub: "Sistemas em escala e soluções para seu negócio — entregando minha experiência de trabalho em big techs como Nubank e Grupo Stone.",
    ctaHowIWork: "Dia a dia →",
    ctaProjects: "Projetos",
    ctaBlog: "Blog",
    ctaContact: "Contato",
    ctaCv: "Baixar currículo",
    cvModal: {
      title: "Verificação antes do download",
      body: "Complete o captcha para baixar o currículo. Isso reduz downloads automáticos.",
      confirm: "Baixar",
      cancel: "Cancelar",
      error: "Falha na verificação. Tente de novo.",
      missingConfig: "Download ainda não configurado (faltam as chaves do reCAPTCHA).",
    },
    windowBar: "status / agora",
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
          { t: "work mode", msg: "Remoto / Remote first" },
          { t: "working on", msg: "Pagamentos e produtos em sistemas distribuídos - Nubank" },
          { t: "project focus", msg: "Projetos data-driven e escaláveis" },
        ],
      },
      stack: {
        badge: "Always evolving",
        logs: [
          { t: "lang", msg: "Clojure · TypeScript · Java" },
          { t: "data", msg: "Kafka · Datomic · SQL · MongoDB" },
          { t: "ai", msg: "Claude · Cursor · Gemini" },
          { t: "ops", msg: "AWS · Observabilidade · CI/CD" },
        ],
      },
    },
  },
  howIWork: {
    eyebrow: "Meu processo",
    title: "Meu dia a dia",
    sub: "Como eu trabalho aplicando conceitos de engenharia e arquitetura de software para entregar valor de forma eficiente e escalável.",
    steps: [
      {
        id: "discovery",
        title: "Discovery",
        body: "Começo entendendo o problema e o impacto antes de propor uma solução: o que o cliente precisa, o que pode quebrar, o que é “melhor” e como podemos diminuir custos. Seja um site simples ou um sistema mais complexo, a abordagem inicial sempre tem os mesmos pilares. O discovery é uma hipótese inicial, baseada em fatos, que precisa ser validada com o desenvolvimento do projeto.",
      },
      {
        id: "planning",
        title: "Planejamento",
        body: "Quebro o trabalho em passos reversíveis, trago riscos cedo e alinho critérios de sucesso para a entrega não ser uma surpresa. Com minha experiência em big techs, aprendi que um pequeno blocker deve ser removido assim que verificado, para não acumular custos e riscos, e a rota poder ser recalculada.",
      },
      {
        id: "shipping",
        title: "Implantação",
        body: "Prefiro mudanças pequenas e graduais, bem analisadas e testadas, com caminho claro de rollback. Se o cliente não tem esse ambiente preparado, vamos criar um plano de ação e um planejamento para criar esse ambiente, desde a compra do domínio até a configuração do servidor, voltado totalmente para a necessidade do projeto, sem inflar custos.",
      },
      {
        id: "observability",
        title: "Observabilidade",
        body: "Defino como vamos saber que funcionou: quais sinais olhar, quais falhas esperar e quando dar o trabalho por concluído. Também preparo um plano de alertas: se algo acontecer fora do esperado em produção, seremos alertados e poderemos tomar uma ação imediata.",
      },
      {
        id: "analytics",
        title: "Análise de dados",
        body: "Hoje em dia, só subir uma aplicação ou site não é mais suficiente. Vivemos em uma era em que colher dados e testar hipóteses é essencial: como seu público reagiu? Como podemos melhorar o alcance? Aprendemos juntos com os dados e ajustamos a estratégia para melhorar o resultado.",
      },
      {
        id: "docs",
        title: "Documentação e entrega",
        body: "O mais importante na minha carreira é empoderar o cliente a tomar decisões e ter o conhecimento do que foi feito, como atualizar e o que fazer se algo inesperado acontecer, sem que ele fique dependente de mim para tomar decisões. Seu projeto é entregue com toda a documentação necessária para a manutenção e a evolução do projeto. Sempre que possível, eu mesma treino o cliente para tomar decisões e tomar posse do projeto.",
      },
    ],
  },
  projects: {
    eyebrow: "Trabalho selecionado",
    title: "Projetos e experiências",
    sub: "Alguns capítulos que moldaram como eu construo software e desenvolvo produtos.",
    items: [
      {
        name: "Produtos de pagamentos — Nubank",
        description:
          "Entrego novas features que ajudam os usuários a gerenciar suas vidas financeiras, impactando todo o Brasil, utilizando Clojure, comunicação entre microsserviços, soluções em nuvem e engenharia de IA aplicada. Todos os dias lido com um ambiente altamente distribuído e escalável, entregas planejadas e testadas, dados verificados e documentações bem estruturadas. Não há espaço para achismos: a única forma de entregar valor é com base em dados e testes.",
        tags: ["Nubank", "pagamentos", "produto", "Clojure", "microsserviços", "eventos", "engenharia de IA aplicada"],
      },
      {
        name: "Plataforma de billing por uso — idwall",
        description:
          "Trabalhei em um sistema de billing que unia fontes em data lake e HTTP para cobrar o uso dos clientes. Fiz o front em React e APIs em Java e Node.js para o time de cobrança gerenciar esses dados.",
        tags: ["idwall", "billing", "React", "Java", "Node.js"],
      },
      {
        name: "API Gateway e processamento de pagamentos — Grupo Stone (Tag IMF)",
        description:
          "Construí um API gateway e trabalhei em sistemas que computavam o fluxo de pagamentos das maquininhas; participei da construção de uma infraestrutura que gerenciava bilhões de reais processados.",
        tags: ["Stone", "API Gateway", "pagamentos", "backend", "microsserviços"],
      },
    ],
  },
  blog: {
    eyebrow: "Escrita",
    title: "Blog",
    sub: "Notas sobre performance, entregas e o que experimentos ensinam sobre código.",
    items: [
      {
        n: "01",
        title: "Por que 2 chamadas foram mais rápidas que 1",
        tags: "performance · sistemas distribuídos",
      },
      {
        n: "02",
        title: "Medindo sucesso de entregas de engenharia",
        tags: "observabilidade · processo",
      },
      {
        n: "03",
        title: "O que A/B testing me ensinou sobre escrever código",
        tags: "experimentação · kafka",
      },
    ],
  },
  contact: {
    eyebrow: "Dúvidas, oportunidades ou só bater um papo?",
    title: "Contato",
    sub: LINKEDIN_URL
      ? "Fale comigo no LinkedIn ou por e-mail."
      : "Fale comigo por e-mail.",
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
        label: "E-mail",
        value: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
        icon: "@",
      },
    ],
  },
  footer: "Izabelle Derrihú · Freelance & consultoria · Brasil",
  seoFallback: {
    aria: "Sobre Izabelle Derrihú",
    about:
      "Engenharia de software aplicada e consultoria — programadora freelancer em Nova Friburgo, Rio de Janeiro. Desenvolve backend, sistemas distribuídos, pagamentos e web, com experiência em big techs. Atende projetos em Nova Friburgo e remotos no Brasil.",
    howIWorkHeading: "Como eu trabalho",
    workHeading: "Trabalho selecionado",
    writingHeading: "Escrita",
    contactHeading: "Contato",
  },
}
