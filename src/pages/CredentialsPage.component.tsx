import { BentoCard, TileHeader } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { CountUp } from '@/components/motion/CountUp';
import { EASE, StaggerItem, StaggerList } from '@/components/motion/Reveal';
import { profileName } from '@/components/pages/profileName';
import { Timeline } from '@/components/pages/Timeline';
import { SectionHeading } from '@/components/SectionHeading';
import { en } from '@/i18n';
import { cn } from '@/lib/utils';
import { breadcrumbLd, personLd, Seo } from '@/utils/seo';
import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Cpu,
  Gauge,
  GraduationCap,
  Mail,
  UserRound,
} from 'lucide-react';
import type { ReactNode } from 'react';

const { navbar, bio, experience, education, capabilities, expertise } =
  en.credentials;

// "6+ years" → 6. Bars are scaled against the longest capability.
const years = (value: string) => Number(value.match(/^\d+/)?.[0] ?? 0);
const maxYears = Math.max(
  ...capabilities.capabilities.map((c) => years(c.percent)),
  1,
);

/** First cell of a small-tile grid: names the group. */
const GroupTile = ({
  icon,
  caption,
  title,
}: {
  icon: ReactNode;
  caption: string;
  title: string;
}) => (
  <BentoCard className="flex flex-col justify-between gap-6 p-4 sm:p-5">
    <span className="chip-icon size-11 rounded-xl [&_svg]:size-5">{icon}</span>
    <div>
      <p className="text-[0.8rem] font-medium text-brand">{caption}</p>
      <h2 className="mt-0.5 text-2xl font-semibold text-foreground">{title}</h2>
    </div>
  </BentoCard>
);

const ProfileTile = () => (
  <BentoCard className="p-4 sm:p-5 lg:sticky lg:top-28">
    <div className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:text-center">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#e6e3f1] via-[#b9b2dc] to-[#6f6896] sm:size-28 lg:aspect-square lg:size-auto lg:w-full">
        <img
          src={navbar.media}
          alt="bio"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold text-foreground lg:mt-1">
          {navbar.heading}
        </h2>
        <a
          href={`mailto:${navbar.email}`}
          className="mt-1 inline-flex min-h-8 items-center gap-1.5 break-all text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <Mail className="size-3.5 shrink-0 text-brand" />
          {navbar.email}
        </a>
      </div>
    </div>
    <StaggerList className="mt-4 flex justify-center gap-2">
      {navbar.profiles.map((item) => (
        <StaggerItem key={item.link}>
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={profileName(item.icon)}
            className="grid size-11 place-items-center rounded-full bg-secondary text-lg text-foreground shadow-[inset_0_0_0_1px_var(--bento-edge)] transition-colors hover:bg-brand hover:text-brand-foreground active:scale-95"
          >
            <i className={item.icon} aria-hidden />
          </a>
        </StaggerItem>
      ))}
    </StaggerList>
    <Link
      to={navbar.button.link}
      className="btn-brand mt-4 h-11 w-full text-sm"
    >
      {navbar.button.text} <ArrowRight className="size-4" />
    </Link>
  </BentoCard>
);

const CapabilityTile = ({
  item,
  index,
}: {
  item: (typeof capabilities.capabilities)[number];
  index: number;
}) => {
  const reduce = useReducedMotion();
  const [, number = '', plus = '', unit = ''] =
    item.percent.match(/^(\d+)(\+?)\s*(.*)$/) ?? [];
  return (
    <BentoCard
      delay={(index % 3) * 0.06}
      interactive
      className="flex flex-col p-4 sm:p-5"
    >
      <p className="flex items-start font-heading text-5xl font-semibold tracking-[-0.04em]">
        <CountUp value={number} className="text-gradient text-gradient-pan" />
        <span className="ml-0.5 text-3xl text-brand">{plus}</span>
        <span className="ml-1.5 self-end pb-1.5 text-xs font-medium tracking-normal text-muted-foreground">
          {unit}
        </span>
      </p>
      <h3 className="mt-2 text-[1.05rem] font-semibold text-foreground">
        {item.name}
      </h3>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-brand/80 to-brand/30"
          style={{ width: `${(years(item.percent) / maxYears) * 100}%` }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </BentoCard>
  );
};

const CredentialsPage = () => {
  return (
    <Layout>
      <Seo
        title="Credentials"
        description="Resume and capabilities of Sal Anvarov: experience at Oproma, Cleanlist.ai, Permion.ai, and prior roles; expertise across React, TypeScript, Node.js, NestJS, AWS, GCP, and AI engineering."
        path="/credentials"
        type="profile"
        jsonLd={[
          personLd(),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Credentials', path: '/credentials' },
          ]),
        ]}
      />
      <SectionHeading>Credentials</SectionHeading>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <ProfileTile />
        </aside>

        <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 lg:col-span-8">
          <BentoCard delay={0.05} className="p-4 sm:p-6">
            <TileHeader
              align="start"
              icon={<UserRound />}
              caption="Bio"
              title={bio.heading}
            />
            <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
              {bio.description.map((item, index) => (
                <p
                  key={index}
                  className="[&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </div>
          </BentoCard>

          <BentoCard className="p-4 sm:p-6">
            <TileHeader
              align="start"
              icon={<BriefcaseBusiness />}
              caption={`${experience.experience.length} roles`}
              title={experience.heading}
            />
            <Timeline
              size="lg"
              className="mt-5"
              items={experience.experience.map((item) => ({
                date: item.date,
                title: item.title,
                subtitle: item.company,
                description: item.description,
              }))}
            />
          </BentoCard>

          <BentoCard className="p-4 sm:p-6">
            <TileHeader
              align="start"
              icon={<GraduationCap />}
              caption={`${education.education.length} programs`}
              title={education.heading}
            />
            <Timeline
              size="lg"
              className="mt-5"
              items={education.education.map((item) => ({
                date: item.date,
                title: item.degree,
                subtitle: item.university,
                description:
                  'description' in item
                    ? (item.description as string | undefined)
                    : undefined,
              }))}
            />
          </BentoCard>

          <section
            aria-label={capabilities.heading}
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
          >
            <GroupTile
              icon={<Gauge />}
              caption="Years of practice"
              title={capabilities.heading}
            />
            {capabilities.capabilities.map((item, index) => (
              <CapabilityTile key={item.name} item={item} index={index + 1} />
            ))}
          </section>

          <section
            aria-label={expertise.heading}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3"
          >
            <GroupTile
              icon={<Cpu />}
              caption={`${expertise.expertise.length} technologies`}
              title={expertise.heading}
            />
            {expertise.expertise.map((item, index) => (
              <BentoCard
                key={item.name}
                delay={((index + 1) % 3) * 0.06}
                interactive
                className="p-4 sm:p-5"
              >
                <span
                  className={cn(
                    'chip-icon text-[0.7rem] font-semibold transition-colors duration-300',
                    'group-hover:bg-brand group-hover:text-brand-foreground',
                  )}
                >
                  {item.name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
                </span>
                <h3 className="mt-3 text-[1.05rem] font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </BentoCard>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CredentialsPage;
