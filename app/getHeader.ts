import { cache } from 'react'
import { sanityClient } from '../sanityClient'

export type SanityHeader = {
  title?: string
  logo?: { asset: { _ref: string } }
  images?: { _ref: string }[]
  email?: string
  phone?: string
  facebook?: string
}

export const getHeader = cache(async (): Promise<SanityHeader> => {
  return sanityClient.fetch(`
    *[_type == "header"][0]{
      title,
      logo,
      images,
      email,
      phone,
      facebook
    }
  `)
})

