import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { WhatsAppIcon } from "./icons";

/** Botão fixo de WhatsApp (canto inferior direito), em petróleo, com halo rosé no hover. Some quando o número está vazio. */
export function WhatsAppFloat() {
  const href = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Agendar consulta pelo WhatsApp"
      className="fixed bottom-4 right-4 z-30 grid size-14 place-items-center rounded-full bg-brand text-white shadow-[0_12px_30px_-10px_rgb(43_61_60/0.6)] transition-[background-color,box-shadow] duration-300 hover:bg-petrol-deep hover:shadow-[0_0_0_6px_rgb(216_164_160/0.5)] sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
