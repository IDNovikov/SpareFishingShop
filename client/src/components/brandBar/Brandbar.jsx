import React, { useState, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./Bar.module.css";
import black_arrow from "../../assets/Black_arrow.svg";

const Brandbar = observer(() => {
  const { product } = useContext(Context);
  const [isOpen, setOpen] = useState(true);
  const menuRef = useRef(null);

  return (
    <li
      className={styles.dropMenu}
      ref={menuRef}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div
        onClick={() => setOpen(!isOpen)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <li className={styles.menuButtom}>Brands</li>
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
        {product.brands.map((brand) => (
          <li className={styles.dropMenuItem} id={brand.id}>
            <input
              className={styles.checkbox}
              type="checkbox"
              active={brand.id === product.selectedBrands.id}
              onClick={() => product.setSelectedBrands(brand.id)}
              key={brand.id}
            />{" "}
            {brand.name}{" "}
          </li>
        ))}
      </ul>
    </li>
  );
});

export default Brandbar;
