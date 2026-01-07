'use client'

import { useCallback, useRef, useEffect } from 'react'
import MensagemPresidente from "@/components/MensagemPresidente"
import MenuDesktop from '@/components/MenuDesktop'
import MenuMobile from '@/components/MenuMobile'
import Footer from '@/components/Footer'
import Link from "next/link"

export default function HomePage() {
  return (
    <main id="top" className="min-h-screen scroll-smooth">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between flex-wrap gap-4">
        {/* Esquerda: Logo + Nome */}
        <div className="flex items-center gap-4 flex-nowrap min-w-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-16 w-auto md:h-24"
          />

          <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight flex-1 min-w-0">
            Junta Freguesia de Constance
          </h1>
        </div>
      </header>

      {/* Menu Desktop (apenas PC) */}
      <MenuDesktop className="hidden lg:block" />

      {/* Menu Mobile (mobile + tablet) */}
      <MenuMobile className="block lg:hidden" />

      {/* Botão voltar ao topo */}
      <a
        href="#top"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
        aria-label="Voltar ao topo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </a>

      {/* Conteúdo principal */}
      <MensagemPresidente />

      {/* Rodapé */}
      <Footer />
    </main>
  )
}
