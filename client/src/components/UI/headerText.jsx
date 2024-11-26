import React from "react";

const HeaderText = (props) => {
  return (
    <div
      style={{
        margin: "0 20px",
        width: "412px",
        height: "88px",
        gap: "8px",
        opacity: "0px",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "24px",
        textAlign: "left",
        userSelect: "none",
      }}
    >
      <div style={{ color: "white", marginBottom: "5px" }}>
        Agias Zonis 59 Shop 2, Limassol
      </div>
      <div style={{ fontWeight: "400", color: "#afadad", marginBottom: "5px" }}>
        Work schedule: 11:00 – 21:00
      </div>
      <div style={{ fontWeight: "400", color: "#afadad", marginBottom: "5px" }}>
        Phone: +357 97 617 817
      </div>
    </div>
  );
};

export default HeaderText;
