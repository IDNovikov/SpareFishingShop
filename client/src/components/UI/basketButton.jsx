import React from "react";
import { useContext } from "react";
import Basket from "../../assets/basket.svg";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import CircleButton from "./circleButtom";

const BasketButton = observer(() => {
  const { basket } = useContext(Context);

  let sum = 0;
  const cost = (basket) => {
    basket.basket.map((product) => (sum += Number(product.price)));
  };
  cost(basket);

  return (
    <>
      {sum === 0 ? (
        <CircleButton
          img={Basket}
          width={"24px"}
          height={"24px"}
          bckgrnd={"white"}
        />
      ) : (
        <div className="trashBox" style={{ position: "relative" }}>
          <CircleButton
            img={Basket}
            width={"24px"}
            height={"24px"}
            bckgrnd={"white"}
          />
          <div
            className="counter"
            style={{
              width: "25px",
              height: "25px",
              position: "absolute",
              top: "30px",
              left: "25px",
              color: "white",
              backgroundColor: "red",
              borderRadius: "100%",
              textAlign: "center",
              fontSize: "16Spx",
            }}
          >
            {basket.basket.length}
          </div>
        </div>
      )}
    </>
  );
});

export default BasketButton;
