import { FormattedDate } from '@/components/FormattedDate.component';
import { Layout } from '@/components/layout/Layout.component';
import { caseStudies } from '@/utils/content';
import { breadcrumbLd, Seo } from '@/utils/seo';
import { Link } from '@tanstack/react-router';

type Group = typeof caseStudies;

const CaseStudyCard = ({ entry }: { entry: Group[number] }) => {
  const dateValue = entry.metadata.modified ?? entry.metadata.created ?? '';
  return (
    <div data-aos="zoom-in" className="flex-1">
      <div className="project-item shadow-box">
        <Link
          className="overlay-link"
          to="/portfolio/$entry"
          params={{ entry: entry.slug }}
          aria-label={`Open ${entry.metadata.title} case study`}
        />
        <img src="/assets/bg1.png" alt="BG" className="bg-img" />
        <div className="project-img">
          <img src={entry.metadata.thumbnail} alt="thumbnail" />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="project-info">
            <p>{entry.metadata.category}</p>
            <h1>{entry.metadata.title}</h1>
            <FormattedDate value={dateValue} format="L - h:mm a" />
          </div>
          <Link
            to="/portfolio/$entry"
            params={{ entry: entry.slug }}
            className="project-btn"
          >
            <img src="/assets/icons/cta-icon.svg" alt="Button" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Row = ({ entries }: { entries: Group }) => (
  <div className="d-flex align-items-start gap-24">
    {entries.map((entry, i) => (
      <CaseStudyCard entry={entry} key={i} />
    ))}
  </div>
);

const PortfolioListPage = () => {
  const left = caseStudies.slice(0, 2);
  const remaining = caseStudies.slice(2);
  const rows: Group[] = [];
  for (let i = 0; i < remaining.length; i += 2) {
    rows.push(remaining.slice(i, i + 2));
  }

  return (
    <Layout wrapperClass="main-workspage">
      <Seo
        title="Portfolio"
        description="Selected case studies from Sal Anvarov — full stack engagements across SaaS, logistics, e-commerce, and AI tooling. Includes Cleanlist.ai, Hopin Technologies, Flurrish, Hellotax, and Natura Market."
        path="/portfolio"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: caseStudies.map((entry, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `${
                (import.meta.env.VITE_SITE_URL ??
                  'https://www.sal-anvarov.com').replace(/\/+$/, '')
              }/portfolio/${entry.slug}`,
              name: entry.metadata.title,
            })),
          },
        ]}
      />
      <section className="projects-area">
        <div className="container">
          <h1 className="section-heading" data-aos="fade-up">
            <img src="/assets/star-2.png" alt="Star" /> Portfolio{' '}
            <img src="/assets/star-2.png" alt="Star" />
          </h1>
          <div className="row">
            <div className="col-md-4">
              {left.map((entry, i) => (
                <CaseStudyCard entry={entry} key={i} />
              ))}
            </div>
            <div className="col-md-8">
              <h1 className="section-heading" data-aos="fade-up">
                <img src="/assets/star-2.png" alt="Star" /> Portfolio{' '}
                <img src="/assets/star-2.png" alt="Star" />
              </h1>
              {rows.map((row, i) => (
                <Row entries={row} key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioListPage;
