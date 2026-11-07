import { ArrowChip, BentoCard, CardMeta } from '@/components/bento/BentoCard';
import { StarMark } from '@/components/SectionHeading';

type Profile = { link: string; icon: string };

type Props = {
  credentials: {
    heading: string;
    caption: string;
    media: string;
    button: { link: string };
  };
  contact: { heading: string; button: { link: string } };
  profiles: {
    heading: string;
    caption: string;
    button: { link: string };
    profiles: Profile[];
  };
};

/** Qualifications · Let's collaborate · Profiles — the closing bento row. */
export const ProfileContactCredentialsRow = ({
  credentials,
  contact,
  profiles,
}: Props) => (
  <div className="mt-4 grid gap-4 md:grid-cols-12">
    <BentoCard
      to={credentials.button.link}
      label="Open credentials"
      className="flex min-h-64 flex-col justify-between gap-8 p-6 md:col-span-4"
    >
      <img
        src={credentials.media}
        alt="Signature"
        className="mx-auto mt-6 h-20 w-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
      />
      <CardMeta caption={credentials.caption} heading={credentials.heading} />
    </BentoCard>

    <BentoCard
      to={contact.button.link}
      label="Open contact"
      delay={0.08}
      className="flex min-h-64 flex-col justify-between gap-8 p-6 md:col-span-5"
    >
      <StarMark className="size-10 animate-spin-slow text-brand" />
      <div className="flex items-end justify-between gap-4">
        <h3
          className="text-4xl font-semibold leading-[1.05] text-foreground md:text-5xl [&_span]:font-serif [&_span]:font-normal [&_span]:italic [&_span]:text-brand"
          dangerouslySetInnerHTML={{ __html: contact.heading }}
        />
        <ArrowChip />
      </div>
    </BentoCard>

    <BentoCard
      to={profiles.button.link}
      label="Open contact"
      delay={0.16}
      className="flex min-h-64 flex-col justify-between gap-8 p-6 md:col-span-3"
    >
      <div className="bento-well relative z-20 flex flex-wrap justify-center gap-3 p-3">
        {profiles.profiles.map((item) => (
          <a
            key={item.link}
            href={item.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.icon.replace('iconoir-', '')}
            className="grid size-14 place-items-center rounded-full border border-border bg-background/60 text-2xl text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand"
          >
            <i className={item.icon} />
          </a>
        ))}
      </div>
      <CardMeta caption={profiles.caption} heading={profiles.heading} />
    </BentoCard>
  </div>
);
