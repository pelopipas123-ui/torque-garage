
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Booking = {
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  year: string | number;
  plate: string;
  mileage: string;
  packageId: string;
  addons?: string[];
  date: string;
  time: string;
  notes?: string;
};

function validText(value: unknown, max = 255): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= max
  );
}

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T12:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export async function POST(request: NextRequest) {
  try {
    let body: Booking;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "JSON inválido." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Dados inválidos." },
        { status: 400 }
      );
    }

    const required = [
      body.name,
      body.phone,
      body.email,
      body.brand,
      body.model,
      body.plate,
      body.mileage,
      body.packageId,
      body.date,
      body.time,
    ];

    if (!required.every((value) => validText(value))) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    const plate = body.plate
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase();

    const year = Number(body.year);

    if (
      body.name.trim().length < 3 ||
      body.phone.replace(/\D/g, "").length < 10 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ||
      !/^\d{4}$/.test(String(body.year)) ||
      year < 1900 ||
      year > new Date().getFullYear() + 1 ||
      !/^[A-Z0-9]{7}$/.test(plate) ||
      !validDate(body.date) ||
      !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(body.time) ||
      !Array.isArray(body.addons ?? []) ||
      !(body.addons ?? []).every((item) =>
        validText(item, 100)
      ) ||
      !(
        body.notes === undefined ||
        (typeof body.notes === "string" &&
          body.notes.length <= 1000)
      )
    ) {
      return NextResponse.json(
        { error: "Confira os dados do agendamento." },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext();
    const db = env.DB;

    if (!db) {
      return NextResponse.json(
        { error: "Banco de dados não configurado." },
        { status: 503 }
      );
    }

    const details = JSON.stringify({
      pacote: body.packageId,
      adicionais: body.addons ?? [],
      observacoes: body.notes ?? "",
    });

    const statements = [
      db.prepare(
        `INSERT INTO clientes (nome, telefone, email)
         VALUES (?, ?, ?)`
      ).bind(
        body.name.trim(),
        body.phone.trim(),
        body.email.trim()
      ),

      db.prepare(
        `INSERT INTO veiculos
         (cliente_id, marca, modelo, ano, placa, quilometragem)
         VALUES (
           (SELECT MAX(id) FROM clientes),
           ?, ?, ?, ?, ?
         )`
      ).bind(
        body.brand.trim(),
        body.model.trim(),
        year,
        plate,
        body.mileage.trim()
      ),

      db.prepare(
        `INSERT INTO agendamentos
         (
           cliente_id,
           veiculo_id,
           servico_id,
           data,
           horario,
           status,
           observacoes
         )
         VALUES (
           (SELECT cliente_id FROM veiculos
            WHERE id = (SELECT MAX(id) FROM veiculos)),
           (SELECT MAX(id) FROM veiculos),
           NULL,
           ?, ?,
           'pendente',
           ?
         )`
      ).bind(body.date, body.time, details),
    ];

    await db.batch(statements);

    return NextResponse.json(
      {
        success: true,
        message: "Agendamento registrado com sucesso.",
        status: "pendente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar agendamento:", error);

    const message =
      error instanceof Error ? error.message : "";

    if (
      message.includes("UNIQUE constraint failed") ||
      message.includes("idx_agendamento_horario_ativo")
    ) {
      return NextResponse.json(
        { error: "Este horário já está reservado." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Não foi possível registrar o agendamento." },
      { status: 500 }
    );
  }
}
