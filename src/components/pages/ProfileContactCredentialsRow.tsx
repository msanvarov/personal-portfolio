import { BentoCard, TileHeader } from '@/components/bento/BentoCard';
import { StaggerItem, StaggerList } from '@/components/motion/Reveal';
import { profileName } from '@/components/pages/profileName';
import { Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Handshake,
  Share2,
} from 'lucide-react';

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
  <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3">
    <BentoCard className="flex flex-col p-4 sm:p-5">
      <TileHeader
        icon={<Award />}
        caption={credentials.caption}
        title={credentials.heading}
      />
      <div className="bento-well mt-4 grid flex-1 place-items-center px-4 py-5">
        <img
          src={credentials.media}
          alt="Signature"
          className="h-14 w-auto object-contain invert transition-transform duration-700 ease-[var(--ease-apple)] group-hover:-rotate-2 group-hover:scale-105 dark:invert-0"
        />
      </div>
      <Link
        to={credentials.button.link}
        className="btn-quiet mt-4 h-11 w-full text-sm"
      >
        Open credentials <ArrowRight className="size-4" />
      </Link>
    </BentoCard>

    <BentoCard
      delay={0.08}
      className="flex flex-col items-center justify-center p-5 text-center sm:p-6"
    >
      <span className="ring-spin grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
        <Handshake className="size-6" strokeWidth={1.75} />
      </span>
      <h2
        className="mt-4 text-3xl font-semibold text-foreground [&_br]:hidden [&_span]:text-gradient"
        dangerouslySetInnerHTML={{ __html: contact.heading }}
      />
      <Link
        to={contact.button.link}
        className="btn-brand mt-5 h-11 w-full px-5 text-sm sm:w-fit"
      >
        Open contact <ArrowRight className="size-4" />
      </Link>
    </BentoCard>

    <BentoCard delay={0.16} className="flex flex-col p-4 sm:p-5">
      <TileHeader
        icon={<Share2 />}
        caption={profiles.caption}
        title={profiles.heading}
      />
      <StaggerList className="mb-4 mt-4 flex flex-col gap-2">
        {profiles.profiles.map((item) => (
          <StaggerItem key={item.link}>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer noopener"
              className="chip group/row w-full justify-between py-2 pr-3 transition-shadow hover:shadow-[inset_0_0_0_1px_var(--bento-edge-hi)]"
            >
              <span className="flex items-center gap-2">
                <span className="chip-icon transition-colors duration-300 group-hover/row:bg-brand group-hover/row:text-brand-foreground">
                  <i className={item.icon} aria-hidden />
                </span>
                {profileName(item.icon)}
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 ease-[var(--ease-apple)] group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-brand" />
            </a>
          </StaggerItem>
        ))}
      </StaggerList>
      <Link
        to={profiles.button.link}
        className="btn-quiet mt-auto h-11 w-full text-sm"
      >
        {profiles.caption} <ArrowRight className="size-4" />
      </Link>
    </BentoCard>
  </div>
);
