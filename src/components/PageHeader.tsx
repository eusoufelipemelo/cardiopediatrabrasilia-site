import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";
import { HeartTrace } from "./HeartTrace";
import { SplitTitle } from "./SplitTitle";

/** Foto padrão do topo das páginas internas (ex.: blog). */
const DEFAULT_IMAGE = {
  src: "/fotos/ecocardiografo-desktop.jpg",
  alt: "Dra. Michelle Sanches no consultório, ao lado do aparelho de ecocardiograma",
};

/**
 * Topo das páginas internas: foto real em tela cheia dentro de uma moldura arredondada,
 * com véu petróleo vindo da esquerda, trilha, h1 animado e texto de apoio. O traço de
 * batimento corre na base. O cabeçalho do site fica claro por cima (ver SiteNav).
 */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image = DEFAULT_IMAGE,
  position = "50% 40%",
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  image?: { src: string; alt: string };
  /** object-position da foto. */
  position?: string;
}) {
  return (
    <div className="p-2 sm:p-3">
      <header
        data-hero="dark"
        className="relative isolate flex min-h-[70svh] items-end overflow-hidden rounded-[22px] bg-petrol-deep text-surface sm:min-h-[76svh] sm:rounded-[32px]"
      >
        <div className="hero-media absolute inset-0 -z-20">
          <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(58_81_80/0.94),rgb(58_81_80/0.55)_48%,rgb(58_81_80/0.35)),linear-gradient(to_right,rgb(58_81_80/0.7),transparent_70%)]"
        />
        <Container className="pb-16 pt-36 sm:pb-20 lg:pb-24">
          <div data-reveal="fade">
            <Breadcrumbs items={crumbs} light />
          </div>
          <SplitTitle as="h1" text={title} className="display mt-5 max-w-4xl text-[2.7rem] text-white sm:text-[4rem] lg:text-[5rem]" />
          {intro ? (
            <p data-reveal="fade" style={{ "--d": "250ms" } as CSSProperties} className="mt-6 max-w-[58ch] text-[1.1rem] leading-relaxed text-white/88">
              {intro}
            </p>
          ) : null}
          {children}
        </Container>
        <HeartTrace load pulseAt={0.78} className="absolute inset-x-0 bottom-5 h-10 w-full text-rose sm:bottom-7 sm:h-14" />
      </header>
    </div>
  );
}
