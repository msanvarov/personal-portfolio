import { BentoCard } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { ProfileContactCredentialsRow } from '@/components/pages/ProfileContactCredentialsRow';
import { SectionHeading } from '@/components/SectionHeading';
import { en } from '@/i18n';
import { breadcrumbLd, personLd, Seo } from '@/utils/seo';

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

      <div className="grid gap-4 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <BentoCard className="p-6 lg:sticky lg:top-28">
            <ul className="space-y-6">
              {en.offerings.navbar.entries.map((item) => (
                <li key={item.text}>
                  <div className="flex items-center gap-3">
                    <span className="bento-well grid size-11 place-items-center text-xl text-brand">
                      <i className={item.icon} />
                    </span>
                    <span className="font-heading text-lg font-semibold text-foreground">
                      {item.text}
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.topics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </BentoCard>
        </aside>

        <div className="space-y-4 lg:col-span-8">
          {en.offerings.offerings.map((item, index) => (
            <BentoCard
              key={item.title}
              delay={0.05}
              tilt={2}
              className="p-8 md:p-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-brand">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              <div className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground [&_b]:font-semibold [&_b]:text-foreground">
                {item.description.map((desc, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: desc }} />
                ))}
              </div>
            </BentoCard>
          ))}
        </div>
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
