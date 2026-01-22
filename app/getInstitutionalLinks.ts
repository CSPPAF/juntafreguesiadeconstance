import { cache } from 'react'
import { sanityClient } from '../sanityClient'

// Define manualmente o tipo de imagem do Sanity
export type SanityImage = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export type SanityInstitutionalLink = {
  title: string
  url: string
  order?: number
  logo: SanityImage
}

export const getInstitutionalLinks = cache(
  async (): Promise<SanityInstitutionalLink[]> => {
    return sanityClient.fetch(`
      *[_type == "institutionalLink"] | order(order asc) {
        title,
        url,
        order,
        logo
      }
    `)
  }
)
