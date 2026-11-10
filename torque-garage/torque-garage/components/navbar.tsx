"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, Wrench, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-zinc-950 shadow-lg shadow-amber-500/20">
            <Wrench className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Torque<span className="text-amber-400">Garage</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-50"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#agendar"
            className="hidden items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 active:scale-95 sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" />
            Agendar revisão
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:bg-white/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-1 px-4 pb-5 pt-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base text-zinc-300 transition hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#agendar"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-semibold text-zinc-950"
              >
                <CalendarCheck className="h-4 w-4" />
                Agendar revisão
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
