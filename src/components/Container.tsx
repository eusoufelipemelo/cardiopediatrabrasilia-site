import type { ReactNode } from "react";

/** Coluna do site: o conteúdo nunca passa de 1140px de largura (o recuo lateral fica por fora). */
export function Container({ children, className = "", narrow = false }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return <div className={`mx-auto w-full box-content px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-3xl" : "max-w-[1140px]"} ${className}`}>{children}</div>;
}
