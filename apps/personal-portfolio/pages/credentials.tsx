import { Layout } from '@msanvarov/core-components';
import Link from 'next/link';
import content from './content/credentials.json';

const CredentialsPage = () => {
  return (
    <Layout wrapperClass="main-aboutpage">
      <section className="credential-area">
        <div className="container">
          <div className="gx-row d-flex">
            <div className="credential-sidebar-wrap" data-aos="zoom-in">
              <div className="credential-sidebar text-center">
                <div className="shadow-box">
                  <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                  <div className="img-box">
                    <img src={content.navbar.media} alt="bio" />
                  </div>
                  <h2>{content.navbar.heading}</h2>
                  <p>{content.navbar.email}</p>
                  <ul className="social-links d-flex justify-content-center">
                    {content.navbar.profiles.map((item, index) => (
                      <li key={index}>
                        <Link href={item.link}>
                          <i className={item.icon} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={content.navbar.button.link} className="theme-btn">
                    {content.navbar.button.text}
                  </Link>
                </div>
              </div>
            </div>
            <div className="credential-content flex-1">
              <div className="credential-about" data-aos="zoom-in">
                <h2>{content.bio.heading}</h2>
                {content.bio.description.map((item, index) => (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                  />
                ))}
              </div>
              <div className="credential-edc-exp credential-experience">
                <h2 data-aos="fade-up">{content.experience.heading}</h2>
                {content.experience.experience.map((item, index) => (
                  <div
                    className="credential-edc-exp-item"
                    data-aos="zoom-in"
                    key={index}
                  >
                    <h4>{item.date}</h4>
                    <h3>{item.title}</h3>
                    <h5>{item.company}</h5>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="credential-edc-exp credential-education">
                <h2 data-aos="fade-up">{content.education.heading}</h2>
                {content.education.education.map((item, index) => (
                  <div
                    className="credential-edc-exp-item"
                    data-aos="zoom-in"
                    key={index}
                  >
                    <h4>{item.date}</h4>
                    <h3>{item.degree}</h3>
                    <h5>{item.university}</h5>
                    {item.description && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="skills-wrap">
                <h2 data-aos="fade-up">{content.capabilities.heading}</h2>
                <div className="d-grid skill-items gap-24 flex-wrap">
                  {content.capabilities.capabilities.map((item, index) => (
                    <div className="skill-item" data-aos="zoom-in" key={index}>
                      <span className="percent">{item.percent}</span>
                      <h3 className="name">{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="skills-wrap awards-wrap">
                <h2 data-aos="fade-up">{content.expertise.heading}</h2>
                <div className="d-grid skill-items gap-24 flex-wrap">
                  {content.expertise.expertise.map((item, index) => (
                    <div className="skill-item" data-aos="zoom-in" key={index}>
                      <h3 className="name">{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CredentialsPage;
