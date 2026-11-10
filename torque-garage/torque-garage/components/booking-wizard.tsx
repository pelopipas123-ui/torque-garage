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
