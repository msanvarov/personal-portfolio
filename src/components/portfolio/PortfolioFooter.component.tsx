import { BentoCard } from '@/components/bento/BentoCard';
import { Reveal } from '@/components/motion/Reveal';
import { studyName } from '@/utils/content';
import { cn } from '@/lib/utils';
import { caseStudies } from '@/utils/content';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Entry = (typeof caseStudies)[number];

const NeighbourTile = ({
  entry,
  caption,
  next,
}: {
  entry: Entry;
  caption: string;
  next?: boolean;
}) => {
  const Arrow = next ? ArrowRight : ArrowLeft;
  return (
    <BentoCard
      to={`/portfolio/${entry.slug}`}
      label={`${caption}: ${entry.metadata.title}`}
      delay={next ? 0.06 : 0}
      className={cn(
        'flex items-center gap-3 p-3 sm:p-4',
        next && 'flex-row-reverse text-right',
      )}
    >
      <span className="bento-well relative grid size-14 shrink-0 place-items-center overflow-hidden">
        <img
          src={entry.metadata.thumbnail}
          alt=""
          loading="lazy"
          className={
            String(entry.metadata.cover) === 'true'
              ? 'absolute inset-0 size-full object-cover'
              : 'max-h-6 max-w-[80%] object-contain'
          }
        />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'flex items-center gap-1 text-[0.8rem] font-medium text-brand',
            next && 'justify-end',
          )}
        >
          {next ? null : <Arrow className="size-3.5" />}
          {caption}
          {next ? <Arrow className="size-3.5" /> : null}
        </span>
        <span className="block truncate text-base font-semibold text-foreground">
          {studyName(entry.metadata.title)}
        </span>
      </span>
    </BentoCard>
  );
};

export const PortfolioFooter = ({ slug }: { slug?: string }) => {
  const i = caseStudies.findIndex((s) => s.slug === slug);
  const prev =
    i >= 0
      ? caseStudies[(i - 1 + caseStudies.length) % caseStudies.length]
      : undefined;
  const next = i >= 0 ? caseStudies[(i + 1) % caseStudies.length] : undefined;

  return (
    <footer className="mt-10 flex flex-col gap-6">
      {prev && next ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <NeighbourTile entry={prev} caption="Previous" />
          <NeighbourTile entry={next} caption="Next" next />
        </div>
      ) : null}
      <Reveal className="flex justify-center">
        <Link to="/portfolio" className="btn-quiet group h-11 px-5 text-sm">
          <ArrowLeft className="size-4 transition-transform duration-300 ease-[var(--ease-apple)] group-hover:-translate-x-1" />
          Back to Portfolio Entries
        </Link>
      </Reveal>
    </footer>
  );
};
