import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { HeartTrace } from "@/components/HeartTrace";
import { CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SplitTitle } from "@/components/SplitTitle";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const TITLE = "Atendimentos em cardiologia pediátrica";
const DESCRIPTION =
  "Consulta de cardiologia pediátrica, ecocardiograma infantil, acompanhamento na Síndrome de Down, check-up para esporte e risco cirúrgico em Brasília.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/servicos", image: "/og/servicos.jpg" });

/**
 * Atendimentos sem foto real própria: painéis da marca, cada um diferente, em vez de imagem
 * inventada ou de banco.
 */
function BrandPanel({ slug }: { slug: string }) {
  if (slug === "sindrome-de-down") {
    return (
      <div data-reveal="fade" className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[26px] bg-rose p-8 text-ink sm:p-10">
        <div aria-hidden className="pattern-white absolute inset-0 opacity-20" />
        <p className="display relative text-[4.5rem] leading-none sm:text-[6rem]">40 a 60%</p>
        <p className="relative mt-3 max-w-[30ch] text-[1.02rem] leading-snug">das crianças com Síndrome de Down têm uma cardiopatia congênita</p>
      </div>
    );
  }
  if (slug === "atividade-fisica") {
    return (
      <div data-reveal="fade" className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[26px] bg-sage">
        <HeartTrace pulseAt={0.5} strokeWidth={2.4} className="absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 text-white" />
      </div>
    );
  }
  return (
    <div data-reveal="fade" className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[26px] bg-petrol-deep">
      <div aria-hidden className="pattern-white absolute inset-0 opacity-[0.08]" />
      <Image src="/marca/simbolo-rose.svg" alt="" width={200} height={176} unoptimized className="relative h-auto w-[30%]" />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Atendimentos"
        intro="Da primeira consulta ao acompanhamento de longo prazo, do recém-nascido ao adolescente. O ecocardiograma é feito pela própria cardiologista pediátrica."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Atendimentos", path: "/servicos" },
        ]}
        image={{ src: "/fotos/ecocardiografo-desktop.jpg", alt: "Aparelho de ecocardiograma pediátrico no consultório da Dra. Michelle Sanches" }}
        position="85% 30%"
      />

      <Container className="py-20 sm:py-28">
        <div className="space-y-20 sm:space-y-28">
          {siteConfig.services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-titulo`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                  {s.image ? (
                    <div data-reveal="image" className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-surface-alt">
                      <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" style={{ objectPosition: s.image.position }} />
                    </div>
                  ) : (
                    <BrandPanel slug={s.slug} />
                  )}
                </div>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <p data-reveal="fade" className="text-[0.95rem] font-medium text-rose-text">
                    {s.scope}
                  </p>
                  <SplitTitle id={`${s.slug}-titulo`} text={s.title} className="display mt-2 text-[2.3rem] text-ink sm:text-[3rem]" />
                  <p data-reveal="fade" className="mt-5 max-w-[58ch] leading-relaxed text-muted">
                    {s.description}
                  </p>
                  <ul className="mt-7 space-y-3 border-t border-line pt-7">
                    {s.includes.map((item, k) => (
                      <li key={item} data-reveal="fade" style={{ "--d": `${k * 80}ms` } as CSSProperties} className="flex gap-3 leading-snug text-ink">
                        <CheckIcon width={19} height={19} className="mt-0.5 shrink-0 text-petrol" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </Container>

      <section aria-labelledby="faq" className="bg-surface-alt py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <SplitTitle id="faq" text="Perguntas frequentes" className="display text-[2.4rem] text-ink sm:text-[3.2rem] lg:col-span-4" />
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq />
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <CtaBlock />
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: TITLE,
          url: absoluteUrl("/servicos"),
          itemListElement: siteConfig.services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "MedicalProcedure",
              name: s.title,
              description: s.description,
              url: absoluteUrl(`/servicos#${s.slug}`),
              provider: { "@id": organizationId() },
            },
          })),
        }}
      />
    </>
  );
}
