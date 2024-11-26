import React from "react";
import shop from "../../assets/shop.png";
import map from "../../assets/map.svg";

const AddressComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100vw",
        opacity: "0px",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "24px",
        textAlign: "left",
      }}
    >
      <div style={{ width: "100vw", height: "auto" }}>
        <img style={{ width: "100vw", height: "auto" }} src={shop} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#151515",
          height: "116px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "white", marginBottom: "5px" }}>
            Agias Zonis 59 Shop 2, Limassol
          </div>
          <div
            style={{ fontWeight: "400", color: "#afadad", marginBottom: "5px" }}
          >
            Work schedule: 11:00 – 21:00
          </div>
          <div
            style={{ fontWeight: "400", color: "#afadad", marginBottom: "5px" }}
          >
            Phone: +357 97 617 817
          </div>
        </div>
        <button style={{ all: "unset", cursor: "pointer" }}>
          <img src={map} style={{ width: "48px", height: "48px" }} />
        </button>
      </div>
    </div>
  );
};

export default AddressComponent;
