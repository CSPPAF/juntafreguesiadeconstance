'use client'

import { useState } from 'react'

type MenuItem = {
  label: string
  href?: string
  submenu?: MenuItem[]
}

type Props = {
  className?: string
}

export default function MenuMobile({ className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set())

  const links: MenuItem[] = [
    { label: 'Início', href: '#mensagem-presidente' },
    {
      label: 'Freguesia',
      submenu: [
        {
          label: 'Junta de Freguesia',
          submenu: [
            { label: 'Executivo', href: '#executivo' },
            { label: 'Gestão Autárquica', href: '#autarquica' },
            { label: 'Recursos Humanos', href: '#humanos' },
          ],
        },
        {
          label: 'Assembleia de Freguesia',
          submenu: [
            { label: 'Editais', href: '#editais' },
            { label: 'Regimento', href: '#regimento' },
          ],
        },
        { label: 'Espaço Cidadão', href: '#cidadao' },
      ],
    },
    {
      label: 'Áreas de Intervenção',
      submenu: [
        { label: 'Ação Social', href: '#social' },
        { label: 'Educação', href: '#educacao' },
      ],
    },
    {
      label: 'Freguesia Digital',
      submenu: [{ label: 'Comunicar Ocorrência', href: '#ocorrencia' }],
    },
  ]

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const closeAll = () => {
    setOpen(false)
    setOpenSubmenus(new Set())
  }

  const renderMenu = (items: MenuItem[], level = 0) => (
    <ul className={`space-y-2 ${level ? 'ml-4 border-l pl-4 mt-2' : ''}`}>
      {items.map((item, index) => {
        const key = `${level}-${index}-${item.label}`
        const isOpen = openSubmenus.has(key)

        return (
          <li key={key}>
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(key)}
                  className="w-full flex justify-between items-center font-medium text-gray-800 hover:text-blue-600 transition"
                >
                  {item.label}
                  <span>{isOpen ? '▾' : '▸'}</span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {isOpen && renderMenu(item.submenu, level + 1)}
                </div>
              </>
            ) : (
              <a
                href={item.href}
                onClick={closeAll}
                className="block text-sm text-gray-600 hover:text-blue-600 transition"
              >
                {item.label}
              </a>
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
        className="fixed top-4 right-4 z-[9999] bg-blue-600 text-white px-3 py-1 rounded-md shadow hover:bg-blue-700 transition"
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeAll} />
      )}

      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6">
          <button
            onClick={closeAll}
            className="mb-6 text-gray-500 hover:text-gray-800 transition"
          >
            ✕ Fechar
          </button>

          {renderMenu(links)}
        </div>
      </nav>
    </div>
  )
}
