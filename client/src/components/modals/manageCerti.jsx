import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import {
  deleteCertificate,
  fetchCertificates,
} from "../../http/certificateAPI";
import styles from "./Modal.module.css";
import back from "../../assets/Back.svg";
import { useClickOutside } from "../../hooks/useClickOutside";
import GreyButton from "../UI/greyButton/GreyButton";
import H1Medium from "../UI/H1Medium";
import H2Medium from "../UI/H2regular";

const ManageCerti = observer(() => {
  const [certies, setCerties] = useState([]);
  const [CertiId, setCertiId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const menuRef = useRef(null);

  const certiDelete = (id) => {
    setCertiId(id);
    deleteCertificate(id).then((data) => setCertiId(""));
  };

  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        document.body.classList.add(styles.noScroll);
      }, 500);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    fetchCertificates().then((data) => {
      setCerties(data);
    });
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [CertiId, isModalOpen]);

  useClickOutside(menuRef, () => {
    if (isModalOpen) {
      setModalOpen(false);
    }
  });

  return (
    <>
      <div onClick={() => setModalOpen(!isModalOpen)}>
        <GreyButton
          width={"100%"}
          height={"42px"}
          text={"Manage certies"}
          fontSize={"20px"}
          fontColor={"White"}
          bckColor={"#0d6efd"}
        />
      </div>
      <div className={`${isModalOpen ? styles.mobileWindow : styles.none}`}>
        <div className={styles.bckgrnd}>
          <div className={styles.modalWrapper} ref={menuRef}>
            <div className={styles.modalHeader}>
              <button onClick={() => setModalOpen(!isModalOpen)}>
                <img className={styles.back} src={back} />
              </button>
              <div className={styles.modalTittle}>Delete and check certies</div>
            </div>
            <div className={styles.modal}>
              {certies.map((certi) => (
                <div className={styles.strings}>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"ID:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={certi.id}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"UNIQ ID:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={certi.uniqId}
                    />
                  </div>
                  <div>
                    <H1Medium
                      align={"left"}
                      size={"22px"}
                      text={"RECIPIENT:"}
                    />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={certi.recipient}
                    />
                  </div>
                  <div>
                    <H1Medium
                      align={"left"}
                      size={"22px"}
                      text={" EMAIL FROM:"}
                    />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={certi.emailFrom}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"EMAIL TO:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={certi.emailTo}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"AMOUNT:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={certi.amount}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"NOTE:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={certi.note}
                    />
                  </div>
                  <div></div>
                  <div>
                    {" "}
                    <H1Medium
                      align={"left"}
                      size={"22px"}
                      text={"Created at:"}
                    />
                    <H2Medium
                      bckgrndColor={"#f1f1f1"}
                      align={"left"}
                      size={"18px"}
                      text={certi.createdAt}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <div onClick={() => certiDelete(certi.id)}>
                      <GreyButton
                        height={"42px"}
                        width={"110px"}
                        text={"Delete"}
                        fontSize={"14px"}
                        fontColor={"Black"}
                        bckColor={"#ec3a3a"}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "50px 0",
                }}
              >
                <div
                  style={{ marginLeft: "auto", marginRight: "20px" }}
                  onClick={() => setModalOpen(!isModalOpen)}
                >
                  <GreyButton
                    width={"200px"}
                    height={"42px"}
                    fontSize={"20px"}
                    text={"Close"}
                    bckColor={"#c6c6c6"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ManageCerti;
