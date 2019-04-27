import React from "react";
import { Container, Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import "./Portfolio.css";
import ScrollAnimation from "react-animate-on-scroll";
import LArrow from "../../assets/images/header/left_arrow.png";
import Footer from "../Footer/Footer";
import RepoCards from "./RepoCards/RepoCards";

const Portfolio = props => {
  return (
    <div className="prt_portfolio_wrapper prt_toppadder115">
      <div className="prt_close_wrapper">
        <img
          src={LArrow}
          alt="Close"
          className="prt_close"
          onClick={this.props.toRender}
        />
      </div>
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="prt_heading_wrapper">
              <div className="prt_heading">
                <h1>portfolio</h1>
                <p>programs</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {props.repos.map((repo, i) => (
            <Col lg={3} md={3} sm={12} xs={12} className="mt-2" key={i}>
              <RepoCards data={repo} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mt-2">
            <ScrollAnimation
              delay={1000}
              animateIn="fadeIn slow"
              className="mx-auto my-4"
            >
              <div className="d-flex justify-content-center">
                <ButtonToolbar>
                  <Button
                    variant="primary"
                    size="lg"
                    href="https://github.com/msanvarov"
                  >
                    Browse More
                  </Button>
                </ButtonToolbar>
              </div>
            </ScrollAnimation>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default Portfolio;
