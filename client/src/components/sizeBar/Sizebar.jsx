import React, { useState, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./Bar.module.css";
import black_arrow from "../../assets/Black_arrow.svg";

const SizeBar = observer(() => {
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
        <li className={styles.menuButtom}>Sizes</li>
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
        {product.sizes.map((size) => (
          <li className={styles.dropMenuItem} id={size.id}>
            <input
              className={styles.checkbox}
              type="checkbox"
              active={size.id === product.selectedSizes.id}
              onClick={() => product.setSelectedSizes(size.id)}
              key={size.id}
            />{" "}
            {size.name}{" "}
          </li>
        ))}
      </ul>
    </li>
  );
});

export default SizeBar;
