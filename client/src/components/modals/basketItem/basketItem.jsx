import React, { useContext } from "react";
import Trash from "../../../assets/realTrash.svg";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../../utils/consts";
import style from "./item.module.css";
import { Context } from "../../..";

const BasketItem = (props) => {
  const navigate = useNavigate();
  const { product } = useContext(Context);
  const redirect = (id) => {
    navigate(PRODUCT_ROUTE + "/" + id);
    // props.handleClose;
  };
  const set = () => {
    let array;
    let string = props.product.img;
    let str = string.replace(/[\"\[\]\\\\s]/g, "");
    array = str.split(",");
    return array[0];
  };
  const del = () => {
    props.delete(props.product.id);
  };

  //   const add = () => {
  //     props.add(props.product);
  //   };

  return (
    <div>
      <div className={style.item}>
        <img
          className={style.Image}
          onClick={() => redirect(props.product.id)}
          src={process.env.REACT_APP_API_URL + set()}
        />
        <div
          style={{
            width: "inherit",
            paddingLeft: "5px",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className={style.Name}>{props.product.name}</div>
              <div className={style.Brand}>
                {product.brands.map((el) => {
                  if (el.id == props.product.brandId) {
                    return el.name;
                  }
                })}
              </div>
              <div className={style.Brand}>
                Size:{" "}
                {product.sizes.map((el) => {
                  if (el.id == props.product.sizeId) {
                    return el.name;
                  }
                })}
              </div>
            </div>
            <div className={style.Price}>€{props.product.price}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "end",
              alignItems: "flex-end",
            }}
          >
            <img className={style.basket} src={Trash} onClick={del} />
          </div>
        </div>

        <div>{/* <div>{props.product.size}</div> */}</div>
      </div>
    </div>
  );
};

export default BasketItem;
