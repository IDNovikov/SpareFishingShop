import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Heart from "../../assets/heart.png";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import style from "./ProductItem.module.css";
import redheart from "../../assets/redheart.png";

const Productitem = observer(({ propProduct, productDelete }) => {
  const { favorites } = useContext(Context);
  const { product } = useContext(Context);
  const navigate = useNavigate();

  const add = () => {
    favorites.addProduct(propProduct);
  };
  const isFavorites = (id) => {
    let isOK = false;

    favorites.favorites.map((elem) => {
      if (elem.id == id) {
        return (isOK = true);
      }
    });
    return isOK;
  };

  const handleDelete = (id) => {
    favorites.deleteFavorite(id);
  };
  let array;
  const set = () => {
    let string = propProduct.img;
    let str = string.replace(/[\"\[\]\\\\s]/g, "");
    array = str.split(",");
  };

  set();
  return (
    <div className={`${!productDelete ? style.mainItem : style.mainModal}`}>
      <div className={style.inner}>
        {!isFavorites(propProduct.id) ? (
          <img className={style.Heart} src={Heart} onClick={add} />
        ) : (
          <img
            className={style.Heart}
            src={redheart}
            onClick={() => handleDelete(propProduct.id)}
          />
        )}
        <img
          onClick={() => navigate(PRODUCT_ROUTE + "/" + propProduct.id)}
          className={style.Image}
          src={process.env.REACT_APP_API_URL + array[0]}
        />

        <div>
          <div className={style.Price}> € {propProduct.price}</div>
          {!productDelete ? (
            <div className={style.Brand}>
              {product.brands.map((elem) => {
                if (elem.id == propProduct.brandId) {
                  return elem.name;
                }
              })}
            </div>
          ) : (
            <></>
          )}

          <div className={style.Name}>{propProduct.name}</div>

          {/* {!admin ? <button onClick={add}> Add to card</button> : <></>} */}
        </div>
      </div>
    </div>
  );
});
export default Productitem;
