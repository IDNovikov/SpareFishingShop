import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";

const Selectedbar = observer(() => {
  const { product } = useContext(Context);

  return (
    <div>
      {product.selectedBrands ? (
        <div></div>
      ) : (
        <div>
          {product.selectedBrands.map((brand) => (
            <div
              slyle={{ cursor: "pointer" }}
              onClick={() => product.setSelectedBrands(null)}
              key={brand.id}
            >
              {" "}
              {brand.name}{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Selectedbar;
