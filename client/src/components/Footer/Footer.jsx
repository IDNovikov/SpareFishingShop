import React, { useRef } from "react";
import style from "./Footer.module.css";

import H1Medium from "../UI/H1Medium";
import H2Medium from "../UI/H2regular";

const Footer = () => {
  const windowWidth = useRef(window.innerWidth);
  return (
    <div className={style.back}>
      <div className={style.main}>
        <div className={style.LeftBar}>
          {windowWidth.current > 750 ? (
            <>
              <div className={style.h1}>
                <H1Medium
                  align={"left"}
                  text={"Online shopping with — Spear&Shop"}
                />
              </div>
              <div>
                <H2Medium
                  align={"left"}
                  text={
                    "There are two factors that you have to consider when you are creating SEO for your online business. The first factor is how much people are searching for keywords or topics that are related to your business and the second factor is the quality of the content that you are providing on your site."
                  }
                />
              </div>
            </>
          ) : (
            <>
              <div className={style.h1}>
                <H1Medium
                  align={"left"}
                  text={"Online shopping with — Spear&Shop"}
                />
              </div>
              <div>
                <H2Medium
                  align={"left"}
                  text={
                    "There are two factors that you have to consider when you are creating SEO for your online business. The first factor is how much people are searching for keywords or topics that are related to your business and the second factor is the quality of the content that you are providing on your site."
                  }
                />
              </div>
              <div className={style.toTop}>
                <a style={{ all: "unset", cursor: "pointer" }} href="#">
                  <H1Medium text={"Top of the page"} align={"center"} />
                </a>
              </div>
            </>
          )}
        </div>

        <div className={style.RightBar}>
          <div className={style.Links}>
            <a style={{ all: "unset", cursor: "pointer" }} href="#">
              <H2Medium text={"Shipping"} align={"center"} />
            </a>
            <a style={{ all: "unset", cursor: "pointer" }} href="#">
              <H2Medium text={"Returns"} align={"center"} />
            </a>
          </div>
          <div className={style.Year}>
            <H2Medium text={"© 2024 Spear&Shop"} align={"center"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
