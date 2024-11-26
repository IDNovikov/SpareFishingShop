import React, { useState } from "react";
import { useContext, useRef } from "react";
import heart from "../../assets/heart.svg";
import heart_black from "../../assets/blackheart.svg";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import CircleButton from "../UI/circleButtom";
import style from "./Favorites.module.css";
import X from "../../assets/black-X.svg";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import fbh from "../../assets/fulledBlackheart.svg";
import basketImg from "../../assets/basket.svg";
import redheart from "../../assets/redheart.png";
import { useClickOutside } from "../../hooks/useClickOutside";
import YellowButton from "../UI/yellowButton/yellowButton";
import H1regular from "../UI/H1regular";

const Favorites = observer(() => {
  const navigate = useNavigate();
  const { favorites } = useContext(Context);
  const { product } = useContext(Context);
  const { basket } = useContext(Context);
  const menuRef = useRef(null);
  const windowWidth = useRef(window.innerWidth);
  const [isModalOpen, setModalOpen] = useState(false);

  useClickOutside(menuRef, () => {
    if (isModalOpen) {
      setModalOpen(false);
    }
  });

  const set = (elem) => {
    let array;
    let string = elem.img;
    let str = string.replace(/[\"\[\]\\\\s]/g, "");
    array = str.split(",");
    return array[0];
  };

  const isFavorites = () => {
    if (favorites.favorites[0]) {
      return true;
    }
    return false;
  };

  const handleDelete = (id) => {
    favorites.deleteFavorite(id);
  };

  const handleAddtoBasket = (product, id) => {
    basket.addProduct(product);
    favorites.deleteFavorite(id);
  };
  return (
    <>
      <div>
        {windowWidth.current > 750 ? (
          <div onClick={() => setModalOpen(!isModalOpen)}>
            {!isFavorites() ? (
              <CircleButton
                img={heart_black}
                width={"24px"}
                height={"24px"}
                bckgrnd={"white"}
              />
            ) : (
              <CircleButton
                img={redheart}
                width={"24px"}
                height={"24px"}
                bckgrnd={"white"}
              />
            )}
          </div>
        ) : (
          <div onClick={() => setModalOpen(!isModalOpen)}>
            {!isFavorites() ? (
              <CircleButton
                img={heart}
                width={"24px"}
                height={"24px"}
                bckgrnd={"black"}
              />
            ) : (
              <CircleButton
                img={redheart}
                width={"24px"}
                height={"24px"}
                bckgrnd={"black"}
              />
            )}
          </div>
        )}
        <div className={`${isModalOpen ? style.mobileWindow : style.none}`}>
          <div className={style.modalWrapper} ref={menuRef}>
            <div className={style.modalHeader}>
              <div className={style.modalTittle}>Favorite</div>
              <div
                className={style.modalClose}
                onClick={() => setModalOpen(false)}
              >
                <img src={X} />
              </div>
            </div>
            <div className={style.modal}>
              {favorites.favorites[0] ? (
                <>
                  {" "}
                  {favorites.favorites.map((elem, ind) => {
                    return (
                      <div className={style.item}>
                        <img
                          className={style.Image}
                          onClick={() =>
                            navigate(PRODUCT_ROUTE + "/" + elem.id)
                          }
                          src={process.env.REACT_APP_API_URL + set(elem)}
                        />
                        <div
                          style={{
                            width: "inherit",
                            paddingLeft: "5px",
                            justifyContent: "space-between",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div className={style.Name}>{elem.name}</div>
                              <div className={style.Brand}>
                                {product.brands.map((el) => {
                                  if (el.id == elem.brandId) {
                                    return el.name;
                                  }
                                })}
                              </div>
                            </div>

                            <div className={style.Price}> € {elem.price}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "end",
                              alignItems: "flex-end",
                            }}
                          >
                            <div onClick={() => handleDelete(elem.id)}>
                              <img className={style.heart} src={fbh} />
                            </div>
                            <div
                              onClick={() => handleAddtoBasket(elem, elem.id)}
                            >
                              <img className={style.basket} src={basketImg} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div
                  style={{
                    postition: "relative",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20%",
                    width: "328px",
                  }}
                >
                  <div>
                    <H1regular
                      text={
                        "The section is empty, look at something in our catalog"
                      }
                      align={"left"}
                    />
                  </div>
                  <div onClick={() => setModalOpen(false)}>
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to={SHOP_ROUTE}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          marginTop: "15px",
                        }}
                      >
                        <YellowButton
                          height={"42px"}
                          width={"328px"}
                          text={"Catalog"}
                          fontSize={"20px"}
                          fontColor={"Black"}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Favorites;
