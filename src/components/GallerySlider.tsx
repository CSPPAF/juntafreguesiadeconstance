'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '../../app/imageUrl'

type Props = {
  images: { _ref: string }[]
}

export default function GallerySlider({ images }: Props) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) return null

  const prev = () =>
    setIndex(i => (i === 0 ? images.length - 1 : i - 1))

  const next = () =>
    setIndex(i => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="relative max-w-3xl mx-auto mt-16">
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-md">
        <Image
          src={urlFor(images[index])}
          alt={`Imagem ${index + 1}`}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70"
        aria-label="Anterior"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70"
        aria-label="Seguinte"
      >
        ›
      </button>
    </div>
  )
}
