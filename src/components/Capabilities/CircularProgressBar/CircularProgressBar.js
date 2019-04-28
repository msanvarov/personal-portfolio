import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = props => {
  return (
    <div style={{ maxWidth: "160px", maxHeight: "160px" }}>
      <CircularProgressbar
        percentage={props.percentage}
        text={`${props.language}`}
        styles={{
          path: {
            stroke: `#2a7ae3`
          },
          trail: {
            stroke: "gray"
          },
          text: {
            fill: "#ffffff",
            fontSize: "10px"
          },
          initialAnimation: true
        }}
      />
    </div>
  );
};

export default CircularProgressBar;
