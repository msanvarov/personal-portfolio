import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
const Technologies = props => {
  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="prt_heading_wrapper">
            <div className="prt_heading">
              <h1>Developer Technologies</h1>
              <p>Worked With</p>
            </div>
          </div>
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Carousel>
            {props.tech.map((tech, i) => {
              return (
                <Carousel.Item key={i}>
                  <img className="d-block w-100" src={tech.picture} alt="pic" />
                  <Carousel.Caption>
                    <h3>{tech.title}</h3>
                    <p>{tech.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default Technologies;
