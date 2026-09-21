import Image from "next/image";
import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { Container } from "./Container";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { LeadForm } from "./LeadForm";
import { SplitTitle } from "./SplitTitle";

/**
 * Agendamento: painel rosé com os canais diretos e o símbolo da marca, e o formulário num
 * cartão branco ao lado. O formulário só monta a mensagem e abre o WhatsApp.
 */
export function LeadSection({ id = "agendar" }: { id?: string }) {
  const c = siteConfig.contact;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const main = c.places[0];

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-24 px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="overflow-hidden rounded-[22px] bg-rose sm:rounded-[32px]">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
          <div className="relative text-ink lg:col-span-4">
            <SplitTitle id={`${id}-titulo`} text="Vamos marcar a consulta?" className="display text-[2.5rem] sm:text-[3.3rem]" />
            <p data-reveal="fade" className="mt-5 max-w-[42ch] leading-relaxed">
              Preencha o que souber. O site monta a mensagem e abre o WhatsApp {c.whatsappDisplay} com tudo escrito. Nenhum dado fica guardado aqui.
            </p>
            <ul data-reveal="fade" className="mt-10 space-y-5">
              {wa ? (
                <li className="flex gap-3.5">
                  <WhatsAppIcon className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-[0.9rem]">WhatsApp para agendamento</span>
                    <a href={wa} target="_blank" rel="noopener" className="link text-[1.15rem] font-semibold">
                      {c.whatsappDisplay}
                    </a>
                  </span>
                </li>
              ) : null}
              {c.phone ? (
                <li className="flex gap-3.5">
                  <PhoneIcon className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-[0.9rem]">Consultório em Taguatinga</span>
                    <a href={`tel:${c.phoneHref}`} className="link text-[1.05rem] font-semibold">
                      {c.phone}
                    </a>
                    {c.phone2 ? (
                      <>
                        {" ou "}
                        <a href={`tel:${c.phone2Href}`} className="link text-[1.05rem] font-semibold">
                          {c.phone2}
                        </a>
                      </>
                    ) : null}
                  </span>
                </li>
              ) : null}
              <li className="flex gap-3.5">
                <PinIcon className="mt-0.5 shrink-0" />
                <span>
                  <span className="block text-[0.9rem]">{main.name}</span>
                  <a href={main.mapsUrl} target="_blank" rel="noopener" className="link text-[1.05rem] font-semibold leading-snug">
                    {main.address}, {main.region}
                  </a>
                </span>
              </li>
            </ul>
            <Image src="/marca/simbolo-branco.svg" alt="" width={200} height={176} unoptimized className="mt-12 hidden h-auto w-40 opacity-70 lg:block" />
          </div>

          <div data-reveal="fade" className="rounded-[24px] bg-surface p-6 sm:p-10 lg:col-span-8">
            <LeadForm whatsapp={c.whatsapp} places={c.places.map((p) => p.short)} />
          </div>
        </Container>
      </div>
    </section>
  );
}
