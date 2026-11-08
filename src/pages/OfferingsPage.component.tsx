import { BentoCard } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { StaggerItem, StaggerList } from '@/components/motion/Reveal';
import { ProfileContactCredentialsRow } from '@/components/pages/ProfileContactCredentialsRow';
import { SectionHeading } from '@/components/SectionHeading';
import { en } from '@/i18n';
import { breadcrumbLd, personLd, Seo } from '@/utils/seo';

// navbar.entries[i] (icon + topics) lines up with offerings[i] (copy).
const tiles = en.offerings.offerings.map((offering, i) => ({
  ...offering,
  ...en.offerings.navbar.entries[i],
}));

const OfferingsPage = () => {
  return (
    <Layout>
      <Seo
        title="Offerings"
        description="Consulting and contract offerings: full-stack web product development, AI-powered B2B tooling, and DevOps for high-velocity startups. Engagements run by Sal Anvarov."
        path="/offerings"
        jsonLd={[
          personLd(),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Offerings', path: '/offerings' },
          ]),
        ]}
      />
      <SectionHeading>{en.offerings.heading}</SectionHeading>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        {tiles.map((item, index) => (
          <BentoCard
            key={item.title}
            delay={(index % 2) * 0.08}
            interactive
            className="flex flex-col p-4 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="chip-icon size-11 shrink-0 rounded-xl text-xl transition-[rotate,scale,background-color,color] duration-500 ease-[var(--ease-apple)] group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-brand-foreground">
                <i className={item.icon} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-brand">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  {item.title}
                </h2>
              </div>
            </div>

            <StaggerList className="mt-4 flex flex-wrap gap-2">
              {item.topics.map((topic) => (
                <StaggerItem
                  key={topic}
                  className="chip whitespace-normal py-1.5 pl-2.5 text-[0.8rem] leading-snug"
                >
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-brand"
                  />
                  {topic}
                </StaggerItem>
              ))}
            </StaggerList>

            <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-5 text-[0.95rem] leading-relaxed text-muted-foreground [&_b]:font-semibold [&_b]:text-foreground">
              {item.description.map((desc, j) => (
                <li
                  key={j}
                  // Copy is authored as "- <b>Term</b>: …"; the dash is a bullet.
                  dangerouslySetInnerHTML={{ __html: desc.replace(/^- /, '') }}
                />
              ))}
            </ul>
          </BentoCard>
        ))}
      </div>

      <ProfileContactCredentialsRow
        credentials={en.offerings.credentials}
        contact={en.offerings.contact}
        profiles={en.offerings.profiles}
      />
    </Layout>
  );
};

export default OfferingsPage;
