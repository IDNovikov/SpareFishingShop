import React, { useRef } from "react";
import YellowButton from "../yellowButton/yellowButton";
import inst1 from "../../../assets/inst1.png";
import inst2 from "../../../assets/inst2.png";
import inst3 from "../../../assets/inst3.png";
import inst4 from "../../../assets/inst4.png";
import inst5 from "../../../assets/inst5.png";
import inst6 from "../../../assets/inst6.png";
import inst7 from "../../../assets/inst7.png";
import inst8 from "../../../assets/inst8.png";
import inst9 from "../../../assets/inst9.png";
import inst10 from "../../../assets/inst10.png";
import inst11 from "../../../assets/inst11.png";
import inst12 from "../../../assets/inst12.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./gallery.module.css";
const InstComp = (props) => {
  const windowWidth = useRef(window.innerWidth);
  let sliderPAdding = "80px";
  let slidesToShow = 1;
  if (windowWidth.current > 359) {
    sliderPAdding = "60px";
    slidesToShow = 1;
  }
  if (windowWidth.current > 450) {
    sliderPAdding = "10px";
    slidesToShow = 2;
  }
  if (windowWidth.current > 620) {
    sliderPAdding = "70px";
    slidesToShow = 2;
  }
  if (windowWidth.current > 769) {
    sliderPAdding = "10px";
    slidesToShow = 3;
  }
  if (windowWidth.current > 1040) {
    sliderPAdding = "30px";
    slidesToShow = 4;
  }
  if (windowWidth.current > 1320) {
    sliderPAdding = "30px";
    slidesToShow = 5;
  }
  const settings = {
    arrows: false,
    className: "",
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    centerMode: true,
    infinite: true,
    centerPadding: sliderPAdding,
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "auto",
          padding: "32px 108px",
          gap: "24px",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: "24px",
            fontWeight: "500",
            lineHeight: "28px",
            textAlign: "center",
            color: "white",
          }}
        >
          <p>Follow our instagram </p>
          @spearshoplimassol
        </div>
        <a
          style={{ textDecoration: "none" }}
          href="https://www.instagram.com/spearshoplimassol"
        >
          <YellowButton
            height={"52px"}
            width={"250px"}
            text={"Follow us"}
            fontSize={"20px"}
            fontColor={"Black"}
          />
        </a>
      </div>

      <div className={styles.main}>
        <div className="slider-container">
          <Slider {...settings}>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst3} />
            </div>

            <div className={styles.DivImg}>
              <img className={styles.img} src={inst5} />
            </div>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst6} />
            </div>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst7} />
            </div>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst8} />
            </div>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst9} />
            </div>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst10} />
            </div>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst11} />
            </div>
            <div className={styles.DivImg}>
              <img className={styles.img} src={inst12} />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default InstComp;
