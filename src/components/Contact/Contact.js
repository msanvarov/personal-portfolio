import React from "react";
import "./Contact.css";
import RArrow from "../../assets/images/header/right_arrow.png";

export default function Contact() {
  return (
    <div className="prt_contact_wrapper prt_toppadder115">
      <div className="prt_close_wrapper">
        <img src={RArrow} alt="Close" className="prt_close" />
      </div>
    </div>
  );
}
