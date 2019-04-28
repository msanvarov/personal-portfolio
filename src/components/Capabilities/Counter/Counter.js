import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Counter = props => {
  return (
    <div className="prt_couter_wrapper prt_toppadder80 prt_bottompadder50">
      <Container>
        <Row>
          {props.accolades.map((accolade, i) => {
            return (
              <Col lg={6} md={6} sm={6} xs={12} key={i}>
                <div className="prt_counter_box">
                  <h3>{accolade.len}</h3>
                  <p>{accolade.description}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
export default Counter;
