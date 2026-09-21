import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/site.config";
import { CheckIcon } from "./icons";

/**
 * Card de atendimento. `feature`: card grande com foto real (consulta e ecocardiograma).
 * Os demais não têm foto própria: levam o padrão da marca num canto, em vez de imagem inventada.
 */
export function ServiceCard({ service: s, feature = false }: { service: Service; feature?: boolean }) {
  const href = `/servicos#${s.slug}`;
  if (feature && s.image) {
    return (
      <article className="zoom-media group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white sm:flex-row lg:flex-col">
        <div data-reveal="image" className="relative aspect-[4/3] shrink-0 overflow-hidden bg-surface-alt sm:aspect-auto sm:w-[44%] lg:aspect-[16/9] lg:w-full">
          <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 45vw, (min-width: 640px) 44vw, 92vw" className="object-cover" style={{ objectPosition: s.image.position }} />
        </div>
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <p data-reveal="fade" className="text-[0.95rem] font-medium text-rose-text">
            {s.scope}
          </p>
          <h3 data-reveal="fade" className="display mt-2 text-[2rem] text-ink sm:text-[2.2rem]">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {s.title}
            </Link>
          </h3>
          <p data-reveal="fade" className="mt-4 leading-relaxed text-muted">
            {s.description}
          </p>
          <ul className="mt-6 space-y-2.5">
            {s.includes.map((i) => (
              <li key={i} data-reveal="fade" className="flex gap-3 text-[0.97rem] leading-snug text-ink">
                <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-petrol" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[26px] ring-2 ring-transparent transition-shadow duration-300 group-focus-within:ring-brand" />
      </article>
    );
  }

  return (
    <article data-reveal="fade" className="group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-surface-alt p-7 transition-colors duration-500 hover:bg-rose/45 sm:p-8">
      <div aria-hidden className="pattern-rose pointer-events-none absolute -right-8 -top-8 size-40 opacity-40 [mask-image:radial-gradient(circle_at_70%_30%,#000,transparent_70%)]" />
      <p className="relative text-[0.95rem] font-medium text-rose-text">{s.scope}</p>
      <h3 className="display relative mt-2 max-w-[16ch] text-[1.75rem] text-ink">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-[26px] focus-visible:outline-none">
          {s.title}
        </Link>
      </h3>
      <p className="relative mt-4 text-[0.98rem] leading-relaxed text-muted">{s.description}</p>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[26px] ring-2 ring-transparent transition-shadow duration-300 group-focus-within:ring-brand" />
    </article>
  );
}
