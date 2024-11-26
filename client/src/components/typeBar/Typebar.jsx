import React, { useState, useRef, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./Bar.module.css";
import black_arrow from "../../assets/Black_arrow.svg";

const TypeBar = observer(() => {
  const { product } = useContext(Context);
  const [isOpen, setOpen] = useState(true);
  const menuRef = useRef(null);

  const Ul = () => {
    return (
      <ul
        className={`${
          isOpen ? styles.dropMenuList : styles.dropMenuListDropped
        }`}
      >
        {product.types.map((type) => (
          <li className={styles.dropMenuItem} id={type.id}>
            <input
              className={styles.checkbox}
              type="checkbox"
              active={type.id === product.selectedTypes.id}
              onClick={() => product.setSelectedTypes(type.id)}
              key={type.id}
            />
            {type.name}
          </li>
        ))}
      </ul>
    );
  };
  useEffect(() => {
    Ul();
  }, [product]);
  return (
    <li className={styles.dropMenu} ref={menuRef}>
      <div
        onClick={() => setOpen(!isOpen)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <li className={styles.menuButtom}>Products</li>
        <img
          src={black_arrow}
          className={`${isOpen ? styles.arrow : styles.rewerse}`}
        />
      </div>
      <Ul />
    </li>
  );
});

export default TypeBar;
