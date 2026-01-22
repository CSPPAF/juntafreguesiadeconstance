import { cache } from 'react'
import { sanityClient } from '../sanityClient'

export type SanityAviso = {
  title: string
  link?: string
  pdf?: { asset: { url: string } }
  order?: number
  _createdAt: string
}

export const getAvisos = cache(async (): Promise<SanityAviso[]> => {
  return sanityClient.fetch(`
    *[_type == "aviso"] | order(order asc) {
      title,
      link,
	  _createdAt,
      pdf{
        asset -> {
          url
        }
      },
      order
    }
  `)
})
