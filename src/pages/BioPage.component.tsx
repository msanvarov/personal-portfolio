import { BentoCard, TileHeader } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { Reveal, StaggerItem, StaggerList } from '@/components/motion/Reveal';
import { ProfileContactCredentialsRow } from '@/components/pages/ProfileContactCredentialsRow';
import { Timeline } from '@/components/pages/Timeline';
import { SectionHeading } from '@/components/SectionHeading';
import { en } from '@/i18n';
import { breadcrumbLd, personLd, Seo } from '@/utils/seo';
import { BriefcaseBusiness, GraduationCap } from 'lucide-react';

const presentRoles = en.bio.experience.experience.filter((e) =>
  e.date.includes('Present'),
);

const BioPage = () => {
  return (
    <Layout>
      <Seo
        title="Bio"
        description="The story behind Sal Anvarov — full stack developer and Co-founder of Cleanlist.ai. Education, work history, and the path from CS undergrad to building AI-powered B2B tooling."
        path="/bio"
        type="profile"
        jsonLd={[
          personLd(),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Bio', path: '/bio' },
          ]),
        ]}
      />
      <SectionHeading>{en.bio.bio.details.heading}</SectionHeading>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12">
        <BentoCard className="p-2 md:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-[calc(var(--radius-bento)-0.5rem)] bg-gradient-to-br from-[#e6e3f1] via-[#b9b2dc] to-[#6f6896]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgb(255_255_255/0.35),transparent_70%)]"
            />
            <img
              src={en.bio.bio.media}
              alt="bio"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-105"
            />
          </div>
        </BentoCard>

        <BentoCard
          delay={0.08}
          className="beam flex flex-col justify-center p-5 sm:p-8 md:col-span-7 md:p-10"
        >
          <h2 className="text-gradient pb-1 text-4xl font-semibold md:text-5xl">
            {en.bio.bio.details.name}
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
              {en.bio.bio.details.description}
            </p>
          </Reveal>
          <StaggerList className="mt-5 flex flex-wrap gap-2">
            {presentRoles.map((role) => (
              <StaggerItem
                key={role.company}
                className="chip whitespace-normal py-1.5 pl-2.5 text-[0.8rem] text-muted-foreground"
              >
                <BriefcaseBusiness className="size-3.5 shrink-0 text-brand" />
                <span>
                  <span className="text-foreground">{role.title}</span> ·{' '}
                  {role.company}
                </span>
              </StaggerItem>
            ))}
          </StaggerList>
        </BentoCard>

        <BentoCard className="p-4 sm:p-6 md:col-span-6">
          <TileHeader
            align="start"
            icon={<BriefcaseBusiness />}
            caption={`${en.bio.experience.experience.length} roles`}
            title={en.bio.experience.heading}
          />
          <Timeline
            className="mt-5"
            items={en.bio.experience.experience.map((item) => ({
              date: item.date,
              title: item.title,
              subtitle: item.company,
            }))}
          />
        </BentoCard>

        <BentoCard delay={0.08} className="p-4 sm:p-6 md:col-span-6">
          <TileHeader
            align="start"
            icon={<GraduationCap />}
            caption={`${en.bio.education.education.length} programs`}
            title={en.bio.education.heading}
          />
          <Timeline
            className="mt-5"
            items={en.bio.education.education.map((item) => ({
              date: item.date,
              title: item.degree,
              subtitle: item.university,
            }))}
          />
        </BentoCard>
      </div>

      <ProfileContactCredentialsRow
        credentials={en.bio.credentials}
        contact={en.bio.contact}
        profiles={en.bio.profiles}
      />
    </Layout>
  );
};

export default BioPage;
