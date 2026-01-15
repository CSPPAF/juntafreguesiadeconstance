import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const data = await req.formData()

  const transporter = nodemailer.createTransport({
    host: "smtp.seudominio.pt",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const body = `
Nova comunicação recebida:

Tipo: ${data.get("tipo")}
Nome: ${data.get("nome")}
Email: ${data.get("email")}
Contacto: ${data.get("contacto")}

Morada: ${data.get("morada")}
Código Postal: ${data.get("codigoPostal")}

Descrição:
${data.get("descricao")}
  `

  await transporter.sendMail({
    from: `"Site Junta" <${process.env.EMAIL_USER}>`,
    to: "geral@seudominio.pt",
    subject: "Nova Ocorrência / Sugestão",
    text: body,
  })

  return NextResponse.json({ success: true })
}
