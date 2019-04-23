import React from "react";
import "./Preloader.css";

const Preloader = props => {
  return props.show ? (
    <div id="preloader">
      <div id="status">
        <div className="status-mes" />
      </div>
    </div>
  ) : null;
};

export default Preloader;
