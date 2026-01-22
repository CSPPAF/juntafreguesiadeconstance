import { cache } from 'react'
import { sanityClient } from '../sanityClient'

export type SanityInstitutionalLink = {
  title: string
  url: string
  order?: number
  logo: any
}

export const getInstitutionalLinks = cache(async (): Promise<SanityInstitutionalLink[]> => {
  return sanityClient.fetch(`
    *[_type == "institutionalLink"] | order(order asc) {
      title,
      url,
      logo
    }
  `)
})
