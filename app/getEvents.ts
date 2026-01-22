import { sanityClient } from '../sanityClient'
import { PortableTextBlock } from '@portabletext/types'

export type SanityEvent = {
  title: string
  slug: string
  date: string
  endDate?: string
  types: string[]
  association?: 
    | 'constance'
    | 'amcc'
    | 'rancho'
    | 'arco'
    | 'elas'
    | 'desportiva'
    | 'festas'
  description?: PortableTextBlock[]
  image?: { asset: { url: string } }
}

export async function getEvents(): Promise<SanityEvent[]> {
  const query = `*[_type == "event"] | order(date asc) {
    title,
    "slug": slug.current,
    date,
    endDate,
    types,
	association,
    description,
    image {
      asset->{
        url
      }
    }
  }`

  return sanityClient.fetch(query)
}
