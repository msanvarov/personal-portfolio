import React from "react";
import "./Preloader.css";
import Gif from "../../assets/images/header/loader.gif";

const Preloader = props => {
  return props.show ? (
    <div id="preloader">
      <div id="status">
        <img src={Gif} alt="loader"/>
      </div>
    </div>
  ) : null;
};

export default Preloader;
