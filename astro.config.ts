import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import rehypeKatex from 'rehype-katex'
import remarkEmbeddedMedia from './src/plugins/remark-embedded-media.mjs'
import remarkReadingTime from './src/plugins/remark-reading-time.mjs'
import rehypeCleanup from './src/plugins/rehype-cleanup.mjs'
import rehypeImageProcessor from './src/plugins/rehype-image-processor.mjs'
import rehypeCopyCode from './src/plugins/rehype-copy-code.mjs'
import remarkTOC from './src/plugins/remark-toc.mjs'
import { themeConfig } from './src/config'
import path from 'path'
import vercel from '@astrojs/vercel'

export default defineConfig({
  // 💡 정적 사이트 생성을 위해 output을 'static'으로 설정하거나 제거합니다.
  // 마크다운 블로그에는 이 방식이 가장 오류가 적고 빠릅니다.
  output: 'static',

  adapter: vercel({
    webAnalytics: { enabled: true },
    imagesConfig: {
      sizes: [320, 640, 1280],
      domains: []
    }
    // 💡 _vercel 컬렉션 충돌을 방지하기 위해 imageService: true 옵션을 제거했습니다.
  }),

  site: themeConfig.site.website,

  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      wrap: false
    },
    remarkPlugins: [remarkMath, remarkDirective, remarkEmbeddedMedia, remarkReadingTime, remarkTOC],
    rehypePlugins: [rehypeKatex, rehypeCleanup, rehypeImageProcessor, rehypeCopyCode]
  },

  integrations: [mdx(), sitemap()],

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  },

  devToolbar: {
    enabled: false
  }
})
