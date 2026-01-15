import { cache } from 'react'
import { sanityClient } from '../sanityClient'

export type SanityFooter = {
  logo?: { asset: { _ref: string } }
  title?: string
  description?: string
  address?: string
  email?: string
  phone?: string
  openingHours?: string
  columns?: {
    title?: string
    links?: { label?: string; action?: string; value?: string }[]
  }[]
  copyright?: string
}

export const getFooter = cache(async (): Promise<SanityFooter> => {
  return sanityClient.fetch(`
    *[_type == "footer"][0]{
      logo,
      title,
      description,
      address,
      email,
      phone,
      openingHours,
      columns[] {
        title,
        links[]{ label, action, value }
      },
      copyright
    }
  `)
})
