import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <Container narrow className="pb-24 pt-40 sm:pb-32 sm:pt-48">
      <p className="text-[1rem] font-medium text-rose-text">Erro 404</p>
      <h1 className="mt-3 display text-[2.6rem] text-ink sm:text-[3.4rem]">Esta página não existe ou mudou de endereço</h1>
      <p className="mt-5 text-lg text-muted">Confira o endereço digitado ou siga por um dos caminhos abaixo.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Ir para o início
        </Link>
        <Link href="/blog" className="btn btn-secondary">
          Ver o blog
        </Link>
      </div>
    </Container>
  );
}
