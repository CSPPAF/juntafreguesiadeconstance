'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SanityHomeHighlight } from '../../app/getHomeHighlights'
import React from 'react'

type Props = {
  items: SanityHomeHighlight[]
  onGoToSection: (slug: string) => void
  eventosSlug: string // nova prop para section Eventos
}

const ITEMS_PER_PAGE = 4

export default function HomeHighlights({ items, onGoToSection, eventosSlug }: Props) {
  const [index, setIndex] = useState(0)

  const canPrev = index > 0
  const canNext = index + ITEMS_PER_PAGE < items.length

  const visibleItems = items.slice(index, index + ITEMS_PER_PAGE)

  const handleClick = (targetSlug: string, itemIndex: number) => {
    let sectionId = targetSlug.replace(/^#/, '')

    // ✅ Regra especial: 4º destaque (índice 3) vai para a section Eventos do Footer
    if (itemIndex === 3) {
      sectionId = eventosSlug
    }

    // Atualiza a hash
    window.location.hash = `#${sectionId}`

    // Atualiza o state
    onGoToSection(sectionId)

    // Scroll suave
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="relative">
        {canPrev && (
          <button
            onClick={() => setIndex(index - ITEMS_PER_PAGE)}
            className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
          >
            <ChevronLeft />
          </button>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {visibleItems.map((item, idx) => {
            const IconName = item.icon
            const Icon = ((Icons as unknown) as Record<string, React.ElementType>)[IconName] ?? Icons.Circle

            return (
              <button
                key={idx}
                onClick={() => handleClick(item.targetSlug, idx)}
                className="flex flex-col items-center gap-2 hover:scale-105 transition"
              >
                <Icon className="w-10 h-10 text-blue-600" />
                <div className="font-bold text-lg">{item.titleTop}</div>
              </button>
            )
          })}
        </div>

        {canNext && (
          <button
            onClick={() => setIndex(index + ITEMS_PER_PAGE)}
            className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2"
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </section>
  )
}
