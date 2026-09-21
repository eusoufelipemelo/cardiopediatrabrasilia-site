import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { SplitTitle } from "@/components/SplitTitle";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Agendar consulta com cardiologista pediátrica em Brasília",
  description: "Agende consulta ou ecocardiograma infantil com a Dra. Michelle Sanches pelo WhatsApp. Atendimento em Taguatinga Norte, Águas Claras e Asa Norte.",
  path: "/contato",
  image: "/og/contato.jpg",
});

export default function ContactPage() {
  const c = siteConfig.contact;
  return (
    <>
      <PageHeader
        title="Agende uma consulta"
        intro={`O agendamento é pelo WhatsApp ${c.whatsappDisplay}. Conte a idade da criança e o motivo da consulta, e escolha o local mais perto de vocês.`}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
        position="30% 35%"
      />

      <div className="pt-2 sm:pt-3">
        <LeadSection id="formulario" />
      </div>

      <section aria-labelledby="locais" className="py-20 sm:py-28">
        <Container>
          <SplitTitle id="locais" text="Locais de atendimento" className="display text-[2.4rem] text-ink sm:text-[3.3rem]" />
          <p data-reveal="fade" className="mt-5 max-w-[60ch] leading-relaxed text-muted">
            Toque em um local para ver no mapa. O link leva direto para a rota no Google Maps.
          </p>
          <div className="mt-12">
            <ServiceAreaMap places={c.places} whatsapp={c.whatsapp} />
          </div>
        </Container>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contato"),
          about: { "@id": organizationId() },
          mainEntity: {
            "@id": organizationId(),
            contactPoint: [
              { "@type": "ContactPoint", contactType: "Agendamento", telephone: `+${c.whatsapp}`, availableLanguage: "Portuguese" },
              { "@type": "ContactPoint", contactType: "Consultório", telephone: c.phoneHref, availableLanguage: "Portuguese" },
            ],
            location: c.places.map((p) => ({
              "@type": "Place",
              name: p.name,
              address: { "@type": "PostalAddress", streetAddress: p.address || undefined, addressLocality: p.region, addressRegion: "DF", addressCountry: "BR" },
              geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng },
              hasMap: p.mapsUrl,
            })),
          },
        }}
      />
    </>
  );
}
