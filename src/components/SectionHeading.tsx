import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

/** Four-point sparkle (Apple-style), drawn in currentColor so it themes. */
export const StarMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={cn('size-6', className)}>
    <path
      fill="currentColor"
      d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
    />
  </svg>
);

type SectionHeadingProps = {
  children: string;
  eyebrow?: string;
  description?: string;
  className?: string;
};

/** Apple-style page headline: big, tight, gradient, rising in on a spring. */
export const SectionHeading = ({
  children,
  eyebrow,
  description,
  className,
}: SectionHeadingProps) => (
  <div className={cn('mb-10 text-center md:mb-14', className)}>
    {eyebrow ? (
      <p className="mb-3 text-sm font-semibold text-brand">{eyebrow}</p>
    ) : null}
    <Reveal y={20}>
      <h1 className="text-gradient pb-1 text-5xl font-semibold md:text-7xl">
        {children}
      </h1>
    </Reveal>
    {description ? (
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        {description}
      </p>
    ) : null}
  </div>
);
