'use client'

const TYPES = [
  { label: 'Todos', value: '' }, // mudar null para ''
  { label: 'Cultura', value: 'cultura' },
  { label: 'Desporto', value: 'desporto' },
  { label: 'Festas', value: 'festas' },
  { label: 'Institucional', value: 'institucional' },
]

export default function EventFilter({
  value,
  onChange,
}: {
  value: string | null
  onChange: (v: string | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      {TYPES.map(t => (
        <button
          key={t.label}
          onClick={() => onChange(t.value)}
          className={`px-4 py-2 rounded-full border transition ${
            value === t.value
              ? 'bg-blue-600 text-white'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
