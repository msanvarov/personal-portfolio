/**
 * Build-time prerender for crawlers and AI assistants.
 *
 * The site is a client-rendered SPA, so most crawlers (and nearly all AI
 * crawlers, which don't run JavaScript) would otherwise see an empty page.
 * For every route this writes dist/<route>/index.html with route-specific
 * <head> tags (title, description, canonical, Open Graph, JSON-LD) and the
 * page's real content as semantic HTML inside #root. Browsers with JS hide
 * that markup (`.js .prerender`) and React renders the full app over it.
 *
 * It also writes /llms-full.txt (every post and case study as plain text)
 * and /rss.xml (the blog feed).
 */
import { evaluate } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement, type ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';

const STUDIO = { name: 'DEV BY SAL', url: 'https://by-sal.dev' };
const NAME = 'Sal Anvarov';

type Json = Record<string, any>;
type Page = {
  path: string;
  title: string; // already includes " | Sal Anvarov" where needed
  description: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  jsonLd: Json[];
  body: string;
};
type Doc = {
  slug: string;
  data: Record<string, string>;
  source: string; // MDX without frontmatter
  html: string; // rendered body
};

const esc = (s = '') =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ] as string,
  );

const stripTags = (html = '') =>
  html
    .replace(/<\/(p|h[1-6]|li|div|tr|pre|blockquote)>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<li[^>]*>/g, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const readJson = (root: string, name: string): Json =>
  JSON.parse(readFileSync(join(root, 'src/i18n', `${name}.json`), 'utf8'));

/** Title/description literals from a page component's <Seo> block. */
const seoFrom = (root: string, file: string) => {
  const src = readFileSync(join(root, 'src/pages', file), 'utf8');
  const block = src.slice(src.indexOf('<Seo'));
  const title = block.match(/title="([^"]+)"/)?.[1] ?? NAME;
  const description = block.match(/description="([^"]+)"/)?.[1] ?? '';
  return { title, description };
};

const mdxComponents = {
  PortfolioHeader: ({ media }: { media: string }) =>
    createElement('img', { src: media, alt: '' }),
  PortfolioFooter: () => null,
};

const loadDocs = async (root: string, dir: string): Promise<Doc[]> => {
  const base = join(root, 'content', dir);
  const files = readdirSync(base).filter((f) => /\.mdx?$/.test(f));
  const docs: Doc[] = [];
  for (const file of files) {
    const parsed = matter(readFileSync(join(base, file), 'utf8'));
    const { default: Content } = (await evaluate(parsed.content, {
      ...(runtime as any),
      remarkPlugins: [remarkGfm],
    })) as { default: ComponentType<{ components: unknown }> };
    const html = renderToStaticMarkup(
      createElement(Content, { components: mdxComponents }),
    )
      // MDX keeps raw `class` attributes; drop styling hooks and data-aos.
      .replace(/\s(class|className|data-aos)="[^"]*"/g, '');
    docs.push({
      slug: file.replace(/\.mdx?$/, ''),
      data: parsed.data as Record<string, string>,
      source: parsed.content,
      html,
    });
  }
  return docs.sort(
    (a, b) =>
      (Date.parse(b.data.created ?? '') || 0) -
      (Date.parse(a.data.created ?? '') || 0),
  );
};

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : '';

