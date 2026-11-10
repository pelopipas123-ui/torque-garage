import {
  BatteryCharging,
  Disc3,
  Droplets,
  Gauge,
  ScanLine,
  Snowflake,
  type LucideIcon,
} from "lucide-react";

export const business = {
  name: "Torque Garage",
  phone: "(11) 4002-8922",
  whatsapp: "5511940028922",
  address: "Av. Henrique Eroles, 1250 — Alphaville, Barueri/SP",
  hours: "Seg–Sex 7h30–18h · Sáb 8h–13h",
  email: "contato@torquegarage.com.br",
};

export const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#processo" },
  { label: "Planos", href: "#planos" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "FAQ", href: "#faq" },
];

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
  className: string;
};

export const services: Service[] = [
  {
    title: "Troca de óleo e filtros",
    description:
      "Óleo sintético ou semissintético com certificação do fabricante, troca dos filtros de óleo, ar e combustível. Garantia por escrito.",
    icon: Droplets,
    tag: "A partir de R$ 189",
    className: "md:col-span-2",
  },
  {
    title: "Freios",
    description:
      "Pastilhas, discos, fluido e sistema ABS inspecionados com medição digital.",
    icon: Disc3,
    tag: "Segurança",
    className: "",
  },
  {
    title: "Ar-condicionado",
    description:
      "Higienização, troca do filtro de cabine e recarga de gás com detecção de vazamento.",
    icon: Snowflake,
    tag: "Conforto",
    className: "",
  },
  {
    title: "Diagnóstico eletrônico",
    description:
      "Scanner multimarcas lê falhas de injeção, airbag, câmbio e transmite o laudo direto no seu celular.",
    icon: ScanLine,
    tag: "Laudo digital",
    className: "md:col-span-2",
  },
  {
    title: "Suspensão e alinhamento",
    description:
      "Alinhamento 3D, balanceamento e revisão completa de amortecedores, buchas e terminais.",
    icon: Gauge,
    tag: "Estabilidade",
    className: "",
  },
  {
    title: "Bateria e elétrica",
    description:
      "Teste de carga, alternador e motor de partida. Troca na hora, com descarte ecológico.",
    icon: BatteryCharging,
    tag: "Troca em 30 min",
    className: "",
  },
];

export type Pkg = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  popular?: boolean;
  features: string[];
};

export const packages: Pkg[] = [
  {
    id: "essencial",
    name: "Revisão Essencial",
    tagline: "Para manter a garantia e a rotina em dia",
    price: 289,
    duration: "≈ 1h30",
    features: [
      "Troca de óleo e filtro de óleo",
      "Inspeção de 32 pontos",
      "Verificação de fluidos e níveis",
      "Teste de bateria",
      "Laudo digital com fotos",
    ],
  },
  {
    id: "completa",
    name: "Revisão Completa",
    tagline: "A escolha da maioria dos nossos clientes",
    price: 489,
    duration: "≈ 3h",
    popular: true,
    features: [
      "Tudo da Essencial",
      "Filtros de ar e de cabine",
      "Inspeção de freios com medição",
      "Alinhamento e balanceamento",
      "Scanner de diagnóstico eletrônico",
      "Higienização do ar-condicionado",
    ],
  },
  {
    id: "premium",
    name: "Revisão Premium",
    tagline: "Cuidado total, do motor à suspensão",
    price: 789,
    duration: "≈ 5h",
    features: [
      "Tudo da Completa",
      "Troca de velas e filtro de combustível",
      "Fluido de freio e arrefecimento",
      "Revisão de suspensão e direção",
      "Carro leva-e-traz + lavagem cortesia",
      "Garantia estendida de 12 meses",
    ],
  },
];

export const addons = [
  { id: "ar", label: "Higienização do ar-condicionado", price: 89 },
  { id: "cristal", label: "Cristalização de faróis", price: 129 },
  { id: "leva", label: "Leva-e-traz do veículo", price: 59 },
  { id: "lavagem", label: "Lavagem detalhada", price: 79 },
];

export const brands = [
  "Volkswagen",
  "Chevrolet",
  "Fiat",
  "Toyota",
  "Honda",
  "Hyundai",
  "Jeep",
  "Renault",
  "Nissan",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Outra",
];

