'use client'

import { useState, useEffect } from 'react'
import { SanityEvent } from '../../app/getEvents'
import ModalEvent from './ModalEvent'
import { ASSOCIATION_COLORS } from './eventColors'

interface CalendarProps {
  events: SanityEvent[]
}

export default function Calendar({ events }: CalendarProps) {
  const [selectedEvents, setSelectedEvents] = useState<SanityEvent[] | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [maxDots, setMaxDots] = useState<number>(3)

  const currentYear = new Date().getFullYear()

  /* 🔵 Bolinhas por breakpoint */
  useEffect(() => {
    const updateDots = () => {
      setMaxDots(window.innerWidth < 640 ? 2 : 3)
    }

    updateDots()
    window.addEventListener('resize', updateDots)
    return () => window.removeEventListener('resize', updateDots)
  }, [])

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

          return (
            <div
              key={day}
              className={`relative border p-2 rounded cursor-pointer transition
                flex flex-col items-center
                ${hasEvent ? 'bg-blue-100 hover:bg-blue-200' : ''}
              `}
              title={hasEvent ? dayEvents.map(e => e.title).join(', ') : ''}
              onClick={() => {
                if (!hasEvent) return

                if (dayEvents.length === 1) {
                  setSelectedEvent(dayEvents[0])
                } else {
                  setSelectedEvents(dayEvents)
                }
              }}
            >
              {/* Número do dia */}
              <span className="text-sm font-medium leading-none">
                {day}
              </span>

              {/* 🔵 Bolinhas (logo abaixo do número) */}
              {hasEvent && (
                <div className="mt-1 flex items-center gap-1">
                  {dayEvents.slice(0, maxDots).map((e, i) => {
                    const color =
                      e.association
                        ? ASSOCIATION_COLORS[e.association]
                        : 'bg-blue-600'

                    return (
                      <span
                        key={i}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${color}`}
                      />
                    )
                  })}

                  {dayEvents.length > maxDots && (
                    <span className="text-[10px] text-gray-700">
                      +{dayEvents.length - maxDots}
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 📋 Modal lista de eventos do dia */}
      {selectedEvents && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Eventos do dia</h2>

            <ul className="space-y-3">
              {selectedEvents.map(event => (
                <li
                  key={event._id}
                  className="cursor-pointer p-3 border rounded hover:bg-gray-100"
                  onClick={() => {
                    setSelectedEvents(null)
                    setSelectedEvent(event)
                  }}
                >
                  {event.title}
                </li>
              ))}
            </ul>

            <button
              className="mt-6 text-sm text-gray-600 hover:underline"
              onClick={() => setSelectedEvents(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* 📌 Modal evento único */}
      {selectedEvent && (
        <ModalEvent
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
