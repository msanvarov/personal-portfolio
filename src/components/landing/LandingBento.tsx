import { ArrowChip, BentoCard, CardMeta } from '@/components/bento/BentoCard';
import { CountUp } from '@/components/motion/CountUp';
import { StarMark } from '@/components/SectionHeading';
import { en } from '@/i18n';
import { motion, useReducedMotion } from 'framer-motion';
import { ParallaxImage } from './ParallaxImage';
import { VelocityMarquee } from './VelocityMarquee';

const { bio, credentials, cv, blog, offerings, profiles, facts, contact } =
  en.landing;

const MarqueeItem = () => (
  <span className="flex items-center gap-6 pr-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
    Personal CV and <b className="text-foreground">Blog</b>
    <StarMark className="size-3 text-brand" />
  </span>
);

const AboutCard = () => (
  <BentoCard
    to="/bio"
    label="Open bio"
    className="p-6 sm:col-span-2 md:p-8 lg:col-span-6"
  >
    <div className="flex h-full flex-col gap-8 sm:flex-row sm:items-start">
      <div className="relative w-full max-w-60 shrink-0 self-center overflow-hidden rounded-[1.5rem] rounded-br-[3.5rem] bg-gradient-to-b from-[#5b78f6] to-[#9ad8ff] sm:self-start">
        <ParallaxImage
          src={bio.media}
          alt="Sal Anvarov 3D portrait"
          distance={24}
          className="relative w-full"
        />
      </div>
      <div className="flex min-h-full flex-1 flex-col">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {bio.caption}
        </p>
        <h2 className="mt-2 text-4xl font-semibold text-foreground md:text-5xl">
          {bio.heading}
        </h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          {bio.description}
        </p>
        <p
          className="mt-4 leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: bio.descriptionExtended }}
        />
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <p className="text-sm text-muted-foreground">{bio.location}</p>
          <ArrowChip />
        </div>
      </div>
    </div>
  </BentoCard>
);

const MarqueeCard = () => (
  <BentoCard
    delay={0.05}
    tilt={0}
    className="flex items-center rounded-full py-5 sm:col-span-2"
  >
    <VelocityMarquee>
      {Array.from({ length: 4 }, (_, i) => (
        <MarqueeItem key={i} />
      ))}
    </VelocityMarquee>
  </BentoCard>
);

type ImageCardProps = {
  to: string;
  label: string;
  media: string;
  caption: string;
  heading: string;
  delay?: number;
  className?: string;
};

const ImageCard = ({
  to,
  label,
  media,
  caption,
  heading,
  delay,
  className,
}: ImageCardProps) => (
  <BentoCard
    to={to}
    label={label}
    delay={delay}
    className={`flex flex-col justify-between gap-6 p-6 ${className ?? ''}`}
  >
    <div className="grid flex-1 place-items-center py-2">
      <ParallaxImage src={media} alt="" className="max-h-44 w-auto" />
    </div>
    <CardMeta caption={caption} heading={heading} />
  </BentoCard>
);

const OfferingsCard = () => {
  const reduce = useReducedMotion();
  return (
    <BentoCard
      to={offerings.link}
      label="Open offerings"
      delay={0.1}
      className="flex flex-col justify-between gap-8 p-6 sm:col-span-2 lg:col-span-6"
    >
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {offerings.icons.map((icon, i) => (
          <motion.div
            key={icon}
            initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + i * 0.08 }}
            className="bento-well grid aspect-square place-items-center text-3xl text-foreground transition-transform duration-500 group-hover:-translate-y-1 sm:text-4xl"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <i className={icon} aria-hidden />
          </motion.div>
        ))}
      </div>
      <CardMeta caption={offerings.caption} heading={offerings.heading} />
    </BentoCard>
  );
};

const ProfilesCard = () => (
  <BentoCard
    to={profiles.button.link}
    label="Open contact"
    delay={0.15}
    className="flex flex-col justify-between gap-8 p-6 lg:col-span-3"
  >
    <div className="bento-well flex items-center justify-center gap-4 p-4">
      {profiles.profiles.map((item) => (
        <a
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={item.link.includes('github') ? 'GitHub' : 'LinkedIn'}
          className="relative z-20 grid size-16 place-items-center rounded-full border border-border bg-background/60 text-2xl text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-brand-foreground"
        >
          <i className={item.icon} aria-hidden />
        </a>
      ))}
    </div>
    <CardMeta caption={profiles.caption} heading={profiles.heading} />
  </BentoCard>
);

const FactsCard = () => (
  <BentoCard tilt={2} className="p-4 sm:col-span-2 sm:p-6 lg:col-span-6">
    <div className="grid h-full grid-cols-3 gap-3 sm:gap-4">
      {facts.quickFacts.map((item) => (
        <div
          key={item.label}
          className="bento-well flex flex-col items-center justify-center gap-3 px-2 py-8 text-center"
        >
          <CountUp
            value={item.count}
            className="font-heading text-4xl font-semibold text-foreground sm:text-5xl"
          />
          <p
            className="text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.15em] text-muted-foreground sm:text-xs"
            dangerouslySetInnerHTML={{ __html: item.label }}
          />
        </div>
      ))}
    </div>
  </BentoCard>
);

const ContactCard = () => (
  <BentoCard
    to={contact.button.link}
    label="Open contact"
    delay={0.1}
    className="flex flex-col justify-between gap-6 p-6 sm:col-span-2 md:p-8 lg:col-span-6"
  >
    <StarMark className="size-10 animate-spin-slow text-brand" />
    <div className="flex items-end justify-between gap-6">
      <h2
        className="text-4xl font-semibold leading-[1.05] text-foreground md:text-5xl [&_span]:font-serif [&_span]:font-normal [&_span]:italic [&_span]:text-brand"
        dangerouslySetInnerHTML={{ __html: contact.heading }}
      />
      <ArrowChip className="size-14" />
    </div>
  </BentoCard>
);

export const LandingBento = () => (
  <div className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-12">
    <AboutCard />
    <div className="contents sm:col-span-2 lg:col-span-6 lg:flex lg:flex-col lg:gap-6">
      <MarqueeCard />
      <div className="grid grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-2 md:gap-6 lg:flex-1">
        <ImageCard
          to="/credentials"
          label="Open credentials"
          media={credentials.media}
          caption={credentials.caption}
          heading={credentials.heading}
          delay={0.1}
        />
        <ImageCard
          to="/portfolio"
          label="Open portfolio"
          media={cv.media}
          caption={cv.caption}
          heading={cv.heading}
          delay={0.18}
        />
      </div>
    </div>
    <ImageCard
      to="/blog"
      label="Open blog"
      media={blog.media}
      caption={blog.caption}
      heading={blog.heading}
      className="lg:col-span-3"
    />
    <OfferingsCard />
    <ProfilesCard />
    <FactsCard />
    <ContactCard />
  </div>
);
