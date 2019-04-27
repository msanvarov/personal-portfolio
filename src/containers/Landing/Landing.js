import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Landing.css";
import axios from "../../axios-github";
import Logo from "../../assets/images/header/logo.png";
import Portfolio from "../../components/Portfolio/Portfolio";
import Contact from "../../components/Contact/Contact";
import About from "../../components/About/About";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Preloader from "../../components/Preloader/Preloader";

class Landing extends Component {
  state = {
    renderPortfolio: false,
    renderContact: false,
    renderAbout: false,
    repos: [],
    showLoader: true
  };
  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        showLoader: false
      });
    }, 2000);

    axios.get("/users/msanvarov/repos").then(res => {
      let filtered = res.data.map(i => {
        return {
          htmlRef: i.html_url,
          name: i.name,
          stargazers_count: i.stargazers_count,
          forks: i.forks,
          language: i.language,
          description: i.description
        };
      });
      this.setState({
        repos: filtered
          .sort(
            (curr, next) =>
              next.stargazers_count +
              next.forks -
              curr.stargazers_count -
              curr.forks
          )
          .slice(0, 16)
      });
    });
  };
  triggeredPortfolio = () => {
    this.setState({ renderPortfolio: !this.state.renderPortfolio });
  };
  triggerContact = () => {
    this.setState({ renderContact: !this.state.renderContact });
  };
  render() {
    let portfolio = this.state.renderPortfolio ? (
      <Portfolio toRender={this.triggeredPortfolio} repos={this.state.repos} />
    ) : null;
    let contact = this.state.renderContact ? (
      <Contact toRender={this.triggerContact} />
    ) : null;
    let about = this.state.renderAbout ? (
      <About toRender={this.renderAbout} />
    ) : null;
    return (
      <Aux>
        <Preloader show={this.state.showLoader} />
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
              <a
                href="#contact"
                className="prt_right"
                onClick={this.triggerContact}
              >
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
          {contact}
          {about}
        </div>
      </Aux>
    );
  }
}

export default Landing;
