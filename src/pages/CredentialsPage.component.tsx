import { BentoCard } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { CountUp } from '@/components/motion/CountUp';
import { EASE, Reveal, SplitWords } from '@/components/motion/Reveal';
import { Timeline } from '@/components/pages/Timeline';
import { Button } from '@/components/ui/button';
import { en } from '@/i18n';
import { breadcrumbLd, personLd, Seo } from '@/utils/seo';
import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';

const SubHeading = ({ children }: { children: string }) => (
  <h2 className="mb-8 text-3xl font-semibold uppercase text-foreground md:text-4xl">
    <SplitWords text={children} />
  </h2>
);

// "6+ years" → 6. Bars are scaled against the longest capability.
const years = (value: string) => Number(value.match(/^\d+/)?.[0] ?? 0);
const maxYears = Math.max(
  ...en.credentials.capabilities.capabilities.map((c) => years(c.percent)),
  1
);

const CredentialsPage = () => {
  const reduce = useReducedMotion();
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
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <aside className="lg:col-span-4">
          <BentoCard className="p-6 text-center lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[calc(var(--radius-bento)-0.5rem)] bg-gradient-to-br from-brand/80 via-[#7d93ff] to-[#b7c3ff]">
              <img
                src={en.credentials.navbar.media}
                alt="bio"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-foreground">
              {en.credentials.navbar.heading}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {en.credentials.navbar.email}
            </p>
            <ul className="mt-5 flex justify-center gap-2">
              {en.credentials.navbar.profiles.map((item) => (
                <li key={item.link}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={item.icon.replace('iconoir-', '')}
                    className="grid size-11 place-items-center rounded-full border border-border bg-background/60 text-xl text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand"
                  >
                    <i className={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-6 h-11 w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Link to={en.credentials.navbar.button.link}>
                {en.credentials.navbar.button.text}
              </Link>
            </Button>
          </BentoCard>
        </aside>

        <div className="lg:col-span-8">
          <section>
            <SubHeading>{en.credentials.bio.heading}</SubHeading>
            <Reveal className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {en.credentials.bio.description.map((item, index) => (
                <p
                  key={index}
                  className="[&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </Reveal>
          </section>

          <section className="mt-16">
            <SubHeading>{en.credentials.experience.heading}</SubHeading>
            <Timeline
              size="lg"
              items={en.credentials.experience.experience.map((item) => ({
                date: item.date,
                title: item.title,
                subtitle: item.company,
                description: item.description,
              }))}
            />
          </section>

          <section className="mt-16">
            <SubHeading>{en.credentials.education.heading}</SubHeading>
            <Timeline
              size="lg"
              items={en.credentials.education.education.map((item) => ({
                date: item.date,
                title: item.degree,
                subtitle: item.university,
                description:
                  'description' in item
                    ? (item.description as string | undefined)
                    : undefined,
              }))}
            />
          </section>

          <section className="mt-16">
            <SubHeading>{en.credentials.capabilities.heading}</SubHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {en.credentials.capabilities.capabilities.map((item, index) => (
                <BentoCard
                  key={item.name}
                  delay={(index % 2) * 0.08}
                  className="p-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <CountUp
                      value={item.percent}
                      className="shrink-0 font-mono text-sm text-brand"
                    />
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-[#9aa9ff]"
                      style={{ width: `${(years(item.percent) / maxYears) * 100}%` }}
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
                    />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </BentoCard>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SubHeading>{en.credentials.expertise.heading}</SubHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {en.credentials.expertise.expertise.map((item, index) => (
                <BentoCard
                  key={item.name}
                  delay={(index % 2) * 0.08}
                  className="p-6"
                >
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </BentoCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CredentialsPage;
