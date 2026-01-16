'use client'

import Image from 'next/image'
import { urlFor } from '../../app/imageUrl'
import { useEffect, useState } from 'react'
import { SanityHeader } from '../../app/getHeader' // Importa o tipo correto

type HeaderProps = {
  header: SanityHeader
}

export default function Header({ header }: HeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
	  if (!header.images || header.images.length === 0) return
	  const images = header.images  // ✅ fixa o tipo
	  const interval = setInterval(() => {
		setCurrentIndex(prev => (prev + 1) % images.length)
	  }, 3000)
	  return () => clearInterval(interval)
  }, [header.images])

  if (!header || !header.images || header.images.length === 0) return null

  return (
    <header className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
      {header.images.map((img, idx) => (
        <div
          key={img._ref || idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={urlFor(img)}
            alt={`Header image ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex items-center px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          {header.logo && (
			  <span
				onClick={() => (window.location.hash = '#inicio')}
				className="
				  relative cursor-pointer
				  w-[150px] h-[150px]
				  md:w-[200px] md:h-[200px]
				"
				aria-label="Ir para o início"
			  >
				<Image
				  src={urlFor(header.logo)}
				  alt="Logotipo"
				  fill
				  className="object-contain"
				  sizes="(max-width: 768px) 150px, 200px"
				/>
			  </span>
		  )}
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center md:text-left">
            {header.title}
          </h1>
        </div>
      </div>
    </header>
  )
}
