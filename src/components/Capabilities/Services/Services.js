import React from "react";
import webDev from "../../../assets/images/header/bug.gif";
import { Container, Col, Row } from "react-bootstrap";

const Services = () => {
  return (
    <div className="prt_services_slider_wrapper prt_bottompadder115">
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="prt_heading_wrapper">
              <div className="prt_heading">
                <h1>What I do</h1>
                <p>take a look</p>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <div className="prt_services_slider_imgs">
              <img className="img_1 active" src={webDev} alt="Service" />
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <div className="prt_services_slider_box">
              <div
                className="prt_services_slider_text prt_img_click active"
                id="1"
              >
                <img src="http://placehold.it/86X100" alt="Service icon" />
                <h4>Web Design</h4>
              </div>
              <div className="prt_services_slider_text prt_img_click" id="2">
                <img src="http://placehold.it/86X100" alt="Service icon" />
                <h4>Full Stack Development</h4>
                <p>Comfortable with Mern, Flask with React or Vue.</p>
              </div>
              <div className="prt_services_slider_text prt_img_click" id="3">
                <img src="http://placehold.it/86X100" alt="Service icon" />
                <h4>Software Development</h4>
                <p>Electron and CLI with C.</p>
              </div>
              <div className="prt_services_slider_text prt_img_click" id="4">
                <img src="http://placehold.it/86X100" alt="Service icon" />
                <h4>App Development</h4>
                <p>Java for Android and React Native.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Services;
