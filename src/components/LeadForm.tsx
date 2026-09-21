"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/format";
import { WhatsAppIcon } from "./icons";

/** Motivos da consulta: sinais de alerta e situações citados pela médica nos artigos. */
const REASONS = [
  "Encaminhamento do pediatra",
  "Sopro ou alteração em exame",
  "Cansaço ou falta de ar",
  "Desmaio ou tontura",
  "Palpitações",
  "Dor no peito",
  "Síndrome de Down ou outra síndrome",
  "Doença cardíaca na família",
  "Check-up para esporte",
  "Risco cirúrgico",
];
const AGES = ["Recém-nascido (até 28 dias)", "Bebê (até 1 ano)", "De 1 a 5 anos", "De 6 a 11 anos", "Adolescente (12 anos ou mais)"];
const SERVICES = ["Consulta", "Ecocardiograma", "Consulta e ecocardiograma", "Ainda não sei"];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Pedido de agendamento: monta uma mensagem organizada e abre o WhatsApp da Dra. Michelle.
 * Os dados não ficam guardados no site (ver Política de Privacidade).
 */
export function LeadForm({ whatsapp, places }: { whatsapp: string; places: string[] }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const field =
    "mt-2 w-full min-h-[3.4rem] rounded-[14px] border border-line bg-white px-4 py-3 text-[1rem] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/75 focus:border-brand focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--rose)_40%,transparent)]";
  const selectField = `${field} appearance-none bg-[url('/ui/chevron.svg')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`;
  const label = "block text-[0.95rem] font-medium text-ink";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("nome") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    if (!name) return setError("Informe o nome do responsável.");
    if (digits.length < 10) return setError("Informe um WhatsApp com DDD, por exemplo (61) 99999-9999.");
    if (!f.get("consentimento")) return setError("Para enviar, confirme que leu a Política de Privacidade.");
    setError(null);
    const reasons = f.getAll("motivos").map(String);
    const lines = [
      "Olá! Gostaria de agendar um atendimento com a Dra. Michelle Sanches.",
      "",
      `*Responsável:* ${name}`,
      `*WhatsApp:* ${phone}`,
      String(f.get("crianca") ?? "").trim() ? `*Criança:* ${String(f.get("crianca")).trim()}` : "",
      f.get("idade") ? `*Idade:* ${f.get("idade")}` : "",
      f.get("local") ? `*Local de preferência:* ${f.get("local")}` : "",
      reasons.length ? `*Motivo:* ${reasons.join(", ")}` : "",
      f.get("atendimento") ? `*Atendimento:* ${f.get("atendimento")}` : "",
      String(f.get("mensagem") ?? "").trim() ? `*Mensagem:* ${String(f.get("mensagem")).trim()}` : "",
    ].filter((l, i) => l !== "" || i === 1);
    const url = whatsappUrl(whatsapp, lines.join("\n"));
    if (!url) return;
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  }

  if (sentUrl) {
    return (
      <div role="status" className="py-8">
        <p className="display text-[2.2rem] text-ink">Pronto, sua mensagem está no WhatsApp.</p>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Confira os dados e toque em enviar na conversa. Se o WhatsApp não abriu,{" "}
          <a href={sentUrl} target="_blank" rel="noopener" className="link font-semibold text-brand">
            abra a conversa por aqui
          </a>
          .
        </p>
        <button type="button" onClick={() => setSentUrl(null)} className="link mt-6 min-h-11 cursor-pointer text-[0.95rem] text-muted">
          Preencher de novo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Nome do responsável *</span>
        <input name="nome" required autoComplete="name" className={field} placeholder="Seu nome" />
      </label>
      <label className="block">
        <span className={label}>WhatsApp *</span>
        <input
          name="whatsapp"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          className={field}
          placeholder="(61) 99999-9999"
        />
      </label>
      <label className="block">
        <span className={label}>Nome da criança</span>
        <input name="crianca" autoComplete="off" className={field} placeholder="Opcional" />
      </label>
      <label className="block">
        <span className={label}>Idade da criança</span>
        <select name="idade" className={selectField} defaultValue="">
          <option value="" disabled>
            Escolha a faixa
          </option>
          {AGES.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>

      <fieldset className="sm:col-span-2">
        <legend className={label}>Motivo da consulta</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {REASONS.map((r) => (
            <label key={r} className="cursor-pointer">
              <input type="checkbox" name="motivos" value={r} className="chip-input sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-[0.95rem] text-ink transition-colors duration-200 hover:border-brand">
                {r}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className={label}>Local de preferência</span>
        <select name="local" className={selectField} defaultValue="">
          <option value="" disabled>
            Onde prefere ser atendido
          </option>
          {places.map((p) => (
            <option key={p}>{p}</option>
          ))}
          <option>Qualquer um dos locais</option>
        </select>
      </label>
      <label className="block">
        <span className={label}>Atendimento</span>
        <select name="atendimento" className={selectField} defaultValue="">
          <option value="" disabled>
            Consulta, exame ou os dois
          </option>
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className={label}>Quer contar mais alguma coisa?</span>
        <textarea name="mensagem" rows={4} className={`${field} resize-none`} placeholder="O que motivou a consulta, exames que a criança já fez, melhor período para vocês..." />
      </label>

      <label className="flex gap-3 text-[0.95rem] leading-relaxed text-muted sm:col-span-2">
        <input type="checkbox" name="consentimento" className="mt-1 size-5 shrink-0 cursor-pointer accent-[var(--brand)]" />
        <span>
          Li a{" "}
          <Link href="/politica-de-privacidade" className="link font-medium text-ink">
            Política de Privacidade
          </Link>{" "}
          e concordo em enviar esses dados, inclusive informações de saúde da criança, à Dra. Michelle Sanches pelo WhatsApp para agendar o atendimento.
        </span>
      </label>

      {error ? (
        <p role="alert" className="text-[0.95rem] font-medium text-[#8E3B35] sm:col-span-2">
          {error}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full cursor-pointer sm:w-auto">
          <WhatsAppIcon />
          Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  );
}
