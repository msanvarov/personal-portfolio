import { Layout } from '@msanvarov/core-components';
import { Post } from '@msanvarov/store';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'path';
import { Fragment } from 'react';
import { POSTS_PATH, postFilePaths } from '../utils/mdx.utils';
import content from './content/landing.json';

export const getStaticProps: GetStaticProps<LandingPageProps> = async () => {
  const filePath = postFilePaths[postFilePaths.length - 1];
  const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  const { content, data } = matter(source);

  return {
    props: {
      latestPost: {
        content,
        metadata: data,
        filePath,
      },
    },
  };
};

type LandingPageProps = {
  latestPost: Post;
};

const LandingPage = ({ latestPost }: LandingPageProps) => {
  return (
    <Layout>
      <section className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-md-6" data-aos="zoom-in">
              <div className="about-me-box shadow-box">
                <Link className="overlay-link" href="/bio" />
                <img
                  className="bg-img"
                  src="/assets/bg1.png"
                  alt="background"
                />
                <div className="img-box">
                  <img src={content.bio.media} alt="profile" />
                </div>
                <div className="infos">
                  <h4>{content.bio.caption}</h4>
                  <h1>{content.bio.heading}</h1>
                  <p>{content.bio.description}</p>
                  <br />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: content.bio.descriptionExtended,
                    }}
                  ></p>
                  <br />
                  <p>{content.bio.location}</p>
                  <Link href={content.bio.button.link} className="about-btn">
                    <img src={content.bio.button.icon} alt="Button" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-credentials-wrap">
                <div data-aos="zoom-in">
                  <div className="banner shadow-box">
                    <div className="marquee">
                      <div>
                        <span>
                          PERSONAL CV AND <b>BLOG</b>{' '}
                          {Array(4)
                            .fill(0)
                            .map((_, index) => (
                              <Fragment key={index}>
                                <img src="/assets/star1.svg" alt="Star" />{' '}
                                PERSONAL CV AND <b>BLOG</b>{' '}
                              </Fragment>
                            ))}
                          <img src="/assets/star1.svg" alt="Star" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gx-row d-flex gap-24">
                  <div data-aos="zoom-in">
                    <div className="about-crenditials-box info-box shadow-box h-full">
                      <Link className="overlay-link" href="/credentials" />
                      <img
                        src="/assets/bg1.png"
                        alt="background"
                        className="bg-img"
                      />
                      <img src={content.credentials.media} alt="credentials" />
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
                  <div data-aos="zoom-in">
                    <div className="about-project-box info-box shadow-box h-full">
                      <Link className="overlay-link" href="/works" />
                      <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                      <img src={content.cv.media} alt="My Works" />
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="infos">
                          <h4>{content.cv.caption}</h4>
                          <h1>{content.cv.heading}</h1>
                        </div>
                        <Link
                          href={content.cv.button.link}
                          className="about-btn"
                        >
                          <img src={content.cv.button.icon} alt="button" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-24">
            <div className="col-md-12">
              <div className="blog-service-profile-wrap d-flex gap-24">
                <div data-aos="zoom-in">
                  <div className="about-blog-box info-box shadow-box h-full">
                    <Link href="/posts" className="overlay-link" />
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <img src={latestPost.metadata.thumbnail} alt="thumbnail" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="infos">
                        <h4>{content.blog.caption}</h4>
                        <h1>{latestPost.metadata.title}</h1>
                      </div>
                      <Link
                        href={content.blog.button.link}
                        className="about-btn"
                      >
                        <img src={content.blog.button.icon} alt="button" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div data-aos="zoom-in" className="flex-1">
                  <div className="about-services-box info-box shadow-box h-full">
                    <Link
                      href={content.offerings.link}
                      className="overlay-link"
                    />
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                    <img src={content.offerings.media} alt="thumbnail" />
                    {/* <div className="icon-boxes">
                      <i className="iconoir-codepen" />
                      <i className="iconoir-figma" />
                      <i className="iconoir-code" />
                      <i className="iconoir-electronics-transistor" />
                    </div> */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="infos">
                        <h4>{content.offerings.caption}</h4>
                        <h1>{content.offerings.heading}</h1>
                      </div>
                      <Link
                        href={content.offerings.button.link}
                        className="about-btn"
                      >
                        <img src={content.offerings.button.icon} alt="Button" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div data-aos="zoom-in">
                  <div className="about-profile-box info-box shadow-box h-full">
                    <img src="/assets/bg1.png" alt="BG" className="bg-img" />

                    {Array.from(
                      {
                        length: Math.ceil(content.profiles.profiles.length / 2),
                      },
                      (_, i) => i * 2
                    ).map((startIndex, index) => (
                      <div
                        className="inner-profile-icons shadow-box"
                        key={index}
                      >
                        {content.profiles.profiles
                          .slice(startIndex, startIndex + 2)
                          .map((item, i) => (
                            <Link href={item.link} key={i}>
                              <i className={item.icon} />
                            </Link>
                          ))}
                      </div>
                    ))}

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="infos">
                        <h4>{content.profiles.caption}</h4>
                        <h1>{content.profiles.heading}</h1>
                      </div>
                      <Link
                        href={content.offerings.button.link}
                        className="about-btn"
                      >
                        <img src={content.offerings.button.icon} alt="Button" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-24">
            <div className="col-md-6" data-aos="zoom-in">
              <div className="about-client-box info-box shadow-box">
                <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                <div className="clients d-flex align-items-start gap-24 justify-content-center">
                  {content.facts.quickFacts.map((item, index) => (
                    <div className="client-item" key={index}>
                      <h1>{item.count}</h1>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.label,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="zoom-in">
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
                <Link href={content.contact.button.link} className="about-btn">
                  <img src={content.contact.button.icon} alt="button" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
