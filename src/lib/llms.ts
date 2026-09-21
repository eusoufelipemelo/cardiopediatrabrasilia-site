import "server-only";
import { absoluteUrl } from "@/lib/env";
import type { PostSummary } from "@/lib/outbox";
import { conditions } from "@/content/condicoes";
import { siteConfig } from "@/site.config";

/** llms.txt de reserva (quando o CMS não responde), montado com o site.config.ts. */
export function fallbackLlms(posts: PostSummary[], full: boolean): string {
  const c = siteConfig.contact;
  const a = c.address;
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    siteConfig.tagline,
    "",
    "## Contato",
    "",
    c.phone ? `- Telefone: ${c.phone}` : "",
    c.whatsapp ? `- WhatsApp: https://wa.me/${c.whatsapp.replace(/\D/g, "")}` : "",
    c.email ? `- E-mail: ${c.email}` : "",
    a.street ? `- Endereço: ${a.street}, ${a.neighborhood ? `${a.neighborhood}, ` : ""}${a.city}/${a.state}` : "",
    c.hours ? `- Horário: ${c.hours}` : "",
    c.areaServed ? `- Região atendida: ${c.areaServed}` : "",
    "",
    "## Páginas",
    "",
    `- [Início](${absoluteUrl("/")}): ${siteConfig.tagline}`,
    `- [Serviços](${absoluteUrl("/servicos")}): ${siteConfig.services.map((s) => s.title).join(", ")}`,
    `- [O que acompanho](${absoluteUrl("/condicoes")}): ${conditions.map((x) => x.title).join(", ")}`,
    ...conditions.map((x) => `- [${x.title}](${absoluteUrl(`/condicoes/${x.slug}`)}): ${x.summary}`),
    `- [Sobre](${absoluteUrl("/sobre")}): ${siteConfig.about.headline}`,
    `- [Contato](${absoluteUrl("/contato")}): canais de atendimento`,
    `- [Blog](${absoluteUrl("/blog")}): ${siteConfig.blog.description}`,
    `- [Links úteis](${absoluteUrl("/links-uteis")}): agendamento, locais de atendimento, blog e Instagram`,
    "",
    "## Locais de atendimento",
    "",
    ...c.places.map((p) => `- ${p.name}: ${p.address ? `${p.address}, ` : ""}${p.region}, Brasília/DF (${p.mapsUrl})`),
    "",
    "## Formação",
    "",
    ...siteConfig.about.education.map((e) => `- ${e.title}: ${e.place}`),
    "",
    "## Perguntas frequentes",
    "",
    ...siteConfig.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
  if (full) {
    lines.push("", "## Serviços", "");
    for (const s of siteConfig.services) lines.push(`### ${s.title}`, "", s.description, "");
    lines.push("## Sobre", "", ...siteConfig.about.paragraphs.flatMap((p) => [p, ""]));
    lines.push("## Como é a consulta", "");
    for (const s of siteConfig.process) lines.push(`### ${s.title}`, "", s.text, "");
    lines.push("## Quando procurar um cardiologista pediátrico", "", ...siteConfig.warningSigns.map((w) => `- ${w}`), "");
  }
  if (posts.length) {
    lines.push("", "## Artigos", "");
    for (const p of posts) {
      const summary = (full ? (p.answerSummary ?? p.excerpt) : p.excerpt).replace(/\s+/g, " ").trim();
      lines.push(`- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})${summary ? `: ${summary}` : ""}`);
    }
  }
  return `${lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n").trim()}\n`;
}
