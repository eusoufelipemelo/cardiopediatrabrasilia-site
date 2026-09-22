"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "@/site.config";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Rotas sem foto no topo (artigo do blog): barra sempre sólida e no fluxo da página. */
function hasSolidTop(pathname: string) {
  return /^\/blog\/[^/]+/.test(pathname);
}

/**
 * Cabeçalho em barra flutuante, com cantos arredondados e recuo das bordas.
 * Os topos são claros em todas as páginas, então a barra usa o logo rosé e texto escuro.
 * Ao rolar, vira uma barra de linho translúcido. No celular, abre um menu de tela cheia.
 */
export function SiteNav({ links, whatsappHref, ctaLabel }: { links: NavLink[]; whatsappHref: string | null; ctaLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // fecha o menu ao trocar de página
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open]);

  const solidRoute = hasSolidTop(pathname);
  const solid = solidRoute || scrolled || open;
  // Todos os topos são claros (linho e foto sem véu): logo rosé e texto escuro sempre.
  const light = false;

  return (
    <>
      <header className={`${solidRoute ? "sticky" : "fixed"} inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4`}>
        <div
          className={`mx-auto flex max-w-[1204px] items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow,border-color] duration-500 sm:pl-7 lg:pl-8 ${
            solid
              ? "border border-line/80 bg-surface/88 shadow-[0_14px_34px_-22px_rgb(43_61_60/0.5)] backdrop-blur-md"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Logo light={light} className="h-11 w-auto sm:h-12" />

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center">
              {links.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[0.93rem] transition-colors duration-300 2xl:px-4 ${
                        light ? "text-white/85 hover:text-white" : "text-muted hover:text-ink"
                      } ${active ? (light ? "text-white" : "text-ink") : ""}`}
                    >
                      {l.label}
                      {/* ponto rosé sob o item atual */}
                      <span
                        aria-hidden
                        className={`absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-rose transition-transform duration-500 ${active ? "scale-100" : "scale-0"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                className={`btn hidden min-h-11 px-5 text-[0.93rem] sm:inline-flex ${light ? "btn-inverse" : "btn-primary"}`}
              >
                <WhatsAppIcon />
                {ctaLabel}
              </a>
            ) : null}
            <button
              type="button"
              className={`inline-grid size-11 cursor-pointer place-items-center rounded-full transition-colors xl:hidden ${light ? "text-white" : "text-ink"}`}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header> de propósito: o backdrop-filter da barra criaria um bloco de contenção
          e este menu, que é "fixed", ficaria com a altura do cabeçalho. */}
      <div id="menu-mobile" hidden={!open} data-lenis-prevent className="fixed inset-0 z-30 overflow-y-auto bg-surface xl:hidden">
        <div aria-hidden className="pattern-rose pointer-events-none absolute -right-10 bottom-0 h-72 w-72 opacity-[0.08] [mask-image:radial-gradient(circle_at_70%_70%,#000,transparent_70%)]" />
        <nav aria-label="Principal (celular)" className="relative mx-auto flex min-h-full max-w-[1140px] flex-col px-5 pb-8 pt-28 sm:px-8">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-line" style={{ animation: `rise-in 0.6s ${i * 50}ms cubic-bezier(0.2,0.75,0.15,1) both` }}>
                <Link
                  href={l.href}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className="display flex min-h-[4rem] items-center justify-between text-[2rem] text-ink aria-[current=page]:text-rose-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-primary mt-auto w-full">
              <WhatsAppIcon />
              Agendar pelo WhatsApp
            </a>
          ) : null}
        </nav>
      </div>
    </>
  );
}
