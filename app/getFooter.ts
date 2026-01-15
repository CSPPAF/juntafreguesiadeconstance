import { cache } from 'react'
import { sanityClient } from '../sanityClient'

export const getFooter = cache(async () => {
  return sanityClient.fetch(`
    *[_type == "footer"][0]{
      logo,
      title,
      description,
      address,
      email,
      phone,
      openingHours,
      columns[]{
        title,
        links[]{ label, action, value }
      },
      copyright
    }
  `)
})
