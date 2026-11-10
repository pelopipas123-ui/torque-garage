"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { business, brands } from "@/lib/data";

const checklist = [
  { label: "Troca de óleo e filtros", status: "done" },
  { label: "Inspeção de freios (4 rodas)", status: "done" },
  { label: "Alinhamento 3D", status: "progress" },
  { label: "Scanner eletrônico", status: "pending" },
] as const;

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      {/* Fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[360px] w-[360px] rounded-full bg-orange-600/10 blur-[110px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8">
        <div>
          <motion.a
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            href="#planos"
            className="glass inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-4 text-sm text-zinc-300 transition hover:bg-white/[0.06]"
          >
            <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-semibold text-zinc-950">
              Novo
            </span>
            Laudo digital com fotos em todas as revisões
            <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
          </motion.a>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Sua revisão agendada em{" "}
            <span className="text-gradient">2 minutos.</span>
            <br />
            Seu carro pronto no mesmo dia.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400"
          >
            Mecânica premium com transparência total: você escolhe o horário
            online, acompanha cada etapa pelo WhatsApp e só aprova o que
            realmente precisa.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#agendar"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-base font-semibold text-zinc-950 shadow-xl shadow-amber-500/25 transition hover:bg-amber-300 active:scale-95"
            >
              Agendar minha revisão
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium text-zinc-100 transition hover:bg-white/[0.08] active:scale-95"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>
                <strong className="text-zinc-100">4,9</strong> · 2.300 avaliações
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Garantia de 6 meses em todos os serviços
            </div>
          </motion.div>
        </div>

        {/* Preview do produto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-400/20 via-transparent to-orange-500/10 blur-2xl" />

          <div className="glass overflow-hidden rounded-3xl shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Acompanhamento ao vivo
                </p>
                <p className="mt-1 font-semibold text-zinc-100">
                  Honda HR-V · QWE-4F21
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Em andamento
              </span>
            </div>

            <div className="space-y-3 p-5">
              {checklist.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3"
                >
                  {item.status === "done" ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  ) : item.status === "progress" ? (
                    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                      <span className="absolute h-5 w-5 animate-ping rounded-full bg-amber-400/40" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    </span>
                  ) : (
                    <span className="h-5 w-5 shrink-0 rounded-full border border-zinc-700" />
                  )}
                  <span
                    className={
                      item.status === "pending"
                        ? "text-sm text-zinc-500"
                        : "text-sm text-zinc-200"
                    }
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}

              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
                  <span>Progresso da revisão</span>
                  <span className="font-medium text-zinc-300">65%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cards flutuantes */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="glass absolute -left-3 -top-5 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-xl shadow-black/40 sm:flex md:-left-8"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-zinc-500">Retirada prevista</p>
              <p className="text-sm font-semibold text-zinc-100">Hoje, 16h30</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="glass absolute -bottom-6 -right-2 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl shadow-black/40 md:-right-6"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-zinc-500">Laudo digital</p>
              <p className="text-sm font-semibold text-zinc-100">
                32 pontos aprovados
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marcas atendidas */}
      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-zinc-600">
          Atendemos as principais marcas do mercado
        </p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_15%,#000_85%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex w-max gap-12"
          >
            {[...brands.slice(0, 12), ...brands.slice(0, 12)].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-zinc-600"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
