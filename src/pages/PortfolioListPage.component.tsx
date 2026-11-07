import { BentoCard, CardMeta } from '@/components/bento/BentoCard';
import { FormattedDate } from '@/components/FormattedDate.component';
import { Layout } from '@/components/layout/Layout.component';
import { SectionHeading } from '@/components/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { caseStudies } from '@/utils/content';
import { breadcrumbLd, Seo } from '@/utils/seo';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

type Group = typeof caseStudies;

const CaseStudyCard = ({
  entry,
  index,
}: {
  entry: Group[number];
  index: number;
}) => {
  const featured = index === 0;
  // Photo thumbnails (frontmatter `cover: true`) fill the frame; logos sit centered.
  const cover = featured || Boolean(entry.metadata.cover);
  const dateValue = entry.metadata.modified ?? entry.metadata.created ?? '';
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Thumbnail drifts against the scroll for a little depth.
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <BentoCard
      to={`/portfolio/${entry.slug}`}
      label={`Open ${entry.metadata.title} case study`}
      delay={(index % 3) * 0.08}
      className={cn(
        'flex flex-col gap-5 p-4 md:p-5',
        featured && 'md:col-span-2 lg:row-span-2'
      )}
    >
      <div
        ref={imageRef}
        className={cn(
          'bento-well relative grid flex-1 place-items-center overflow-hidden',
          featured ? 'min-h-56 md:min-h-80' : 'aspect-[16/10]'
        )}
      >
        <motion.img
          src={entry.metadata.thumbnail}
          alt="thumbnail"
          style={reduce ? undefined : { y }}
          className={cn(
            'transition-[scale] duration-700 ease-out group-hover:scale-105',
            cover
              ? 'absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover'
              : 'max-h-24 w-auto max-w-[75%] object-contain'
          )}
        />
      </div>
      <div className="flex flex-col gap-3 px-1 pb-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="rounded-full">
            {entry.metadata.category}
          </Badge>
          <FormattedDate value={dateValue} format="L - h:mm a" />
        </div>
        <CardMeta heading={entry.metadata.title} />
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
              url: `${
                (import.meta.env.VITE_SITE_URL ??
                  'https://www.sal-anvarov.com').replace(/\/+$/, '')
              }/portfolio/${entry.slug}`,
              name: entry.metadata.title,
            })),
          },
        ]}
      />
      <SectionHeading>Portfolio</SectionHeading>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {caseStudies.map((entry, i) => (
          <CaseStudyCard entry={entry} index={i} key={entry.slug} />
        ))}
      </div>
    </Layout>
  );
};

export default PortfolioListPage;
