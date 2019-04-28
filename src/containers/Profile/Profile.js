import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";
import DArrow from "../../assets/images/header/down_arrow.png";
import Picture from "../../assets/images/header/profile.png";
import Education from "../../components/Biography/Education/Education";
import Experience from "../../components/Biography/Experience/Experience";
import Footer from "../../components/Footer/Footer";

class Profile extends Component {
  render() {
    return (
      <div className="prt_about_wrapper prt_toppadder115">
        <div className="prt_close_wrapper">
          <img
            src={DArrow}
            alt="Close"
            className="prt_close"
            onClick={this.props.toRender}
          />
        </div>
        <Container>
          <div className="prt_about_info prt_bottompadder80">
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="prt_about_img">
                  <img src={Picture} alt="About" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="prt_heading_wrapper_2">
                  <div className="prt_heading prt_toppadder50">
                    <h1>about me</h1>
                    <p>who am i</p>
                  </div>
                </div>
                <p>
                  Hard-working developer with a ﬂair for creating elegant
                  solutions to complex LOB operations. Team player with a can-do
                  attitude, and a strong user focus. Developed CRUD applications
                  that leverage REST APIs to tackle identifying data quality
                  gaps, and negate the manual process involved when dealing with
                  large amounts of data. Created a POF to handle linking
                  external and internal classiﬁcation codes to promote the
                  comparability of RBC's potential impact on diﬀerent industries
                </p>
                <a href="#some_site" className="prt_btn">
                  Download Resume
                </a>
              </Col>
            </Row>
          </div>
          <Education />
          <Experience />
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Profile;
