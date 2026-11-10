"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Process() {
  return (
    <section id="processo" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Como funciona"
          title="Revisão sem dor de cabeça, em 3 passos"
          description="Sem filas, sem ligações e sem surpresas no orçamento."
        />

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent md:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative text-center"
            >
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-zinc-950 text-xl font-semibold text-amber-300 shadow-lg shadow-amber-500/10">
                {i + 1}
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-zinc-50">
                {s.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-zinc-400">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
