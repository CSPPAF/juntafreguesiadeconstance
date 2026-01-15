'use client'

import { SanityEvent } from '../../app/getEvents'

export default function UpcomingEvents({ events }: { events: SanityEvent[] }) {
  const upcoming = events.filter(e => new Date(e.date) >= new Date())

  if (!upcoming.length) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-semibold mb-6">
        Próximos eventos
      </h3>

      <ul className="space-y-4">
        {upcoming.map(e => (
          <li
            key={e.slug}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <span>{e.title}</span>
            <span className="text-sm text-gray-500">
              {new Date(e.date).toLocaleDateString('pt-PT')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
