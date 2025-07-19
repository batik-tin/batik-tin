import { getCollection } from 'astro:content'

export type BatikList = Record<string, [string, string]>

export async function GET() {
  const batikList = (await getCollection('batik')).sort((a, b) => b.data.order - a.data.order)
  const result: BatikList = {}

  batikList.forEach(post => {
    result[post.id] = [post.data.title, post.data.heroImages[0].src]
  })

  return new Response(JSON.stringify(result))
}
