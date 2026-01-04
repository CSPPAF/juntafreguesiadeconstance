'use client'
import { useState } from 'react'
import Modal from './Modal'
import { DocumentArrowDownIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import FormularioContato from './FormularioContato'
import React from 'react'

type SecaoFuncional = (props: { onOpenForm: () => void }) => React.ReactNode

const secções: Record<string, React.ReactNode | SecaoFuncional> = {
  'Contactos': ({ onOpenForm }: { onOpenForm: () => void }) => (
  <div className="space-y-6 text-gray-700 text-sm">
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Telefone</h3>
      <p>Chamada para rede fixa nacional: <strong>(+351) 229 996 731</strong></p>

      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
      <p><a href="mailto:geral@jfconstance.pt" className="text-blue-600 hover:underline">geral@jfconstance.pt</a></p>
	  
	  <button
        onClick={onOpenForm}
        className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Contacta-nos
      </button>
    </section>

      <h3 className="text-lg font-semibold text-gray-900">Morada</h3>
      <p>
        Rua Santa Eulália, nº 9<br />
        Marco de Canaveses
      </p>

      <h3 className="text-lg font-semibold text-gray-900">GPS</h3>
	  <p>Latitude: 41º 12’ 45.62” N<br />Longitude: 8º 10’ 10.52” W</p>

      {/* Mapa embed do Google Maps */}
      <div className="mt-4">
        <iframe
          className="w-full h-64 rounded-md shadow"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3047.719647!2d-8.1695894!3d41.2126716!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464e617f47463%3A0x4b623df5be79aa44!2sRua%20Santa%20Eul%C3%A1lia%2C%209%2C%20Marco%20de%20Canaveses!5e0!3m2!1spt-PT!2spt!4v1710000000000"
          loading="lazy"
        ></iframe>
      </div>

    <section className="space-y-2">
		<h3 className="text-lg font-semibold text-gray-900">Localização</h3>
		<p>
			Localizada em Constance, um local sossegado do concelho de Marco de Canaveses, e de fácil acesso, situa-se a 30 min do Grande Porto e a 5 min de Marco de Canaveses.
		</p>
    </section>
  </div>
)
}

export default function Footer() {
  const [modalAberto, setModalAberto] = useState<string | null>(null)
  const [mostrarForm, setMostrarForm] = useState(false)

  return (
    <>
		<footer className="bg-gray-900 text-white px-6 py-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

    {/* COLUNA 1 */}
    <div className="flex flex-col">
      {/* Cabeçalho alinhado */}
      <div className="flex items-center gap-3 min-h-[80px]">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-16 h-16 object-contain"
        />
        <h4 className="text-lg font-semibold">
          Junta Freguesia de Constance
        </h4>
      </div>

      {/* Conteúdo */}
      <p className="text-sm leading-relaxed text-gray-300 mt-4">
        Rua Santa Eulália, nº 9<br />
        Marco de Canaveses<br />
        Email: geral@jfconstance.pt<br />
        Chamada para rede móvel:{" "}
        <span className="font-semibold">(+351) 967 152 991</span><br />
        Horário de Funcionamento:<br />
        Seg. a Sex.: 9h00 - 12h30 / 14h00 - 17h30
      </p>
    </div>

    {/* COLUNA 2 */}
    <div className="flex flex-col">
      {/* Cabeçalho alinhado */}
      <div className="min-h-[80px] flex items-center">
        <h4 className="text-lg font-semibold">Freguesia</h4>
      </div>

      <ul className="space-y-2 text-sm">
        <li>
          <button
            onClick={() => setModalAberto("O Centro")}
            className="hover:underline"
          >
            Agenda de Eventos
          </button>
        </li>
      </ul>
    </div>

    {/* COLUNA 3 */}
    <div className="flex flex-col">
      {/* Cabeçalho alinhado */}
      <div className="min-h-[80px] flex items-center">
        <h4 className="text-lg font-semibold">Outros</h4>
      </div>

      <ul className="space-y-2 text-sm">
        <li>
          <button
            onClick={() => setModalAberto("Contactos")}
            className="hover:underline"
          >
            Contactos
          </button>
        </li>
        <li>
          <button
            onClick={() => setModalAberto("Notícias")}
            className="hover:underline"
          >
            Notícias
          </button>
        </li>
      </ul>
    </div>

  </div>

  {/* Direitos reservados */}
  <div className="mt-10 text-center">
    <p className="text-xs text-gray-400">
      © {new Date().getFullYear()} Junta de Freguesia de Constance.
      Todos os direitos reservados.
    </p>
  </div>
</footer>

      {/* Modal dinâmico */}
      {modalAberto && (
        <Modal
          title={modalAberto}
          onClose={() => {
            setModalAberto(null)
            setMostrarForm(false)
          }}
          open={true}
        >
          {(() => {
            const secao = secções[modalAberto]

            if (typeof secao === 'function') {
              return secao({ onOpenForm: () => setMostrarForm(true) })
            }

            return secao
          })()}
        </Modal>
      )}
	  
	  {mostrarForm && (
		  <Modal
			title="Pedido de Informação"
			onClose={() => setMostrarForm(false)}
			open={true}
		  >
			<FormularioContato />
		  </Modal>
		  

	  )}
    </>
  )
}
