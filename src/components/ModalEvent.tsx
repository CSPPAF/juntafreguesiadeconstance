'use client'

import Image from 'next/image'
import { ChevronUp } from 'lucide-react'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { SanityEvent } from '../../app/getEvents'
import { ASSOCIATION_COLORS } from './eventColors'

interface ModalProps {
  event: SanityEvent
  onClose: () => void
}

export default function ModalEvent({ event, onClose }: ModalProps) {
  const color =
    event.association
      ? ASSOCIATION_COLORS[event.association]
      : 'bg-blue-600'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full rounded shadow-lg overflow-hidden relative">

        <div className={`${color} text-white p-4`}>
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="text-sm opacity-90">
            {new Date(event.date).toLocaleDateString('pt-PT')}
          </p>
        </div>

        <button
          className="absolute top-4 right-4 text-white"
          onClick={onClose}
        >
          <ChevronUp size={24} />
        </button>

        <div className="p-6">
          {event.image && (
            <Image
              src={event.image.asset.url}
              alt={event.title}
              width={400}
              height={200}
              className="object-cover w-full rounded mb-4"
            />
          )}

          <PortableTextRenderer value={event.description} />
        </div>
      </div>
    </div>
  )
}
