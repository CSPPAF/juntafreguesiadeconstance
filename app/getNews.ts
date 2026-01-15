import { cache } from 'react'
import { sanityClient } from '../sanityClient'
import { PortableTextBlock } from '@portabletext/types'

export type SanityNews = {
  title: string
  slug: string
  date: string
  order?: number
  summary?: string
  content?: PortableTextBlock[]
  image?: { asset: { _ref: string } }
}

export const getNews = cache(async (): Promise<SanityNews[]> => {
  const query = `*[_type == "news"] | order(order asc) {
    title,
    "slug": slug.current,
    date,
    order,
    summary,
    content,
    image
  }`

  return sanityClient.fetch(query)
})
