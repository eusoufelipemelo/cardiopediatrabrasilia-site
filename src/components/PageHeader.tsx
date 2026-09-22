import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { HeartTrace } from "./HeartTrace";
import { SplitTitle } from "./SplitTitle";

export type HeaderImage = {
  src: string;
  alt: string;
  /** object-position da foto. */
  position?: string;
  /** Retrato de estúdio (fundo liso): encaixa inteiro, alinhado embaixo. */
  portrait?: boolean;
};

/** Foto padrão do topo das páginas internas (ex.: blog). */
const DEFAULT_IMAGE: HeaderImage = { src: "/fotos/estudio-salvia.jpg", alt: "Retrato da Dra. Michelle Sanches, sorrindo", portrait: true };

/**
 * Topo das páginas internas, na altura da tela: texto sobre o linho de um lado e uma foto real
 * da médica do outro, cada página com o seu enquadramento. Sem véu sobre a foto. O traço de
 * batimento corre na base. No celular, a foto vem primeiro e o texto logo abaixo.
 */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  image?: HeaderImage;
}) {
  return (
    <div className="p-2 sm:p-3">
      <header
        data-hero="light"
        className="relative isolate grid overflow-hidden rounded-[22px] bg-surface-alt p-2 sm:rounded-[32px] sm:p-3 lg:min-h-[calc(100svh-1.5rem)] lg:grid-cols-12 lg:p-0"
      >
        <div className="relative h-[46svh] overflow-hidden rounded-[18px] sm:h-[54svh] sm:rounded-[26px] lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:h-auto lg:rounded-none">
          <div className="hero-media absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={image.portrait ? "object-cover object-[50%_20%]" : "object-cover"}
              style={image.position ? { objectPosition: image.position } : undefined}
            />
          </div>
          {/* no computador, a foto se funde de leve ao painel de linho */}
          <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(to_right,var(--surface-alt),transparent_18%)] lg:block" />
        </div>

        <div className="relative flex flex-col justify-center px-3 pb-24 pt-9 sm:px-8 sm:pb-28 lg:col-span-6 lg:row-start-1 lg:pb-32 lg:pl-[max(3.5rem,calc((100vw-1140px)/2-0.75rem))] lg:pr-10 lg:pt-36">
          <div data-reveal="fade">
            <Breadcrumbs items={crumbs} />
          </div>
          <SplitTitle as="h1" text={title} className="display mt-5 max-w-[14ch] text-[2.8rem] text-ink sm:text-[4rem] xl:text-[4.8rem]" />
          {intro ? (
            <p data-reveal="fade" style={{ "--d": "250ms" } as CSSProperties} className="mt-6 max-w-[48ch] text-[1.08rem] leading-relaxed text-muted">
              {intro}
            </p>
          ) : null}
          {children}
        </div>

        <HeartTrace load pulseAt={0.3} className="pointer-events-none absolute inset-x-0 bottom-6 h-12 w-full text-rose-deep sm:bottom-9 sm:h-14" />
      </header>
    </div>
  );
}
