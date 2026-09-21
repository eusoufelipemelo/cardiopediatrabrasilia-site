import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ConditionTile } from "@/components/ConditionTile";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { HeartTrace } from "@/components/HeartTrace";
import { ArrowIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { conditions, getCondition } from "@/content/condicoes";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/condicoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCondition(slug);
  if (!c) return { title: "Página não encontrada", robots: { index: false } };
  return pageMetadata({ title: `${c.title} na infância`, description: c.summary, path: `/condicoes/${c.slug}`, image: c.og });
}

export default async function ConditionPage({ params }: PageProps<"/condicoes/[slug]">) {
  const { slug } = await params;
  const c = getCondition(slug);
  if (!c) notFound();
  const others = conditions.filter((o) => o.slug !== c.slug).slice(0, 3);
  const e = siteConfig.about.expert;

  return (
    <>
      <PageHeader
        title={c.title}
        intro={c.summary}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "O que acompanho", path: "/condicoes" },
          { name: c.title, path: `/condicoes/${c.slug}` },
        ]}
        image={{ src: "/fotos/ecocardiografo-desktop.jpg", alt: "Consultório de cardiologia pediátrica com aparelho de ecocardiograma" }}
        position="80% 30%"
      />

      <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-10">
        <article className="lg:col-span-7">
          <h2 className="display text-[2.2rem] text-ink sm:text-[2.8rem]">O que é</h2>
          <div className="mt-6 space-y-5">
            {c.what.map((p, i) => (
              <p key={i} data-reveal="fade" className="max-w-[64ch] text-[1.08rem] leading-[1.8] text-ink">
                {p}
              </p>
            ))}
          </div>

          {c.examples?.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {c.examples.map((x) => (
                <li key={x} className="rounded-full border border-line bg-surface-alt px-4 py-2 text-[0.95rem] text-ink">
                  {x}
                </li>
              ))}
            </ul>
          ) : null}

          <HeartTrace pulseAt={0.3} className="my-14 h-10 w-full text-rose" />

          <h2 className="display text-[2.2rem] text-ink sm:text-[2.8rem]">Como é a avaliação</h2>
          <div className="mt-6 space-y-5">
            {c.evaluation.map((p, i) => (
              <p key={i} data-reveal="fade" className="max-w-[64ch] text-[1.08rem] leading-[1.8] text-ink">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-10 max-w-[64ch] rounded-[18px] bg-surface-alt p-5 text-[0.95rem] leading-relaxed text-muted">
            Conteúdo informativo para pais e cuidadores. Não substitui a consulta: só a avaliação individual define o diagnóstico e o tratamento.
          </p>
        </article>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-[26px] bg-rose p-7 text-ink sm:p-8 lg:sticky lg:top-28">
            <h2 className="display text-[1.9rem] leading-tight">Sinais que merecem atenção</h2>
            <ul className="mt-6 space-y-3">
              {c.signs.map((s, i) => (
                <li key={s} data-reveal="fade" style={{ "--d": `${i * 60}ms` } as CSSProperties} className="flex gap-3 leading-snug">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-ink" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 border-t border-ink/15 pt-6">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-surface">
                <Image src="/fotos/dra-michelle-rosto.jpg" alt="" fill sizes="56px" className="object-cover object-[50%_25%]" />
              </div>
              <p className="text-[0.95rem] leading-snug">
                Revisado por <strong className="font-semibold">Dra. {e.name}</strong>, {e.credentials.toLowerCase()}.
              </p>
            </div>
          </div>
        </aside>
      </Container>

      <section aria-labelledby="outras" className="bg-surface-alt py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="outras" className="display text-[2.2rem] text-ink sm:text-[2.8rem]">
              Outras condições
            </h2>
            <Link href="/condicoes" className="link inline-flex min-h-11 items-center gap-2 font-semibold text-brand">
              Ver todas
              <ArrowIcon width={18} height={18} />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug} className="h-full">
                <ConditionTile condition={o} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <CtaBlock />
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: c.title,
          description: c.summary,
          url: absoluteUrl(`/condicoes/${c.slug}`),
          inLanguage: siteConfig.language,
          audience: { "@type": "MedicalAudience", audienceType: "Patient" },
          about: { "@type": "MedicalCondition", name: c.title, signOrSymptom: c.signs.map((s) => ({ "@type": "MedicalSignOrSymptom", name: s })) },
          reviewedBy: { "@type": "Physician", name: `Dra. ${e.name}`, "@id": organizationId() },
          publisher: { "@id": organizationId() },
        }}
      />
    </>
  );
}
