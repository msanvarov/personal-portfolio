import React from "react";
import "./Experience.css";
import { Col, Row } from "react-bootstrap";

const Experience = () => {
  return (
    <div className="prt_about_experience_wrapper prt_bottompadder60">
      <Col>
        <div className="prt_heading_wrapper">
          <div className="prt_heading">
            <h1>Experience</h1>
            <p>involvement</p>
          </div>
        </div>
        <div className="prt_about_experience">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="prt_about_experiencebox">
                <div className="prt_about_experience_year">
                  <h1>2019</h1>
                  <h4>May to 2019 Sep</h4>
                </div>
                <div className="prt_about_experience_info">
                  <h4>Software Developer</h4>
                  <span>RBC</span>
                  <p>
                    Developed software and automation solutions for various
                    devops workflows.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="prt_about_experiencebox">
                <div className="prt_about_experience_year">
                  <h1>2018</h1>
                  <h4>May to 2018 Sep</h4>
                </div>
                <div className="prt_about_experience_info">
                  <h4>Capital Markets Data Quality Intern</h4>
                  <span>RBC</span>
                  <p>
                    Developed web stacks to contribute in closing data gaps on
                    currently operations reporting tools.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="prt_about_experiencebox ">
                <div className="prt_about_experience_year">
                  <h1>2017</h1>
                  <h4>May to 2017 Sep</h4>
                </div>
                <div className="prt_about_experience_info ">
                  <h4>P&CB Data Management and Governance Intern</h4>
                  <span>RBC</span>
                  <p>
                    Worked with api's to manage data migration when maintaining
                    legacy systems.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
};
export default Experience;
