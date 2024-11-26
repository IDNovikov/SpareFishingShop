import React, { useState, useRef, useContext, useEffect } from "react";
import { Context } from "../..";
import styles from "./Bar.module.css";
import black_arrow from "../../assets/Black_arrow.svg";

export default function PriceBar(props) {
  const { product } = useContext(Context);

  const [isOpen, setOpen] = useState(true);
  const menuRef = useRef(null);

  const [minValue, setMinValue] = useState("0");
  const [maxValue, setMaxValue] = useState("100000000000000000");

  const onOptionChange = (minValue, maxValue) => {
    product.setSelectedPrices(minValue, maxValue);
  };

  useEffect(() => {
    onOptionChange(minValue, maxValue);
  }, [minValue, maxValue]);
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
        <li className={styles.menuButtom}>Price</li>
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
        <div className={styles.price}>
          <input
            className={styles.inp}
            placeholder="min"
            type="text"
            onChange={(e) => setMinValue(e.target.value)}
          />
          -
          <input
            className={styles.inp}
            placeholder="max"
            type="text"
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
      </ul>
    </li>
  );
}
