import React from "react";
import "../About.css";
import { Col, Row } from "react-bootstrap";

const Education = () => {
  return (
    <div className="prt_about_edulearn_wrapper prt_bottompadder115">
      <Col lg={12} md={12} sm={12} xs={12}>
        <div className="prt_heading_wrapper">
          <div className="prt_heading">
            <h1>education</h1>
            <p>learning</p>
          </div>
        </div>
        <div className="prt_about_learnsection">
          <Row>
            <Col
              lg={{ span: 6, offset: 6 }}
              md={{ span: 6, offset: 6 }}
              sm={{ span: 12, offset: 0 }}
              xs={{ span: 12, offset: 0 }}
            >
              <div className="prt_about_learnbox_right">
                <div className="prt_about_learnbox_year">
                  <h1>2021</h1>
                </div>
                <div className="prt_about_learnbox_info">
                  <h4>BSc for Computer Science and Stats</h4>
                  <span>Toronto</span>
                  <p>
                    Currently pursuing a Bachelor of Arts and Science for
                    Computer Science and Statistics
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="prt_about_learnbox_left">
                <div className="prt_about_learnbox_year">
                  <h1>2016</h1>
                </div>
                <div className="prt_about_learnbox_info">
                  <h4>George S Henry Academy</h4>
                  <span>Toronto</span>
                  <p>
                    Participated in tech crew, was a student administrative
                    council vice-president, and part of the athletic council.
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
export default Education;
