import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
        ],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 4200,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
