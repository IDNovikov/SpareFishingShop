import React from "react";

const H2Medium = ({ text, align, size, decor, color, bckgrndColor }) => {
  if (!size) {
    size = "20px";
  }
  if (!decor) {
    decor = "none";
  }
  if (!color) {
    color = "#636363";
  }
  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap');
        `}
      </style>

      <div
        style={{
          fontFamily: "IBM Plex Sans",
          fontSize: size,
          fontWeight: "400",
          lineHeight: "24px",
          textAlign: align,
          color: color,
          textDecoration: decor,
          backgroundColor: bckgrndColor,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default H2Medium;
