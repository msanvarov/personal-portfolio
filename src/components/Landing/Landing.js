import React, { Component } from "react";
import Logo from "../../assets/images/header/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import "./Landing.css";
import Portfolio from "./Portfolio/Portfolio";

class Landing extends Component {
  state = {
    renderPortfolio: false
  };
  triggeredPortfolio = () => {
    this.setState({ renderPortfolio: !this.state.renderPortfolio });
  };
  render() {
    let portfolio = this.state.renderPortfolio ? (
      <Portfolio toRender={this.triggeredPortfolio} />
    ) : null;
    return (
      <div className="prt_main_wrapper">
        <div
          className="prt_home_wrapper"
          style={{ height: window.innerHeight }}
        >
          <div className="prt_logo_wrapper">
            <a href="#main">
              <img src={Logo} alt="Logo" id="prt_close_tab" />
            </a>
          </div>
          <div className="prt_menu_wrapper">
            <a href="#about" className="prt_top">
              who am i?
            </a>
            <a href="#contact" className="prt_right">
              contact
            </a>
            <a href="#services" className="prt_bottom">
              strengths
            </a>
            <a
              href="#portfolio"
              className="prt_left"
              onClick={this.triggeredPortfolio}
            >
              portfolio
            </a>
          </div>
          <Container>
            <Row>
              <Col
                lg={{ span: 6, offset: 6 }}
                md={{ span: 7, offset: 5 }}
                sm={{ span: 10, offset: 2 }}
                xs={12}
              >
                <h1>I`m Salim Anvarov</h1>
              </Col>
            </Row>
          </Container>
        </div>
        {portfolio}
      </div>
    );
  }
}

export default Landing;
