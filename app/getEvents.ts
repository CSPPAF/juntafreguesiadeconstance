import { sanityClient } from '../sanityClient'

export type SanityEvent = {
  title: string
  slug: string
  date: string
  endDate?: string
  type: string          // ← adicionar
  description?: any[]
  image?: {
    asset: {
      url: string
    }
  }
}

export async function getEvents(): Promise<SanityEvent[]> {
  const query = `*[_type == "event"] | order(date asc) {
    title,
    "slug": slug.current,
    date,
    endDate,
    type,               // ← adicionar
    description,
    image {
      asset->{
        url
      }
    }
  }`

  return sanityClient.fetch(query)
}