export const mileageRanges = [
  "Até 10.000 km",
  "10.000 – 30.000 km",
  "30.000 – 60.000 km",
  "60.000 – 100.000 km",
  "Acima de 100.000 km",
];

export const timeSlots = [
  "07:30",
  "08:30",
  "09:30",
  "10:30",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const steps = [
  {
    title: "Escolha o horário",
    description:
      "Informe seu veículo, selecione a revisão e reserve o melhor dia em menos de 2 minutos.",
  },
  {
    title: "Deixe com a gente",
    description:
      "Você acompanha cada etapa pelo WhatsApp, com fotos e vídeos da inspeção em tempo real.",
  },
  {
    title: "Aprove e retire",
    description:
      "Você aprova só o que for necessário, paga na retirada e leva o carro com garantia por escrito.",
  },
];

export const metrics = [
  { value: 12400, suffix: "+", label: "Revisões realizadas", decimals: 0 },
  { value: 4.9, suffix: "/5", label: "Nota média no Google", decimals: 1 },
  { value: 98, suffix: "%", label: "Entregas no prazo", decimals: 0 },
  { value: 12, suffix: " anos", label: "De experiência", decimals: 0 },
];

export const testimonials = [
  {
    name: "Mariana Albuquerque",
    role: "Honda HR-V 2021",
    quote:
      "Agendei pelo site de madrugada e no mesmo dia recebi as fotos de tudo que foi feito. Nunca vi uma oficina tão transparente.",
    rating: 5,
  },
  {
    name: "Rafael Tavares",
    role: "Toyota Corolla 2019",
    quote:
      "Me mostraram a pastilha desgastada com a medição na tela e só aprovei o que realmente precisava. Economizei e saí confiante.",
    rating: 5,
  },
  {
    name: "Camila Nogueira",
    role: "Jeep Compass 2022",
    quote:
      "O leva-e-traz salvou minha semana. Carro voltou lavado, com o laudo no WhatsApp e sem nenhuma surpresa no valor.",
    rating: 5,
  },
  {
    name: "Eduardo Prado",
    role: "VW T-Cross 2020",
    quote:
      "Prazo cumprido ao minuto. A equipe explica tudo em português claro, sem enrolação. Já indiquei para toda a família.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "A revisão na Torque Garage mantém a garantia de fábrica?",
    a: "Sim. Seguimos o plano de manutenção do fabricante, usamos peças e fluidos homologados e emitimos nota fiscal e laudo detalhado, documentos aceitos pelas concessionárias para a manutenção da garantia.",
  },
  {
    q: "Quanto tempo leva uma revisão?",
    a: "A Essencial leva cerca de 1h30, a Completa em torno de 3h e a Premium até 5h. Você escolhe esperar na nossa lounge com café e Wi-Fi ou usar o leva-e-traz.",
  },
  {
    q: "Posso remarcar ou cancelar o agendamento?",
    a: "Pode, sem custo, até 4 horas antes do horário marcado. É só responder a mensagem de confirmação no WhatsApp ou ligar para a nossa central.",
  },
  {
    q: "Vocês cobram algo além do valor do pacote?",
    a: "Só se você aprovar. Se encontrarmos algo fora do escopo, enviamos foto, explicação e orçamento pelo WhatsApp. Nada é feito sem a sua autorização.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Pix, débito, crédito em até 10x sem juros e boleto para empresas. O pagamento é feito apenas na retirada do veículo.",
  },
  {
    q: "Atendem carros híbridos e elétricos?",
    a: "Atendemos híbridos e fazemos a revisão dos sistemas convencionais de elétricos (freios, suspensão, direção e ar-condicionado) com técnicos certificados.",
  },
];

export const footerLinks = {
  Oficina: [
    { label: "Serviços", href: "#servicos" },
    { label: "Planos de revisão", href: "#planos" },
    { label: "Agendar", href: "#agendar" },
  ],
  Suporte: [
    { label: "Perguntas frequentes", href: "#faq" },
    { label: "Política de garantia", href: "#" },
    { label: "Política de privacidade", href: "#" },
  ],
};
