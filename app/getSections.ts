import { cache } from 'react'
import { sanityClient } from '../sanityClient'
import { PortableTextBlock } from '@portabletext/types'

export type SanitySection = {
  title: string
  slug: string
  content?: PortableTextBlock[]
  image?: { asset: { _ref: string } }
  gallery?: { asset: { _ref: string } }[]
  showFormularioOcorrencias?: boolean
  photographers?: {
    photo?: { asset: { _ref: string } }
    name?: string
    role?: string
    description?: string
  }[]
}

export const getSections = cache(async (): Promise<SanitySection[]> => {
  const query = `*[_type == "section"] | order(order asc) {
    title,
    "slug": slug.current,
    content,
    image,
    gallery,
    showFormularioOcorrencias,
    photographers[] {
      photo,
      name,
      role,
      description
    }
  }`

  return sanityClient.fetch(query)
})
