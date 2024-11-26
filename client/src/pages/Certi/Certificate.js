import React, { useContext, useEffect } from "react";
import { useState } from "react";
// import { Context } from "../..";
import { createCertificate } from "../../http/certificateAPI";
import { observer } from "mobx-react-lite";
import YellowButton from "../../components/UI/yellowButton/yellowButton";
import GreyButton from "../../components/UI/greyButton/GreyButton";
import H1Medium from "../../components/UI/H1Medium";
import H2Medium from "../../components/UI/H2regular";
import styles from "./Certi.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SHOP_ROUTE, CERTIFICATE_ROUTE } from "../../utils/consts";

const Certificate = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [recipient, setRecipient] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [phone, setPhone] = useState("");
  const [isCorrect, setCorrect] = useState(false);
  const [isModal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    e.preventDefault();
    navigate(CERTIFICATE_ROUTE, { replace: true });
    window.location.reload(); // Обновляем страницу
  };
  const validateForm = () => {
    const isRecipientValid = recipient.trim() !== "";
    const isEmailFromValid =
      emailFrom.trim() !== "" && emailPattern.test(emailFrom);
    const isAmountValid =
      amount.trim() !== "" && Number(amount) >= 20 && Number(amount) <= 10000;
    const isEmailToValid = emailTo.trim() !== "" && emailPattern.test(emailTo);
    const isPhoneValid = phone.trim().length > 0;
    setCorrect(
      isPhoneValid &&
        isEmailFromValid &&
        isEmailToValid &&
        isAmountValid &&
        isRecipientValid
    );
  };
  useEffect(() => {
    Button();
    validateForm();
  }, [phone, emailFrom, emailTo, recipient, amount]);
  const addCertificate = () => {
    const formData = new FormData();
    formData.append("recipient", recipient);
    formData.append("emailFrom", emailFrom);
    formData.append("amount", amount);
    formData.append("note", note);
    formData.append("emailTo", emailTo);
    formData.append("phone", phone);

    createCertificate(formData).then((data) => {
      setModal(true);
    });
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
            onClick={() => addCertificate()}
          >
            <YellowButton
              height={"42px"}
              width={"100px"}
              text={"Order >"}
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
              width={"100px"}
              text={"Order >"}
              fontSize={"20px"}
              fontColor={"Black"}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <H1Medium align={"left"} text={"Order a cerificate"} />
        {isModal ? (
          <div className={styles.wall}>
            <H2Medium
              align={"left"}
              color={"black"}
              size={"28px"}
              text={"Thanks for the order!​"}
            />
            <H2Medium
              align={"left"}
              color={"black"}
              size={"18px"}
              text={
                "In the near future we will prepare a certificate and send you a payment link to the specified email address.!​"
              }
            />
            <H2Medium
              align={"left"}
              color={"black"}
              size={"18px"}
              text={
                "Immediately after your payment, we will send it to the recipient. If the certificate needs to be sent on a certain day or hour, write to us about it, and we will do everything right.​"
              }
            />
            <H2Medium
              align={"left"}
              color={"black"}
              size={"18px"}
              text={
                "We respond quickly: our opening hours are from 11:00 to 22:00 every day.​"
              }
            />
            <H2Medium
              align={"left"}
              color={"black"}
              size={"18px"}
              text={
                "If you have any questions, feel free to call or write to us:​"
              }
            />
            <H2Medium
              align={"left"}
              color={"black"}
              size={"18px"}
              text={"+357 97 617 817​"}
            />
            <H2Medium
              align={"left"}
              color={"black"}
              size={"18px"}
              text={"georgiouevros89@gmail.com​"}
            />
            <div className={styles.btnGroup}>
              <Link
                style={{ textDecoration: "none" }}
                to={CERTIFICATE_ROUTE}
                onClick={handleLinkClick}
              >
                <YellowButton
                  height={"42px"}
                  width={"226px"}
                  text={"Order another certificate"}
                  fontSize={"16px"}
                  fontColor={"Black"}
                />
              </Link>

              <Link style={{ textDecoration: "none" }} to={SHOP_ROUTE}>
                <GreyButton
                  height={"42px"}
                  width={"226px"}
                  text={"Back to main page"}
                  fontSize={"16px"}
                  fontColor={"Black"}
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.greyWall}>
              <H2Medium
                align={"center"}
                color={"black"}
                size={"16px"}
                text={
                  "On this page, you can issue an electronic certificate in the Spear&Shop. It can be used everywhere – in our store, for online orders and via social networks."
                }
              />
            </div>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "15px",
              }}
            >
              <input
                className={`${styles.search} ${
                  recipient != "" ? styles.break : ""
                }`}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient*"
              />

              <input
                className={`${styles.search} ${
                  emailFrom != "" ? styles.break : ""
                }`}
                value={emailFrom}
                onChange={(e) => setEmailFrom(e.target.value)}
                placeholder="Recipient's e-mail address*"
              />

              <input
                className={`${styles.search} ${
                  amount != "" ? styles.break : ""
                }`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <H2Medium align={"left"} size={"14px"} text={"€ 20 – 10 000"} />

              <input
                className={`${styles.search} ${note != "" ? styles.break : ""}`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Accompanying note (Optional)"
              />
              <input
                className={`${styles.search} ${
                  emailTo != "" ? styles.break : ""
                }`}
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="E-mail for invoicing*"
              />
              <input
                className={`${styles.search} ${
                  phone != "" ? styles.break : ""
                }`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Sender's phone number*"
              />
            </form>

            <Button />
          </>
        )}
      </div>
    </div>
  );
};

export default Certificate;
