"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PoliticaPrivacidade() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 underline hover:text-blue-800 transition">
          aqui
        </button>
      </DialogTrigger>
      <DialogContent className="!w-full !max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Politica de Privacidade – Formulário de Ocorrências e Sugestões</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-800">
          <p><strong>Junta de Freguesia de Constance</strong></p>
          <p>
			Ao enviar este formulário, os seus dados pessoais (nome, contacto, email e informação sobre a ocorrência ou sugestão) serão tratados <strong>exclusivamente pela Junta de Freguesia de Constance</strong> para responder à sua ocorrência ou considerar a sua sugestão, e para efeitos de gestão administrativa.
		  </p>
          <p>
			O tratamento é baseado na <strong>execução de uma função de interesse público e no cumprimento de obrigações legais</strong>. Apenas os colaboradores autorizados da Junta terão acesso aos seus dados, que <strong>não serão partilhados com terceiros para fins comerciais</strong>.
		  </p>
		  <p>
		    Os seus dados serão conservados apenas pelo tempo necessário para tratar a ocorrência ou sugestão e cumprir as obrigações legais. Tem o direito de <strong>aceder, corrigir, limitar ou eliminar os seus dados</strong>, bem como <strong>retirar o consentimento</strong> quando aplicável.
		  </p>
		  <p>
		    Para exercer os seus direitos ou esclarecer dúvidas, contacte o nosso Encarregado de Proteção de Dados (DPO) pelo email <strong>dpo@jf-constance.pt</strong> ou pelo telefone <strong>+351 255 536 461</strong>, ou envie uma carta para <strong>Rua Santa Eulália, nº 9, Constance, Marco de Canaveses</strong>.
		  </p>
		  <p>
		    <strong>Ao submeter este formulário, confirma que leu e concorda com a forma como os seus dados serão tratados.</strong>
		  </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
