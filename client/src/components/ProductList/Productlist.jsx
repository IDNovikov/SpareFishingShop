import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import Productitem from "../ProductItem/Productitem";
import style from "./ProductList.module.css";
import GreyButton from "../UI/greyButton/GreyButton";
import H1Medium from "../UI/H1Medium";

const Productlist = observer((props) => {
  const { product } = useContext(Context);
  return (
    <div className={style.productGrid}>
      {product.products[0] != undefined ? (
        <>
          {product.products.map((product, ind) => (
            <div className={style.productItem}>
              <Productitem
                key={product.id}
                propProduct={product}
                productDelete={props.prodDelete}
              />
              {props.prodDelete ? (
                <div onClick={() => props.prodDelete(product.id)}>
                  <GreyButton
                    height={"42px"}
                    width={"110px"}
                    text={"Delete"}
                    fontSize={"14px"}
                    fontColor={"Black"}
                    bckColor={"#ec3a3a"}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      ) : (
        <div style={{ height: "auto", margin: "40px auto", maxWidth: "400px" }}>
          <H1Medium
            align={"left"}
            text={
              "Nothing was found for this query. Try to find something else."
            }
            size={"24px"}
            color={"#2D2D2D"}
          />
        </div>
      )}
    </div>
  );
});

export default Productlist;
