import { CalendarCheck, Clock, Mail, MapPin, MessageCircle, Phone, Wrench } from "lucide-react";
import { business, footerLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      {/* CTA final */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/15 via-zinc-900 to-zinc-950 px-6 py-12 text-center md:px-16 md:py-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />
          <h2 className="relative text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Seu carro merece uma revisão de verdade.
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-zinc-400">
            Reserve seu horário agora e receba a confirmação em segundos.
          </p>
          <a
            href="#agendar"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 font-semibold text-zinc-950 shadow-xl shadow-amber-500/25 transition hover:bg-amber-300 active:scale-95"
          >
            <CalendarCheck className="h-4 w-4" />
            Agendar revisão
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:px-8">
        <div>
          <a href="#inicio" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-zinc-950">
              <Wrench className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Torque<span className="text-amber-400">Garage</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
            Mecânica premium com transparência total. Agende online, acompanhe pelo celular e dirija com tranquilidade.
          </p>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-zinc-200">{title}</h4>
            <ul className="mt-4 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-zinc-500 transition hover:text-zinc-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-zinc-200">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-500">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              {business.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-amber-400" />
              {business.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-amber-400" />
              {business.email}
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              {business.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-zinc-600 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Torque Garage Ltda. Todos os direitos reservados.</p>
          <p>CNPJ 00.000.000/0001-00 · Dados fictícios para demonstração</p>
        </div>
      </div>
    </footer>
  );
}
