import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneProduct } from "../../http/productAPI";
import { Context } from "../..";
import YellowButton from "../../components/UI/yellowButton/yellowButton";
import styles from "./ProductPage.module.css";
import ItemSlider from "../../components/UI/ItemSlider/ItemSlider";
import ArrowBack from "../../components/UI/ArrowBack";
import H1Medium from "../../components/UI/H1Medium";
import { formatText } from "../../hooks/formatText";
import H2Medium from "../../components/UI/H2regular";
import GreyButton from "../../components/UI/greyButton/GreyButton";
import redheart from "../../assets/redheart.png";
import Heart from "../../assets/heart.png";
import { observer } from "mobx-react-lite";

const ProductPage = observer(() => {
  const { basket } = useContext(Context);
  const { product } = useContext(Context);
  const { favorites } = useContext(Context);
  const [productData, setProductData] = useState({ info: [] });
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const add = () => {
    basket.addProduct(productData);
  };
  const addFavor = () => {
    favorites.addProduct(productData);
  };

  function removeCommas(str) {
    return str.replace(/^,+|,+$/g, "").trim();
  }

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
  useEffect(() => {
    fetchOneProduct(id).then((data) => {
      setProductData(data);
      let string = data.img;
      let str = string.replace(/[\"\[\]\\\\s]/g, "");
      let array = str.split(",");
      setImages(array);
    });
  }, []);
  const getBrandName = (brands, brandId) => {
    if (!brands || brands.length === 0 || !brandId) {
      return ""; // Возвращаем пустую строку, если данные не загружены
    }

    const brand = brands.find((elem) => elem.id === brandId);
    return brand ? removeCommas(brand.name) : "";
  };

  const getColorName = (colors, colorId) => {
    if (!colors || colors.length === 0 || !colorId) {
      return ""; // Возвращаем пустую строку, если данные не загружены
    }

    const color = colors.find((elem) => elem.id === colorId);
    return color ? removeCommas(color.name) : "";
  };

  const getSizeName = (sizes, sizeId) => {
    if (!sizes || sizes.length === 0 || !sizeId) {
      return ""; // Возвращаем пустую строку, если данные не загружены
    }

    const size = sizes.find((elem) => elem.id === sizeId);
    return size ? removeCommas(size.name) : "";
  };
  return (
    <div className={styles.main}>
      <div className={styles.slider}>
        {images[0] != "" ? (
          <>
            <ItemSlider images={images} />
            <div className={styles.arrow} style={{ position: "absolute" }}>
              <ArrowBack
                width={"30px"}
                height={"30px"}
                func={() => navigate(-1)}
              />
            </div>
          </>
        ) : (
          <div className={styles.arrow} style={{ position: "block" }}>
            <ArrowBack
              width={"30px"}
              height={"30px"}
              func={() => navigate(-1)}
            />
          </div>
        )}
      </div>
      <div className={styles.about}>
        <H1Medium
          align={"left"}
          text={`${formatText(productData.name)}`}
          size={"24px"}
          color={"#2D2D2D"}
        />

        <H2Medium
          align="left"
          size="16px"
          text={`Brand: ${getBrandName(product.brands, productData.brandId)}`}
        />
        <H2Medium
          align="left"
          size="16px"
          text={`Color: ${getColorName(product.colors, productData.colorId)}`}
        />
        <H2Medium
          align="left"
          size="16px"
          text={`Size: ${getSizeName(product.sizes, productData.sizeId)}`}
        />
        <h3>€ {productData.price}.00</h3>

        <div onClick={add}>
          <YellowButton
            width={"100%"}
            height={"42px"}
            fontSize={"20px"}
            fontColor={"Black"}
            text={" Add to card"}
          />
        </div>
        <div>
          {!isFavorites(productData.id) ? (
            <div onClick={addFavor}>
              <GreyButton
                img={Heart}
                width={"100%"}
                height={"42px"}
                text={"Favorite"}
                fontSize={"20px"}
                fontColor={"Black"}
              />
            </div>
          ) : (
            <div onClick={() => handleDelete(productData.id)}>
              <GreyButton
                img={redheart}
                width={"100%"}
                height={"42px"}
                text={"Favorite"}
                fontSize={"20px"}
                fontColor={"Black"}
              />
            </div>
          )}
        </div>

        <div>
          <H1Medium
            align={"left"}
            text={"About"}
            size={"28px"}
            color={"#2D2D2D"}
          />
          {productData.info.map((inf) => (
            <div key={inf.id}>
              <H2Medium
                align={"left"}
                text={inf.tittle}
                size={"20px"}
                color={"black"}
              />
              <H2Medium
                align={"left"}
                text={inf.discription}
                size={"20px"}
                color={"black"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ProductPage;
