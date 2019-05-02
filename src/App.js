import React, { Component } from "react";
import "./App.css";
import axios from "./axios-github";
import Logo from "./assets/images/header/logo.png";
import Aux from "./hoc/Auxiliary/Auxiliary";
import Particles from "react-particles-js";
import Preloader from "./components/Preloader/Preloader";
import Profile from "./containers/Profile/Profile";
import Contact from "./containers/Contact/Contact";
import Portfolio from "./containers/Portfolio/Portfolio";
import Capabilities from "./containers/Capabilities/Capabilities";

class App extends Component {
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
      <Profile toRender={this.triggerAbout} />
    ) : null;
    let strengths = this.state.renderCapabilities ? (
      <Capabilities toRender={this.triggerCapabilities} />
    ) : null;
    return (
      <div className="App">
        <Aux>
          <Preloader show={this.state.showLoader} />
          <div className="prt_main_wrapper">
            <Particles
              params={{
                particles: {
                  number: {
                    value: 200,
                    density: {
                      enable: false
                    }
                  },
                  size: {
                    value: 3,
                    random: true,
                    anim: {
                      speed: 4,
                      size_min: 0.3
                    }
                  },
                  line_linked: {
                    enable: false
                  },
                  move: {
                    random: true,
                    speed: 1,
                    direction: "top",
                    out_mode: "out"
                  }
                },
                interactivity: {
                  events: {
                    onhover: {
                      enable: true,
                      mode: "bubble"
                    },
                    onclick: {
                      enable: true,
                      mode: "repulse"
                    }
                  },
                  modes: {
                    bubble: {
                      distance: 250,
                      duration: 2,
                      size: 0,
                      opacity: 0
                    },
                    repulse: {
                      distance: 400,
                      duration: 4
                    }
                  }
                }
              }}
              style={{ zIndex: "-1", position: "fixed" }}
            />
            <div
              className="prt_home_wrapper"
              style={{ height: window.innerHeight }}
            >
              <h1 className="d-flex justify-content-center">
                I'm Salim Anvarov
              </h1>
              <div className="prt_logo_wrapper">
                <a href="#main">
                  <img src={Logo} alt="Logo" id="prt_close_tab" />
                </a>
              </div>
              <div className="prt_menu_wrapper">
                <a
                  href="#about"
                  className="prt_top"
                  onClick={this.triggerAbout}
                >
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
      </div>
    );
  }
}

export default App;
