'use client'

import { MenuItem } from './MenuDesktopTypes'

type Props = {
  menu: MenuItem[]
  className?: string
}

export default function MenuDesktop({ menu, className = '' }: Props) {
  const handleClick = (href?: string) => {
    if (!href) return

    if (href.startsWith('#')) {
      window.location.hash = href
    } else {
      window.location.href = href
    }
  }

  return (
    <nav className={`bg-white border-t border-gray-200 ${className}`}>
      <ul className="flex justify-center gap-8 px-6 py-3 text-gray-800 font-medium">
        {menu.map(item => (
          <li key={item.label} className="relative group/main">
            <span
              onClick={() => handleClick(item.href)}
              className="cursor-pointer hover:text-blue-600"
            >
              {item.label}
            </span>

            {item.children && (
              <ul
                className="absolute left-0 top-full mt-2 w-64 bg-white border rounded-md shadow-lg py-2
                opacity-0 invisible
                group-hover/main:opacity-100 group-hover/main:visible
                transition-all duration-200 z-50"
              >
                {item.children.map(sub => (
                  <li key={sub.label} className="relative group/sub">
                    <span
                      onClick={() => handleClick(sub.href)}
                      className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {sub.label}
                      {sub.children && <span>▸</span>}
                    </span>

                    {sub.children && (
                      <ul
                        className="absolute top-0 left-full w-64 bg-white border rounded-md shadow-lg py-2
                        opacity-0 invisible
                        group-hover/sub:opacity-100 group-hover/sub:visible
                        transition-all duration-200 z-50"
                      >
                        {sub.children.map(child => (
                          <li key={child.label}>
                            <span
                              onClick={() => handleClick(child.href)}
                              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {child.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
