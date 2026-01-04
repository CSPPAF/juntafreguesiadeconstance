'use client'

import { useState } from 'react'

export default function MenuMobile() {
  const [open, setOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const links = [
    {
      label: 'Início',
      href: '#mensagem-presidente',
    },
    {
      label: 'Freguesia',
      submenu: [
        { label: 'História', href: '#historia' },
        { label: 'Património', href: '#patrimonio' },
        { label: 'Localização', href: '#localizacao' },
      ],
    },
    {
      label: 'Transparência',
      submenu: [
        { label: 'Presidente', href: '#presidente' },
        { label: 'Executivo', href: '#executivo' },
      ],
    },
    {
      label: 'Informações',
      submenu: [
        { label: 'Contactos', href: '#contactos' },
        { label: 'Horários', href: '#horarios' },
      ],
    },
  ]

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  return (
    <>
      {/* Botão hambúrguer */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-[9999] bg-blue-600 text-white py-1 p-3 rounded-md"
        aria-label="Abrir menu"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setOpen(false)
            setOpenSubmenu(null)
          }}
        />
      )}

      {/* Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6">
          <button
            onClick={() => {
              setOpen(false)
              setOpenSubmenu(null)
            }}
            className="mb-6 text-gray-600"
          >
            ✕ Fechar
          </button>

          <ul className="space-y-4">
            {links.map(link => (
              <li key={link.label}>
                {/* Item simples */}
                {!link.submenu && (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-gray-800 font-medium hover:text-blue-600"
                  >
                    {link.label}
                  </a>
                )}

                {/* Item com submenu */}
                {link.submenu && (
                  <>
                    <button
                      onClick={() => toggleSubmenu(link.label)}
                      className="w-full flex justify-between items-center text-gray-800 font-medium"
                    >
                      {link.label}
                      <span className="text-sm">
                        {openSubmenu === link.label ? '▾' : '▸'}
                      </span>
                    </button>

                    {openSubmenu === link.label && (
                      <ul className="mt-2 ml-4 space-y-2">
                        {link.submenu.map(sub => (
                          <li key={sub.href}>
                            <a
                              href={sub.href}
                              onClick={() => {
                                setOpen(false)
                                setOpenSubmenu(null)
                              }}
                              className="block text-sm text-gray-600 hover:text-blue-600"
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}