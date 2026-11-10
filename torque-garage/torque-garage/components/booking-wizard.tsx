"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  PartyPopper,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import {
  addons,
  brands,
  business,
  mileageRanges,
  packages,
  timeSlots,
} from "@/lib/data";
import { cn, formatBRL, maskPhone, maskPlate, seeded } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Form = {
  brand: string;
  model: string;
  year: string;
  plate: string;
  mileage: string;
  packageId: string;
  addons: string[];
  date: string; // ISO yyyy-mm-dd
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const initial: Form = {
  brand: "",
  model: "",
  year: "",
  plate: "",
  mileage: "",
  packageId: "completa",
  addons: [],
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

const stepsMeta = [
  { label: "Veículo", icon: Car },
  { label: "Serviço", icon: Wrench },
  { label: "Data e hora", icon: CalendarDays },
  { label: "Seus dados", icon: UserRound },
];

const weekdayShort = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const monthShort = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

function toISO(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function formatLongDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-amber-400/60 focus:ring-4 focus:ring-amber-400/10";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-zinc-600">{hint}</span>}
    </label>
  );
}

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const wizardTopRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<Form>(initial);
  const [days, setDays] = useState<{ iso: string; date: Date }[]>([]);
  const [protocol, setProtocol] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Próximos 14 dias úteis (calculado no cliente para evitar divergência de hidratação)
  useEffect(() => {
    const out: { iso: string; date: Date }[] = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    cursor.setDate(cursor.getDate() + 1);
    while (out.length < 14) {
      if (cursor.getDay() !== 0) out.push({ iso: toISO(cursor), date: new Date(cursor) });
      cursor.setDate(cursor.getDate() + 1);
    }
    setDays(out);
  }, []);

  // Permite pré-selecionar o pacote a partir da seção de preços
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (packages.some((p) => p.id === id)) set("packageId", id);
    };
    window.addEventListener("select-package", handler);
    return () => window.removeEventListener("select-package", handler);
  }, []);

  // Ao trocar de etapa, mantém o formulário visível também em telas pequenas.
  useEffect(() => {
    if (step === 0) return;
    const id = window.requestAnimationFrame(() => {
      wizardTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [step]);

  const pkg = packages.find((p) => p.id === form.packageId)!;
  const total = useMemo(
    () =>
      pkg.price +
      addons.filter((a) => form.addons.includes(a.id)).reduce((s, a) => s + a.price, 0),
    [pkg, form.addons],
  );

  // Horários ocupados simulados, determinísticos por data
  const busy = useMemo(() => {
    if (!form.date) return new Set<string>();
    const seed = Number(form.date.replace(/-/g, ""));
    return new Set(timeSlots.filter((_, i) => seeded(seed + i * 7) > 0.68));
  }, [form.date]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const canNext = [
    form.brand && form.model.trim().length >= 2 && /^\d{4}$/.test(form.year) && form.plate.length === 7 && form.mileage,
    !!form.packageId,
    form.date && form.time,
    form.name.trim().length >= 3 && form.phone.replace(/\D/g, "").length >= 10 && emailOk,
  ][step];

  function toggleAddon(id: string) {
    set(
      "addons",
      form.addons.includes(id) ? form.addons.filter((a) => a !== id) : [...form.addons, id],
    );
  }

  async function submit() {
    setSubmitting(true);
    // Aqui você integraria com sua API (ex.: POST /api/agendamentos)
    await new Promise((r) => setTimeout(r, 1100));
    const code = Math.random().toString(36).slice(2, 7).toUpperCase();
    setProtocol(`TQ-${code}`);
    setSubmitting(false);
  }

  function reset() {
    setForm(initial);
    setStep(0);
    setProtocol(null);
  }

  return (
    <section id="agendar" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Agendamento online"
          title={
            <>
              Reserve sua revisão <span className="text-gradient">agora</span>
            </>
          }
          description="Quatro passos rápidos. Você recebe a confirmação no WhatsApp e pode remarcar sem custo até 4h antes."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass mt-12 rounded-[2rem] shadow-2xl shadow-black/40"
        >
          {protocol ? (
            <Success protocol={protocol} form={form} pkgName={pkg.name} total={total} onReset={reset} />
          ) : (
            <div className="grid lg:grid-cols-[1fr_340px]">
              {/* Formulário */}
              <div ref={wizardTopRef} className="min-w-0 scroll-mt-4 p-4 pb-5 sm:p-6 md:p-10">
                {/* Stepper */}
                <ol className="flex items-center gap-2">
                  {stepsMeta.map((s, i) => {
                    const Icon = s.icon;
                    const done = i < step;
                    const active = i === step;
                    return (
                      <li key={s.label} className="flex flex-1 items-center gap-2 last:flex-none">
                        <button
                          type="button"
                          disabled={i > step}
                          onClick={() => setStep(i)}
                          aria-current={active ? "step" : undefined}
                          className="flex items-center gap-2.5 disabled:cursor-default"
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition",
                              done && "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
                              active && "border-amber-400 bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/30",
                              !done && !active && "border-white/10 text-zinc-600",
                            )}
                          >
                            {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                          </span>
                          <span
                            className={cn(
                              "hidden text-sm font-medium md:block",
                              active ? "text-zinc-100" : "text-zinc-500",
                            )}
                          >
                            {s.label}
                          </span>
                        </button>
                        {i < stepsMeta.length - 1 && (
                          <span className="h-px flex-1 bg-white/10">
                            <motion.span
                              className="block h-full bg-emerald-400/50"
                              animate={{ width: done ? "100%" : "0%" }}
                            />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-8 min-h-[360px] min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25 }}
                    >
                      {step === 0 && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field label="Marca">
                            <select
                              className={inputCls}
                              value={form.brand}
                              onChange={(e) => set("brand", e.target.value)}
                            >
                              <option value="">Selecione</option>
                              {brands.map((b) => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </Field>
                          <Field label="Modelo">
                            <input
                              className={inputCls}
                              placeholder="Ex.: Corolla XEi"
                              value={form.model}
                              onChange={(e) => set("model", e.target.value)}
                            />
                          </Field>
                          <Field label="Ano">
                            <input
                              className={inputCls}
                              inputMode="numeric"
                              placeholder="2021"
                              maxLength={4}
                              value={form.year}
                              onChange={(e) => set("year", e.target.value.replace(/\D/g, ""))}
                            />
                          </Field>
                          <Field label="Placa" hint="Formato antigo ou Mercosul, sem hífen">
                            <input
                              className={cn(inputCls, "uppercase tracking-widest")}
                              placeholder="ABC1D23"
                              value={form.plate}
                              onChange={(e) => set("plate", maskPlate(e.target.value))}
                            />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Quilometragem aproximada">
                              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
                                {mileageRanges.map((m) => (
                                  <button
                                    key={m}
                                    type="button"
                                    onClick={() => set("mileage", m)}
                                    className={cn(
                                      "rounded-xl border px-3 py-2.5 text-xs font-medium transition",
                                      form.mileage === m
                                        ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
                                        : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200",
                                    )}
                                  >
                                    {m}
                                  </button>
                                ))}
                              </div>
                            </Field>
                          </div>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="space-y-8">
                          <div className="grid gap-3">
                            {packages.map((p) => {
                              const selected = form.packageId === p.id;
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => set("packageId", p.id)}
                                  className={cn(
                                    "flex items-center gap-4 rounded-2xl border p-4 text-left transition md:p-5",
                                    selected
                                      ? "border-amber-400/60 bg-amber-400/[0.07]"
                                      : "border-white/10 hover:border-white/20",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                                      selected ? "border-amber-400 bg-amber-400" : "border-zinc-600",
                                    )}
                                  >
                                    {selected && <Check className="h-3 w-3 text-zinc-950" strokeWidth={3} />}
                                  </span>
                                  <span className="flex-1">
                                    <span className="flex items-center gap-2 font-semibold text-zinc-100">
                                      {p.name}
                                      {p.popular && (
                                        <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                                          Popular
                                        </span>
                                      )}
                                    </span>
                                    <span className="mt-0.5 block text-xs text-zinc-500">
                                      {p.tagline} · {p.duration}
                                    </span>
                                  </span>
                                  <span className="font-semibold text-zinc-100">{formatBRL(p.price)}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                              Adicionais (opcional)
                            </p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {addons.map((a) => {
                                const on = form.addons.includes(a.id);
                                return (
                                  <button
                                    key={a.id}
                                    type="button"
                                    onClick={() => toggleAddon(a.id)}
                                    className={cn(
                                      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                                      on
                                        ? "border-amber-400/60 bg-amber-400/[0.07] text-zinc-100"
                                        : "border-white/10 text-zinc-400 hover:border-white/20",
                                    )}
                                  >
                                    <span className="flex items-center gap-2.5">
                                      <span
                                        className={cn(
                                          "flex h-4 w-4 items-center justify-center rounded border",
                                          on ? "border-amber-400 bg-amber-400" : "border-zinc-600",
                                        )}
                                      >
                                        {on && <Check className="h-3 w-3 text-zinc-950" strokeWidth={3} />}
                                      </span>
                                      {a.label}
                                    </span>
                                    <span className="text-xs text-zinc-500">+{formatBRL(a.price)}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-8">
                          <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                              Escolha o dia
                            </p>
                            <div className="-mx-1 flex max-w-full touch-pan-x gap-2 overflow-x-auto overscroll-x-contain px-1 pb-3">
                              {days.length === 0 && (
                                <div className="h-20 w-full animate-pulse rounded-2xl bg-white/5" />
                              )}
                              {days.map(({ iso, date }) => {
                                const active = form.date === iso;
                                return (
                                  <button
                                    key={iso}
                                    type="button"
                                    onClick={() => {
                                      set("date", iso);
                                      set("time", "");
                                    }}
                                    className={cn(
                                      "flex w-[68px] shrink-0 flex-col items-center rounded-2xl border py-3 transition",
                                      active
                                        ? "border-amber-400 bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20"
                                        : "border-white/10 text-zinc-400 hover:border-white/20",
                                    )}
                                  >
                                    <span className={cn("text-[11px] uppercase", active ? "text-zinc-800" : "text-zinc-500")}>
                                      {weekdayShort[date.getDay()]}
                                    </span>
                                    <span className="mt-0.5 text-xl font-semibold">{date.getDate()}</span>
                                    <span className={cn("text-[11px] uppercase", active ? "text-zinc-800" : "text-zinc-600")}>
                                      {monthShort[date.getMonth()]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                              Horário de chegada
                            </p>
                            {!form.date ? (
                              <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-zinc-600">
                                Selecione um dia para ver os horários disponíveis.
                              </p>
                            ) : (
                              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                                {timeSlots.map((t) => {
                                  const isBusy = busy.has(t);
                                  const active = form.time === t;
                                  return (
                                    <button
                                      key={t}
                                      type="button"
                                      disabled={isBusy}
                                      onClick={() => set("time", t)}
                                      className={cn(
                                        "rounded-xl border py-3 text-sm font-medium transition",
                                        isBusy && "cursor-not-allowed border-white/5 text-zinc-700 line-through",
                                        !isBusy && active && "border-amber-400 bg-amber-400 text-zinc-950",
                                        !isBusy && !active && "border-white/10 text-zinc-300 hover:border-amber-400/40",
                                      )}
                                    >
                                      {t}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Field label="Nome completo">
                              <input
                                className={inputCls}
                                placeholder="Como devemos te chamar?"
                                autoComplete="name"
                                value={form.name}
                                onChange={(e) => set("name", e.target.value)}
                              />
                            </Field>
                          </div>
                          <Field label="WhatsApp">
                            <input
                              className={inputCls}
                              inputMode="tel"
                              autoComplete="tel"
                              placeholder="(11) 99999-9999"
                              value={form.phone}
                              onChange={(e) => set("phone", maskPhone(e.target.value))}
                            />
                          </Field>
                          <Field label="E-mail">
                            <input
                              className={inputCls}
                              type="email"
                              autoComplete="email"
                              placeholder="voce@email.com"
                              value={form.email}
                              onChange={(e) => set("email", e.target.value)}
                            />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Observações (opcional)" hint="Barulhos, luzes no painel, histórico de manutenção…">
                              <textarea
                                rows={3}
                                className={cn(inputCls, "resize-none")}
                                placeholder="Algo que a gente deva saber sobre o seu carro?"
                                value={form.notes}
                                onChange={(e) => set("notes", e.target.value)}
                              />
                            </Field>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navegação */}
                <div className="sticky bottom-0 z-30 -mx-4 mt-8 flex items-center justify-between gap-2 border-t border-white/10 bg-zinc-950/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] backdrop-blur-lg sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-6 sm:shadow-none">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex min-h-12 shrink-0 touch-manipulation items-center gap-1 rounded-full px-3 py-3 text-sm font-medium text-zinc-400 transition hover:text-zinc-100 disabled:invisible sm:gap-1.5 sm:px-4"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={!canNext}
                      onClick={() => setStep((s) => s + 1)}
                      className="inline-flex min-h-12 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-full bg-amber-400 px-4 py-3 text-center text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none sm:flex-none sm:px-6"
                    >
                      Continuar
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!canNext || submitting}
                      onClick={submit}
                      className="inline-flex min-h-12 flex-1 touch-manipulation items-center justify-center gap-2 rounded-full bg-amber-400 px-3 py-3 text-center text-xs font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none sm:flex-none sm:px-6 sm:text-sm"
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950" />
                          Confirmando…
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="h-4 w-4" />
                          Confirmar agendamento
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Resumo */}
              <aside className="border-t border-white/10 bg-black/20 p-6 md:p-8 lg:border-l lg:border-t-0">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Resumo do agendamento
                </p>

                <dl className="mt-5 space-y-4 text-sm">
                  <SummaryRow icon={Car} label="Veículo">
                    {form.brand || form.model
                      ? `${form.brand} ${form.model}${form.year ? ` · ${form.year}` : ""}`
                      : "—"}
                    {form.plate && (
                      <span className="mt-0.5 block text-xs tracking-widest text-zinc-500">{form.plate}</span>
                    )}
                  </SummaryRow>
                  <SummaryRow icon={Wrench} label="Serviço">
                    {pkg.name}
                    {form.addons.length > 0 && (
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        + {form.addons.length} adicional{form.addons.length > 1 ? "is" : ""}
                      </span>
                    )}
                  </SummaryRow>
                  <SummaryRow icon={Clock} label="Data e hora">
                    {form.date ? (
                      <>
                        <span className="capitalize">{formatLongDate(form.date)}</span>
                        {form.time && <span className="text-zinc-500"> · {form.time}</span>}
                      </>
                    ) : (
                      "—"
                    )}
                  </SummaryRow>
                </dl>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-sm text-zinc-400">Total estimado</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-semibold tracking-tight text-zinc-50"
                    >
                      {formatBRL(total)}
                    </motion.span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-600">Pagamento somente na retirada do veículo.</p>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] p-4 text-xs leading-relaxed text-emerald-200/80">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  Cancelamento gratuito até 4h antes e garantia de 6 meses em todos os serviços.
                </div>
              </aside>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs text-zinc-500">{label}</dt>
        <dd className="mt-0.5 font-medium text-zinc-200">{children}</dd>
      </div>
    </div>
  );
}

function Success({
  protocol,
  form,
  pkgName,
  total,
  onReset,
}: {
  protocol: string;
  form: Form;
  pkgName: string;
  total: number;
  onReset: () => void;
}) {
  const message = encodeURIComponent(
    `Olá! Acabei de agendar a revisão (${protocol}) para ${formatLongDate(form.date)} às ${form.time}.`,
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center px-6 py-14 text-center md:py-20"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 ring-8 ring-emerald-400/5"
      >
        <PartyPopper className="h-9 w-9" />
      </motion.div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
        Agendamento confirmado, {form.name.split(" ")[0]}!
      </h3>
      <p className="mt-2 max-w-md text-zinc-400">
        Enviamos os detalhes para <strong className="text-zinc-200">{form.email}</strong> e para o seu WhatsApp.
      </p>

      <div className="mt-8 w-full max-w-md divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] text-left text-sm">
        {[
          ["Protocolo", protocol],
          ["Veículo", `${form.brand} ${form.model} · ${form.plate}`],
          ["Serviço", pkgName],
          ["Quando", `${formatLongDate(form.date)} às ${form.time}`],
          ["Total estimado", formatBRL(total)],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <span className="text-zinc-500">{k}</span>
            <span className={cn("text-right font-medium text-zinc-100", k === "Protocolo" && "font-mono tracking-widest text-amber-300", k === "Quando" && "capitalize")}>
              {v}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-md text-xs text-zinc-600">{business.address}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={`https://wa.me/${business.whatsapp}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 active:scale-95"
        >
          Confirmar no WhatsApp
        </a>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5 active:scale-95"
        >
          Fazer novo agendamento
        </button>
      </div>
    </motion.div>
  );
}
