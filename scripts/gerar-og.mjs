/**
 * Gera as imagens de compartilhamento (1200x630): logo branco da marca, uma frase em EB Garamond
 * e uma foto real da Dra. Michelle. Renderiza com o Chrome instalado (playwright-core).
 *
 * Uso: npm i -D playwright-core && node scripts/gerar-og.mjs   (com `npm run dev` rodando na 3107)
 * Saída: public/og/*.jpg
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3107";
const OUT = path.resolve(process.argv[2] ?? "public/og");

const CONDICOES = [
  ["cardiopatias-congenitas", "Cardiopatias congênitas na infância"],
  ["sindrome-de-down", "Síndrome de Down e o coração"],
  ["desmaio", "Desmaio na infância: quando investigar"],
  ["arritmias", "Arritmias e palpitações na criança"],
  ["doencas-adquiridas", "Doenças cardíacas adquiridas na infância"],
  ["insuficiencia-cardiaca", "Insuficiência cardíaca na criança"],
];

// [arquivo, foto, posição da foto, frase, fundo do painel]
const CARDS = [
  ["padrao", "/fotos/ecocardiografo-desktop.jpg", "30% 40%", "Cardiologista pediátrica em Brasília", "#D8A4A0"],
  ["servicos", "/fotos/ecocardiografo-equipamento.jpg", "50% 30%", "Consulta e ecocardiograma infantil em Brasília", "#3A5150"],
  ["condicoes", "/fotos/ecocardiografo-desktop.jpg", "90% 25%", "O que a cardiologista pediátrica acompanha", "#658383"],
  ["sobre", "/fotos/dra-michelle-rosto.jpg", "50% 30%", "Cardiologista pediátrica, ecocardiografista e mãe", "#D8A4A0"],
  ["contato", "/fotos/ecocardiografo-desktop.jpg", "30% 40%", "Agende em Taguatinga, Águas Claras ou Asa Norte", "#3A5150"],
  ["links-uteis", "/fotos/dra-michelle-rosto.jpg", "50% 30%", "Agendamento, locais de atendimento e blog", "#D8A4A0"],
  ...CONDICOES.map(([slug, frase], i) => [`condicao-${slug}`, i % 2 ? "/fotos/ecocardiografo-equipamento.jpg" : "/fotos/ecocardiografo-desktop.jpg", i % 2 ? "50% 30%" : "88% 25%", frase, i % 2 ? "#3A5150" : "#658383"]),
];

const html = (photo, pos, phrase, bg) => `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&family=Montserrat:wght@500&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;display:flex;background:${bg};font-family:Montserrat,sans-serif;overflow:hidden}
.panel{position:relative;width:640px;padding:64px 60px;display:flex;flex-direction:column;justify-content:space-between;color:${bg === "#D8A4A0" ? "#2B3D3C" : "#fff"}}
.panel:before{content:"";position:absolute;inset:0;background:url(${BASE}/marca/padrao-branco.svg) 0 0/120px;opacity:.14}
.logo{position:relative;height:84px;width:auto;align-self:flex-start}
h1{position:relative;font-family:'EB Garamond',serif;font-weight:500;font-size:62px;line-height:1.05;letter-spacing:-.5px}
p{position:relative;font-size:22px;opacity:.85;margin-top:18px}
.trace{position:absolute;left:0;right:0;bottom:120px;height:60px}
.photo{flex:1;background:url(${BASE}${photo}) ${pos}/cover no-repeat;border-radius:36px 0 0 36px}
</style></head><body>
<div class="panel"><img class="logo" src="${BASE}/marca/logo-horizontal-branco.svg">
<div><h1>${phrase}</h1><p>Dra. Michelle Sanches · cardiopediatrabrasilia.com.br</p></div></div>
<div class="photo"></div></body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [name, photo, pos, phrase, bg] of CARDS) {
  await page.setContent(html(photo, pos, phrase, bg), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 84 });
  console.log(name);
}
await browser.close();
