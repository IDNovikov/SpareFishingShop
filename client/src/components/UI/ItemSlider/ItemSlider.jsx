import React, { useState, useRef } from "react";
import Slider from "react-slick";

const ItemSlider = ({ images }) => {
  const [i, setI] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useRef(window.innerWidth);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setActiveIndex(next),
    appendDots: (dots) => (
      <div style={{ bottom: "5px" }}>
        <ul style={{ padding: "2px", margin: "2px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        key={i}
        style={{
          width: "13px",
          height: "13px",
          border: "1px solid #2D2D2D",
          borderRadius: "50%",
          backgroundColor: i === activeIndex ? "black" : "white",
        }}
      ></div>
    ),
  };
  return (
    <div style={{ marginBottom: "40px" }}>
      {images[1] != undefined ? (
        <>
          {windowWidth.current > 650 ? (
            <>
              <div
                style={{
                  width: "100%",
                  height: "612px",
                  maxHeight: "70vh",
                  marginBottom: "20px",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={process.env.REACT_APP_API_URL + images[i]}
                  alt={`Slide ${i}`}
                />
              </div>

              <div
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        cursor: "pointer",
                        objectFit: "contain",
                      }}
                      src={process.env.REACT_APP_API_URL + image}
                      alt={`Thumbnail ${index}`}
                      onClick={() => setI(index)}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="slider-container">
                <Slider {...settings}>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={process.env.REACT_APP_API_URL + image}
                      alt={`Thumbnail ${index}`}
                      onClick={() => setI(index)}
                    />
                  ))}
                </Slider>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <div
            style={{
              width: "100%",
              height: "612px",
              maxHeight: "70vh",
              marginBottom: "20px",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              src={process.env.REACT_APP_API_URL + images[0]}
              alt={"onePic"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ItemSlider;
