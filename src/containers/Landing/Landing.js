import React, { Component } from "react";
import "./Landing.css";
import axios from "../../axios-github";
import Logo from "../../assets/images/header/logo.png";
import Portfolio from "../../components/Portfolio/Portfolio";
import Contact from "../../components/Contact/Contact";
import About from "../../components/About/About";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Preloader from "../../components/Preloader/Preloader";
import Capabilities from "../../components/Capabilities/Capabilities";
import Particles from "react-particles-js";
class Landing extends Component {
  state = {
    renderPortfolio: false,
    renderContact: false,
    renderAbout: false,
    renderCapabilities: false,
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
  triggerAbout = () => {
    this.setState({ renderAbout: !this.state.renderAbout });
  };
  triggerCapabilities = () => {
    this.setState({ renderCapabilities: !this.state.renderCapabilities });
  };
  render() {
    let portfolio = this.state.renderPortfolio ? (
      <Portfolio toRender={this.triggeredPortfolio} repos={this.state.repos} />
    ) : null;
    let contact = this.state.renderContact ? (
      <Contact toRender={this.triggerContact} />
    ) : null;
    let about = this.state.renderAbout ? (
      <About toRender={this.triggerAbout} />
    ) : null;
    let strengths = this.state.renderCapabilities ? (
      <Capabilities toRender={this.triggerCapabilities} />
    ) : null;
    return (
      <Aux>
        <Preloader show={this.state.showLoader} />
        <div className="prt_main_wrapper">
          <div
            className="prt_home_wrapper"
            style={{ height: window.innerHeight }}
          >
            <h1 className="d-flex justify-content-center">I'm Salim Anvarov</h1>
            <Particles
              params={{
                particles: {
                  number: {
                    value: 60,
                    density: {
                      enable: true,
                      value_area: 1500
                    }
                  },
                  line_linked: {
                    enable: true,
                    opacity: 0.02
                  },
                  move: {
                    direction: "right",
                    speed: 0.05
                  },
                  size: {
                    value: 1
                  },
                  opacity: {
                    anim: {
                      enable: true,
                      speed: 1,
                      opacity_min: 0.05
                    }
                  }
                },
                interactivity: {
                  events: {
                    onclick: {
                      enable: true,
                      mode: "push"
                    }
                  },
                  modes: {
                    push: {
                      particles_nb: 1
                    }
                  }
                },
                retina_detect: true
              }}
            />
            <div className="prt_logo_wrapper">
              <a href="#main">
                <img src={Logo} alt="Logo" id="prt_close_tab" />
              </a>
            </div>
            <div className="prt_menu_wrapper">
              <a href="#about" className="prt_top" onClick={this.triggerAbout}>
                who am i?
              </a>
              <a
                href="#contact"
                className="prt_right"
                onClick={this.triggerContact}
              >
                contact
              </a>
              <a
                href="#strengths"
                className="prt_bottom"
                onClick={this.triggerCapabilities}
              >
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
          </div>
          {portfolio}
          {contact}
          {about}
          {strengths}
        </div>
      </Aux>
    );
  }
}

export default Landing;
