import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";

import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchBaskets, deleteBasket } from "../../http/basketAPI";
import styles from "./Modal.module.css";
import back from "../../assets/Back.svg";
import { useClickOutside } from "../../hooks/useClickOutside";
import GreyButton from "../UI/greyButton/GreyButton";
import H1Medium from "../UI/H1Medium";
import H2Medium from "../UI/H2regular";

const ManageBasket = observer(() => {
  const { product } = useContext(Context);
  const [baskets, setBaskets] = useState([]);
  const [BasketiId, setBasketiId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const menuRef = useRef(null);

  const basketDelete = (id) => {
    setBasketiId(id);
    deleteBasket(id).then((data) => {
      setBasketiId("");
    });
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
    fetchBaskets().then((data) => {
      setBaskets(data);
    });
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [BasketiId, isModalOpen]);

  const ProductsNames = (id) => {
    let result = JSON.parse(id).reduce((acc, curr) => {
      const existing = acc.find((item) => item.ind === curr);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ ind: curr, count: 1 });
      }
      return acc;
    }, []);

    const updatedArray = result.map((item) => {
      const matchedProduct = product.products.find(
        (product) => product.id == item.ind
      );
      if (matchedProduct) {
        return { name: matchedProduct.name, count: item.count };
      }
      return item;
    });
    return updatedArray;
  };

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
          text={"Manage baskets"}
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
              <div className={styles.modalTittle}>Delete and check baskets</div>
            </div>
            <div className={styles.modal}>
              {baskets.map((basket) => (
                <div className={styles.strings}>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"Products:"} />
                    {ProductsNames(basket.productsId).map((item) => {
                      return (
                        <H2Medium
                          align={"left"}
                          bckgrndColor={"#f1f1f1"}
                          size={"18px"}
                          text={`X:${item.count} - ${item.name}`}
                        />
                      );
                    })}
                  </div>

                  <div>
                    <H1Medium
                      align={"left"}
                      size={"22px"}
                      text={"Ceti UNIQ ID:"}
                    />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={basket.certificateUniqId}
                    />
                  </div>
                  <div>
                    <H1Medium
                      align={"left"}
                      size={"22px"}
                      text={"Total cost:"}
                    />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={`${basket.totalCost} €`}
                    />
                  </div>
                  <div>
                    <H1Medium
                      align={"left"}
                      size={"22px"}
                      text={"Type of delivery:"}
                    />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={basket.typeOfDelivery}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"Phone:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={basket.phoneNumber}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"Email:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={basket.email}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"Payment:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={basket.payment}
                    />
                  </div>
                  <div>
                    <H1Medium align={"left"} size={"22px"} text={"Name:"} />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={basket.name}
                    />
                  </div>
                  <div>
                    <H1Medium
                      align={"left"}
                      size={"22px"}
                      text={"Address of delivery:"}
                    />
                    <H2Medium
                      align={"left"}
                      bckgrndColor={"#f1f1f1"}
                      size={"18px"}
                      text={basket.adress}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <div onClick={() => basketDelete(basket.id)}>
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

export default ManageBasket;
