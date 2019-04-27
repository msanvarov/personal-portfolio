import React from "react";
import DArrow from "../../assets/images/header/down_arrow.png";
import "./About.css";
export default function About(props) {
  return (
    <div className="prt_about_wrapper prt_toppadder115">
      <div class="prt_close_wrapper">
        <img
          src={DArrow}
          alt="Close"
          class="prt_close"
          onClick={props.toRender}
        />
      </div>
    </div>
  );
}
