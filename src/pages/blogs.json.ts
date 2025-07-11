import { getCollection } from 'astro:content'

export async function GET() {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
  const result: Record<string, string> = {}

  posts.forEach(post => {
    result[post.id] = post.data.title
  })

  return new Response(JSON.stringify(result))
}
