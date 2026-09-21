import type { CSSProperties } from "react";

/**
 * Traço de batimento: linha que corre reta, dá um pulso (como no eletrocardiograma) e
 * segue reta. É a assinatura visual do site. `pulseAt` posiciona o pulso (0 a 1).
 * `load`: desenha na carga da página. Sem `load`: desenha quando entra na tela.
 */
export function HeartTrace({
  className = "",
  pulseAt = 0.5,
  load = false,
  delay = 0,
  strokeWidth = 1.5,
}: {
  className?: string;
  pulseAt?: number;
  load?: boolean;
  delay?: number;
  strokeWidth?: number;
}) {
  const x = Math.round(Math.min(0.9, Math.max(0.05, pulseAt)) * 1000);
  // P, QRS e T: pequenas ondas antes e depois do pico, com o pico bem marcado
  const d = `M0 60 H${x - 70} q10 -9 20 0 h14 l8 8 l14 -58 l14 78 l10 -28 h22 q16 -17 32 0 H1000`;
  // O IntersectionObserver observa o invólucro; o recorte (revelação) fica no SVG de dentro.
  return (
    <div aria-hidden className={className} data-reveal={load ? undefined : "trace"} style={{ "--d": `${delay}ms` } as CSSProperties}>
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className={`trace block size-full ${load ? "trace-load" : ""}`}>
        <path d={d} strokeWidth={strokeWidth} />
      </svg>
    </div>
  );
}
