import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { HeartTrace } from "./HeartTrace";
import { InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

const legal = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "LGPD", href: "/lgpd" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

/** Rodapé em petróleo profundo, com o logo vertical branco e os três locais de atendimento. */
export function SiteFooter() {
  const c = siteConfig.contact;
  const e = siteConfig.about.expert;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const year = new Date().getFullYear();
  const insta = siteConfig.social.find((s) => s.label === "Instagram");

  return (
    <footer className="on-dark mt-auto px-2 pb-2 sm:px-3 sm:pb-3">
      <div className="relative overflow-hidden rounded-[22px] bg-petrol-deep text-surface sm:rounded-[32px]">
        <HeartTrace pulseAt={0.18} className="h-12 w-full text-rose/70" />
        <div className="mx-auto box-content grid max-w-[1140px] gap-12 px-5 pb-12 pt-8 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.4fr]">
          <div>
            <Link href="/" aria-label={`${siteConfig.name}, página inicial`} className="inline-block rounded-md">
              <Image src="/marca/logo-vertical-branco.svg" alt="" width={2000} height={1321} unoptimized className="h-24 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs text-[0.98rem] leading-relaxed text-surface/78">
              {e.credentials} em Brasília.
              {e.crm ? ` CRM-DF ${e.crm}.` : ""}
              {e.rqe ? ` RQE ${e.rqe}.` : ""}
            </p>
            {insta ? (
              <a href={insta.href} target="_blank" rel="noopener me" className="mt-5 inline-flex min-h-11 items-center gap-2.5 text-surface/85 hover:text-surface">
                <InstagramIcon />
                <span className="link">Instagram</span>
              </a>
            ) : null}
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-serif text-[1.3rem] text-surface">Navegação</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 text-[0.95rem] md:grid-cols-1">
              {siteConfig.nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center text-surface/78 underline-offset-4 hover:text-surface hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/links-uteis" className="inline-flex min-h-10 items-center text-surface/78 underline-offset-4 hover:text-surface hover:underline">
                  Links úteis
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="font-serif text-[1.3rem] text-surface">Agendamento e locais</h2>
            <address className="mt-4 space-y-4 text-[0.95rem] not-italic text-surface/80">
              {wa ? (
                <p className="flex gap-3">
                  <WhatsAppIcon className="mt-0.5 shrink-0 text-rose" />
                  <a href={wa} target="_blank" rel="noopener" className="hover:text-surface hover:underline">
                    WhatsApp {c.whatsappDisplay}
                  </a>
                </p>
              ) : null}
              {c.phone ? (
                <p className="flex gap-3">
                  <PhoneIcon className="mt-0.5 shrink-0 text-rose" />
                  <span>
                    <a href={`tel:${c.phoneHref}`} className="hover:text-surface hover:underline">
                      {c.phone}
                    </a>
                    {c.phone2 ? (
                      <>
                        {" / "}
                        <a href={`tel:${c.phone2Href}`} className="hover:text-surface hover:underline">
                          {c.phone2}
                        </a>
                      </>
                    ) : null}
                  </span>
                </p>
              ) : null}
              {c.places.map((p) => (
                <p key={p.name} className="flex gap-3">
                  <PinIcon className="mt-0.5 shrink-0 text-rose" />
                  <a href={p.mapsUrl} target="_blank" rel="noopener" className="hover:text-surface hover:underline">
                    <span className="text-surface">{p.name}</span>
                    <span className="block text-surface/70">{p.address ? `${p.address}, ${p.region}` : p.region}</span>
                  </a>
                </p>
              ))}
            </address>
          </div>
        </div>
        <div className="border-t border-surface/15">
          <div className="mx-auto box-content flex max-w-[1140px] flex-col gap-5 px-5 py-7 pb-24 text-sm text-surface/68 sm:px-8 sm:pb-7 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © {year} {siteConfig.legalName || siteConfig.name}
            </p>
            <nav aria-label="Documentos legais">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-8 items-center hover:text-surface hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p>
              Desenvolvido por:{" "}
              <a href="https://www.outboxgroup.com.br" target="_blank" rel="noopener" className="text-surface/90 underline decoration-surface/30 underline-offset-4 hover:text-surface hover:decoration-surface">
                OutBox Soluções Digitais
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
