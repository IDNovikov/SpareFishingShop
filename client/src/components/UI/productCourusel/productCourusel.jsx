import React, { useRef, useState, Component } from "react";
import style from "./productCourusel.module.css";
import gun from "../../../assets/Union.png";
import last from "../../../assets/last.png";
import cost from "../../../assets/cost.png";
import mask from "../../../assets/mask.png";
import watch from "../../../assets/watch.png";
import ponch from "../../../assets/poncho.png";
import Ts from "../../../assets/t-s.png";
import short from "../../../assets/short.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCourusel = (props) => {
  const settings = {
    arrows: false,
    className: "center",
    infinite: true,
    centerPadding: "160px",
    slidesToShow: 3,
    swipeToSlide: true,
    afterChange: function (index) {},
  };

  const menuRef = useRef(null);
  const windowWidth = useRef(window.innerWidth);
  return (
    <>
      {windowWidth.current > 930 ? (
        <div className={style.main}>
          <div className={style.item}>
            <div
              className={style.image}
              style={{ width: props.width, height: props.height }}
            >
              <img src={gun} />
            </div>
            Spearguns
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{
                backgroundImage: "",
                width: props.width,
                height: props.height,
              }}
            >
              <img src={last} />
            </div>
            Fins
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{
                backgroundImage: "",
                width: props.width,
                height: props.height,
              }}
            >
              <img src={cost} />
            </div>
            Wetsuit
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{
                backgroundImage: "",
                width: props.width,
                height: props.height,
              }}
            >
              <img src={mask} />
            </div>
            Mask
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{
                backgroundImage: "",
                width: props.width,
                height: props.height,
              }}
            >
              <img src={watch} />
            </div>
            Accessories
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{
                backgroundImage: "",
                width: props.width,
                height: props.height,
              }}
            >
              <img src={ponch} />
            </div>
            Poncho
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{
                backgroundImage: "",
                width: props.width,
                height: props.height,
              }}
            >
              <img src={Ts} />
            </div>
            T-shorts
          </div>
          <div className={style.item}>
            <div
              className={style.image}
              style={{
                backgroundImage: "",
                width: props.width,
                height: props.height,
              }}
            >
              <img src={short} />
            </div>
            Shorts
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
                style={{ width: props.width, height: props.height }}
              >
                <img src={gun} />
              </div>
              Spearguns
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{
                  backgroundImage: "",
                  width: props.width,
                  height: props.height,
                }}
              >
                <img src={last} />
              </div>
              Fins
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{
                  backgroundImage: "",
                  width: props.width,
                  height: props.height,
                }}
              >
                <img src={cost} />
              </div>
              Wetsuit
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{
                  backgroundImage: "",
                  width: props.width,
                  height: props.height,
                }}
              >
                <img src={mask} />
              </div>
              Mask
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{
                  backgroundImage: "",
                  width: props.width,
                  height: props.height,
                }}
              >
                <img src={watch} />
              </div>
              Accessories
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{
                  backgroundImage: "",
                  width: props.width,
                  height: props.height,
                }}
              >
                <img src={ponch} />
              </div>
              Poncho
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{
                  backgroundImage: "",
                  width: props.width,
                  height: props.height,
                }}
              >
                <img src={Ts} />
              </div>
              T-shorts
            </div>
            <div className={style.item}>
              <div
                className={style.image}
                style={{
                  backgroundImage: "",
                  width: props.width,
                  height: props.height,
                }}
              >
                <img src={short} />
              </div>
              Shorts
            </div>
          </Slider>
        </div>
      )}
    </>
  );
};

export default ProductCourusel;
