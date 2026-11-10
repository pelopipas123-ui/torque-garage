"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Sparkles } from "lucide-react";
import { packages } from "@/lib/data";
import { cn, formatBRL } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const ANNUAL_DISCOUNT = 0.15;

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  function choose(id: string) {
    window.dispatchEvent(new CustomEvent("select-package", { detail: id }));
  }

  return (
    <section id="planos" className="relative py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-3xl -translate-y-1/2 rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Planos de revisão"
          title="Preço fechado. Zero surpresa."
          description="Escolha o pacote ideal para o seu carro. O valor que você vê é o valor que você paga."
        />

        {/* Toggle */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div
            role="tablist"
            aria-label="Tipo de contratação"
            className="glass relative inline-flex rounded-full p-1"
          >
            {[
              { id: false, label: "Revisão avulsa" },
              { id: true, label: "Clube anual" },
            ].map((opt) => (
              <button
                key={String(opt.id)}
                role="tab"
                aria-selected={annual === opt.id}
                onClick={() => setAnnual(opt.id)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  annual === opt.id ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                {annual === opt.id && (
                  <motion.span
                    layoutId="pricing-toggle"
                    className="absolute inset-0 rounded-full bg-amber-400"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{opt.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500">
            {annual
              ? "Clube anual: 2 revisões por ano com 15% de desconto em cada."
              : "Pague apenas quando precisar, sem fidelidade."}
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((p, i) => {
            const price = annual ? Math.round(p.price * (1 - ANNUAL_DISCOUNT)) : p.price;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-7 md:p-8",
                  p.popular
                    ? "border-amber-400/40 bg-gradient-to-b from-amber-400/[0.08] to-zinc-900/40 shadow-2xl shadow-amber-500/10 lg:-my-3"
                    : "border-white/10 bg-white/[0.02]",
                )}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-zinc-950 shadow-lg shadow-amber-500/30">
                    <Sparkles className="h-3 w-3" />
                    Mais popular
                  </span>
                )}

                <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{p.tagline}</p>

                <div className="mt-6 flex items-end gap-2">
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-semibold tracking-tight text-zinc-50"
                  >
                    {formatBRL(price)}
                  </motion.span>
                  <span className="mb-1 text-sm text-zinc-500">/ revisão</span>
                </div>
                {annual && (
                  <p className="mt-1 text-xs text-emerald-400">
                    Economia de {formatBRL((p.price - price) * 2)} por ano
                  </p>
                )}

                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  <Clock className="h-3.5 w-3.5" />
                  {p.duration}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#agendar"
                  onClick={() => choose(p.id)}
                  className={cn(
                    "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition active:scale-95",
                    p.popular
                      ? "bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300"
                      : "border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10",
                  )}
                >
                  Agendar {p.name.replace("Revisão ", "")}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
