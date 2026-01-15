'use client'

import Image from 'next/image'
import { urlFor } from '../../app/imageUrl'
import { useEffect, useState } from 'react'

type HeaderProps = {
  header: any
}

export default function Header({ header }: HeaderProps) {
  if (!header || !header.images || header.images.length === 0) return null

  const [currentIndex, setCurrentIndex] = useState(0)

  // Troca automática de imagens a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % header.images.length)
    }, 3000) // 3 segundos
    return () => clearInterval(interval)
  }, [header.images.length])

  return (
    <header className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
      {/* Slideshow de imagens */}
      {header.images.map((img: any, idx: number) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={urlFor(img)}
            alt={`Header image ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0} // Prioriza a primeira imagem
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo */}
      <div className="relative z-10 h-full flex items-center px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          {header.logo && (
            <Image
              src={urlFor(header.logo)}
              alt="Logotipo"
              width={96}
              height={96}
              className="object-contain"
            />
          )}

          <h1 className="text-white text-2xl md:text-4xl font-bold text-center md:text-left">
            {header.title}
          </h1>
        </div>
      </div>
    </header>
  )
}
