import React from "react";

const H1Medium = ({ text, align, color, size }) => {
  if (!color) {
    color = "#2D2D2D";
  }
  if (!size) {
    size = "32px";
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
          fontWeight: "500",
          lineHeight: "28px",
          textAlign: align,
          color: color,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default H1Medium;
