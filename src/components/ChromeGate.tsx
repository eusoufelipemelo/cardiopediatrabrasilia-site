"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Páginas que não levam cabeçalho, rodapé nem botão flutuante (a página de links da bio). */
const BARE = ["/links-uteis"];

/** Esconde o "cromo" do site (cabeçalho, rodapé, WhatsApp fixo) nas páginas de BARE. */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (BARE.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
