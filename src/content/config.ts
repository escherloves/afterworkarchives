import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// 공통으로 사용할 스키마(규칙) 정의
const blogSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  description: z.string().optional(),
  category: z.string().optional()
})

// 각 카테고리별 컬렉션 설정
const log = defineCollection({
  loader: glob({ base: './src/content/log', pattern: '**/[^_]*.{md,mdx}' }),
  schema: blogSchema
})

const reviews = defineCollection({
  loader: glob({ base: './src/content/reviews', pattern: '**/[^_]*.{md,mdx}' }),
  schema: blogSchema
})

const works = defineCollection({
  loader: glob({ base: './src/content/works', pattern: '**/[^_]*.{md,mdx}' }),
  schema: blogSchema
})

// 시스템에 등록
export const collections = { log, reviews, works }
