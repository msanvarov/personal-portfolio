import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: "../assets/images/testimonial-1.jpg",
    altText: "Testimonial 1",
    caption: "CEO of IBM Global",
    header: "Paublo Dybala",
    key: "1",
    captionTag: "p",
  },
  {
    src: "../assets/images/testimonial-2.jpg",
    altText: "Testimonial 2",
    caption: "Product Management of Invision App Inc",
    header: "Christina Morillo",
    key: "2",
    captionTag: "p",
  },
  {
    src: "../assets/images/testimonial-3.jpg",
    altText: "Testimonial 3",
    caption: "Director of Envato LLC",
    header: "Phil Foden",
    key: "3",
    captionTag: "p",
  },
];

export const Testimonials = () => {
  return (
    <section
      className="testimonial-area page-section scroll-to-page"
      id="testimonial"
    >
      <div className="custom-container">
        <div className="testimonial-content content-width">
          <div className="section-header">
            <h4 className="subtitle scroll-animation" data-aos="fade-up">
              <i className="lar la-comment"></i> testimonial
            </h4>
            <h1 className="scroll-animation" data-aos="fade-up">
              Trusted by <span>Hundered Clients</span>
            </h1>
          </div>
          <div
            className="testimonial-slider-wrap scroll-animation"
            data-aos="fade-up"
          >
            <UncontrolledCarousel items={items} />
          </div>
        </div>
      </div>
    </section>
  );
};
