import { EB_Garamond, Montserrat } from "next/font/google";

/**
 * IDENTIDADE DO CLIENTE: Dra. Michelle Sanches, cardiologista pediátrica, Brasília/DF.
 *
 * Fonte dos textos: o site anterior (cardiopediatrabrasilia.com.br, home e página de links)
 * e os três artigos publicados nele, salvos em "05 - Referência/site-atual".
 * Nada aqui é inventado: o que a cliente não informou (CRM, RQE, e-mail, horários, convênios)
 * fica vazio e some da tela. As condições acompanhadas ficam em src/content/condicoes.ts.
 */

// ---------------------------------------------------------------------------
// Tipografia do manual da marca: EB Garamond nos títulos, Montserrat no texto.
// Os argumentos precisam ser literais (regra do next/font). Mantenha as `variable`.
// ---------------------------------------------------------------------------
export const brandFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

export const displayFont = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export type NavLink = { label: string; href: string };
export type Service = {
  slug: string;
  title: string;
  /** Uma linha: para quem é. */
  scope: string;
  description: string;
  includes: string[];
  /** Foto real (só existem duas; os outros atendimentos usam o padrão da marca). */
  image?: { src: string; alt: string; position?: string };
};
export type Place = {
  name: string;
  /** Nome curto para listas e formulário. */
  short: string;
  address: string;
  region: string;
  lat: number;
  lng: number;
  /** Link do Google Maps usado no site anterior. */
  mapsUrl: string;
  phones: string[];
};

