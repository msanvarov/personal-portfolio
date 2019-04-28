import React from "react";
import UArrow from "../../assets/images/header/up_arrow.png";
import { Container } from "react-bootstrap";
import "./Capabilities.css";
import Footer from "../Footer/Footer";

const Capabilities = props => {
  return (
    <div className="prt_services_wrapper prt_toppadder115">
      <div className="prt_close_wrapper">
        <img
          src={UArrow}
          alt="Close"
          className="prt_close"
          onClick={props.toRender}
        />
      </div>
      <div className="prt_services_slider_wrapper prt_bottompadder115">
        <Container>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="prt_heading_wrapper">
                <div className="prt_heading">
                  <h1>What I do</h1>
                  <p>take a look</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="prt_services_slider_imgs">
                <img
                  className="img_1 active"
                  src="http://placehold.it/470X390"
                  alt="Service"
                />
                <img
                  className="img_2"
                  src="http://placehold.it/470X390"
                  alt="Service"
                />
                <img
                  className="img_3"
                  src="http://placehold.it/470X390"
                  alt="Service"
                />
                <img
                  className="img_4"
                  src="http://placehold.it/470X390"
                  alt="Service"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Capabilities;
