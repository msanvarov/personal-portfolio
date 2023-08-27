import { Layout } from '@msanvarov/core-components';
import Link from 'next/link';
import content from './content/bio.json';

const BioPage = () => {
  return (
    <Layout wrapperClass="main-aboutpage">
      <section className="about-area">
        <div className="container">
          <div className="d-flex about-me-wrap align-items-start gap-24">
            <div data-aos="zoom-in">
              <div className="about-image-box shadow-box">
                <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                <div className="image-inner">
                  <img src={content.bio.media} alt="bio" />
                </div>
              </div>
            </div>
            <div className="about-details" data-aos="zoom-in">
              <h1 className="section-heading" data-aos="fade-up">
                <img src="/assets/star-2.png" alt="Star" />{' '}
                {content.bio.details.heading}{' '}
                <img src="/assets/star-2.png" alt="Star" />
              </h1>
              <div className="about-details-inner shadow-box">
                <img src="/assets/icons/icon2.png" alt="Star" />
                <h1>{content.bio.details.name}</h1>
                <p>{content.bio.details.description}</p>
              </div>
            </div>
          </div>
          <div className="row mt-24">
            <div className="col-md-6" data-aos="zoom-in">
              <div className="about-edc-exp about-experience shadow-box">
                <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                <h3>{content.experience.heading}</h3>
                <ul>
                  {content.experience.experience.map((item, index) => (
                    <li key={index}>
                      <p className="date">{item.date}</p>
                      <h2>{item.title}</h2>
                      <p className="type">{item.company}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6" data-aos="zoom-in">
              <div className="about-edc-exp about-education shadow-box">
                <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                <h3>{content.education.heading}</h3>
                <ul>
                  {content.education.education.map((item, index) => (
                    <li key={index}>
                      <p className="date">{item.date}</p>
                      <h2>{item.degree}</h2>
                      <p className="type">{item.university}</p>
                    </li>
                  ))}
                </ul>
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

export default BioPage;
