import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { HeartTrace } from "@/components/HeartTrace";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SplitTitle } from "@/components/SplitTitle";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Sobre a Dra. Michelle Sanches, cardiologista pediátrica",
  description: "Formação, valores e forma de atender da Dra. Michelle Sanches, cardiologista pediátrica e ecocardiografista pediátrica em Brasília.",
  path: "/sobre",
  image: "/og/sobre.jpg",
});

export default function AboutPage() {
  const a = siteConfig.about;
  const e = a.expert;

  return (
    <>
      <PageHeader
        title={a.headline}
        intro="Uma médica que escolheu cuidar dos corações menores e das famílias que vêm junto com eles."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ]}
        image={{ src: "/fotos/topo-retrato-consultorio.jpg", alt: "Dra. Michelle Sanches sorrindo no consultório", position: "50% 25%" }}
      />

      {/* história */}
      <Container className="grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-10">
        <figure className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:mx-0">
          <span aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[20px] border border-rose-deep/45 sm:-translate-x-6 sm:translate-y-6" />
          <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-surface-alt">
            <Image src="/fotos/estudio-rose.jpg" alt={e.image.alt} fill sizes="(min-width: 1024px) 460px, 90vw" className="object-cover object-[50%_15%]" />
          </div>
        </figure>
        <div className="lg:col-span-6 lg:col-start-7">
          <SplitTitle text={`Dra. ${e.name}`} className="display text-[2.6rem] text-ink sm:text-[3.6rem]" />
          <p data-reveal="fade" className="mt-2 text-[1.1rem] text-muted">
            {e.credentials}
            {e.crm ? ` · CRM-DF ${e.crm}` : ""}
            {e.rqe ? ` · RQE ${e.rqe}` : ""}
          </p>
          <div className="mt-8 space-y-5">
            {a.paragraphs.map((p, i) => (
              <p key={i} data-reveal="fade" style={{ "--d": `${i * 100}ms` } as CSSProperties} className="max-w-[60ch] text-[1.08rem] leading-[1.8] text-ink">
                {p}
              </p>
            ))}
            <p data-reveal="fade" className="max-w-[60ch] text-[1.08rem] leading-[1.8] text-ink">
              Como médica e mãe, o compromisso vai além do diagnóstico e do tratamento: é caminhar lado a lado com a família, compartilhando as preocupações e celebrando as vitórias.
            </p>
          </div>
          {a.childrenServed ? (
            <p data-reveal="fade" className="mt-10 flex items-baseline gap-3 border-t border-line pt-8">
              <strong className="display text-[3.4rem] leading-none text-rose-deep">{a.childrenServed}</strong>
              <span className="text-[1.05rem] text-muted">crianças atendidas</span>
            </p>
          ) : null}
        </div>
      </Container>

      {/* princípios */}
      <section aria-labelledby="principios" className="px-2 sm:px-3">
        <div className="overflow-hidden rounded-[22px] bg-petrol-deep py-20 text-white sm:rounded-[32px] sm:py-28">
          <Container>
            <SplitTitle id="principios" text="O que guia cada consulta" className="display text-[2.4rem] sm:text-[3.3rem]" />
          </Container>
          <HeartTrace pulseAt={0.5} className="my-10 h-14 w-full text-rose" />
          <Container>
            <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
              {a.principles.map((p, i) => (
                <li key={p.title} data-reveal="fade" style={{ "--d": `${i * 120}ms` } as CSSProperties}>
                  <h3 className="display text-[2rem] text-rose">{p.title}</h3>
                  <p className="mt-3 max-w-[40ch] leading-relaxed text-white/82">{p.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* formação */}
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SplitTitle text="Formação" className="display text-[2.4rem] text-ink sm:text-[3.3rem]" />
          <p data-reveal="fade" className="mt-5 max-w-[40ch] leading-relaxed text-muted">
            Da graduação ao fellow em ecocardiograma, uma trajetória dedicada ao coração das crianças.
          </p>
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {a.education.map((ed, i) => (
            <li key={ed.title} data-reveal="fade" style={{ "--d": `${i * 90}ms` } as CSSProperties} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 last:border-b">
              <span className="font-serif text-[1.6rem] leading-none text-rose-deep">{i + 1}</span>
              <div>
                <h3 className="display text-[1.7rem] text-ink sm:text-[2rem]">{ed.title}</h3>
                <p className="mt-1.5 text-muted">{ed.place}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <CtaBlock />
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/sobre"),
          about: { "@id": organizationId() },
          mainEntity: {
            "@type": "Person",
            name: `Dra. ${e.name}`,
            jobTitle: e.credentials,
            description: e.bio,
            image: absoluteUrl(e.image.src),
            worksFor: { "@id": organizationId() },
            knowsAbout: ["Cardiologia pediátrica", "Ecocardiograma pediátrico", "Cardiopatias congênitas", "Síndrome de Down"],
            alumniOf: [
              { "@type": "CollegeOrUniversity", name: "Universidade de Cuiabá" },
              { "@type": "CollegeOrUniversity", name: "Universidade Federal de Mato Grosso" },
              { "@type": "MedicalOrganization", name: "Instituto de Cardiologia e Transplante do Distrito Federal" },
            ],
            sameAs: siteConfig.social.map((s) => s.href),
          },
        }}
      />
    </>
  );
}
