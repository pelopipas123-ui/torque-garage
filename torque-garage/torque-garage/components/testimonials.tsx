"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { metrics, testimonials } from "@/lib/data";
import { SectionHeading } from "./section-heading";

function CountUp({ to, decimals }: { to: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = v.toLocaleString("pt-BR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals]);

  return <span ref={ref}>0</span>;
}

export function Testimonials() {
  return (
    <section id="avaliacoes" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Métricas */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-zinc-950 px-6 py-8 text-center md:py-10">
              <p className="text-3xl font-semibold tracking-tight text-gradient md:text-5xl">
                <CountUp to={m.value} decimals={m.decimals} />
                {m.suffix}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Avaliações"
            title="Quem agenda, volta"
            description="Mais de 2.300 avaliações reais no Google. Veja o que nossos clientes dizem."
          />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 shadow-xl shadow-black/20 md:p-8"
            >
              <Quote className="absolute right-7 top-7 h-8 w-8 text-white/5" />
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-zinc-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-sm font-semibold text-zinc-950">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-medium text-zinc-100">{t.name}</span>
                  <span className="block text-xs text-zinc-500">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
