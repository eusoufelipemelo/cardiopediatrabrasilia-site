"use client";

import { useEffect, useRef, useState } from "react";

export type Step = { title: string; text: string };

/**
 * Linha do tempo da consulta ligada à rolagem: o traço rosé desce pela linha conforme a
 * página rola e cada etapa "bate" (o marcador pulsa) quando o traço chega nela.
 * Sem JS, todas as etapas aparecem acesas.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(1);
  const [reached, setReached] = useState(steps.length - 1);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.62; // ponto da tela que "desenha" a linha
      setProgress(Math.min(1, Math.max(0, (anchor - rect.top) / rect.height)));
      let last = -1;
      list.querySelectorAll<HTMLElement>("[data-node]").forEach((n, i) => {
        if (n.getBoundingClientRect().top + 10 <= anchor) last = i;
      });
      setReached(last);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={ref} className="relative">
      {/* trilho e preenchimento */}
      <span aria-hidden className="absolute bottom-3 left-[21px] top-3 w-px bg-line" />
      <span aria-hidden className="absolute left-[20px] top-3 w-[3px] origin-top rounded-full bg-rose" style={{ height: `calc(${progress * 100}% - 1.5rem)` }} />

      {steps.map((s, i) => {
        const on = i <= reached;
        return (
          <li key={s.title} className="relative grid grid-cols-[44px_1fr] gap-x-6 pb-14 last:pb-0 sm:gap-x-8 sm:pb-20">
            <span
              data-node
              aria-hidden
              className={`relative z-10 grid size-11 place-items-center rounded-full border font-serif text-[1.2rem] transition-[background-color,border-color,color,box-shadow] duration-700 ${
                on ? "border-rose bg-rose text-ink shadow-[0_0_0_7px_color-mix(in_srgb,var(--rose)_30%,transparent)]" : "border-line bg-surface text-muted"
              }`}
            >
              {i + 1}
            </span>
            <div className={`pt-1 transition-opacity duration-700 ${on ? "opacity-100" : "opacity-45"}`}>
              <h3 className="display text-[1.8rem] leading-tight text-ink sm:text-[2.2rem]">{s.title}</h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-muted">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
