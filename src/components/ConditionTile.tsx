import Link from "next/link";
import type { Condition } from "@/content/condicoes";
import { ArrowIcon } from "./icons";

/**
 * Bloco de uma condição acompanhada (o "portfólio" do consultório). Sem foto: o
 * consultório não tem foto por condição, e foto de banco está fora de questão.
 * No hover, o fundo ganha o rosé da marca e o traço do título se estende.
 */
export function ConditionTile({ condition: c }: { condition: Condition }) {
  return (
    <article className="group relative flex h-full min-h-[260px] flex-col rounded-[24px] border border-line bg-surface p-7 transition-colors duration-500 hover:border-rose hover:bg-[color-mix(in_srgb,var(--rose)_22%,var(--surface))] sm:p-8">
      <span aria-hidden className="block h-[2px] w-10 rounded-full bg-rose transition-[width] duration-500 group-hover:w-20" />
      <h3 className="display mt-6 text-[1.9rem] leading-[1.08] text-ink">
        <Link href={`/condicoes/${c.slug}`} className="after:absolute after:inset-0 after:rounded-[24px] focus-visible:outline-none">
          {c.title}
        </Link>
      </h3>
      <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{c.summary}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.95rem] font-semibold text-brand">
        Entender melhor
        <ArrowIcon width={17} height={17} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px] ring-2 ring-transparent group-focus-within:ring-brand" />
    </article>
  );
}
