# Torque Garage — site de oficina mecânica com agendamento de revisão

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Estrutura

```
app/            layout, página e estilos globais
components/     navbar, hero, services (bento), process, pricing,
                booking-wizard, testimonials, faq, footer
lib/data.ts     todo o conteúdo mock (serviços, pacotes, depoimentos, FAQ)
lib/utils.ts    cn(), máscaras de telefone/placa, formatação em BRL
```

## Fluxo de agendamento

`components/booking-wizard.tsx` — 4 etapas (veículo → serviço → data/hora → dados) com validação,
resumo lateral com total em tempo real, horários ocupados simulados e tela de confirmação com protocolo.

Para ligar a um backend real, edite a função `submit()` e faça o `POST` para sua API
(por exemplo `app/api/agendamentos/route.ts`) em vez do `setTimeout` de demonstração.

## Personalização rápida

- Nome, telefone, endereço e horários: `business` em `lib/data.ts`
- Preços e itens dos pacotes: `packages` em `lib/data.ts`
- Horários disponíveis: `timeSlots` em `lib/data.ts`
- Cor de destaque: troque `amber` por `indigo`, `emerald` ou `violet` nos componentes
