import React from "react";
import style from "./yellowButton.module.css";

const YellowButton = ({
  height,
  width,
  text,
  fontSize,
  fontColor,
  img,
  imgHeight,
  imgWidth,
}) => {
  return (
    <button
      className={style.button}
      style={{
        height: height,
        width: width,
        fontSize: fontSize,
        color: fontColor,
      }}
    >
      <img
        style={{ width: imgWidth, height: imgHeight, gap: "10px" }}
        src={img}
      />
      {text}
    </button>
  );
};

export default YellowButton;
