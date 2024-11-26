import React from "react";
import arrowBack from "../../assets/ArrowBack.svg";

const ArrowBack = (prop) => {
  return (
    <img
      style={{ width: prop.width, height: prop.height }}
      onClick={prop.func}
      src={arrowBack}
    />
  );
};

export default ArrowBack;
