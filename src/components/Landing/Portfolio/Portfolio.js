import React from "react";
import LArrow from "../../../assets/images/header/left_arrow.png";
import "./Portfolio.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../Footer/Footer";

const Portfolio = props => {
  return (
    <Aux>
      <div className="prt_portfolio_wrapper prt_toppadder115">
        <div className="prt_close_wrapper">
          <img
            src={LArrow}
            alt="Close"
            className="prt_close"
            onClick={props.toRender}
          />
        </div>
      </div>
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="prt_heading_wrapper">
              <div className="prt_heading">
                <h1>portfolio</h1>
                <p>projects</p>
              </div>
            </div>
          </Col>
        </Row>
        <div className="prt_portfolio_box popup-gallery">
          <Col lg={4} md={4} sm={4} xs={12} className="prt_loadmore">
            <a
              className="imageopen"
              href="http://placehold.it/900X600"
              title=""
            >
              <div className="prt_portfolio_img">
                <img src="http://placehold.it/370X369" alt="Portfolio" />
                <div className="prt_portfolio_text">
                  <h4>box mockup design</h4>
                  <p>Mockup</p>
                </div>
              </div>
            </a>
          </Col>
        </div>
      </Container>
      <Footer />
    </Aux>
  );
};
export default Portfolio;
