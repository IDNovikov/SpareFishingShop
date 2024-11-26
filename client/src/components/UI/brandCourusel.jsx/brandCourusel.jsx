import React, { useRef, useState, Component } from "react";
import style from "./brandCourusel.module.css";
import b1 from "../../../assets/b1.png";
import b2 from "../../../assets/b2.png";
import b3 from "../../../assets/b3.png";
import b4 from "../../../assets/b4.png";
import b5 from "../../../assets/b5.png";
import b6 from "../../../assets/b6.png";
import b7 from "../../../assets/b7.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandCourusel = (props) => {
  const settings = {
    arrows: false,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    afterChange: function (index) {},
  };

  const menuRef = useRef(null);
  const windowWidth = useRef(window.innerWidth);
  return (
    <>
      {windowWidth.current > 750 ? (
        <div className={style.main}>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ width: "235px", height: "100px" }}
            >
              <img src={b1} />
            </div>
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ backgroundImage: "", width: "235px", height: "100px" }}
            >
              <img src={b2} />
            </div>
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ backgroundImage: "", width: "235px", height: "100px" }}
            >
              <img src={b3} />
            </div>
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ backgroundImage: "", width: "235px", height: "100px" }}
            >
              <img src={b4} />
            </div>
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ backgroundImage: "", width: "235px", height: "100px" }}
            >
              <img src={b5} />
            </div>
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ backgroundImage: "", width: "235px", height: "100px" }}
            >
              <img src={b6} />
            </div>
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ backgroundImage: "", width: "235px", height: "100px" }}
            >
              <img src={b7} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="slider-container"
          style={{
            padding: "20px 0",
            gap: "0px",
            alignItems: " center",
            backgroundColor: "black",
            fontFamily: "IBM Plex Sans",
            fontSize: "16px",
            fontWeight: " 400",
            lineHeight: "16px",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          <Slider {...settings}>
            <div className={style.item}>
              <div
                className={style.image}
                style={{ width: "108px", height: "108px" }}
              >
                <img src={b1} />
              </div>
              <div style={{ width: "100px" }}> Beeunusual</div>
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{ backgroundImage: "", width: "108px", height: "108px" }}
              >
                <img src={b2} />
              </div>
              <div style={{ width: "100px" }}> CarbonioGFT</div>
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{ backgroundImage: "", width: "108px", height: "108px" }}
              >
                <img src={b3} />
              </div>
              <div style={{ width: "100px" }}> One shot</div>
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{ backgroundImage: "", width: "108px", height: "108px" }}
              >
                <img src={b4} />
              </div>
              <div style={{ width: "100px" }}> Mythicon </div>
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{ backgroundImage: "", width: "108px", height: "108px" }}
              >
                <img src={b5} />
              </div>
              <div style={{ width: "100px" }}> Hydronaut </div>
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{ backgroundImage: "", width: "108px", height: "108px" }}
              >
                <img src={b6} />
              </div>
              <div style={{ width: "100px" }}> Polosub </div>
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{ backgroundImage: "", width: "108px", height: "108px" }}
              >
                <img src={b7} />
              </div>
              <div style={{ width: "100px" }}> K.rouk </div>
            </div>
          </Slider>
        </div>
      )}
    </>
  );
};

export default BrandCourusel;
