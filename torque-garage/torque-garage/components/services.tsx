"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="servicos" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Serviços"
          title={
            <>
              Tudo que seu carro precisa,{" "}
              <span className="text-gradient">num só lugar</span>
            </>
          }
          description="Técnicos certificados, equipamentos de última geração e peças com procedência. Da revisão de rotina ao diagnóstico mais complexo."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 shadow-xl shadow-black/20 transition-colors hover:border-amber-400/30 md:p-8",
                  s.className,
                )}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/0 blur-3xl transition-all duration-500 group-hover:bg-amber-400/15" />

                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 text-amber-300 transition group-hover:border-amber-400/30 group-hover:bg-amber-400/10">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-zinc-600 transition group-hover:text-amber-300" />
                </div>

                <h3 className="mt-8 text-xl font-semibold tracking-tight text-zinc-50">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                  {s.description}
                </p>
                <span className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                  {s.tag}
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
