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
