"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap, Marker, Popup } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/format";
import type { Place } from "@/site.config";
import { PinIcon } from "./icons";

/**
 * Mapa dos locais de atendimento (MapLibre + mapa base OpenFreeMap, sem chave de API).
 * Carrega só quando a seção chega perto da tela. A lista ao lado leva o mapa até cada local,
 * e o marcador abre um convite para agendar naquele endereço pelo WhatsApp.
 */
export function ServiceAreaMap({ places, whatsapp }: { places: Place[]; whatsapp: string }) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markers = useRef<{ marker: Marker; popup: Popup; el: HTMLElement }[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !box.current) return;
        maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        const map = new maplibregl.Map({
          container: box.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: [-47.98, -15.8],
          zoom: 10.5,
          minZoom: 8,
          maxZoom: 16,
          scrollZoom: false,
          cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
          attributionControl: { compact: true },
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        mapRef.current = map;
        markers.current = places.map((p, i) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.setAttribute("aria-label", p.name);
          dot.className = "place-dot";
          const popupEl = document.createElement("div");
          const title = document.createElement("p");
          title.className = "place-popup-title";
          title.textContent = p.name;
          const link = document.createElement("a");
          link.href = whatsappUrl(whatsapp, `Olá! Gostaria de agendar uma consulta com a Dra. Michelle Sanches em ${p.short}.`) ?? "#";
          link.target = "_blank";
          link.rel = "noopener";
          link.className = "place-popup-link";
          link.textContent = "Agendar neste local";
          popupEl.append(title, link);
          const popup = new maplibregl.Popup({ offset: 20, closeButton: false }).setDOMContent(popupEl);
          const marker = new maplibregl.Marker({ element: dot }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(map);
          dot.addEventListener("click", () => setActive(i));
          return { marker, popup, el: dot };
        });
        // "load" pode já ter acontecido antes deste ponto; "idle" garante o aviso saindo da tela.
        map.once("idle", () => setReady(true));
        map.on("load", () => {
          setReady(true);
          const bounds = new maplibregl.LngLatBounds();
          places.forEach((p) => bounds.extend([p.lng, p.lat]));
          map.fitBounds(bounds, { padding: 80, duration: 0 });
        });
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [places, whatsapp]);

  useEffect(() => {
    markers.current.forEach((m, i) => m.el.classList.toggle("is-active", i === active));
  }, [active]);

  function focus(i: number) {
    setActive(i);
    const map = mapRef.current;
    const m = markers.current[i];
    if (!map || !m) return;
    markers.current.forEach((o) => o.popup.isOpen() && o.popup.remove());
    map.flyTo({ center: [places[i].lng, places[i].lat], zoom: 14.5, speed: 0.9, curve: 1.4, essential: true });
    m.marker.togglePopup();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <ul className="order-2 grid gap-3 self-start lg:order-1">
        {places.map((p, i) => (
          <li key={p.name}>
            <div
              className={`rounded-[22px] border p-6 transition-colors duration-300 ${active === i ? "border-rose bg-[color-mix(in_srgb,var(--rose)_20%,var(--surface))]" : "border-line bg-surface"}`}
            >
              <button
                type="button"
                onClick={() => focus(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={active === i}
                className="flex w-full cursor-pointer items-start gap-4 text-left"
              >
                <PinIcon className={`mt-1 shrink-0 transition-colors ${active === i ? "text-rose-deep" : "text-muted"}`} />
                <span>
                  <span className="block font-serif text-[1.5rem] leading-tight text-ink">{p.name}</span>
                  <span className="mt-1 block text-[0.95rem] text-muted">{p.address ? `${p.address}, ${p.region}` : p.region}</span>
                  {p.phones.length ? <span className="mt-1 block text-[0.95rem] text-muted">Telefone {p.phones.join(" ou ")}</span> : null}
                </span>
              </button>
              <a href={p.mapsUrl} target="_blank" rel="noopener" className="link ml-10 mt-3 inline-flex min-h-10 items-center text-[0.95rem] font-semibold text-brand">
                Como chegar pelo Google Maps
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="relative order-1 lg:order-2">
        <div
          ref={box}
          data-lenis-prevent
          className="map-canvas h-[360px] w-full overflow-hidden rounded-[26px] bg-surface-alt sm:h-[460px] lg:h-full lg:min-h-[520px]"
          aria-label="Mapa com os locais de atendimento da Dra. Michelle Sanches"
          role="region"
        />
        {!ready ? <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-muted">Carregando o mapa…</p> : null}
      </div>
    </div>
  );
}
