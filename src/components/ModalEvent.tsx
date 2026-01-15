'use client'

import Image from 'next/image'
import { ChevronUp } from 'lucide-react'
import PortableTextRenderer from '@/lib/PortableTextRenderer'
import { SanityEvent } from '../../app/getEvents'

interface ModalProps {
  event: SanityEvent
  onClose: () => void
}

export default function ModalEvent({ event, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full p-6 rounded shadow-lg relative">
        <button
          className="absolute top-4 right-4 p-1 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ChevronUp size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(event.date).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>

        {event.image && (
          <div className="mb-4">
            <Image
              src={event.image.asset.url}
              alt={event.title}
              width={400}
              height={200}
              className="object-cover w-full rounded"
            />
          </div>
        )}

        <PortableTextRenderer value={event.description} />
      </div>
    </div>
  )
}
