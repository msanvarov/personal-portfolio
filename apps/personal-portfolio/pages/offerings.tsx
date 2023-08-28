import { Layout } from '@msanvarov/core-components';
import classNames from 'classnames';
import Link from 'next/link';
import { Container } from 'reactstrap';
import content from './content/offerings.json';

const OfferingsPage = () => {
  return (
    <Layout>
      <section className="service-area">
        <div className="container">
          <h1 className="section-heading" data-aos="fade-up">
            <img src="/assets/star-2.png" alt="Star" /> {content.heading}{' '}
            <img src="/assets/star-2.png" alt="Star" />
          </h1>
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-4">
              <div className="service-sidebar" data-aos="fade-right">
                <div className="service-sidebar-inner shadow-box">
                  <ul>
                    {content.navbar.entries.map((item, index) => (
                      <>
                        <li key={index}>
                          <i className={classNames('icon', item.icon)} />
                          {item.text}
                        </li>
                        <Container>
                          {item.topics.map((item, index) => (
                            <p key={index}>
                              - <b>{item}</b>
                            </p>
                          ))}
                        </Container>
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="col-md-8">
              <h1 className="section-heading" data-aos="fade-up">
                <img src="/assets/star-2.png" alt="Star" /> {content.heading}{' '}
                <img src="/assets/star-2.png" alt="Star" />
              </h1>
              <div className="service-content-wrap" data-aos="zoom-in">
                <div className="service-content-inner shadow-box">
                  <div className="service-items">
                    {content.offerings.map((item, index) => (
                      <div className="service-item" key={index}>
                        <h3>{item.title}</h3>
                        {item.description.map((item, index) => (
                          <p
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                          ></p>
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
                    <Link className="overlay-link" href="/credentials" />
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <img src={content.credentials.media} alt="Sign" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="infos">
                        <h4>{content.credentials.caption}</h4>
                        <h1>{content.credentials.heading}</h1>
                      </div>
                      <Link
                        href={content.credentials.button.link}
                        className="about-btn"
                      >
                        <img
                          src={content.credentials.button.icon}
                          alt="button"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div data-aos="zoom-in" className="flex-1">
                  <div className="about-contact-box info-box shadow-box">
                    <Link className="overlay-link" href="/contact" />
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <img
                      src="/assets/icons/icon2.png"
                      alt="Icon"
                      className="star-icon"
                    />
                    <h1
                      dangerouslySetInnerHTML={{
                        __html: content.contact.heading,
                      }}
                    ></h1>
                    <Link
                      href={content.contact.button.link}
                      className="about-btn"
                    >
                      <img src={content.contact.button.icon} alt="button" />
                    </Link>
                  </div>
                </div>
                <div data-aos="zoom-in">
                  <div className="about-profile-box info-box shadow-box h-full">
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <div className="inner-profile-icons shadow-box">
                      {content.profiles.profiles.map((item, index) => (
                        <Link href={item.link} key={index}>
                          <i className={item.icon} />
                        </Link>
                      ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="infos">
                        <h4>{content.profiles.caption}</h4>
                        <h1>{content.profiles.heading}</h1>
                      </div>
                      <Link
                        href={content.profiles.button.link}
                        className="about-btn"
                      >
                        <img src={content.profiles.button.icon} alt="button" />
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
