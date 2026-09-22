import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { HeartTrace } from "@/components/HeartTrace";
import { ArrowIcon, BookIcon, GlobeIcon, InstagramIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/format";
import { getPosts } from "@/lib/outbox";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Links úteis",
  description: "Agende uma consulta com a Dra. Michelle Sanches, veja os locais de atendimento em Brasília e acesse o blog e o Instagram.",
  path: "/links-uteis",
  image: "/og/links-uteis.jpg",
});

/** Linha de link: ícone, título e apoio; animação de entrada escalonada. */
function LinkRow({ href, icon, title, text, external = true, i }: { href: string; icon: ReactNode; title: string; text?: string; external?: boolean; i: number }) {
  const cls =
    "group flex min-h-[4.5rem] items-center gap-4 rounded-[20px] border border-line bg-surface/90 px-5 py-4 backdrop-blur transition-[border-color,background-color,box-shadow] duration-300 hover:border-rose hover:bg-white hover:shadow-[0_0_0_5px_color-mix(in_srgb,var(--rose)_30%,transparent)]";
  const inner = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-alt text-brand transition-colors duration-300 group-hover:bg-rose group-hover:text-ink">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-[1.3rem] leading-tight text-ink">{title}</span>
        {text ? <span className="mt-0.5 block text-[0.9rem] leading-snug text-muted">{text}</span> : null}
      </span>
      <ArrowIcon width={18} height={18} className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  const style = { animation: `rise-in 0.7s ${300 + i * 70}ms cubic-bezier(0.2,0.75,0.15,1) both` } as CSSProperties;
  return (
    <li style={style}>
      {external ? (
        <a href={href} target="_blank" rel="noopener" className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </li>
  );
}

export default async function LinksPage() {
  const { posts } = await getPosts({ perPage: 3 });
  const c = siteConfig.contact;
  const a = siteConfig.about;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const insta = siteConfig.social.find((s) => s.label === "Instagram");
  let i = 0;

  return (
    <div className="relative min-h-svh overflow-hidden bg-surface-alt">
      <div aria-hidden className="pattern-rose pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto w-full max-w-[480px] px-4 pb-12 pt-4">
        {/* cartão de apresentação */}
        <header className="relative overflow-hidden rounded-[28px] bg-rose px-6 pb-7 pt-8 text-center text-ink">
          <div aria-hidden className="pattern-white absolute inset-0 opacity-[0.07]" />
          <Image src="/marca/logo-horizontal-branco.svg" alt={siteConfig.name} width={7409} height={2000} unoptimized loading="eager" className="relative mx-auto h-14 w-auto" />
          <div className="relative mx-auto mt-6 aspect-square w-52 overflow-hidden rounded-full border-[6px] border-surface bg-surface-alt">
            <Image src="/fotos/estudio-linho.jpg" alt={a.expert.image.alt} fill sizes="(min-width: 480px) 400px, 70vw" loading="eager" className="origin-[50%_12%] scale-[2.15] object-cover object-top" />
          </div>
          <h1 className="display relative mt-5 text-[2.3rem] leading-none">{siteConfig.name}</h1>
          <p className="relative mt-2 text-[0.98rem] font-medium">Cardiologista pediátrica e ecocardiografista pediátrica</p>
          {a.childrenServed ? (
            <p className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-surface/70 px-4 py-1.5 text-[0.9rem]">
              <Image src="/marca/simbolo-rose.svg" alt="" width={20} height={18} unoptimized className="trace-beat h-4 w-auto" />
              <strong className="font-semibold">{a.childrenServed}</strong> crianças atendidas
            </p>
          ) : null}
        </header>

        <HeartTrace load pulseAt={0.5} className="my-2 h-12 w-full text-rose-deep" />

        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener"
            style={{ animation: "rise-in 0.7s 200ms cubic-bezier(0.2,0.75,0.15,1) both" }}
            className="flex min-h-[4.75rem] items-center gap-4 rounded-[22px] bg-brand px-5 text-white transition-[background-color,box-shadow] duration-300 hover:bg-petrol-deep hover:shadow-[0_0_0_6px_color-mix(in_srgb,var(--rose)_45%,transparent)]"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15">
              <WhatsAppIcon width={22} height={22} />
            </span>
            <span className="flex-1">
              <span className="block font-serif text-[1.5rem] leading-tight">Agende sua consulta</span>
              <span className="block text-[0.9rem] text-white/80">WhatsApp {c.whatsappDisplay}</span>
            </span>
            <ArrowIcon width={20} height={20} />
          </a>
        ) : null}

        <h2 className="mt-9 px-1 font-serif text-[1.5rem] text-ink">Onde atendo</h2>
        <ul className="mt-3 space-y-2.5">
          {c.places.map((p) => (
            <LinkRow key={p.name} i={i++} href={p.mapsUrl} icon={<PinIcon />} title={p.name} text={p.address ? `${p.address}, ${p.region}` : `${p.region}, Brasília/DF`} />
          ))}
        </ul>

        <h2 className="mt-9 px-1 font-serif text-[1.5rem] text-ink">Conteúdo</h2>
        <ul className="mt-3 space-y-2.5">
          <LinkRow i={i++} href="/blog" external={false} icon={<BookIcon />} title="Acesse o blog" text="Textos para pais sobre o coração das crianças" />
          {posts.map((post) => (
            <LinkRow key={post.id} i={i++} href={`/blog/${post.slug}`} external={false} icon={<BookIcon />} title={post.title} />
          ))}
          {insta ? <LinkRow i={i++} href={insta.href} icon={<InstagramIcon />} title="Acompanhe no Instagram" text="@micmello" /> : null}
          <LinkRow i={i++} href="/" external={false} icon={<GlobeIcon />} title="Visite o site" text="Atendimentos, condições e perguntas frequentes" />
        </ul>

        <footer className="mt-12 space-y-2 text-center text-[0.85rem] text-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} ·{" "}
            <Link href="/politica-de-privacidade" className="link">
              Privacidade
            </Link>
          </p>
          <p>
            Desenvolvido por:{" "}
            <a href="https://www.outboxgroup.com.br" target="_blank" rel="noopener" className="link">
              OutBox Soluções Digitais
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
