'use client'

import Image from 'next/image'
import { urlFor } from '../../app/imageUrl'

export default function FooterContent({
  footer,
  onOpenContact,
}: {
  footer: any
  onOpenContact: () => void
}) {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 min-h-[80px]">
            {footer.logo?.asset?._ref && (
              <Image
                src={urlFor(footer.logo)}
                alt="Logotipo da Junta"
                width={64}
                height={64}
                className="object-contain"
              />
            )}
            <h4 className="text-lg font-semibold">{footer.title}</h4>
          </div>

          <p className="text-sm leading-relaxed text-gray-300 mt-4 whitespace-pre-line">
            {footer.description}
            {'\n'}
            {footer.address}
            {'\n'}
            {footer.email}
            {'\n'}
            {footer.phone}
            {'\n'}
            {footer.openingHours}
          </p>
        </div>

        {footer.columns?.map((col: any) => (
          <div
            key={col.title}
            className="flex flex-col sm:items-end sm:text-right"
          >
            <div className="min-h-[80px] flex items-center sm:justify-end">
              <h4 className="text-lg font-semibold">{col.title}</h4>
            </div>

            <ul className="space-y-2 text-sm mt-4">
              {col.links?.map((link: any) => (
                <li key={link.label}>
                  {link.action === 'modal' &&
                  link.value === 'Contactos' ? (
                    <button
                      onClick={onOpenContact}
                      className="inline-block text-gray-300 transition hover:text-white hover:translate-x-1"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.value} className="inline-block text-gray-300 transition hover:text-white hover:translate-x-1">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-xs text-gray-400">
        {footer.copyright}
      </div>
    </footer>
  )
}
