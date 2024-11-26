import React, { useState, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./Bar.module.css";
import black_arrow from "../../assets/Black_arrow.svg";

const ColorBar = observer(() => {
  const { product } = useContext(Context);
  const [isOpen, setOpen] = useState(true);
  const menuRef = useRef(null);

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
        <li className={styles.menuButtom}>Colors</li>
        <img
          src={black_arrow}
          className={`${isOpen ? styles.arrow : styles.rewerse}`}
        />
      </div>
      <ul
        className={`${
          isOpen ? styles.dropMenuList : styles.dropMenuListDropped
        }`}
      >
        {product.colors.map((color) => (
          <li className={styles.dropMenuItem} id={color.id}>
            <input
              className={styles.checkbox}
              type="checkbox"
              active={color.id === product.selectedColors.id}
              onClick={() => product.setSelectedColors(color.id)}
              key={color.id}
            />{" "}
            {color.name}{" "}
          </li>
        ))}
      </ul>
    </li>
  );
});

export default ColorBar;
