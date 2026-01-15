'use client'

import { useState } from 'react'
import { SanityEvent } from '../../app/getEvents'
import ModalEvent from './ModalEvent'

interface CalendarProps {
  events: SanityEvent[]
}

export default function Calendar({ events }: CalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const currentYear = new Date().getFullYear()

  const daysInMonth = (month: number) => new Date(currentYear, month + 1, 0).getDate()

  const eventsByDay = (month: number) => events.filter(e => new Date(e.date).getMonth() === month)

  const getEventsOfDay = (day: number, month: number) =>
    eventsByDay(month).filter(e => new Date(e.date).getDate() === day)

  const handlePrevMonth = () => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)
  const handleNextMonth = () => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Navegação do mês */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
  {/* Botão mês anterior */}
  <button
    onClick={handlePrevMonth}
    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full transition-transform duration-200 transform hover:scale-105 focus:outline-none"
  >
    {/* Ícone SVG para esquerda */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <h3 className="text-lg font-bold capitalize">
    {new Date(currentYear, currentMonth).toLocaleString('pt-PT', { month: 'long', year: 'numeric' })}
  </h3>

  {/* Botão mês seguinte */}
  <button
    onClick={handleNextMonth}
    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full transition-transform duration-200 transform hover:scale-105 focus:outline-none"
  >
    {/* Ícone SVG para direita */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
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
              className={`relative border p-2 text-center rounded cursor-pointer transition ${
                hasEvent ? 'bg-blue-100 hover:bg-blue-200' : ''
              }`}
              title={hasEvent ? dayEvents.map(e => e.title).join(', ') : ''}
              onClick={() => hasEvent && setSelectedEvent(dayEvents[0])}
            >
              {day}
              {/* Badge / Dot para eventos */}
              {hasEvent && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal do evento */}
      {selectedEvent && (
        <ModalEvent event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}
