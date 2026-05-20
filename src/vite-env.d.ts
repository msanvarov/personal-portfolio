/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_TRACKING?: string;
  readonly VITE_HOTJAR_WEBSITE_UID?: string;
  readonly VITE_HOTJAR_VERSION?: string;
  readonly VITE_GOOGLE_TAG_MANAGER_UID?: string;
  readonly VITE_MICROSOFT_CLARITY_UID?: string;
  readonly VITE_DEBUGBEAR_RUM_UID?: string;
  readonly VITE_FORMSPREE_FORM_ID?: string;
  readonly VITE_DISQUS_SHORTNAME?: string;
  readonly VITE_CALENDLY_URL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  export const frontmatter: Record<string, string>;
  const Component: ComponentType;
  export default Component;
}
