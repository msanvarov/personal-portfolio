export const Offerings = () => {
  return (
    <section
      className="services-area page-section scroll-to-page"
      id="offerings"
    >
      <div className="custom-container">
        <div className="services-content content-width">
          <div className="section-header">
            <h4 className="subtitle scroll-animation" data-aos="fade-up">
              <i className="las la-stream"></i> Services
            </h4>
            <h1 className="scroll-animation" data-aos="fade-up">
              My <span>Specializations</span>
            </h1>
          </div>

          <div className="services-items">
            <div className="service-item scroll-animation" data-aos="fade-up">
              <i className="las la-bezier-curve"></i>
              <h2>Website Design</h2>
              <p>
                I created digital products with unique ideas use Figma & Framer
              </p>
              <span className="projects">24 Projects</span>
            </div>
            <div className="service-item scroll-animation" data-aos="fade-up">
              <i className="las la-code"></i>
              <h2>Development</h2>
              <p>I build website go live with Framer, Webflow or WordPress</p>
              <span className="projects">126 Projects</span>
            </div>
            <div className="service-item scroll-animation" data-aos="fade-up">
              <i className="las la-bezier-curve"></i>
              <h2>SEO/Marketing</h2>
              <p>Increase the traffic for your website with SEO optimized</p>
              <span className="projects">8 Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
