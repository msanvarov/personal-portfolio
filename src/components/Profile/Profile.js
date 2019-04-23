import React from "react";
import Logo from "../../assets/images/header/logo.png";
import { Container, Row, Col } from "react-bootstrap";

const Profile = () => {
  return (
    <div className="prt_main_wrapper">
      <div className="prt_home_wrapper">
        <div className="prt_logo_wrapper">
          <a href="#main">
            <img src={Logo} alt="Logo" id="prt_close_tab" />
          </a>
        </div>
        <div className="prt_menu_wrapper">
          <a href="#about" className="prt_top">
            about
          </a>
          <a href="#contact" className="prt_right">
            contact
          </a>
          <a href="#services" className="prt_bottom">
            strength
          </a>
          <a href="#portfolio" className="prt_left">
            portfolio
          </a>
        </div>
        <Container>
          <Row>
            <Col lg={{span: 6, offset: 6}} md={{span: 7, offset:5}} sm={{span: 10, offset: 2}} xs={{span: 12, offset: 0}}>
            <h1>I`m Salim Anvarov</h1>
            </Col>
          </Row>
        </Container>
      </div>
      {/* TOOD add about */}
    </div>
  );
};

export default Profile;
