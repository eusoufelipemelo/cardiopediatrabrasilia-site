import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ConditionTile } from "@/components/ConditionTile";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SplitTitle } from "@/components/SplitTitle";
import { conditions } from "@/content/condicoes";
import { absoluteUrl } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const TITLE = "Condições que a cardiologista pediátrica acompanha";
const DESCRIPTION = "Cardiopatias congênitas, Síndrome de Down, desmaio, arritmias, doenças adquiridas e insuficiência cardíaca na infância, explicadas para pais.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/condicoes", image: "/og/condicoes.jpg" });

export default function ConditionsPage() {
  return (
    <>
      <PageHeader
        title="O que eu acompanho"
        intro="As condições mais comuns no consultório de cardiologia pediátrica, em palavras simples: o que são, os sinais que merecem atenção e como é a avaliação."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "O que acompanho", path: "/condicoes" },
        ]}
        image={{ src: "/fotos/ecocardiografo-desktop.jpg", alt: "Tela do ecocardiograma com imagem colorida do coração, no consultório da Dra. Michelle Sanches" }}
        position="92% 20%"
      />

      <Container className="py-20 sm:py-28">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((c, i) => (
            <li key={c.slug} data-reveal="fade" style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties} className="h-full">
              <ConditionTile condition={c} />
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 rounded-[26px] bg-surface-alt p-8 sm:p-12 lg:grid-cols-12">
          <SplitTitle text="Sinais que merecem uma avaliação" className="display text-[2.1rem] text-ink sm:text-[2.7rem] lg:col-span-5" />
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-7">
            {siteConfig.warningSigns.map((s) => (
              <li key={s} className="flex items-center gap-3 border-b border-line pb-3 text-ink">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-rose" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-[70ch] text-[0.95rem] leading-relaxed text-muted">
          Conteúdo informativo, escrito para ajudar pais e cuidadores a entender cada condição. Não substitui a consulta médica: só a avaliação individual define o diagnóstico e o tratamento.
        </p>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <CtaBlock />
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: TITLE,
          url: absoluteUrl("/condicoes"),
          itemListElement: conditions.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title, url: absoluteUrl(`/condicoes/${c.slug}`) })),
        }}
      />
    </>
  );
}