export const siteConfig = {
  /** Nome público. */
  name: "Dra. Michelle Sanches",
  /** Razão social: não informada (sem CNPJ confirmado, não aparece). */
  legalName: "",
  /** Frase da marca (site anterior). */
  tagline: "Cuide com muito amor do coração do seu filho.",
  /** Descrição padrão das páginas (150–160 caracteres). */
  description:
    "Cardiologista pediátrica e ecocardiografista pediátrica em Brasília. Consulta e ecocardiograma infantil em Taguatinga, Águas Claras e Asa Norte.",
  /** Domínio de produção, com www e sem barra no fim. A variável SITE_URL tem prioridade. */
  url: "https://www.cardiopediatrabrasilia.com.br",
  locale: "pt_BR",
  language: "pt-BR",

  /** Logo original da marca (SVG do manual), rosé para fundo claro e branco para foto. */
  logo: { src: "/marca/logo-horizontal-rose.svg", width: 7409, height: 2000 },
  logoLight: { src: "/marca/logo-horizontal-branco.svg", width: 7409, height: 2000 },
  /** Imagem de compartilhamento (1200x630) com o logo e foto real da médica. */
  ogImage: "/og/padrao.jpg",

  /** Médica: Physician no schema.org (subtipo de LocalBusiness, leva endereço). */
  schemaType: "Physician",

  nav: [
    { label: "Início", href: "/" },
    { label: "Atendimentos", href: "/servicos" },
    { label: "O que acompanho", href: "/condicoes" },
    { label: "Sobre", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ] satisfies NavLink[],

  contact: {
    /** Só números, com DDI e DDD (destino do wa.link do site anterior). */
    whatsapp: "5561996098418",
    whatsappMessage: "Olá, vim através do site da Dra. Michelle Sanches e gostaria de agendar uma consulta!",
    whatsappDisplay: "(61) 99609-8418",
    /** Telefones fixos do consultório em Taguatinga (rodapé do site anterior). */
    phone: "(61) 3351-8393",
    phoneHref: "+556133518393",
    phone2: "(61) 3966-3788",
    phone2Href: "+556139663788",
    /** Não informado: fica vazio e some da tela. */
    email: "",
    /** Consultório principal (Cárddio, no Centro de Excelência Anchieta). */
    address: {
      street: "Centro de Excelência Anchieta, 8º andar, salas 816 a 827",
      neighborhood: "Taguatinga Norte",
      city: "Brasília",
      state: "DF",
      postalCode: "",
      country: "BR",
    },
    mapsUrl: "https://maps.app.goo.gl/DdLLrrMvpHcKypycA",
    /** Não informado: fica vazio e some da tela. */
    hours: "",
    openingHoursSpec: [] as string[],
    areaServed: "Brasília e Distrito Federal",
    /** Locais de atendimento (página de links do site anterior). */
    places: [
      {
        name: "Cárddio",
        short: "Taguatinga Norte (Cárddio)",
        address: "Centro de Excelência Anchieta, 8º andar, salas 816 a 827",
        region: "Taguatinga Norte",
        lat: -15.8238122,
        lng: -48.066908,
        mapsUrl: "https://maps.app.goo.gl/DdLLrrMvpHcKypycA",
        phones: ["(61) 3351-8393", "(61) 3966-3788"],
      },
      {
        name: "Hospital Brasília Águas Claras",
        short: "Águas Claras (Hospital Brasília)",
        address: "",
        region: "Águas Claras",
        lat: -15.8459159,
        lng: -48.0310707,
        mapsUrl: "https://maps.app.goo.gl/tX96CvJ72dRbGtG86",
        phones: [],
      },
      {
        name: "Hospital Santa Helena",
        short: "Asa Norte (Hospital Santa Helena)",
        address: "",
        region: "Asa Norte",
        lat: -15.735766,
        lng: -47.8969105,
        mapsUrl: "https://maps.app.goo.gl/GX2XqzLUuUpGH3QC6",
        phones: [],
      },
    ] satisfies Place[],
  },

  /** Perfis oficiais (entram no JSON-LD como sameAs). */
  social: [{ label: "Instagram", href: "https://www.instagram.com/micmello/" }] satisfies NavLink[],

  /** Atendimentos (áreas de atuação descritas nos artigos da médica). */
  services: [
    {
      slug: "consulta",
      title: "Consulta de cardiologia pediátrica",
      scope: "Do recém-nascido ao adolescente",
      description:
        "Uma conversa sem pressa sobre a história da criança, o que motivou a consulta e o que preocupa a família, seguida do exame do coração. No fim, vocês saem sabendo o que foi visto e quais são os próximos passos.",
      includes: [
        "Avaliação de sinais como cansaço, falta de ar, desmaio, dor no peito e palpitações",
        "Investigação de cardiopatias congênitas e adquiridas",
        "Conversa com o pediatra que acompanha a criança",
      ],
      image: { src: "/fotos/dra-michelle-rosto.jpg", alt: "Dra. Michelle Sanches sorrindo, sentada no consultório", position: "50% 30%" },
    },
    {
      slug: "ecocardiograma",
      title: "Ecocardiograma pediátrico",
      scope: "O ultrassom do coração da criança",
      description:
        "O exame mostra a estrutura e o funcionamento do coração em imagens. Não é invasivo, não dói e não precisa de anestesia. Idealmente é feito por um cardiologista pediátrico com formação em ecocardiografia, como a Dra. Michelle.",
      includes: [
        "Detecção de cardiopatias congênitas",
        "Acompanhamento depois de cirurgia cardíaca",
        "Monitoramento de complicações, como a hipertensão pulmonar",
      ],
      image: { src: "/fotos/ecocardiografo-equipamento.jpg", alt: "Aparelho de ecocardiograma com imagem colorida do coração na tela", position: "50% 25%" },
    },
    {
      slug: "sindrome-de-down",
      title: "Acompanhamento de crianças com Síndrome de Down",
      scope: "Um cuidado com enfoque especial",
      description:
        "Entre 40% e 60% das crianças com Síndrome de Down têm uma cardiopatia congênita, e muitas não mostram sintomas ao nascer. O acompanhamento com ecocardiograma permite diagnosticar cedo e cuidar do coração em cada fase.",
      includes: ["Ecocardiograma para diagnóstico precoce", "Vigilância da hipertensão pulmonar", "Acompanhamento antes e depois de cirurgias"],
    },
    {
      slug: "atividade-fisica",
      title: "Check-up para atividade física",
      scope: "Antes do esporte, com segurança",
      description:
        "Para a criança que vai começar um esporte, que tem histórico de doença cardíaca na família ou que já sentiu falta de ar, desmaio ou palpitação durante o esforço.",
      includes: ["Avaliação do coração antes do esporte", "Orientação para crianças com cardiopatia congênita"],
    },
    {
      slug: "risco-cirurgico",
      title: "Risco cirúrgico cardiológico",
      scope: "Antes de uma cirurgia",
      description:
        "Avaliação do coração antes de procedimentos como a retirada de adenoide e amígdalas, para a equipe cirúrgica operar com segurança.",
      includes: ["Avaliação cardiológica pré-operatória", "Relatório para a equipe cirúrgica"],
    },
  ] satisfies Service[],

  /** Etapas da consulta, na ordem em que a família vive cada uma. */
  process: [
    {
      title: "O agendamento",
      text: "Você manda uma mensagem no WhatsApp e escolhe o local mais perto. Se a criança já tem encaminhamento ou exames anteriores, separe para levar.",
    },
    {
      title: "A conversa",
      text: "A consulta começa ouvindo vocês: a gestação, o nascimento, o que motivou a visita e o que mais preocupa a família.",
    },
    {
      title: "O exame do coração",
      text: "Um exame cuidadoso, no ritmo da criança. O colo de quem ela confia ajuda, e tudo bem fazer pausas.",
    },
    {
      title: "O ecocardiograma, quando indicado",
      text: "Se for preciso ver o coração por dentro, o ultrassom é feito pela própria cardiologista pediátrica. É indolor e não precisa de anestesia.",
    },
    {
      title: "O plano de cuidado",
      text: "O resultado é explicado com calma, em palavras simples. Os próximos passos são combinados com a família e com o pediatra da criança.",
    },
  ],

  /** "Você sabia?" do site anterior. */
  facts: [
    { value: "50%", label: "é a estimativa média de crianças com Síndrome de Down que têm cardiopatia congênita" },
    { value: "80 a 95%", label: "é a taxa de detecção de cardiopatia pelo ecocardiograma, um exame não invasivo e indolor" },
    { value: "30%", label: "de todas as cardiopatias congênitas são comunicação interventricular (CIV)" },
    { value: "até 15%", label: "de todas as cardiopatias congênitas são comunicação interatrial (CIA)" },
  ],

  /** Quando procurar um cardiologista pediátrico (artigo da médica). */
  warningSigns: [
    "Desmaios",
    "Cansaço",
    "Perda de fôlego",
    "Dificuldade para respirar",
    "Baixo ganho de peso e estatura",
    "Dor no peito",
    "Batimentos cardíacos irregulares",
    "Sensação de palpitações",
    "Familiar com doença cardíaca",
    "Síndromes genéticas, como a Síndrome de Down",
    "Obesidade",
    "Colesterol e triglicerídeos altos",
  ],

  /** Página Sobre e blocos da Home. */
  about: {
    headline: "Cardiologista pediátrica, ecocardiografista e mãe",
    paragraphs: [
      "Minha carreira é guiada pelo compromisso com o bem-estar das crianças, especialmente aquelas com cardiopatias. Tenho a honra de trabalhar com esses pacientes de forma humanizada e acolhedora, buscando oferecer o melhor atendimento possível.",
      "Acredito profundamente na importância de não apenas tratar as condições médicas, mas também de apoiar emocionalmente as famílias durante suas jornadas.",
      "Minha abordagem se baseia na compaixão, na comunicação aberta e na busca constante por soluções personalizadas para cada caso.",
    ],
    /** Princípios (extraídos dos valores da médica). */
    principles: [
      { title: "Acolhimento", text: "Cuidar da criança é também cuidar de quem está com ela. A família entra na consulta junto." },
      { title: "Comunicação aberta", text: "Diagnóstico explicado em palavras simples, com tempo para as perguntas que costumam ficar para depois." },
      { title: "Cuidado sob medida", text: "Cada coração tem a sua história. O plano de cuidado é pensado para aquela criança e aquela família." },
    ],
    /** Formação (site anterior e artigo "Cardiologista pediátrico: o que faz esse médico?"). */
    education: [
      { title: "Graduação em Medicina", place: "Universidade de Cuiabá" },
      { title: "Residência em Pediatria", place: "Universidade Federal de Mato Grosso" },
      { title: "Residência em Cardiologia Pediátrica", place: "Instituto de Cardiologia e Transplante do Distrito Federal (ICTDF)" },
      { title: "Fellow em Ecocardiograma Pediátrico", place: "Instituto de Cardiologia e Transplante do Distrito Federal (ICTDF)" },
    ],
    /** Número do site anterior ("+ de 2.000 crianças atendidas"). */
    childrenServed: "+ de 2.000",
    /** Quem responde tecnicamente (E-E-A-T). CRM e RQE: pendentes com a cliente. */
    expert: {
      name: "Michelle Sanches",
      credentials: "Cardiologista pediátrica e ecocardiografista pediátrica",
      /** Registro no CRM-DF e RQE. Vazio até a cliente confirmar (some da tela). */
      crm: "",
      rqe: "",
      bio: "Médica formada pela Universidade de Cuiabá, com residência em Pediatria pela Universidade Federal de Mato Grosso, residência em Cardiologia Pediátrica e fellow em Ecocardiograma Pediátrico pelo Instituto de Cardiologia e Transplante do Distrito Federal.",
      image: { src: "/fotos/dra-michelle-retrato.png", alt: "Retrato da Dra. Michelle Sanches, de blusa azul-clara, sorrindo" },
    },
  },

  /** Textos da Home. */
  home: {
    heroTitle: "Cardiologista pediátrica em Brasília",
    heroText:
      "Consulta e ecocardiograma para bebês, crianças e adolescentes, com tempo para ouvir a família e explicar cada passo.",
    primaryCta: "Agendar pelo WhatsApp",
    secondaryCta: "Ver os atendimentos",
    manifestoTitle: "Cuidar do coração de uma criança é cuidar da família inteira",
  },

  blog: {
    title: "Blog",
    description: "Textos da Dra. Michelle Sanches para pais e cuidadores sobre o coração das crianças: sinais de alerta, exames e cardiopatias.",
    perPage: 12,
  },

  /** Chamada para ação no fim dos artigos e das páginas. */
  cta: {
    title: "Vamos cuidar desse coração juntos?",
    text: "Mande uma mensagem no WhatsApp contando a idade da criança e o motivo da consulta. A resposta vem com os horários disponíveis.",
    button: "Agendar pelo WhatsApp",
  },

  /** Perguntas frequentes (Home e Atendimentos, com FAQPage no JSON-LD). Só fatos dos textos da médica. */
  faq: [
    {
      q: "Quando devo levar meu filho a um cardiologista pediátrico?",
      a: "Quando houver desmaios, cansaço, falta de ar, dor no peito, palpitações, batimentos irregulares ou baixo ganho de peso e estatura. Também vale a avaliação se há doença cardíaca na família, síndromes genéticas como a Síndrome de Down, obesidade ou colesterol alto. Uma consulta preventiva pode encontrar alterações antes de elas darem sinais.",
    },
    {
      q: "O ecocardiograma dói? Precisa de anestesia?",
      a: "Não. O ecocardiograma é um ultrassom do coração: não é invasivo, não dói e não precisa de anestesia, por isso é ideal para crianças. Ele mostra a estrutura e o funcionamento do coração em imagens.",
    },
    {
      q: "Qual a diferença entre o cardiologista pediátrico e o cardiologista de adultos?",
      a: "O cardiologista pediátrico tem formação específica no coração em desenvolvimento, do recém-nascido ao adolescente, e em alguns casos acompanha o paciente até a idade adulta. Trabalha junto com o pediatra e com outros especialistas.",
    },
    {
      q: "Meu filho tem Síndrome de Down. Ele precisa de avaliação cardiológica?",
      a: "Sim. Entre 40% e 60% das crianças com Síndrome de Down têm alguma cardiopatia congênita, e a maioria dos bebês não mostra sintomas ao nascer. O ecocardiograma permite diagnosticar cedo e acompanhar o coração em cada fase.",
    },
    {
      q: "Meu filho desmaiou. É sinal de problema no coração?",
      a: "O desmaio é um sintoma, não um diagnóstico. Muitas vezes a causa é simples e tratável, mas ele pode vir do coração, principalmente quando acontece durante atividade física ou junto com dor no peito, falta de ar ou palpitações. Nesses casos, procure avaliação.",
    },
    {
      q: "Onde a Dra. Michelle atende?",
      a: "Na Cárddio, no Centro de Excelência Anchieta (8º andar, salas 816 a 827), em Taguatinga Norte, no Hospital Brasília Águas Claras e no Hospital Santa Helena, na Asa Norte. O agendamento é pelo WhatsApp (61) 99609-8418.",
    },
  ],

  /**
   * CORES do manual da marca (arquivos SVG do logo e do padrão):
   * rosé #D8A4A0, rosé escuro #9F7173, sálvia #8AA09B, petróleo #658383, linho #EBE8E1.
   * O rosé e o petróleo oficiais não passam em 4,5:1 com texto pequeno, então o texto e os
   * botões usam tons de apoio derivados do petróleo (a cor oficial continua nos grafismos).
   * Contraste: #FFFFFF sobre #476262 = 6,6:1; #2B3D3C sobre #F5F2EC = 10,2:1;
   * #566562 sobre #EBE8E1 = 5,0:1; #2B3D3C sobre #D8A4A0 = 5,3:1; #F5F2EC sobre #3A5150 = 7,6:1.
   */
  theme: {
    brand: "#476262", // petróleo de apoio (botões e links): texto branco a 6,6:1
    brandContrast: "#FFFFFF",
    brandSoft: "#DCE3E0", // sálvia clareada
    ink: "#2B3D3C", // texto principal, derivado do petróleo
    muted: "#566562", // texto secundário
    surface: "#F5F2EC", // fundo da página (linho clareado)
    surfaceAlt: "#EBE8E1", // linho oficial, seções alternadas
    line: "#D9D3C9", // bordas e divisórias
    radius: "18px",
    // cores oficiais, usadas em grafismos, fundos e títulos grandes
    rose: "#D8A4A0",
    roseDeep: "#9F7173",
    roseText: "#855A5C", // rosé para texto pequeno sobre linho (4,75:1)
    sage: "#8AA09B",
    petrol: "#658383",
    petrolDeep: "#3A5150", // fundo escuro das seções (linho sobre ele a 7,6:1)
  },
};

export type SiteConfig = typeof siteConfig;
