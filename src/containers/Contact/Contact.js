import React, { Component } from "react";
import "./Contact.css";
import { Container, Row, Col } from "react-bootstrap";
import Map from "../../components/Map/Map";
import Form from "../../components/Contact/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import ContactCard from "../../components/Contact/ContactCard/ContactCard";
import RArrow from "../../assets/images/header/right_arrow.png";

class Contact extends Component {
  render() {
    return (
      <div className="prt_contact_wrapper prt_toppadder115">
        <div className="prt_close_wrapper">
          <img
            src={RArrow}
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
                  <h1>get in touch</h1>
                  <p>contact me</p>
                </div>
              </div>
            </Col>
            <div className="prt_contact_box">
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="prt_contact_info">
                    <h1>Want to reach out by email?</h1>
                    <div className="prt_contact_form">
                      <Form />
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="prt_contact_map">
                    <Map />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="prt_contact_details">
              <Row>
                <Col lg={4} md={4} sm={6} xs={12}>
                  <ContactCard
                    title="Email"
                    description="salim.anvarov@mail.utoronto.ca"
                  />
                </Col>
                <Col lg={4} md={4} sm={6} xs={12}>
                  <ContactCard title="City" description="Toronto" />
                </Col>
                <Col lg={4} md={4} sm={6} xs={12}>
                  <ContactCard
                    title="UToronto"
                    description="BSc Computer Science and Statistics"
                  />
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Contact;
