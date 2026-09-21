import { permanentRedirect } from "next/navigation";

/** Endereço de artigo do site anterior (GreatPages): leva ao conteúdo equivalente no site novo. */
export default function OldArticle() {
  permanentRedirect("/condicoes/desmaio");
}
