import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

// 공통으로 사용할 게시글 규격(Schema) 정의
const blogSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  image: z.string().optional(),
  description: z.string().optional(), // 필요시 추가
})

// 1. 컬렉션
const log = defineCollection({
  loader: glob({ base: './src/content/log', pattern: '**/*.{md,mdx}' }),
  schema: blogSchema
})

// 2. 컬렉션
const reviews = defineCollection({
  loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
  schema: blogSchema
})

// 3. 컬렉션
const works = defineCollection({
  loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
  schema: blogSchema
})

const posts = defineCollection({
  // Load Markdown and MDX files in the `src/content/posts/` directory.
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: blogSchema
})

const about = defineCollection({
  // Load Markdown files in the `src/content/about/` directory.
  loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
  // Type-check frontmatter using a schema
  schema: z.object({})
})

// 중요: 외부에서 쓸 수 있게 모두 내보냅니다.
export const collections = { log, reviews, works, posts, about }
