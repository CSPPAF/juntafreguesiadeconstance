'use client'

import Image from 'next/image'
import { urlFor } from '../../app/imageUrl'
import { useEffect, useState } from 'react'
import { SanityHeader } from '../../app/getHeader' // Importa o tipo correto
import { Facebook } from 'lucide-react'

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
	  return () => clearInterval(interval)
  }, [header.images])

  if (!header || !header.images || header.images.length === 0) return null

  return (
    <header className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
	  
	  {/* BARRA SUPERIOR */}
	<div className="relative z-20 bg-white text-black text-sm hidden md:block">
	  <div className="max-w-6xl mx-auto px-6 py-2 grid grid-cols-3 items-center">
		
		{/* ESQUERDA */}
		<div className="flex flex-col md:flex-row gap-1 md:gap-4">
		  {header.email && <span>📧 {header.email}</span>}
		  {header.phone && <span>📞 {header.phone}</span>}
		</div>

		{/* CENTRO */}
		<div className="hidden md:block"></div>

		{/* DIREITA */}
		<div className="flex justify-end">
		  {header.facebook && (
			<a
			  href={header.facebook}
			  target="_blank"
			  rel="noopener noreferrer"
			  aria-label="Facebook"
			  className="hover:text-blue-600 transition"
			>
			  <Facebook className="w-5 h-5" />
			</a>
		  )}
		</div>

	  </div>
	</div>

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

      <div className="relative z-10 h-full flex items-center justify-center px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 md:flex-row md:justify-center md:text-center">
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
