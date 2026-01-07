'use client'

import { useState, useRef } from 'react'

type MenuItem = {
  label: string
  href?: string
  submenu?: MenuItem[]
}

type Props = {
  className?: string
}

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

export default function MenuDesktop({ className = '' }: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const openMenu = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setActiveMenu(label)
  }

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveMenu(null)
      setActiveSubmenu(null)
    }, 120)
  }

  return (
    <nav className={`bg-white border-t border-gray-200 ${className}`}>
      <ul className="flex justify-center gap-8 px-6 py-3 font-medium text-gray-800">
        {links.map(item => {
          const isOpen = activeMenu === item.label

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => openMenu(item.label)}
              onMouseLeave={closeMenu}
            >
              <span className="cursor-pointer hover:text-blue-600 transition">
                {item.label}
              </span>

              {item.submenu && (
                <ul
                  className={`absolute left-0 top-full mt-3 w-64 rounded-md bg-white border shadow-lg py-2 transition-all duration-200 z-50
                  ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={closeMenu}
                >
                  {item.submenu.map(sub => {
                    const subOpen = activeSubmenu === sub.label

                    return (
                      <li
                        key={sub.label}
                        className="relative"
                        onMouseEnter={() => setActiveSubmenu(sub.label)}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {sub.submenu ? (
                          <>
                            <div className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                              {sub.label}
                              <span className="text-sm">▸</span>
                            </div>

                            <ul
                              className={`absolute top-0 left-full ml-1 w-64 rounded-md bg-white border shadow-lg py-2 transition-all duration-200
                              ${subOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-1'}`}
                            >
                              {sub.submenu.map(child => (
                                <li key={child.label}>
                                  <a
                                    href={child.href}
                                    className="block px-4 py-2 hover:bg-gray-100 transition"
                                  >
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <a
                            href={sub.href}
                            className="block px-4 py-2 hover:bg-gray-100 transition"
                          >
                            {sub.label}
                          </a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
