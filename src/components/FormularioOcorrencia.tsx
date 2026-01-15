"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import PoliticaPrivacidade from "./PoliticaPrivacidade"

const MapOcorrencia = dynamic(() => import("./MapOcorrencia"), {
  ssr: false,
})

export default function FormularioOcorrencias() {
  const [tipo, setTipo] = useState<"ocorrencia" | "sugestao" | null>(null)

  const [form, setForm] = useState({
    nome: "",
    email: "",
    contacto: "",
    morada: "",
    codigoPostal: "",
    tipoOcorrencia: "",
    descricao: "",
    sugestao: "",
    latitude: "",
    longitude: "",
  })

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  const imagensRef = useRef<HTMLInputElement>(null)
  const pdfRef = useRef<HTMLInputElement>(null)

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append("tipo", tipo || "")

    if (imagensRef.current?.files) {
      Array.from(imagensRef.current.files)
        .slice(0, 2)
        .forEach(file => formData.append("imagens", file))
    }
    if (pdfRef.current?.files?.[0]) {
      formData.append("pdf", pdfRef.current.files[0])
    }

    try {
      const res = await fetch("/api/ocorrencias", {
        method: "POST",
        body: formData,
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <button className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
            Comunicar Ocorrência / Sugestão
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="!w-full !max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comunicar Ocorrência ou Sugestão</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm"
        >
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input
                required
                value={form.nome}
                onChange={e => handleChange("nome", e.target.value)}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <Label>Contacto</Label>
              <Input
                required
                value={form.contacto}
                onChange={e => handleChange("contacto", e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant={tipo === "ocorrencia" ? "default" : "outline"}
                onClick={() => setTipo("ocorrencia")}
              >
                Ocorrência
              </Button>
              <Button
                type="button"
                variant={tipo === "sugestao" ? "default" : "outline"}
                onClick={() => setTipo("sugestao")}
              >
                Sugestão
              </Button>
            </div>

            {tipo === "ocorrencia" && (
              <>
                <div>
                  <Label>Morada</Label>
                  <Input
                    value={form.morada}
                    onChange={e => handleChange("morada", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Código Postal</Label>
                  <Input
                    value={form.codigoPostal}
                    onChange={e =>
                      handleChange("codigoPostal", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>Tipo de Ocorrência</Label>
                  <Select
                    onValueChange={v =>
                      handleChange("tipoOcorrencia", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Cultura e Desporto",
                        "Ambiente",
                        "Escola Jardim de Infância",
                        "Escola 1º ciclo",
                        "Espaço Público",
                        "Espaços Verdes",
                        "Iluminação Pública",
                        "Cemitério da Freguesia",
                        "Vias, Passeios, sinalização e mobilidade",
                      ].map(item => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Descrição da Ocorrência</Label>
                  <Textarea
                    value={form.descricao}
                    onChange={e =>
                      handleChange("descricao", e.target.value)
                    }
                  />
                </div>
              </>
            )}

            {tipo === "sugestao" && (
              <div>
                <Label>Descrição da Sugestão</Label>
                <Textarea
                  value={form.sugestao}
                  onChange={e =>
                    handleChange("sugestao", e.target.value)
                  }
                />
              </div>
            )}

            {/* Uploads + Privacidade + Submit (idem já existente) */}
            <div>
              <Label>Imagens (até 2)</Label>
              <Input ref={imagensRef} type="file" multiple accept="image/*" />
            </div>

            <div>
              <Label>Anexo PDF</Label>
              <Input ref={pdfRef} type="file" accept="application/pdf" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox required />
              <Label>Li e aceito a Política de Privacidade</Label>
            </div>

            <p className="text-blue-600 underline">
              Clique <PoliticaPrivacidade /> para ler a Política de Privacidade
            </p>

            <Button type="submit" disabled={status === "loading"}>
              Enviar
            </Button>

            {status === "success" && (
              <p className="text-green-600">Enviado com sucesso</p>
            )}
            {status === "error" && (
              <p className="text-red-600">Erro ao enviar</p>
            )}
          </div>

          {/* MAPA atualiza campos morada + codigo postal */}
          <MapOcorrencia
            onLocationChange={({ lat, lng, morada, codigoPostal }) => {
              handleChange("latitude", String(lat))
              handleChange("longitude", String(lng))

              // preenche sem bloquear edição manual
              handleChange("morada", morada)
              handleChange("codigoPostal", codigoPostal)
            }}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
