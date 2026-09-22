import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ConditionTile } from "@/components/ConditionTile";
import { CountUp } from "@/components/CountUp";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { HeartTrace } from "@/components/HeartTrace";
import { HeroPicture } from "@/components/HeroPicture";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PostCard } from "@/components/PostCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { ServiceCard } from "@/components/ServiceCard";
import { SplitTitle } from "@/components/SplitTitle";
import { conditions } from "@/content/condicoes";
import { absoluteUrl } from "@/lib/env";
import { whatsappUrl } from "@/lib/format";
import { getPosts } from "@/lib/outbox";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const revalidate = 300;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Cardiologista pediátrica em Brasília",
    description: siteConfig.description,
    path: "/",
  }),
  title: undefined, // a Home usa o title padrão do layout
};

/** Abertura de seção: título em Garamond e texto de apoio logo abaixo, alinhados à esquerda. */
function Intro({ id, title, text, dark = false, className = "" }: { id: string; title: string; text?: string; dark?: boolean; className?: string }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <SplitTitle id={id} text={title} className={`display text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem] ${dark ? "text-white" : "text-ink"}`} />
      {text ? (
        <p data-reveal="fade" className={`mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed ${dark ? "text-white/80" : "text-muted"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

export default async function HomePage() {
  const { posts } = await getPosts({ perPage: 3 });
  const c = siteConfig.contact;
  const h = siteConfig.home;
  const a = siteConfig.about;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const [consulta, eco, ...others] = siteConfig.services;

  return (
    <>
      {/* ---------------------------------------------------------------- topo */}
      <section className="p-2 sm:p-3">
        <div data-hero="light" className="relative isolate overflow-hidden rounded-[22px] bg-surface-alt p-2 sm:rounded-[32px] sm:p-3 lg:grid lg:min-h-[calc(100svh-1.5rem)] lg:grid-cols-12 lg:p-0">
          {/* foto: bloco de cima no celular, coluna da direita no computador */}
          <div className="relative h-[54svh] overflow-hidden rounded-[18px] sm:h-[60svh] sm:rounded-[26px] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-auto lg:rounded-none">
            <div className="hero-media absolute inset-0">
              <HeroPicture
                desktop={{ src: "/fotos/ecocardiografo-desktop.jpg", width: 1600, height: 1066 }}
                mobile={{ src: "/fotos/ecocardiografo-mobile.jpg", width: 800, height: 1066 }}
                alt="Dra. Michelle Sanches sorrindo no consultório, sentada ao lado do aparelho de ecocardiograma"
                className="object-[50%_22%] lg:object-[34%_50%]"
                high
              />
            </div>
            {/* no computador, a foto se funde ao painel de linho */}
            <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--surface-alt),transparent_24%)] lg:block" />
          </div>

          <div className="relative flex flex-col px-3 pb-24 pt-9 sm:px-8 sm:pb-28 sm:pt-12 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:min-h-[calc(100svh-1.5rem)] lg:justify-center lg:pb-32 lg:pl-[max(3.5rem,calc((100vw-1140px)/2-0.75rem))] lg:pr-4 lg:pt-32">
            <div aria-hidden className="pattern-rose pointer-events-none absolute -left-10 top-24 hidden h-80 w-80 opacity-[0.1] [mask-image:radial-gradient(circle,#000,transparent_68%)] lg:block" />
            <h1 data-reveal="static" className="relative">
              <SplitTitle as="span" text={siteConfig.name} className="display block text-[2.9rem] leading-[0.98] text-ink sm:text-[4.2rem] lg:text-[4.6rem] xl:text-[5.4rem]" delay={150} />
              <span data-reveal="fade" style={{ "--d": "380ms" } as CSSProperties} className="mt-4 block max-w-[26ch] font-sans text-[1.1rem] font-medium leading-snug text-brand sm:text-[1.3rem]">
                Cardiologista pediátrica e ecocardiografista pediátrica em Brasília
              </span>
            </h1>
            <p data-reveal="fade" style={{ "--d": "480ms" } as CSSProperties} className="relative mt-5 max-w-[44ch] leading-relaxed text-muted">
              {h.heroText}
            </p>
            <div data-reveal="fade" style={{ "--d": "580ms" } as CSSProperties} className="relative mt-8 flex flex-wrap items-center gap-3">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener" className="btn btn-primary">
                  <WhatsAppIcon />
                  {h.primaryCta}
                </a>
              ) : null}
              <Link href="/servicos" className="btn btn-secondary">
                {h.secondaryCta}
              </Link>
            </div>
            {a.childrenServed ? (
              <p data-reveal="fade" style={{ "--d": "700ms" } as CSSProperties} className="relative mt-9 flex items-center gap-3 text-[0.95rem] text-muted">
                <Image src="/marca/simbolo-rose.svg" alt="" width={40} height={35} unoptimized className="trace-beat h-7 w-auto" />
                <span>
                  <strong className="font-serif text-[1.35rem] font-medium text-ink">{a.childrenServed}</strong> crianças atendidas
                </span>
              </p>
            ) : null}
          </div>

          <HeartTrace load pulseAt={0.36} strokeWidth={1.6} className="pointer-events-none absolute inset-x-0 bottom-6 h-12 w-full text-rose sm:bottom-9 sm:h-16 lg:col-span-12" />
        </div>
      </section>

      {/* ----------------------------------------------------------- manifesto */}
      <section aria-labelledby="manifesto" className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative overflow-hidden rounded-[22px] bg-surface-alt py-24 sm:rounded-[32px] sm:py-32">
          <div aria-hidden className="pattern-rose pointer-events-none absolute inset-0 opacity-[0.05]" />
          <Container className="relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
            {/* retrato em moldura alta, com um fio rosé deslocado atrás: editorial, sem ornamento */}
            <figure className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:mx-0">
              <div className="relative">
                <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[20px] border border-rose-deep/45 sm:translate-x-6 sm:translate-y-6" />
                <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-surface">
                  <Image
                    src="/fotos/topo-retrato-consultorio.jpg"
                    alt="Dra. Michelle Sanches sorrindo no consultório"
                    fill
                    sizes="(min-width: 1024px) 460px, 90vw"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
              </div>
              <figcaption className="mt-10 text-[0.92rem] text-muted sm:mt-12">Dra. Michelle Sanches no consultório</figcaption>
            </figure>

            <div className="lg:col-span-6 lg:col-start-7">
              <SplitTitle id="manifesto" text={h.manifestoTitle} className="display max-w-[16ch] text-[2.6rem] text-ink sm:text-[3.6rem] lg:text-[4rem]" />
              <span aria-hidden className="mt-9 block h-px w-24 bg-rose-deep" />
              <p data-reveal="fade" className="mt-9 max-w-[34ch] font-serif text-[1.6rem] leading-[1.35] text-ink sm:text-[1.85rem]">
                {a.paragraphs[0]}
              </p>
              <div className="mt-8 space-y-5">
                {a.paragraphs.slice(1).map((p, i) => (
                  <p key={i} data-reveal="fade" style={{ "--d": `${i * 110}ms` } as CSSProperties} className="max-w-[56ch] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
              <div data-reveal="fade" className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
                <p className="leading-tight">
                  <span className="block font-serif text-[1.5rem] italic text-ink">Dra. {a.expert.name}</span>
                  <span className="mt-1 block text-[0.92rem] text-muted">{a.expert.credentials}</span>
                </p>
                <Link href="/sobre" className="btn btn-secondary">
                  Conhecer a Dra. Michelle
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ---------------------------------------------------------- atendimentos */}
      <section aria-labelledby="atendimentos" className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Intro
              id="atendimentos"
              title="Atendimentos"
              text="Da primeira consulta ao acompanhamento de longo prazo, com o ecocardiograma feito pela própria cardiologista pediátrica."
            />
            <Link href="/servicos" data-reveal="fade" className="link inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-brand">
              Ver todos os atendimentos
              <ArrowIcon width={18} height={18} />
            </Link>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <ServiceCard service={consulta} feature />
            <ServiceCard service={eco} feature />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ o que acompanho */}
      <section aria-labelledby="condicoes" className="bg-surface-alt py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Intro
              id="condicoes"
              title="O que eu acompanho"
              text="As condições mais comuns no consultório, explicadas em palavras simples. Cada uma tem uma página com sinais de alerta e como é a avaliação."
            />
            <Link href="/condicoes" data-reveal="fade" className="link inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-brand">
              Ver todas as condições
              <ArrowIcon width={18} height={18} />
            </Link>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((cond, i) => (
              <li key={cond.slug} data-reveal="fade" style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties} className="h-full">
                <ConditionTile condition={cond} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------ você sabia */}
      <section aria-labelledby="sabia" className="px-2 sm:px-3">
        <div className="relative overflow-hidden rounded-[22px] bg-petrol-deep py-24 text-white sm:rounded-[32px] sm:py-32">
          <Container className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SplitTitle id="sabia" text="Você sabia?" className="display text-[2.8rem] sm:text-[4rem] lg:col-span-5 lg:text-[4.6rem]" />
            <p data-reveal="fade" className="max-w-[46ch] leading-relaxed text-white/75 lg:col-span-5 lg:col-start-8 lg:pb-3">
              Números que ajudam a entender por que a avaliação do coração na infância faz diferença, e por que o ecocardiograma é tão importante.
            </p>
          </Container>

          <HeartTrace pulseAt={0.5} strokeWidth={1.6} className="my-14 h-20 w-full text-rose sm:my-16 sm:h-24" />

          <Container>
            <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {siteConfig.facts.map((f, i) => (
                <div key={f.value} data-reveal="fade" style={{ "--d": `${i * 120}ms` } as CSSProperties} className="border-t border-white/20 pt-7">
                  <dt className="display whitespace-nowrap text-[3.6rem] leading-none text-rose sm:text-[4rem] xl:text-[4.6rem]">
                    <CountUp value={f.value} />
                  </dt>
                  <dd className="mt-5 max-w-[28ch] text-[0.98rem] leading-relaxed text-white/78">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ------------------------------------------------------------- a médica */}
      <section aria-labelledby="medica" className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* retrato grande, recorte fechado (cabeça e tronco), sobre o linho */}
          <div className="relative lg:col-span-5">
            <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-surface-alt lg:sticky lg:top-28">
              <Image src="/fotos/estudio-linho.jpg" alt={a.expert.image.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-[50%_18%]" />
              {a.childrenServed ? (
                <p className="absolute bottom-5 left-5 rounded-full bg-surface/90 px-5 py-2.5 text-[0.92rem] text-muted backdrop-blur">
                  <strong className="font-serif text-[1.25rem] font-medium text-ink">{a.childrenServed}</strong> crianças atendidas
                </p>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p data-reveal="fade" className="text-[1rem] font-medium text-rose-text">
              Quem cuida do coração do seu filho
            </p>
            <SplitTitle id="medica" text={`Dra. ${a.expert.name}`} className="display mt-4 text-[3rem] leading-[0.98] text-ink sm:text-[4.4rem] xl:text-[5rem]" />
            <p data-reveal="fade" className="mt-5 text-[1.1rem] text-muted">
              {a.expert.credentials}
              {a.expert.crm ? ` · CRM-DF ${a.expert.crm}` : ""}
              {a.expert.rqe ? ` · RQE ${a.expert.rqe}` : ""}
            </p>

            <h3 className="mt-14 text-[0.95rem] font-semibold text-ink">Formação</h3>
            <ol className="mt-5 grid gap-x-10 sm:grid-cols-2">
              {a.education.map((e, i) => (
                <li key={e.title} data-reveal="fade" style={{ "--d": `${i * 90}ms` } as CSSProperties} className="border-t border-line py-6">
                  <span className="font-serif text-[1rem] text-rose-deep">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-serif text-[1.45rem] leading-tight text-ink">{e.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-snug text-muted">{e.place}</p>
                </li>
              ))}
            </ol>
            <Link href="/sobre" data-reveal="fade" className="btn btn-primary mt-10">
              Ler a história completa
            </Link>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- consulta */}
      <section aria-labelledby="consulta" className="bg-surface-alt py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Intro id="consulta" title="Como é a consulta" text="Cinco momentos, na ordem em que vocês vão viver cada um. Sem pressa e com espaço para perguntas." />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ProcessTimeline steps={siteConfig.process} />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- onde atende */}
      <section aria-labelledby="locais" className="py-24 sm:py-32">
        <Container>
          <Intro
            id="locais"
            title="Onde eu atendo"
            text="Três endereços no Distrito Federal: o consultório em Taguatinga Norte e dois hospitais, em Águas Claras e na Asa Norte. Escolha o mais perto de vocês."
          />
          <div className="mt-14">
            <ServiceAreaMap places={c.places} whatsapp={c.whatsapp} />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- sinais de alerta */}
      <section aria-labelledby="sinais" className="px-2 sm:px-3">
        <div className="relative overflow-hidden rounded-[22px] bg-surface-alt py-20 sm:rounded-[32px] sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Intro id="sinais" title="Quando procurar um cardiologista pediátrico" />
              <p data-reveal="fade" className="mt-6 max-w-[48ch] leading-relaxed text-muted">
                Se a criança tem algum destes sinais, vale marcar uma avaliação. E, em muitos casos, uma consulta preventiva encontra alterações antes de elas darem sinais.
              </p>
              <Link href="/condicoes/desmaio" data-reveal="fade" className="link mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand">
                O que fazer quando a criança desmaia
                <ArrowIcon width={18} height={18} />
              </Link>
            </div>
            <ul className="flex flex-wrap content-start gap-2.5 lg:col-span-7">
              {siteConfig.warningSigns.map((s, i) => (
                <li
                  key={s}
                  data-reveal="fade"
                  style={{ "--d": `${i * 45}ms` } as CSSProperties}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-surface px-5 text-[1rem] text-ink"
                >
                  <span aria-hidden className="size-2 rounded-full bg-rose" />
                  {s}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* ------------------------------------------------------------------ faq */}
      <section aria-labelledby="faq" className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Intro id="faq" title="Perguntas frequentes" text="O que pais e mães costumam perguntar antes da primeira consulta." />
            {wa ? (
              <a href={wa} target="_blank" rel="noopener" data-reveal="fade" className="btn btn-primary mt-8">
                <WhatsAppIcon />
                Tirar outra dúvida
              </a>
            ) : null}
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- blog */}
      {posts.length ? (
        <section aria-labelledby="blog" className="bg-surface-alt py-24 sm:py-32">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <Intro id="blog" title="Do blog" text={siteConfig.blog.description} />
              <Link href="/blog" data-reveal="fade" className="link inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-brand">
                Ver todos os artigos
                <ArrowIcon width={18} height={18} />
              </Link>
            </div>
            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* -------------------------------------------------------------- contato */}
      <LeadSection />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Condições acompanhadas pela Dra. Michelle Sanches",
          itemListElement: conditions.map((cond, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: cond.title,
            url: absoluteUrl(`/condicoes/${cond.slug}`),
          })),
        }}
      />
    </>
  );
}

