import { ArrowChip, BentoCard } from '@/components/bento/BentoCard';
import { CategoryChip } from '@/components/portfolio/CategoryChip.component';
import { Layout } from '@/components/layout/Layout.component';
import { SectionHeading } from '@/components/SectionHeading';
import { cn } from '@/lib/utils';
import { caseStudies, studyName } from '@/utils/content';
import { breadcrumbLd, Seo } from '@/utils/seo';

type Entry = (typeof caseStudies)[number];

/**
 * Bento rhythm on desktop (3 cols): the featured tile fills 2×2, the next
 * two stack beside it, then rows of two alternate wide/narrow.
 */
type Shape = 'featured' | 'wide' | 'full' | 'narrow';

const tileShape = (i: number, total: number): Shape => {
  if (i === 0) return 'featured';
  if (i < 3) return 'narrow';
  const j = i - 3;
  if (j === total - 4 && j % 2 === 0) return 'full';
  const row = Math.floor(j / 2);
  return j % 2 === row % 2 ? 'wide' : 'narrow';
};

/**
 * Covers are 6:5 and are always shown at that ratio (never cropped). Wide
 * tiles put the text beside the image instead of squashing the image:
 * the featured tile on tablets, and 2- or 3-column tiles on desktop.
 */
const SHAPE: Record<Shape, { tile: string; well: string }> = {
  featured: {
    tile: 'md:col-span-2 md:flex-row md:items-center lg:row-span-2 lg:flex-col lg:items-stretch',
    well: 'md:w-[55%] lg:w-auto',
  },
  wide: {
    tile: 'lg:col-span-2 lg:flex-row lg:items-center',
    well: 'lg:w-1/2',
  },
  full: {
    tile: 'md:col-span-2 md:flex-row md:items-center lg:col-span-3',
    well: 'md:w-1/2 lg:w-[38%]',
  },
  narrow: { tile: '', well: '' },
};

const CaseStudyTile = ({ entry, index }: { entry: Entry; index: number }) => {
  const { title, description, thumbnail, category, created, cover } =
    entry.metadata;
  const featured = index === 0;
  const shape = SHAPE[tileShape(index, caseStudies.length)];
  // Photo thumbnails (frontmatter `cover: true`) fill the well; logos sit centered.
  const isCover = String(cover) === 'true';
  const year = created ? new Date(created).getFullYear() : undefined;

  return (
    <BentoCard
      to={`/portfolio/${entry.slug}`}
      label={`Open ${title} case study`}
      delay={(index % 3) * 0.06}
      className={cn('flex flex-col gap-4 p-3 sm:p-4', shape.tile)}
    >
      <div
        className={cn(
          'bento-well relative grid aspect-[6/5] shrink-0 place-items-center overflow-hidden',
          shape.well,
        )}
      >
        <img
          src={thumbnail}
          alt=""
          loading={index < 3 ? 'eager' : 'lazy'}
          className={cn(
            'transition-[scale] duration-700 ease-[var(--ease-apple)] group-hover:scale-105',
            isCover
              ? 'absolute inset-0 size-full object-cover'
              : 'max-h-16 w-auto max-w-[65%] object-contain sm:max-h-20',
          )}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-1 pb-1 md:justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryChip category={category} />
          {year ? (
            <span className="text-xs text-muted-foreground">{year}</span>
          ) : null}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2
              className={cn(
                'font-semibold text-foreground',
                featured ? 'text-2xl md:text-3xl' : 'text-xl',
              )}
            >
              {studyName(title)}
            </h2>
            <p
              className={cn(
                'mt-1 text-[0.9rem] leading-relaxed text-muted-foreground',
                featured ? 'line-clamp-3' : 'line-clamp-2',
              )}
            >
              {description}
            </p>
          </div>
          <ArrowChip />
        </div>
      </div>
    </BentoCard>
  );
};

const PortfolioListPage = () => {
  return (
    <Layout>
      <Seo
        title="Portfolio"
        description="Selected case studies from Sal Anvarov — full stack engagements across SaaS, logistics, e-commerce, and AI tooling. Includes Cleanlist.ai, Hopin Technologies, Flurrish, Hellotax, and Natura Market."
        path="/portfolio"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: caseStudies.map((entry, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `${(
                import.meta.env.VITE_SITE_URL ?? 'https://www.sal-anvarov.com'
              ).replace(/\/+$/, '')}/portfolio/${entry.slug}`,
              name: entry.metadata.title,
            })),
          },
        ]}
      />
      <SectionHeading
        eyebrow="Selected case studies"
        description="Full stack engagements across SaaS, logistics, e-commerce, and AI tooling."
      >
        Portfolio
      </SectionHeading>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((entry, i) => (
          <CaseStudyTile entry={entry} index={i} key={entry.slug} />
        ))}
      </div>
    </Layout>
  );
};

export default PortfolioListPage;
