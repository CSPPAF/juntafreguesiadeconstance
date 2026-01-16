'use client'

import Image from 'next/image'
import { urlFor } from '../../app/imageUrl'
import { SanityFooter } from '../../app/getFooter'

type Props = {
  footer: SanityFooter
  onOpenContact: () => void
}

export default function FooterContent({ footer, onOpenContact }: Props) {
  const handleFooterLink = (href: string) => {
	  if (href.startsWith('#')) {
		// Atualiza o hash
		window.location.hash = href

		// Aguarda um tick para garantir que a section está ativa
		setTimeout(() => {
		  const id = href.replace('#', '')
		  const el = document.getElementById(id)
		  if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' })
		  }
		}, 50)
	  } else {
		window.location.href = href
	  }
  }
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

        {footer.columns?.map(col => (
          <div
            key={col.title}
            className="flex flex-col sm:items-end sm:text-right"
          >
            <div className="min-h-[80px] flex items-center sm:justify-end">
              <h4 className="text-lg font-semibold">{col.title}</h4>
            </div>

            <ul className="space-y-2 text-sm mt-4">
              {col.links?.map(link => (
                <li key={link.label}>
                  {link.action === 'modal' && link.value === 'Contactos' ? (
                    <button
                      onClick={onOpenContact}
                      className="inline-block text-gray-300 transition hover:text-white hover:translate-x-1"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <button
					  onClick={() => link.value && handleFooterLink(link.value)}
					  className="inline-block text-gray-300 transition hover:text-white hover:translate-x-1 text-left"
					>
					  {link.label}
					</button>
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
