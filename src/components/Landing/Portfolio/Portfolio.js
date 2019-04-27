import React, { Component } from "react";
import LArrow from "../../../assets/images/header/left_arrow.png";
import "./Portfolio.css";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../../../axios-github";
import Footer from "../../Footer/Footer";
import RepoCards from "./RepoCards/RepoCards";

class Portfolio extends Component {
  state = {
    repos: []
  };
  componentDidMount = () => {
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
        repos: filtered.sort(
          (curr, next) =>
            next.stargazers_count +
            next.forks -
            curr.stargazers_count -
            curr.forks
        )
      });
    });
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
          <Row>
            {this.state.repos.map((repo, i) => (
              <Col lg={3} md={3} sm={3} xs={3} className="mt-2" key={i}>
                <RepoCards data={repo} />
              </Col>
            ))}
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Portfolio;
