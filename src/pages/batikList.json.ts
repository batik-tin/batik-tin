import { getCollection } from 'astro:content'

export async function GET() {
  const batikList = (await getCollection('batik')).sort((a, b) => b.data.order - a.data.order)
  const result: Record<string, string> = {}

  batikList.forEach(post => {
    result[post.id] = post.data.title
  })

  return new Response(JSON.stringify(result))
}
