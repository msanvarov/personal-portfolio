import mdx from '@mdx-js/rollup';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig, type Plugin } from 'vite';
import { writeSitemap } from './scripts/build-sitemap';

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://www.sal-anvarov.com';

const sitemapPlugin = (): Plugin => ({
  name: 'sal-portfolio:sitemap',
  apply: 'build',
  closeBundle() {
    const outDir = path.resolve(__dirname, 'dist');
    writeSitemap(outDir, __dirname, SITE_URL);
    this.info?.(`sitemap written to ${path.join(outDir, 'sitemap.xml')}`);
  },
});

export default defineConfig(({ mode }) => ({
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
    // Generates src/routeTree.gen.ts from files in src/routes/. Must run
    // before @vitejs/plugin-react so the generated file is in place when
    // React's transform sees the entrypoint.
    TanStackRouterVite({
      target: 'react',
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    sitemapPlugin(),
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
    // 'hidden' emits .map files but omits the `//# sourceMappingURL=` comment
    // from the JS, so the maps are uploaded for Sentry/etc. but the browser
    // devtools do not auto-fetch original sources from users in the wild.
    sourcemap: mode === 'production' ? 'hidden' : true,
  },
}));
