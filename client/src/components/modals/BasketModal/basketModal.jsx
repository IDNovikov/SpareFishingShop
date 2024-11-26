import React from "react";
import { useState, useContext } from "react";
import { Context } from "../../../";
import BasketItem from "../basketItem/basketItem";
import { observer } from "mobx-react-lite";
import { SHOP_ROUTE } from "../../../utils/consts";
import { checkCertificate } from "../../../http/certificateAPI";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import OrderModal from "../OrderModal/orderModal";
import styles from "./basket.module.css";
import X from "../../../assets/black-X.svg";
import H2Medium from "../../UI/H2regular";
import H1Medium from "../../UI/H1Medium";
import YellowButton from "../../UI/yellowButton/yellowButton";
import H1regular from "../../UI/H1regular";
import GreyButton from "../../UI/greyButton/GreyButton";
const BasketModal = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const { basket } = useContext(Context);

  const [value, setValue] = useState();
  const [certi, setCerti] = useState("");
  const [orderModal, setModal] = useState(false);
  const [isCertyValid, setCertiValid] = useState(true);

  const checkCerti = () => {
    if (value) {
      checkCertificate({ uniqId: value }).then((data) => {
        if (data != 0) {
          return setCerti(JSON.parse(data)), setCertiValid(true);
        }

        return setCertiValid(false), setCerti("");
      });
    } else {
      return setCertiValid(true), setCerti("");
    }
  };

  const addToBasket = (product) => {
    basket.addProduct(product);
  };

  const deleteFromBasket = (id) => {
    basket.deleteProduct(id);
  };

  let sum = 0;
  let discont = 0;
  const cost = (basket, certi) => {
    if (!certi) {
      basket.basket.map((product) => (sum += Number(product.price)));
    } else {
      basket.basket.map((product) => (sum += Number(product.price)));
      discont = sum - Number(certi.amount);
    }
  };
  let Price = () => {
    if (discont != 0) {
      return (
        <div className={styles.price}>
          <span>
            <H2Medium decor={"line-through"} text={`€ ${sum}`} />
          </span>
          <span style={{ marginLeft: "10px" }}>
            <H1Medium color={"#00B907"} text={`€ ${discont}`} />
          </span>
        </div>
      );
    } else {
      return <H1Medium text={`€ ${sum}`} />;
    }
  };
  cost(basket, certi);

  return (
    <div className={styles.mobileWindow}>
      <div className={styles.modalWrapper}>
        <>
          <div className={styles.modalHeader}>
            <div className={styles.modalTittle}>Shopping cart</div>
            <div className={styles.modalClose} onClick={() => navigate(-1)}>
              <img src={X} />
            </div>
          </div>
          {sum == 0 ? (
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
                    "The shooping cart is empty, look the something in our catalog"
                  }
                  align={"left"}
                />
              </div>
              <div>
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
          ) : (
            <div className={styles.modal}>
              <div>
                {basket.basket.map((product, ind) => {
                  return (
                    <BasketItem
                      key={ind}
                      product={product}
                      delete={deleteFromBasket}
                      add={addToBasket}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0px",
                  padding: "0px 10px",
                }}
              >
                <H2Medium text={`Subtotal (${basket.basket.length}): `} />{" "}
                <Price />
              </div>
              <div
                style={{
                  padding: "0px 10px",
                }}
              >
                <H2Medium text={"Gift certificate"} />
                {/* Нужно изменить кнопку. При вводе сертификата, она должна гореть красным если не правильно */}
                <div>
                  <form>
                    <input
                      className={`${styles.search} ${
                        !isCertyValid ? styles.break : ""
                      }`}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onBlur={checkCerti}
                      placeholder="Code"
                    />
                  </form>
                </div>
              </div>
              {isCertyValid ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                  onClick={() => setModal(true)}
                >
                  <YellowButton
                    height={"42px"}
                    width={"calc(100% - 20px)"}
                    text={"Checkout"}
                    fontSize={"20px"}
                    fontColor={"Black"}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                >
                  <GreyButton
                    height={"42px"}
                    width={"calc(100% - 20px)"}
                    text={"Checkout"}
                    fontSize={"20px"}
                    fontColor={"Black"}
                  />
                </div>
              )}
            </div>
          )}

          {orderModal && (
            <OrderModal
              discont={discont}
              sum={sum}
              total={basket.basket.length}
              basket={basket}
              certi={certi}
              setModal={setModal}
              amount={sum}
              close={() => navigate(-1)}
            />
          )}
        </>
      </div>
    </div>
  );
});

export default BasketModal;
