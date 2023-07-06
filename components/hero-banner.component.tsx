import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export const HeroBanner = () => {
  return (
    <section className="hero-section page-section scroll-to-page" id="home">
      <div className="custom-container">
        <div className="hero-content content-width">
          <div className="section-header">
            <h4
              className="subtitle scroll-animation"
              data-animation="fade_from_bottom"
              data-aos="fade-up"
            >
              <i className="las la-home"></i> Landing
            </h4>
            <h1 className="scroll-animation" data-aos="fade-up">
              - <span>Sal Anvarov</span> is a <br />
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  "Full Stack Developer",
                  1000,
                  "Designer",
                  1000,
                  "Prototyper",
                  1000,
                  "Creative Thinker",
                  1000,
                ]}
                speed={25}
                style={{ fontSize: "1em" }}
                repeat={Infinity}
              />
            </h1>
          </div>
          <p className="scroll-animation" data-aos="fade-up">
            Hard-working developer with a flair for creating elegant solutions
            to complex problems. Team player with a can-do attitude, and a
            strong focus on client satisfaction. Diverse experience with modern
            technologies and cloud providers like AWS, and GCP, with enterprise
            DevOps experience. Likes to contribute to open-source and create
            apps on his free-time.
          </p>
          <a
            href="#portfolio"
            className="go-to-project-btn scroll-to scroll-animation"
            data-aos="fade-up"
          >
            <Image
              src="/round-text.png"
              alt="Rounded Text"
              width={141}
              height={148}
            />

            <i className="las la-arrow-down"></i>
          </a>
          <div className="facts d-flex">
            <div className="left scroll-animation" data-aos="fade-right">
              <h1>6+</h1>
              <p>
                Years of <br />
                Experience
              </p>
            </div>
            <div className="right scroll-animation" data-aos="fade-left">
              <h1>60+</h1>
              <p>
                freelance consultations <br />
                completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
