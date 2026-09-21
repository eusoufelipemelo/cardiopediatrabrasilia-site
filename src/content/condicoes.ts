/**
 * Condições que a Dra. Michelle acompanha (o "portfólio" de um consultório médico).
 * Texto baseado nos três artigos publicados por ela no site anterior, em linguagem para pais.
 * Conteúdo informativo: não substitui a consulta (aviso em cada página).
 */

export type Condition = {
  slug: string;
  title: string;
  /** Resumo para cards, listas e meta description (até ~160 caracteres). */
  summary: string;
  /** O que é, em parágrafos curtos. */
  what: string[];
  /** Sinais que merecem atenção. */
  signs: string[];
  /** Como a avaliação costuma acontecer. */
  evaluation: string[];
  /** Termos que aparecem junto (entram como "exemplos"). */
  examples?: string[];
  /** Imagem de compartilhamento gerada por scripts/gerar-og.py. */
  og: string;
};

export const conditions: Condition[] = [
  {
    slug: "cardiopatias-congenitas",
    title: "Cardiopatias congênitas",
    summary: "Alterações no coração presentes desde o nascimento, como CIA, CIV e Tetralogia de Fallot. Muitas são descobertas cedo pelo ecocardiograma.",
    what: [
      "São alterações na formação do coração que já existem quando o bebê nasce. Algumas são pequenas e fecham sozinhas; outras precisam de acompanhamento, remédio ou cirurgia.",
      "A comunicação interventricular (CIV) responde por cerca de 30% das cardiopatias congênitas, e a comunicação interatrial (CIA) por até 15%. As duas são aberturas entre as cavidades do coração que misturam sangue com e sem oxigênio.",
    ],
    examples: ["Comunicação interatrial (CIA)", "Comunicação interventricular (CIV)", "Tetralogia de Fallot", "Defeito do septo atrioventricular (DSAV)", "Estenose da valva aórtica"],
    signs: ["Pele ou lábios arroxeados", "Cansaço excessivo, inclusive ao mamar", "Dificuldade para ganhar peso", "Respiração rápida ou ofegante", "Infecções respiratórias frequentes"],
    evaluation: [
      "A consulta reúne a história da gestação e do nascimento e o exame do coração.",
      "O ecocardiograma mostra a anatomia do coração e confirma o diagnóstico. Depois de uma cirurgia, é ele que avalia a recuperação.",
    ],
    og: "/og/condicao-cardiopatias-congenitas.jpg",
  },
  {
    slug: "sindrome-de-down",
    title: "Síndrome de Down e o coração",
    summary: "Entre 40% e 60% das crianças com Síndrome de Down têm cardiopatia congênita. O ecocardiograma permite diagnosticar cedo, mesmo sem sintomas.",
    what: [
      "A Síndrome de Down afeta cerca de 1 em cada 700 crianças nascidas vivas, e o coração é uma das principais atenções no cuidado dessas crianças.",
      "O defeito mais comum é o do septo atrioventricular (DSAV), mas também aparecem CIA, CIV e estenose da valva aórtica. A maioria dos bebês não mostra sintomas óbvios ao nascer.",
      "A hipertensão pulmonar é mais frequente nesse grupo e pede acompanhamento contínuo.",
    ],
    signs: ["Coloração azulada ou arroxeada da pele ou dos lábios", "Fadiga excessiva", "Dificuldade para se alimentar", "Desenvolvimento físico mais lento", "Respiração rápida ou ofegante", "Infecções respiratórias frequentes"],
    evaluation: [
      "O ecocardiograma é a ferramenta essencial: detecta a cardiopatia, acompanha a hipertensão pulmonar e avalia o resultado de cirurgias.",
      "O acompanhamento é regular, ajustado à fase de vida e ao diagnóstico de cada criança.",
    ],
    og: "/og/condicao-sindrome-de-down.jpg",
  },
  {
    slug: "desmaio",
    title: "Desmaio na infância",
    summary: "O desmaio é um sintoma, não um diagnóstico. Quase sempre tem causa tratável, mas pode vir do coração e merece investigação.",
    what: [
      "O desmaio, ou síncope, é uma perda breve da consciência. Assusta quem vê, mas muitas vezes tem causa simples, como o reflexo vasovagal.",
      "Em alguns casos ele vem do coração: arritmias, malformações presentes desde o nascimento ou a síndrome do QT longo. Por isso a avaliação do cardiologista pediátrico é o caminho certo.",
    ],
    signs: ["Desmaio durante atividade física", "Desmaio com dor no peito, falta de ar ou palpitações", "Tonturas frequentes, principalmente ao mudar de posição", "Palidez extrema com fraqueza", "Histórico familiar de doença cardíaca ou morte súbita"],
    evaluation: [
      "A história do episódio é a peça mais importante: o que a criança fazia, o que sentiu antes e como se recuperou.",
      "Conforme o caso, podem ser pedidos eletrocardiograma, Holter de 24 horas, teste de inclinação (tilt test) e ecocardiograma.",
    ],
    og: "/og/condicao-desmaio.jpg",
  },
  {
    slug: "arritmias",
    title: "Arritmias e palpitações",
    summary: "Quando o coração bate rápido, devagar ou fora do ritmo. Palpitações e batimentos irregulares na criança merecem uma avaliação.",
    what: [
      "Arritmia é qualquer alteração no ritmo do coração: rápido demais (taquicardia), devagar demais (bradicardia) ou irregular.",
      "Muitas são benignas. Outras podem causar desmaio ou cansaço e precisam de tratamento, que vai de orientação e remédio a procedimentos específicos.",
    ],
    signs: ["Sensação de coração disparado", "Batimentos irregulares", "Tontura ou desmaio", "Cansaço desproporcional ao esforço"],
    evaluation: [
      "O eletrocardiograma avalia a atividade elétrica do coração em repouso.",
      "O Holter registra o ritmo por 24 horas ou mais e flagra arritmias que não aparecem num exame curto.",
    ],
    og: "/og/condicao-arritmias.jpg",
  },
  {
    slug: "doencas-adquiridas",
    title: "Doenças cardíacas adquiridas",
    summary: "Problemas que surgem ao longo da vida, como a febre reumática e as alterações cardíacas depois da covid-19.",
    what: [
      "Nem toda doença do coração da criança vem de nascença. Algumas aparecem depois, como consequência de infecções ou de outras doenças.",
      "A febre reumática e as alterações cardíacas após a covid-19 estão entre as que o cardiologista pediátrico acompanha.",
    ],
    examples: ["Febre reumática", "Alterações cardíacas após a covid-19"],
    signs: ["Cansaço e falta de ar novos", "Dor no peito", "Palpitações", "Inchaço"],
    evaluation: ["A consulta investiga a história da doença de base e examina o coração.", "O ecocardiograma avalia as valvas e a força do músculo cardíaco."],
    og: "/og/condicao-doencas-adquiridas.jpg",
  },
  {
    slug: "insuficiencia-cardiaca",
    title: "Insuficiência cardíaca",
    summary: "Quando o coração não consegue bombear o sangue que o corpo precisa. Pede acompanhamento próximo e tratamento contínuo.",
    what: [
      "Na insuficiência cardíaca, o coração trabalha com esforço extra e não entrega ao corpo todo o sangue de que ele precisa.",
      "Na criança, pode ser consequência de uma cardiopatia congênita, de hipertensão pulmonar ou de doenças do músculo do coração.",
    ],
    signs: ["Cansaço fácil e falta de fôlego", "Suor e cansaço ao mamar", "Baixo ganho de peso", "Respiração rápida"],
    evaluation: ["O ecocardiograma mede a função do coração e acompanha a resposta ao tratamento.", "O plano de cuidado é revisto a cada consulta, junto com a família."],
    og: "/og/condicao-insuficiencia-cardiaca.jpg",
  },
];

export function getCondition(slug: string) {
  return conditions.find((c) => c.slug === slug);
}
