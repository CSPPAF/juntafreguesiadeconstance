'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import { ChevronLeft, ChevronRight, Link } from 'lucide-react'
import { SanityHomeHighlight } from '../../app/getHomeHighlights'
import React from 'react'

type Props = {
  items: SanityHomeHighlight[]
  onGoToSection: (slug: string) => void
  eventosSlug: string // Adicionado para referência dinâmica
}

const ITEMS_PER_PAGE = 4

export default function HomeHighlights({ items, onGoToSection, eventosSlug }: Props) {
  const [index, setIndex] = useState(0)

  const canPrev = index > 0
  const canNext = index + ITEMS_PER_PAGE < items.length

  const visibleItems = items.slice(index, index + ITEMS_PER_PAGE)

  const handleClick = (targetSlug: string) => {
    let sectionId = targetSlug.replace(/^#/, '')

    // ✅ Se for o destaque de Eventos, usamos o slug do Footer
    if (sectionId.toLowerCase() === 'eventos') {
      sectionId = eventosSlug
    }

    // Atualiza a hash
    window.location.hash = `#${sectionId}`

    // Atualiza o state e scroll
    onGoToSection(sectionId)
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
	  <div className="max-w-6xl mx-auto px-5">
	    <h3 className="mb-8 flex flex-col items-center">
		  <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
			<Link className="w-5 h-5 text-blue-600" />
			<span>Acessos Rápidos</span>
		  </div>

		  <div className="mt-2 h-px w-full bg-gray-300" />
		</h3>
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
			  const Icon =
				((Icons as unknown) as Record<string, React.ElementType>)[IconName] ??
				Icons.Circle

			  const rawSlug = item.targetSlug.replace(/^#/, '')
			  const sectionId =
				rawSlug.toLowerCase() === 'eventos' ? eventosSlug : rawSlug

			  return (
				<a
				  key={idx}
				  href={`#${sectionId}`}   // ✅ ISTO é o segredo
				  onClick={() => {
					onGoToSection(sectionId)
				  }}
				  className="flex flex-col items-center gap-2 hover:scale-105 transition cursor-pointer"
				>
				  <Icon className="w-10 h-10 text-blue-600" />
				  <div className="font-bold text-lg">{item.titleTop}</div>
				</a>
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
      </div>
    </section>
  )
}
