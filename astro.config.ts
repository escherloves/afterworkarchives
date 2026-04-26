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
  // Vercel 배포를 위한 어댑터 설정 (이미지 서비스 최적화 포함)
  adapter: vercel({
    webAnalytics: { enabled: true },
    imagesConfig: {
      sizes: [320, 640, 1280],
      domains: []
    },
    imageService: true
  }),

  output: 'server', // Vercel의 서버리스 기능을 활용하기 위해 추가
  site: themeConfig.site.website,

  // 기존의 복잡한 image 설정을 제거하고 Astro 기본값과 Vercel 어댑터에 위임합니다.
  // 이 조치로 .netlify/images 경로로 꼬이던 문제가 해결됩니다.

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
