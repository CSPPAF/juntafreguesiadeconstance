'use client'

import { useState } from 'react'
import { SanityEvent } from '../../app/getEvents'
import ModalEvent from './ModalEvent'
import { ASSOCIATION_COLORS } from './eventColors'

interface CalendarProps {
  events: SanityEvent[]
}

export default function Calendar({ events }: CalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const currentYear = new Date().getFullYear()

  const daysInMonth = (month: number) =>
    new Date(currentYear, month + 1, 0).getDate()

  const eventsByDay = (month: number) =>
    events.filter(e => new Date(e.date).getMonth() === month)

  const getEventsOfDay = (day: number, month: number) =>
    eventsByDay(month).filter(e => new Date(e.date).getDate() === day)

  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)

  const handleNextMonth = () =>
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Navegação do mês */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <button
          onClick={handlePrevMonth}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full transition-transform duration-200 hover:scale-105"
        >
          ‹
        </button>

        <h3 className="text-lg font-bold capitalize">
          {new Date(currentYear, currentMonth).toLocaleString('pt-PT', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>

        <button
          onClick={handleNextMonth}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full transition-transform duration-200 hover:scale-105"
        >
          ›
        </button>
      </div>

      {/* Calendário */}
      <div className="grid grid-cols-7 gap-1 w-full max-w-md">
        {Array.from({ length: daysInMonth(currentMonth) }).map((_, idx) => {
          const day = idx + 1
          const dayEvents = getEventsOfDay(day, currentMonth)
          const hasEvent = dayEvents.length > 0
          const event = dayEvents[0]
		
          return (
            <div
              key={day}
              className={`relative border p-2 text-center rounded cursor-pointer transition
                ${hasEvent ? 'bg-blue-100 hover:bg-blue-200' : ''}
              `}
              title={hasEvent ? dayEvents.map(e => e.title).join(', ') : ''}
              onClick={() => hasEvent && setSelectedEvent(event)}
            >
              {day}

              {/* Bolinha (mantida) */}
              {hasEvent && (
				  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
				  {dayEvents.slice(0, 3).map((e, i) => {
					const color =
					  e.association
						? ASSOCIATION_COLORS[e.association]
						: 'bg-blue-600'

					return (
					  <span
						key={i}
						className={`w-2 h-2 rounded-full ${color}`}
					  />
					)
				  })}

				  {dayEvents.length > 3 && (
					<span className="text-[10px] text-gray-700">
					  +{dayEvents.length - 3}
					</span>
				  )}
				</div>
			  )}
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <ModalEvent
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
