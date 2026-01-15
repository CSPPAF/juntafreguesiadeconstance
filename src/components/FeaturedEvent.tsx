'use client'

import Image from 'next/image'
import { SanityEvent } from '../../app/getEvents'
import { urlFor } from '../../app/imageUrl'

export default function FeaturedEvent({
  event,
  onOpen,
}: {
  event: SanityEvent
  onOpen: () => void
}) {
  if (!event) return null

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Evento em Destaque
      </h2>

      <div
        onClick={onOpen}
        className="cursor-pointer grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
      >
        {event.image && (
          <Image
            src={urlFor(event.image)}
            alt={event.title}
            width={600}
            height={400}
            className="object-cover h-full w-full"
          />
        )}

        <div className="p-6 flex flex-col justify-center">
          <p className="text-sm text-gray-500 mb-2">
            {new Date(event.date).toLocaleDateString('pt-PT')}
          </p>
          <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>
          <p className="text-blue-600 font-medium">Ver detalhes →</p>
        </div>
      </div>
    </div>
  )
}
