import { siteConfig } from "@/site.config";
import { PlusIcon } from "./icons";
import { JsonLd } from "./JsonLd";

/** Perguntas frequentes do site.config.ts, com FAQPage em JSON-LD. */
export function Faq({ jsonLd = true }: { jsonLd?: boolean }) {
  const items = siteConfig.faq;
  return (
    <>
      <div className="border-t border-line">
        {items.map((f) => (
          <details key={f.q} className="faq-item border-b border-line">
            <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-left font-serif text-[1.35rem] leading-snug text-ink sm:text-[1.6rem]">
              {f.q}
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-alt text-ink"><PlusIcon className="faq-icon" width={20} height={20} /></span>
            </summary>
            <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      {jsonLd ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      ) : null}
    </>
  );
}
