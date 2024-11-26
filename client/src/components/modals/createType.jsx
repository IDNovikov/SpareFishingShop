import React, { useContext, useEffect, useRef, useState } from "react";
import { createType, fetchTypes, deleteType } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import GreyButton from "../UI/greyButton/GreyButton";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./Modal.module.css";
import back from "../../assets/Back.svg";

const CreateType = observer(() => {
  const { product } = useContext(Context);
  const menuRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrop, setDrop] = useState(false);
  const [item, setItem] = useState();
  const [value, setValue] = useState();
  const [name, setName] = useState();
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
    fetchTypes().then((data) => product.setTypes(data));
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [value, item, isModalOpen]);

  const del = () => {
    let outData = JSON.stringify(item.id);
    deleteType(outData).then((data) => {
      setItem("");
    });
  };

  const addType = () => {
    createType({ name: value }).then((data) => setValue(""));
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
          text={"Manage type"}
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
              <div className={styles.modalTittle}>Delete and add types</div>
            </div>
            <div className={styles.modal}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "space-evenly",
                    margin: "50px 0",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                    onClick={() => setDrop(!isDrop)}
                  >
                    <GreyButton
                      text={name || "Choose type↓"}
                      width={"200px"}
                      height={"42px"}
                      fontSize={"20px"}
                      fontColor={"black"}
                      bckColor={"white"}
                    />
                    <div
                      className={`${isDrop ? styles.dropMenu : styles.none}`}
                    >
                      {product.types.map((type) => (
                        <div
                          className={styles.dropItem}
                          onClick={() => (
                            setDrop(!isDrop), setItem(type), setName(type.name)
                          )}
                          key={type.id}
                        >
                          {type.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div onClick={del}>
                    <GreyButton
                      text={"Delete"}
                      width={"200px"}
                      height={"42px"}
                      fontSize={"20px"}
                      fontColor={"White"}
                      bckColor={"#f83636"}
                    />
                  </div>
                </div>

                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "2px 16px ",
                    marginBottom: "15px",
                  }}
                >
                  <input
                    className={styles.search}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Write new type"
                  />
                </form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",

                    justifyContent: "space-evenly",
                    margin: "50px 0",
                  }}
                >
                  <div onClick={() => setModalOpen(!isModalOpen)}>
                    <GreyButton
                      width={"200px"}
                      height={"42px"}
                      fontSize={"20px"}
                      text={"Close"}
                      bckColor={"#c6c6c6"}
                    />
                  </div>
                  <div onClick={addType}>
                    <GreyButton
                      width={"200px"}
                      height={"42px"}
                      fontSize={"20px"}
                      text={"Add"}
                      bckColor={"#fff500"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default CreateType;
