'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SanityAviso } from '../../app/getAvisos'

type Props = {
  items: SanityAviso[]
}

const ITEMS_PER_PAGE = 4

export default function AvisosHighlights({ items }: Props) {
  const [index, setIndex] = useState(0)

  const canPrev = index > 0
  const canNext = index + ITEMS_PER_PAGE < items.length

  const visibleItems = items.slice(index, index + ITEMS_PER_PAGE)

  return (
    <section className="border-t py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-wide">
            AVISOS / EDITAIS
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Informação institucional, aqui e nos locais habituais
          </p>
        </div>

        <div className="relative">
          {/* Botão anterior */}
          {canPrev && (
            <button
              onClick={() => setIndex(index - ITEMS_PER_PAGE)}
              className="absolute -left-14 top-1/2 -translate-y-1/2 bg-white border shadow p-2"
            >
              <ChevronLeft />
            </button>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {visibleItems.map((item, idx) => {
              const href = item.link ?? item.pdf?.asset.url
              if (!href) return null

              return (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFD873] p-6 min-h-[220px] flex flex-col justify-between hover:brightness-95 transition"
                >
                  {/* Data */}
                  <span className="text-sm text-gray-700">
                    {new Date(item._createdAt).toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>

                  {/* Título */}
                  <h3 className="font-bold uppercase text-sm mt-4 text-gray-900 leading-snug">
                    {item.title}
                  </h3>

                  {/* Consultar */}
                  <span className="text-xs uppercase tracking-wide text-gray-800">
                    Consultar
                  </span>
                </a>
              )
            })}
          </div>

          {/* Botão seguinte */}
          {canNext && (
            <button
              onClick={() => setIndex(index + ITEMS_PER_PAGE)}
              className="absolute -right-14 top-1/2 -translate-y-1/2 bg-white border shadow p-2"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
