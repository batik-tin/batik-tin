import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const batik = defineCollection({
  loader: glob({ base: './src/content/batik', pattern: '**/*.{md,mdx}' }),
  schema({ image }) {
    return z.object({
      title: z.string(),
      description: z.string(),
      order: z.number(),
      heroImage: image(),
    })
  },
})

export const collections = { batik }
