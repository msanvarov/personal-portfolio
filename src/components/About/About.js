import React from "react";
import "./About.css";
import { Container, Row, Col } from "react-bootstrap";
import DArrow from "../../assets/images/header/down_arrow.png";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
const About = props => {
  return (
    <div className="prt_about_wrapper prt_toppadder115">
      <div className="prt_close_wrapper">
        <img
          src={DArrow}
          alt="Close"
          className="prt_close"
          onClick={props.toRender}
        />
      </div>
      <Container>
        <Row>
          <div className="prt_about_info prt_bottompadder80">
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="prt_about_img">
                  <img src="http://placehold.it/370X488" alt="About" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="prt_heading_wrapper_2">
                  <div className="prt_heading prt_toppadder50">
                    <h1>about me</h1>
                    <p>who am i</p>
                  </div>
                </div>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful of model sentence structures.
                </p>
                <a href="#some_site" className="prt_btn">
                  Download Resume
                </a>
              </Col>
            </Row>
          </div>
          {/* <Education /> */}
          {/* <Experience /> */}
        </Row>
      </Container>
    </div>
  );
};
export default About;
