"use client";

import { useEffect } from "react";

/**
 * Conta a leitura no OutBox CMS e mantém o sinal de presença: um envio ao abrir e outro a cada
 * minuto enquanto a aba fica visível. O CMS ignora repetições do mesmo visitante por 30 min na
 * contagem de leituras e usa os sinais para o "Leituras ao vivo" do painel.
 */
export function ViewBeacon({ endpoint }: { endpoint: string }) {
  useEffect(() => {
    let alive = true;
    const ping = () => {
      if (!alive || document.visibilityState !== "visible") return;
      fetch(endpoint, { method: "POST", keepalive: true, mode: "cors", cache: "no-store" }).catch(() => {});
    };
    ping();
    const id = setInterval(ping, 60_000);
    document.addEventListener("visibilitychange", ping);
    return () => {
      alive = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", ping);
    };
  }, [endpoint]);
  return null;
}
