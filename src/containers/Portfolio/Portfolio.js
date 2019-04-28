import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Portfolio.css";
import LArrow from "../../assets/images/header/left_arrow.png";
import Footer from "../../components/Footer/Footer";
import RepoCards from "../../components/Portfolio/RepoCards/RepoCards";

class Portfolio extends Component {
  render() {
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
            {this.props.repos.map((repo, i) => (
              <Col lg={3} md={3} sm={12} xs={12} className="mt-2" key={i}>
                <RepoCards data={repo} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12} className="mt-3">
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  size="lg"
                  href="https://github.com/msanvarov"
                >
                  Browse More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Portfolio;
