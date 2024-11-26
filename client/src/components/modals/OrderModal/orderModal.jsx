import React from "react";
import { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import "../BasketModal/basketModal";
import { postBasket } from "../../../http/basketAPI";
import styles from "./order.module.css";
import X from "../../../assets/black-X.svg";
import back from "../../../assets/Back.svg";
import H2Medium from "../../UI/H2regular";
import H1Medium from "../../UI/H1Medium";
import YellowButton from "../../UI/yellowButton/yellowButton";
import GreyButton from "../../UI/greyButton/GreyButton";
import { Context } from "../../..";
import { SHOP_ROUTE } from "../../../utils/consts";
import { Link } from "react-router-dom";
import endBsk from "../../../assets/endBasket.png";

const OrderModal = observer((props) => {
  const { basket } = useContext(Context);
  const [finishModal, setFinishMadal] = useState(false);
  const [Data, setData] = useState("");
  const [delivery, setDelivery] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [isCorrect, setCorrect] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    const isPhoneValid = phone.trim().length > 0;
    const isEmailValid = email.trim() !== "" && emailPattern.test(email);
    const isNameValid = name.trim() !== "";
    const isPaymentValid = payment.trim() !== "";
    const isAdressValid = delivery === "courier" ? adress.trim() !== "" : true;
    setCorrect(
      isPhoneValid &&
        isEmailValid &&
        isNameValid &&
        isPaymentValid &&
        isAdressValid
    );
  };

  let Button = () => {
    return (
      <>
        {isCorrect ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: "15px",
            }}
            onClick={() => addBasket()}
          >
            <YellowButton
              height={"42px"}
              width={"calc(100% - 20px)"}
              text={"Order"}
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
              text={"Order"}
              fontSize={"20px"}
              fontColor={"Black"}
            />
          </div>
        )}
      </>
    );
  };
  useEffect(() => {
    Button();
    validateForm();
  }, [phone, email, name, payment, delivery, adress]);

  const addBasket = () => {
    const formData = new FormData();
    formData.append("productsId", productsID);
    formData.append("certificateUniqId", props.certi.uniqId);
    formData.append("totalCost", props.amount);
    formData.append("typeOfDelivery", delivery);
    formData.append("phoneNumber", phone);
    formData.append("email", email);
    formData.append("payment", payment);
    formData.append("name", name);
    formData.append("adress", adress);
    postBasket(formData).then((data) => {
      setFinishMadal(true);
      setData(data);
    });
  };

  let productsID = new Array();
  function addData(props) {
    props.basket.basket.map((product) => productsID.push(String(product.id)));
    productsID = JSON.stringify(productsID);
  }
  addData(props);

  let Price = () => {
    if (props.discont != 0) {
      return (
        <div style={{ display: "flex" }}>
          <span>
            <H2Medium decor={"line-through"} text={`€ ${props.sum}`} />
          </span>
          <span style={{ marginLeft: "10px" }}>
            <H1Medium color={"#00B907"} text={`€ ${props.discont}`} />
          </span>
        </div>
      );
    } else {
      return <H1Medium text={`€ ${props.sum}`} />;
    }
  };
  return (
    <div className={styles.mobileWindow}>
      <div className={styles.modalWrapper}>
        {finishModal ? (
          <>
            <div
              className={styles.modalHeader}
              onClick={() => basket.deleteBasket()}
            >
              <Link className={styles.modalClose} to={SHOP_ROUTE}>
                <img src={X} />
              </Link>
            </div>

            <div className={styles.modal}>
              <div className={styles.mmodal}>
                <img className={styles.endBsk} src={endBsk} />
                <div className={styles.center}>
                  <H1Medium text={`Order # ${Data.id}`} />
                </div>
                <H2Medium
                  text={`Thank you for order! We will sent you an order confirmation email
              to ${Data.email}`}
                />
                <div className={styles.punkt}>
                  <H2Medium text={"Recipient:"} />
                  <H2Medium color={"black"} text={`${Data.name}`} />
                </div>
                <div className={styles.punkt}>
                  <H2Medium text={"Phone:"} />
                  <H2Medium color={"black"} text={`${Data.phoneNumber}`} />
                </div>
                <div className={styles.punkt}>
                  <H2Medium text={"E-mail:"} />
                  <H2Medium color={"black"} text={`${Data.email}`} />
                </div>
                <div className={styles.punkt}>
                  <H2Medium text={"Receiving address:"} />
                  <H2Medium color={"black"} text={`${Data.adress}`} />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                  onClick={() => basket.deleteBasket()}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                    to={SHOP_ROUTE}
                  >
                    <YellowButton
                      height={"42px"}
                      width={"calc(100% - 20px)"}
                      text={"Okay"}
                      fontSize={"20px"}
                      fontColor={"Black"}
                    />
                  </Link>
                </div>{" "}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <button onClick={() => props.setModal(false)}>
                <img className={styles.back} src={back} />
              </button>
              <div className={styles.modalTittle}>Checkout</div>
              <Link className={styles.modalClose} to={SHOP_ROUTE}>
                <img src={X} />
              </Link>
            </div>
            <div className={styles.modal}>
              <div></div>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                }}
              >
                <div className={styles.holder}>
                  <input
                    className={styles.radio}
                    type="radio"
                    value="pickup"
                    id="pickup"
                    onChange={(e) => setDelivery(e.target.value)}
                    name="delivery"
                  />
                  <label for="pickup">
                    <H2Medium text={"Pickup"} />
                    <H2Medium
                      size={"16px"}
                      text={"Agias Zonis 59 Shop 2, Limassol"}
                    />
                  </label>
                </div>
                <div className={styles.holder}>
                  <input
                    className={styles.radio}
                    type="radio"
                    value="courier"
                    id="courier"
                    onChange={(e) => setDelivery(e.target.value)}
                    name="delivery"
                  />
                  <label for="courier">
                    <H2Medium text={"Deliver by courier"} />
                  </label>
                </div>
              </form>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2px 16px ",
                  marginBottom: "15px",
                }}
              >
                <H1Medium size={"24px"} text={"The order will be picked up"} />
                <input
                  className={`${styles.search} ${
                    name != "" ? styles.break : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Recipient`s full name"
                />

                <input
                  className={`${styles.search} ${
                    phone != "" ? styles.break : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                />

                <input
                  className={`${styles.search} ${
                    emailPattern.test(email) ? styles.break : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />

                <input
                  className={`${styles.search} ${
                    adress != "" ? styles.break : ""
                  } ${delivery == "pickup" ? styles.none : ""}`}
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                  placeholder="Adress"
                />
              </form>

              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2px 16px ",
                }}
              >
                <H1Medium size={"24px"} text={"Payment method"} />
                <div className={styles.holder}>
                  <input
                    className={styles.radio}
                    type="radio"
                    value="card"
                    id="card"
                    onChange={(e) => setPayment(e.target.value)}
                    name="payment"
                  />
                  <label for="card">
                    <H2Medium text={"By credit card"} />
                  </label>
                </div>
                <div className={styles.holder}>
                  <input
                    className={styles.radio}
                    type="radio"
                    value="cash"
                    id="cash"
                    onChange={(e) => setPayment(e.target.value)}
                    name="payment"
                  />
                  <label for="cash">
                    <H2Medium text={"Cash"} />
                  </label>
                </div>
              </form>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0px",
                  padding: "0px 10px",
                }}
              >
                <H2Medium text={`Subtotal (${props.total}): `} /> <Price />
              </div>
              <Button />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default OrderModal;
