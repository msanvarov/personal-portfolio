import { useState } from "react";
import { Modal, ModalBody, ModalHeader, Row } from "reactstrap";

export const Portfolio = () => {
  const [modal, setModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");

  const toggle = () => setModal(!modal);

  const handleOpenImage = (image: string) => {
    setCurrentImage(image);
    toggle();
  };

  return (
    <section
      className="portfolio-area page-section scroll-to-page"
      id="portfolio"
    >
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle} />
        <ModalBody>
          <img src={currentImage} className="img-fluid" alt="Portfolio" />
        </ModalBody>
      </Modal>

      <div className="custom-container">
        <div className="portfolio-content content-width">
          <div className="section-header">
            <h4 className="subtitle scroll-animation" data-aos="fade-up">
              <i className="las la-grip-vertical"></i> portfolio
            </h4>
            <h1 className="scroll-animation">
              Featured <span>Projects</span>
            </h1>
          </div>

          <Row className="portfolio-items">
            <div className="col-md-12 scroll-animation" data-aos="fade-up">
              <div className="portfolio-item portfolio-full">
                <div className="portfolio-item-inner">
                  <img
                    src="../assets/images/portfolio1.jpg"
                    alt="Portfolio"
                    onClick={() =>
                      handleOpenImage("../assets/images/portfolio1.jpg")
                    }
                    style={{ cursor: "pointer" }}
                  />

                  <ul className="portfolio-categories">
                    <li>
                      <a href="https://www.figma.com">Figma</a>
                    </li>
                    <li>
                      <a href="https://www.Framer.com">Framer</a>
                    </li>
                    <li>
                      <a href="https://www.wordpress.com">WordPress</a>
                    </li>
                  </ul>
                </div>
                <h2>
                  <a href="https://www.Bureau - Architecture Studio Website.com">
                    Bureau - Architecture Studio Website
                  </a>
                </h2>
              </div>
            </div>

            <div className="col-md-6 scroll-animation" data-aos="fade-right">
              <div className="portfolio-item portfolio-half">
                <div className="portfolio-item-inner">
                  <a
                    href="../assets/images/portfolio2.jpg"
                    data-lightbox="example-1"
                  >
                    <img
                      src="../assets/images/portfolio2.jpg"
                      alt="Portfolio"
                    />
                  </a>

                  <img src="../assets/images/portfolio2.jpg" alt="Portfolio" />

                  <ul className="portfolio-categories">
                    <li>
                      <a href="https://www.wordpress.com">WordPress</a>
                    </li>
                    <li>
                      <a href="https://www.larevel.com">Larevel/PHP</a>
                    </li>
                  </ul>
                </div>
                <h2>
                  <a href="https://www.moonex.com">Moonex WordPress Theme</a>
                </h2>
              </div>
            </div>

            <div className="col-md-6 scroll-animation" data-aos="fade-left">
              <div className="portfolio-item portfolio-half">
                <div className="portfolio-item-inner">
                  <a
                    href="../assets/images/portfolio3.jpg"
                    data-lightbox="example-1"
                  >
                    <img
                      src="../assets/images/portfolio3.jpg"
                      alt="Portfolio"
                    />
                  </a>

                  <ul className="portfolio-categories">
                    <li>
                      <a href="https://www.figma.com">Figma</a>
                    </li>
                    <li>
                      <a href="https://www.webflow.com">Webflow</a>
                    </li>
                  </ul>
                </div>
                <h2>
                  <a href="https://www.taskly-dashboard.com">
                    Taskly Dashboard
                  </a>
                </h2>
              </div>
            </div>

            <div className="col-md-12 scroll-animation" data-aos="fade-up">
              <div className="portfolio-item portfolio-half">
                <div className="portfolio-item-inner">
                  <a
                    href="../assets/images/portfolio4.jpg"
                    data-lightbox="example-1"
                  >
                    <img
                      src="../assets/images/portfolio4.jpg"
                      alt="portfolio"
                    />
                  </a>

                  <ul className="portfolio-categories">
                    <li>
                      <a href="https://www.figma.com">Figma</a>
                    </li>
                    <li>
                      <a href="https://www.reactjs.com">React</a>
                    </li>
                  </ul>
                </div>
                <h2>
                  <a href="https://www.hinterland.com">
                    Hinterland - Real Estate Site Redesign
                  </a>
                </h2>
              </div>
            </div>

            <div className="col-md-12 scroll-animation" data-aos="fade-up">
              <div className="portfolio-item portfolio-half">
                <div className="portfolio-item-inner">
                  <a
                    href="../assets/images/portfolio5.jpg"
                    data-lightbox="example-1"
                  >
                    <img
                      src="../assets/images/portfolio5.jpg"
                      alt="portfolio"
                    />
                  </a>

                  <ul className="portfolio-categories">
                    <li>
                      <a href="https://www.framer.com">Framer</a>
                    </li>
                  </ul>
                </div>
                <h2>
                  <a href="https://www.lewis.com">
                    Lewis Portfolio Framer Template
                  </a>
                </h2>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </section>
  );
};
