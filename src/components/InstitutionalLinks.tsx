'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Link } from 'lucide-react'
import { SanityInstitutionalLink } from '../../app/getInstitutionalLinks'
import { urlFor } from '../../app/imageUrl'

type Props = {
  items: SanityInstitutionalLink[]
}

const ITEMS_PER_PAGE = 4

export default function InstitutionalLinks({ items }: Props) {
  const [index, setIndex] = useState(0)

  const canPrev = index > 0
  const canNext = index + ITEMS_PER_PAGE < items.length

  const visibleItems = items.slice(index, index + ITEMS_PER_PAGE)

  return (
    <section className="border-t bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-5">
		<h3 className="mb-8 flex flex-col items-center">
		  <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
			<Link className="w-5 h-5 text-blue-600" />
			<span>Links Úteis</span>
		  </div>

		  <div className="mt-2 h-px w-full bg-gray-300" />
		</h3>

        <div className="relative">
		  {canPrev && (
			<button
			  onClick={() => setIndex(index - ITEMS_PER_PAGE)}
			  className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10" // aumentei -left-4 → -left-10 e z-10 para sobrepor
			>
			  <ChevronLeft />
			</button>
		  )}

		  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center px-6"> 
			{/* px-6 adiciona espaçamento extra nas laterais da grid */}
			{visibleItems.map((item, idx) => {
			  if (!item.logo?.asset?._ref) return null

			  return (
				<a
				  key={idx}
				  href={item.url}
				  target="_blank"
				  rel="noopener noreferrer"
				  className="flex justify-center items-center opacity-80 hover:opacity-100 transition"
				>
				  <Image
					src={urlFor(item.logo)}
					alt={item.title}
					width={100}
					height={70}
					className="object-contain w-[80px] h-auto sm:w-[100px] md:w-[70px]"
				  />
				</a>
			  )
			})}
		  </div>

		  {canNext && (
			<button
			  onClick={() => setIndex(index + ITEMS_PER_PAGE)}
			  className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
			>
			  <ChevronRight />
			</button>
		  )}
		</div>
      </div>
    </section>
  )
}
