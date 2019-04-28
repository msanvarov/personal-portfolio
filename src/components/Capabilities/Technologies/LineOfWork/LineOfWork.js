import React from "react";
import webDev from "../../../../assets/images/header/bug.gif";
import { Container, Col, Row } from "react-bootstrap";

const LineOfWork = props => {
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
              {props.low.map((low, i) => {
                return (
                  <div
                    className="prt_services_slider_text prt_img_click"
                    key={i}
                  >
                    <img src={low.img} alt="pic" />
                    <h4>{low.title}</h4>
                    <p>{low.description}</p>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default LineOfWork;
