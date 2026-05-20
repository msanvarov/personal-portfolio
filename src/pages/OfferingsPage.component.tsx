import { Layout } from '@/components/layout/Layout.component';
import { en } from '@/i18n';
import { breadcrumbLd, personLd, Seo } from '@/utils/seo';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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
      <section className="service-area">
        <div className="container">
          <h1 className="section-heading" data-aos="fade-up">
            <img src="/assets/star-2.png" alt="Star" /> {en.offerings.heading}{' '}
            <img src="/assets/star-2.png" alt="Star" />
          </h1>
          <div className="row">
            <div className="col-md-4">
              <div className="service-sidebar" data-aos="fade-right">
                <div className="service-sidebar-inner shadow-box">
                  <ul>
                    {en.offerings.navbar.entries.map((item, index) => (
                      <li key={index}>
                        <i className={classNames('icon', item.icon)} />
                        {item.text}
                        <ul className="service-sidebar-topics">
                          {item.topics.map((topic, j) => (
                            <li key={j}>
                              - <b>{topic}</b>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <h1 className="section-heading" data-aos="fade-up">
                <img src="/assets/star-2.png" alt="Star" />{' '}
                {en.offerings.heading}{' '}
                <img src="/assets/star-2.png" alt="Star" />
              </h1>
              <div className="service-content-wrap" data-aos="zoom-in">
                <div className="service-content-inner shadow-box">
                  <div className="service-items">
                    {en.offerings.offerings.map((item, index) => (
                      <div className="service-item" key={index}>
                        <h3>{item.title}</h3>
                        {item.description.map((desc, j) => (
                          <p
                            key={j}
                            dangerouslySetInnerHTML={{ __html: desc }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-24">
            <div className="col-md-12">
              <div className="d-flex profile-contact-credentials-wrap gap-24">
                <div data-aos="zoom-in" className="h-full">
                  <div className="about-crenditials-box info-box shadow-box">
                    <Link className="overlay-link" to="/credentials" />
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <img src={en.offerings.credentials.media} alt="Sign" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="infos">
                        <h4>{en.offerings.credentials.caption}</h4>
                        <h1>{en.offerings.credentials.heading}</h1>
                      </div>
                      <Link
                        to={en.offerings.credentials.button.link}
                        className="about-btn"
                      >
                        <img
                          src={en.offerings.credentials.button.icon}
                          alt="button"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div data-aos="zoom-in" className="flex-1">
                  <div className="about-contact-box info-box shadow-box">
                    <Link className="overlay-link" to="/contact" />
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <img
                      src="/assets/icons/icon2.png"
                      alt="Icon"
                      className="star-icon"
                    />
                    <h1
                      dangerouslySetInnerHTML={{
                        __html: en.offerings.contact.heading,
                      }}
                    />
                    <Link
                      to={en.offerings.contact.button.link}
                      className="about-btn"
                    >
                      <img
                        src={en.offerings.contact.button.icon}
                        alt="button"
                      />
                    </Link>
                  </div>
                </div>
                <div data-aos="zoom-in">
                  <div className="about-profile-box info-box shadow-box h-full">
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <div className="inner-profile-icons shadow-box">
                      {en.offerings.profiles.profiles.map((item, index) => (
                        <a
                          href={item.link}
                          key={index}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <i className={item.icon} />
                        </a>
                      ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="infos">
                        <h4>{en.offerings.profiles.caption}</h4>
                        <h1>{en.offerings.profiles.heading}</h1>
                      </div>
                      <Link
                        to={en.offerings.profiles.button.link}
                        className="about-btn"
                      >
                        <img
                          src={en.offerings.profiles.button.icon}
                          alt="button"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OfferingsPage;
