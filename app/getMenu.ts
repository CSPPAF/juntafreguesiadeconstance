import { cache } from 'react'
import { sanityClient } from '../sanityClient'

export type SanityMenuItem = {
  label: string
  href?: string
  children?: SanityMenuItem[]
}

export const getMenu = cache(async (): Promise<SanityMenuItem[]> => {
  const query = `*[_type == "menu"][0]{
    items[]{
      label,
      href,
      children[]{
        label,
        href,
        children[]{
          label,
          href
        }
      }
    }
  }`

  const data = await sanityClient.fetch(query)
  return data?.items ?? []
})
