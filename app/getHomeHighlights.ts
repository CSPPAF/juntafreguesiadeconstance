import { cache } from 'react'
import { sanityClient } from '../sanityClient'

export type SanityHomeHighlight = {
  titleTop: string
  icon: string
  targetSlug: string
}

export const getHomeHighlights = cache(async (): Promise<SanityHomeHighlight[]> => {
  return sanityClient.fetch(`
    *[_type == "homeHighlight"] | order(order asc) {
      titleTop,
      icon,
      targetSlug
    }
  `)
})
