'use client'

import { useState } from 'react'
import { MenuItem } from './MenuDesktopTypes'

type Props = {
  menu: MenuItem[]
  className?: string
}

export default function MenuMobile({ menu, className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set())

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const closeAll = () => {
    setOpen(false)
    setOpenSubmenus(new Set())
  }

  const handleClick = (href?: string) => {
    closeAll()
    if (!href) return

    if (href.startsWith('#')) {
      window.location.hash = href
    } else {
      window.location.href = href
    }
  }

  const renderMenu = (items: MenuItem[], level = 0) => (
    <ul className={`space-y-2 ${level > 0 ? 'ml-4 mt-2 border-l pl-3' : ''}`}>
      {items.map((item, index) => {
        const key = `${level}-${index}-${item.label}`
        const isOpen = openSubmenus.has(key)

        return (
          <li key={key}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleSubmenu(key)}
                  className="w-full flex justify-between items-center text-gray-800 font-medium hover:text-blue-600 transition"
                  aria-expanded={isOpen}
                >
                  <span>{item.label || item.title}</span>
                  <span className="text-sm">{isOpen ? '▾' : '▸'}</span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {isOpen && renderMenu(item.children, level + 1)}
                </div>
              </>
            ) : (
              <span
                onClick={() => handleClick(item.href)}
                className="block text-sm text-gray-600 hover:text-blue-600 transition cursor-pointer"
              >
                {item.label || item.title}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-[9999] bg-blue-600 text-white py-1 px-3 rounded-md text-lg shadow-md hover:bg-blue-700 transition"
        aria-label="Abrir menu"
        aria-expanded={open}
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="navigation"
      >
        <div className="p-6">
          <button
            onClick={closeAll}
            className="mb-6 text-gray-500 hover:text-gray-800 transition"
            aria-label="Fechar menu"
          >
            ✕ Fechar
          </button>

          {renderMenu(menu)}
        </div>
      </nav>
    </div>
  )
}
