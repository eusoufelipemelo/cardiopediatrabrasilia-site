import { permanentRedirect } from "next/navigation";

/** Endereço do artigo no site anterior (GreatPages): o mesmo artigo agora vive no blog, publicado pelo OutBox CMS. */
export default function OldArticle() {
  permanentRedirect("/blog/desmaio-em-criancas-8-pontos-que-voce-precisa-saber");
}
