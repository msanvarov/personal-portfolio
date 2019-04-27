import React, { Component } from "react";
import LArrow from "../../../assets/images/header/left_arrow.png";
import "./Portfolio.css";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "../../../axios-github";
import Footer from "../../Footer/Footer";

class Portfolio extends Component {
  state = {
    repos: []
  };
  componentDidMount = () => {
    axios.get("/users/msanvarov/repos").then();
  };
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
          <Row />
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Portfolio;
