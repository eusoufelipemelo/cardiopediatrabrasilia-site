import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { PageHeader } from "./PageHeader";

const docs = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "LGPD: seus direitos", href: "/lgpd" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export const LEGAL_UPDATED = "21 de setembro de 2026";

/** Estrutura dos documentos legais: foto no topo, texto e navegação entre os documentos. */
export function LegalPage({ title, intro, path, children }: { title: string; intro: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHeader
        title={title}
        intro={intro}
        image={{ src: "/fotos/estudio-rose.jpg", alt: "Retrato da Dra. Michelle Sanches, sorrindo", portrait: true }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: title, path },
        ]}
      />
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
        <nav aria-label="Documentos legais" className="lg:col-span-3">
          <ul className="rounded-[22px] bg-surface-alt p-2 lg:sticky lg:top-28">
            {docs.map((d) => (
              <li key={d.href}>
                <Link href={d.href} aria-current={d.href === path ? "page" : undefined} className="flex min-h-12 items-center rounded-[16px] px-4 text-[0.95rem] text-muted hover:text-ink aria-[current=page]:bg-surface aria-[current=page]:font-semibold aria-[current=page]:text-ink">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="prose-outbox max-w-3xl lg:col-span-8 lg:col-start-5">
          <p className="text-[0.95rem] text-muted">Última atualização: {LEGAL_UPDATED}.</p>
          {children}
        </article>
      </Container>
    </>
  );
}
