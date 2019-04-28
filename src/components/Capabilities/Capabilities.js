import React from "react";
import UArrow from "../../assets/images/header/up_arrow.png";
import Skills from "./Skills/Skills";
import "./Capabilities.css";
import Footer from "../Footer/Footer";
import Services from "./Services/Services";
import Counter from "./Counter/Counter";
import { Carousel, Container, Row, Col } from "react-bootstrap";

const Capabilities = props => {
  return (
    <div className="prt_services_wrapper prt_toppadder115">
      <div className="prt_close_wrapper">
        <img
          src={UArrow}
          alt="Close"
          className="prt_close"
          onClick={props.toRender}
        />
      </div>
      <Services />
      <Counter />
      <Skills />
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div class="prt_heading_wrapper">
              <div class="prt_heading">
                <h1>Developer Technologies</h1>
                <p>Worked With</p>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://vuejs.org/images/logo.png"
                  alt="vue logo"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png"
                  alt="react logo"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.dribbble.com/users/528264/screenshots/3140440/firebase_logo.png"
                  alt="firebase"
                />

                <Carousel.Caption>
                  <h3>Firebase</h3>
                  <p>React, and Android</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png"
                  alt="redux"
                />

                <Carousel.Caption>
                  <h3>Redux</h3>
                  <p>For React</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Capabilities;
