import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Counter = () => {
  return (
    <div className="prt_couter_wrapper prt_toppadder80 prt_bottompadder50">
      <Container>
        <Row>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="prt_counter_box">
              <img src="http://placehold.it/100X100" alt="Clients" />
              <h3>2</h3>
              <p>Enterprise Tools Built</p>
            </div>
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="prt_counter_box">
              <img src="http://placehold.it/100X100" alt="Clients" />
              <h3>4</h3>
              <p>Hackathons Won</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Counter;
