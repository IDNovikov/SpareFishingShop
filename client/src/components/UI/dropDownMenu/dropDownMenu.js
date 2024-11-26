import React, { useState, useRef, useContext } from "react";
import { Context } from "../../..";
import { useClickOutside } from "../../../hooks/useClickOutside";
import "./dropDownMenu.css";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../../../utils/consts";
import { observer } from "mobx-react-lite";

const DropDown = observer(({ name, items, src, handleClose, array }) => {
  const { product } = useContext(Context);

  const [isOpen, setOpen] = useState();
  const menuRef = useRef(null);
  const itemRef = useRef(null);
  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });

  // const itemId = (item, storeArray) => {
  //   storeArray.map((elem) => {
  //     if (elem.name == item) {
  //       console.log(elem.name, item);
  //       return product.setSelectedTypes(elem.id, item);
  //     }
  //   });
  // };

  const li = items.map((item) => {
    return (
      <li
        className="drop_menu_item"
        id={item.id}
        // onClick={() => (itemId(item.item, array), handleClose)}
        onClick={handleClose}
      >
        <NavLink className="Link" to={`${SHOP_ROUTE}#shop`}>
          {item.item}
        </NavLink>
      </li>
    );
  });

  return (
    <li className="drop_menu" onClick={() => setOpen(!isOpen)} ref={menuRef}>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <li className="menu_buttom">{name}</li>
        <img src={src} className={`arrow${isOpen ? "_rewerse" : ""}`} />
      </div>
      <ul className={`drop_menu_list${isOpen ? "_dropped" : ""}`}>{li}</ul>
    </li>
  );
});
export default DropDown;
