"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Número que cresce do zero até o valor quando entra na tela ("80 a 95%" anima os dois números).
 * No servidor e sem JS, o valor final aparece direto. Respeita prefers-reduced-motion.
 */
export function CountUp({ value, duration = 1800, className = "" }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setProgress(1 - Math.pow(1 - t, 3)); // desacelera no fim
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    // abaixo da dobra: começa do zero e só cresce quando aparecer
    if (el.getBoundingClientRect().top > window.innerHeight) frame = requestAnimationFrame(() => setProgress(0));
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration]);

  const text = value.replace(/\d+/g, (n) => String(Math.round(Number(n) * progress)));
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}
