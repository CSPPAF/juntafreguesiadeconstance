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
  editais?: {
    title: string
    date?: string
    file: {
      asset: {
        url: string
      }
    }
  }[]
  twoColumnPDFs?: {
    title: string
    year: number
    files: {
      asset: {
        url: string
        originalFilename: string
      }
    }[]
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
  },
  editais[] {
    title,
    date,
    file {
      asset->{
        url
      }
    }
  },
  twoColumnPDFs[] {
    title,
    year,
    files[] {
      asset->{
        url,
        originalFilename
      }
    }
  }
}`

  return sanityClient.fetch(query)
})
