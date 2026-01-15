import { sanityClient } from '../sanityClient'

export async function getHeader() {
  return sanityClient.fetch(`
    *[_type == "header"][0]{
      title,
      logo,
      images
    }
  `)
}
