import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CircularProgressbar from "../CircularProgressBar/CircularProgressBar";

const Abilities = props => {
  return (
    <div
      className="prt_skills_wrapper prt_toppadder115 prt_bottompadder115"
      style={{ display: "block", bottom: "0px", top: "0px" }}
    >
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="prt_heading_wrapper">
              <div className="prt_heading">
                <h1>Capabilties</h1>
                <p>Expertise</p>
              </div>
            </div>
          </Col>
          <div id="canvas">
            <Row>
              {props.abilities.map((ability, i) => {
                return (
                  <Col
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    className="text-center"
                    key={i}
                  >
                    <CircularProgressbar
                      className="circle"
                      percentage={ability.percentage}
                      language={ability.language}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Abilities;
