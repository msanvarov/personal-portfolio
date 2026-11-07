import { BentoCard } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { Reveal } from '@/components/motion/Reveal';
import { ProfileContactCredentialsRow } from '@/components/pages/ProfileContactCredentialsRow';
import { Timeline } from '@/components/pages/Timeline';
import { SectionHeading, StarMark } from '@/components/SectionHeading';
import { en } from '@/i18n';
import { breadcrumbLd, personLd, Seo } from '@/utils/seo';

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

      <div className="grid gap-4 md:grid-cols-12">
        <BentoCard className="p-4 md:col-span-5">
          <div className="overflow-hidden rounded-[calc(var(--radius-bento)-0.5rem)] bg-gradient-to-br from-brand/80 via-[#7d93ff] to-[#b7c3ff]">
            <img
              src={en.bio.bio.media}
              alt="bio"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </BentoCard>

        <BentoCard
          delay={0.08}
          className="flex flex-col justify-center gap-6 p-8 md:col-span-7 md:p-10"
        >
          <StarMark className="size-10 animate-spin-slow text-brand" />
          <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
            {en.bio.bio.details.name}
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
              {en.bio.bio.details.description}
            </p>
          </Reveal>
        </BentoCard>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <BentoCard tilt={0} className="p-8">
          <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {en.bio.experience.heading}
          </h3>
          <Timeline
            items={en.bio.experience.experience.map((item) => ({
              date: item.date,
              title: item.title,
              subtitle: item.company,
            }))}
          />
        </BentoCard>
        <BentoCard tilt={0} delay={0.08} className="p-8">
          <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {en.bio.education.heading}
          </h3>
          <Timeline
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