export const prerender = async (
  outDir: string,
  root: string,
  siteUrl: string,
) => {
  const site = siteUrl.replace(/\/+$/, '');
  const abs = (p: string) => (/^https?:/.test(p) ? p : `${site}${p}`);
  const url = (path: string) => (path === '/' ? `${site}/` : `${site}${path}`);
  const defaultImage = `${site}/assets/3d-headshot.png`;

  const landing = readJson(root, 'landing');
  const bio = readJson(root, 'bio');
  const credentials = readJson(root, 'credentials');
  const contact = readJson(root, 'contact');
  const opensource = readJson(root, 'opensource');
  const posts = await loadDocs(root, 'posts');
  const studies = await loadDocs(root, 'case-studies');

  // ---- shared JSON-LD ---------------------------------------------------
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site}/#sal`,
    name: NAME,
    url: `${site}/`,
    image: defaultImage,
    jobTitle:
      'Full Stack Developer, Founder of DEV BY SAL & Co-founder of Cleanlist.ai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressCountry: 'CA',
    },
    description:
      'Full stack developer in Toronto, founder of DEV BY SAL and co-founder of Cleanlist.ai. Presents at a Toronto Meetup on AI topics — using different AI techniques to build AI-native software.',
    worksFor: [
      { '@type': 'Organization', name: 'DEV BY SAL LTD.', url: STUDIO.url },
      {
        '@type': 'Organization',
        name: 'Cleanlist.ai',
        url: 'https://cleanlist.ai',
      },
    ],
    sameAs: [
      'https://github.com/msanvarov',
      'https://linkedin.com/in/sal-anvarov',
      'https://cleanlist.ai',
      STUDIO.url,
    ],
  };
  const author = {
    '@type': 'Person',
    '@id': `${site}/#sal`,
    name: NAME,
    url: `${site}/`,
  };
  const crumbs = (trail: Array<[string, string]>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url(path),
    })),
  });

  // ---- shared markup ----------------------------------------------------
  const nav = `<nav aria-label="Main"><ul>
<li><a href="/">Home</a></li><li><a href="/bio">Bio</a></li><li><a href="/credentials">Credentials</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li><li><a href="${STUDIO.url}">${STUDIO.name} (studio)</a></li>
</ul></nav>`;
  const footer = `<footer><p>${NAME} — designer and full stack developer in Toronto. Founder of <a href="${STUDIO.url}">${STUDIO.name}</a>, a software studio. <a href="https://github.com/msanvarov">GitHub</a> · <a href="https://linkedin.com/in/sal-anvarov">LinkedIn</a> · <a href="/rss.xml">RSS</a> · <a href="/llms.txt">llms.txt</a></p></footer>`;

  const postItem = (d: Doc) =>
    `<li><a href="/blog/${d.slug}">${esc(d.data.title)}</a> — <time datetime="${esc(d.data.created)}">${fmtDate(d.data.created)}</time> · ${esc(d.data.category)}<br/>${esc(d.data.description)}</li>`;
  const studyItem = (d: Doc) =>
    `<li><a href="/portfolio/${d.slug}">${esc(d.data.title)}</a> — ${esc(d.data.category)}<br/>${esc(d.data.description)}</li>`;
  const timeline = (items: Json[], role: string, org: string) =>
    `<ul>${items
      .map(
        (e) =>
          `<li><strong>${esc(e[role])}</strong> — ${esc(e[org])} (${esc(e.date)})${e.description ? `<br/>${e.description}` : ''}</li>`,
      )
      .join('')}</ul>`;

  // ---- pages --------------------------------------------------------------
  const pages: Page[] = [];
  const meta = (file: string) => seoFrom(root, file);

  {
    const m = meta('LandingPage.component.tsx');
    const present = credentials.experience.experience.filter((e: Json) =>
      String(e.date).includes('Present'),
    );
    pages.push({
      path: '/',
      title: `${m.title} | ${NAME}`,
      description: m.description,
      jsonLd: [
        person,
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: NAME,
          url: `${site}/`,
          inLanguage: 'en',
          author,
        },
      ],
      body: `<header><h1>${NAME} — ${esc(landing.bio.caption)}</h1>
<p>${esc(landing.bio.description)}</p><p>${landing.bio.descriptionExtended}</p><p>Based in Toronto, Canada.</p></header>
<section><h2>Currently</h2><ul>${present.map((e: Json) => `<li>${esc(e.title)} — ${esc(e.company)}</li>`).join('')}</ul>
<ul>${landing.facts.quickFacts.map((f: Json) => `<li>${esc(f.count)} ${stripTags(f.label).toLowerCase()}</li>`).join('')}</ul></section>
<section><h2>Case studies</h2><ul>${studies.map(studyItem).join('')}</ul></section>
<section><h2>Writing</h2><ul>${posts.map(postItem).join('')}</ul></section>
<section><h2>Open source</h2><p>${esc(opensource.description)}</p><ul>
<li><a href="${opensource.featured.live}">${esc(opensource.featured.name)}</a> (<a href="${opensource.featured.repo}">source</a>) — ${esc(opensource.featured.description)}</li>
${(opensource.tools ?? []).map((t: Json) => `<li><a href="${t.live}">${esc(t.name)}</a> (<a href="${t.repo}">source</a>) — ${esc(t.description)}${t.post ? ` <a href="/blog/${t.post}">Read the guide</a>.` : ''}</li>`).join('')}
${opensource.repos.map((r: Json) => `<li><a href="${r.repo}">${esc(r.name)}</a> — ${esc(r.description)} Implements “${esc(r.paper)}” (${esc(r.org)}, <a href="https://arxiv.org/abs/${r.arxiv}">arXiv:${r.arxiv}</a>).${r.demo ? ` <a href="${r.demo}">Live demo</a>.` : ''} <a href="/blog/${r.post}">Read the breakdown</a>.</li>`).join('')}
${(opensource.series?.repos ?? []).map((r: Json) => `<li><a href="${r.repo}">${esc(r.name)}</a> — ${esc(opensource.series.name)}: ${esc(r.description)}${r.demo ? ` <a href="${r.demo}">Live demo</a>.` : ''} <a href="/blog/${r.post}">Read the breakdown</a>.</li>`).join('')}
</ul></section>
<section><h2>Studio</h2><p>Consulting and product engineering run through <a href="${STUDIO.url}">${STUDIO.name}</a>, Sal's software studio.</p></section>
<section><h2>Contact</h2><p>Email <a href="mailto:${contact.contact.mail.links[0]}">${contact.contact.mail.links[0]}</a> or <a href="${contact.contact.phone.links[0].href}">book a call</a>.</p></section>`,
    });
  }

  {
    const m = meta('BioPage.component.tsx');
    pages.push({
      path: '/bio',
      title: `${m.title} | ${NAME}`,
      description: m.description,
      type: 'profile',
      jsonLd: [
        person,
        crumbs([
          ['Home', '/'],
          ['Bio', '/bio'],
        ]),
      ],
      body: `<h1>${esc(bio.bio.details.name)}</h1><p>${esc(bio.bio.details.description)}</p>
<h2>${esc(bio.experience.heading)}</h2>${timeline(bio.experience.experience, 'title', 'company')}
<h2>${esc(bio.education.heading)}</h2>${timeline(bio.education.education, 'degree', 'university')}`,
    });
  }

  {
    const m = meta('CredentialsPage.component.tsx');
    pages.push({
      path: '/credentials',
      title: `${m.title} | ${NAME}`,
      description: m.description,
      type: 'profile',
      jsonLd: [
        person,
        crumbs([
          ['Home', '/'],
          ['Credentials', '/credentials'],
        ]),
      ],
      body: `<h1>Credentials — ${NAME}</h1>
<h2>${esc(credentials.bio.heading)}</h2>${credentials.bio.description.map((p: string) => `<p>${p}</p>`).join('')}
<h2>${esc(credentials.experience.heading)}</h2>${timeline(credentials.experience.experience, 'title', 'company')}
<h2>${esc(credentials.education.heading)}</h2>${timeline(credentials.education.education, 'degree', 'university')}
<h2>${esc(credentials.capabilities.heading)}</h2><ul>${credentials.capabilities.capabilities.map((c: Json) => `<li><strong>${esc(c.name)}</strong> (${esc(c.percent)}) — ${esc(c.description)}</li>`).join('')}</ul>
<h2>${esc(credentials.expertise.heading)}</h2><ul>${credentials.expertise.expertise.map((c: Json) => `<li><strong>${esc(c.name)}</strong> — ${esc(c.description)}</li>`).join('')}</ul>`,
    });
  }

  {
    const m = meta('ContactPage.component.tsx');
    const c = contact.contact;
    pages.push({
      path: '/contact',
      title: `${m.title} | ${NAME}`,
      description: m.description,
      jsonLd: [
        person,
        crumbs([
          ['Home', '/'],
          ['Contact', '/contact'],
        ]),
      ],
      body: `<h1>Contact ${NAME}</h1><ul>
${c.mail.links.map((l: string) => `<li>Email: <a href="mailto:${l}">${l}</a></li>`).join('')}
${c.phone.links.map((l: Json) => `<li>Schedule: <a href="${l.href}">${esc(l.text)}</a></li>`).join('')}
<li>Location: ${esc(c.location.location)}</li>
<li>Studio: <a href="${STUDIO.url}">${STUDIO.name}</a></li></ul>`,
    });
  }

  {
    const m = meta('PortfolioListPage.component.tsx');
    pages.push({
      path: '/portfolio',
      title: `${m.title} | ${NAME}`,
      description: m.description,
      jsonLd: [
        crumbs([
          ['Home', '/'],
          ['Portfolio', '/portfolio'],
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: studies.map((d, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: url(`/portfolio/${d.slug}`),
            name: d.data.title,
          })),
        },
      ],
      body: `<h1>Portfolio — case studies by ${NAME}</h1><ul>${studies.map(studyItem).join('')}</ul>`,
    });
    for (const d of studies) {
      const path = `/portfolio/${d.slug}`;
      pages.push({
        path,
        title: `${d.data.title} | ${NAME}`,
        description: d.data.description,
        type: 'article',
        image: d.data.thumbnail ? abs(d.data.thumbnail) : undefined,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: d.data.title,
            description: d.data.description,
            url: url(path),
            image: d.data.thumbnail ? [abs(d.data.thumbnail)] : [defaultImage],
            author,
            creator: author,
            genre: d.data.category,
            dateCreated: d.data.created,
          },
          crumbs([
            ['Home', '/'],
            ['Portfolio', '/portfolio'],
            [d.data.title, path],
          ]),
        ],
        body: `<article><h1>${esc(d.data.title)}</h1><p>${esc(d.data.category)}</p><p>${esc(d.data.description)}</p>${d.html}</article>
<p><a href="/portfolio">All case studies</a></p>`,
      });
    }
  }

  {
    const m = meta('PostsListPage.component.tsx');
    pages.push({
      path: '/blog',
      title: `${m.title} | ${NAME}`,
      description: m.description,
      jsonLd: [
        crumbs([
          ['Home', '/'],
          ['Blog', '/blog'],
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          url: url('/blog'),
          name: `${NAME} — Blog`,
          author,
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.data.title,
            url: url(`/blog/${p.slug}`),
            datePublished: p.data.created,
            dateModified: p.data.modified ?? p.data.created,
          })),
        },
      ],
      body: `<h1>Blog — ${NAME}</h1><p>${esc(m.description)}</p><ul>${posts.map(postItem).join('')}</ul>`,
    });
    for (const d of posts) {
      const path = `/blog/${d.slug}`;
      const image = d.data.thumbnail ? abs(d.data.thumbnail) : defaultImage;
      pages.push({
        path,
        title: `${d.data.title} | ${NAME}`,
        description: d.data.description,
        type: 'article',
        image,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: d.data.title,
            description: d.data.description,
            url: url(path),
            mainEntityOfPage: { '@type': 'WebPage', '@id': url(path) },
            image: [image],
            datePublished: d.data.created,
            dateModified: d.data.modified ?? d.data.created,
            author,
            publisher: author,
            articleSection: d.data.category,
            keywords: d.data.tag,
            inLanguage: 'en',
          },
          crumbs([
            ['Home', '/'],
            ['Blog', '/blog'],
            [d.data.title, path],
          ]),
        ],
        body: `<article><header><h1>${esc(d.data.title)}</h1>
<p><time datetime="${esc(d.data.created)}">${fmtDate(d.data.created)}</time> · ${esc(d.data.category)} · by <a href="/bio">${NAME}</a></p>
<p>${esc(d.data.description)}</p></header>${d.html}</article>
<p><a href="/blog">All posts</a></p>`,
      });
    }
  }

  // ---- write pages --------------------------------------------------------
  const template = readFileSync(join(outDir, 'index.html'), 'utf8')
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta\s+name="(title|description)"[\s\S]*?\/>\s*/g, '')
    .replace(/<meta\s+property="(og|twitter):[^"]*"[\s\S]*?\/>\s*/g, '');

  for (const page of pages) {
    const canonical = url(page.path);
    const image = page.image ?? defaultImage;
    const head = `<title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${page.type ?? 'website'}" />
    <meta property="og:site_name" content="${NAME}" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
    ${page.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n    ')}
  </head>`;
    const html = template
      .replace('</head>', head)
      .replace(
        '<div id="root"></div>',
        `<div id="root"><div class="prerender">${nav}<main>${page.body}</main>${footer}</div></div>`,
      );
    const dir = page.path === '/' ? outDir : join(outDir, page.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf8');
    // Also /route.html, so hosts with "clean URLs" (Vercel cleanUrls,
    // Netlify pretty URLs) serve it for /route without a trailing slash.
    if (page.path !== '/') writeFileSync(`${dir}.html`, html, 'utf8');
  }

  // ---- llms-full.txt --------------------------------------------------------
  const full = [
    `# ${NAME} — full content`,
    '',
    `> Full text of every blog post and case study on ${site}. ${NAME} is a designer and full stack developer in Toronto, founder of ${STUDIO.name} (${STUDIO.url}) and co-founder of Cleanlist.ai. Index: ${site}/llms.txt`,
    '',
    '## Blog posts',
    '',
    ...posts.flatMap((d) => [
      `### ${d.data.title}`,
      `URL: ${url(`/blog/${d.slug}`)}`,
      `Published: ${(d.data.created ?? '').slice(0, 10)} · ${d.data.category}`,
      '',
      d.source.replace(/^\s*<[A-Z][^>]*\/>\s*$/gm, '').trim(),
      '',
    ]),
    '## Case studies',
    '',
    ...studies.flatMap((d) => [
      `### ${d.data.title}`,
      `URL: ${url(`/portfolio/${d.slug}`)}`,
      '',
      d.data.description,
      '',
      stripTags(d.html),
      '',
    ]),
  ].join('\n');
  writeFileSync(join(outDir, 'llms-full.txt'), full, 'utf8');

  // ---- rss.xml ---------------------------------------------------------------
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${NAME} — Blog</title>
  <link>${site}/blog</link>
  <description>Writing by ${NAME} on software architecture, ML papers, and Node.js security.</description>
  <language>en</language>
  <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (d) => `  <item>
    <title>${esc(d.data.title)}</title>
    <link>${url(`/blog/${d.slug}`)}</link>
    <guid isPermaLink="true">${url(`/blog/${d.slug}`)}</guid>
    <pubDate>${new Date(d.data.created ?? Date.now()).toUTCString()}</pubDate>
    <category>${esc(d.data.category)}</category>
    <description>${esc(d.data.description)}</description>
  </item>`,
  )
  .join('\n')}
</channel>
</rss>
`;
  writeFileSync(join(outDir, 'rss.xml'), rss, 'utf8');

  return pages.length;
};
