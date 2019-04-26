import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="prt_footer_wrapper prt_toppadder30 prt_bottompadder30">
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <p>
              Copyright © 2019{" "}
              <a href="https://github.com/msanvarov/personal-portfolio">
                Portfolio
              </a>
              . All Rights Reserved
            </p>
            <ul>
              <li>
                <a href="https://github.com/msanvarov/personal-portfolio">
                  <i className="fa fa-github-alt" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/salim-anvarov-aa5905b2/">
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
