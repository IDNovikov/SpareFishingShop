import React, { useContext, useEffect, useRef, useState } from "react";

import { Context } from "../..";
import {
  fetchTypes,
  fetchBrands,
  fetchColors,
  fetchSizes,
  fetchProducts,
  createProduct,
  deleteProduct,
} from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import Productlist from "../ProductList/Productlist";
import GreyButton from "../UI/greyButton/GreyButton";
import styles from "./Modal.module.css";
import back from "../../assets/Back.svg";
import H1Medium from "../UI/H1Medium";
import Pages from "../Pagination/Pages";
import lupa from "../../assets/blacklupa.svg";

const CreateProduct = observer(() => {
  const { product } = useContext(Context);
  const [isModalOpen, setModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();
  const [file5, setFile5] = useState();
  const [info, setInfo] = useState([]);
  const [del, setDel] = useState(true);
  const [type, setType] = useState();
  const [brand, setBrand] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [typeName, setTypeName] = useState();
  const [brandName, setBrandName] = useState();
  const [sizeName, setSizeName] = useState();
  const [colorName, setColorName] = useState();
  const [searchValue, setSearchValue] = useState("");
  // const menuRef = useRef(null);
  const handleSearch = (value) => {
    if (value) {
      product.setSelectedSearch(value);
    } else if (!value) {
      value = null;
      product.setSelectedSearch(value);
    }
  };
  const addInfo = () => {
    setInfo([...info, { tittle: " ", discription: " ", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brandId", brand);
    formData.append("typeId", type);
    formData.append("sizeId", size);
    formData.append("colorId", color);
    formData.append("img1", file1);
    formData.append("img2", file2);
    formData.append("img3", file3);
    formData.append("img4", file4);
    formData.append("img5", file5);
    formData.append("info", JSON.stringify(info));
    createProduct(formData).then((data) => setName(""), setPrice(""));
  };
  const prodDelete = (id) => {
    deleteProduct(id).then((data) => setDel(!del));
  };
  const selectFile1 = (e) => {
    setFile1(e.target.files[0]);
  };
  const selectFile2 = (e) => {
    setFile2(e.target.files[0]);
  };
  const selectFile3 = (e) => {
    setFile3(e.target.files[0]);
  };
  const selectFile4 = (e) => {
    setFile4(e.target.files[0]);
  };
  const selectFile5 = (e) => {
    setFile5(e.target.files[0]);
  };

  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        document.body.classList.add(styles.noScroll);
      }, 500);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    fetchProducts(
      product.selectedBrands,
      product.selectedTypes,
      product.selectedColors,
      product.selectedSizes,
      product.selectedPrices,
      product.selectedSearch,
      product.page,
      5
    ).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [
    product.page,
    product.selectedTypes,
    product.selectedColors,
    product.selectedSizes,
    product.selectedBrands,
    product.selectedPrices,
    product.selectedSearch,
    del,
    name,
    isModalOpen,
  ]);

  return (
    <>
      <div onClick={() => setModalOpen(!isModalOpen)}>
        <GreyButton
          width={"100%"}
          height={"42px"}
          text={"Manage products"}
          fontSize={"20px"}
          fontColor={"White"}
          bckColor={"#0d6efd"}
        />
      </div>

      <div className={`${isModalOpen ? styles.mobileWindow : styles.none}`}>
        <div className={styles.bckgrnd}>
          <div className={styles.modalWrapper}>
            <div className={styles.modalHeader}>
              <button onClick={() => setModalOpen(!isModalOpen)}>
                <img className={styles.back} src={back} />
              </button>
              <div className={styles.modalTittle}>Delete and add products</div>
            </div>
            <div className={styles.modal}>
              <div className={styles.menuSearchActive}>
                <input
                  type="search"
                  placeholder="Search"
                  className={styles.searchProd}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  className={styles.searchBtn}
                  onClick={() => handleSearch(searchValue)}
                >
                  <img className={styles.btnLupa} src={lupa} />
                </button>
              </div>
              <Productlist prodDelete={prodDelete} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "120px",
                }}
              >
                <Pages />
              </div>
              <div
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "40px",
                }}
                onClick={() => toggleDropdown("brand")}
              >
                <GreyButton
                  text={brandName || "Choose brand↓"}
                  width={"200px"}
                  height={"42px"}
                  fontSize={"20px"}
                  fontColor={"black"}
                  bckColor={"white"}
                />
                <div
                  className={`${
                    openDropdown === "brand" ? styles.dropMenu : styles.none
                  }`}
                >
                  {product.brands.map((brand) => (
                    <div
                      className={styles.dropItem}
                      onClick={() => (
                        setOpenDropdown(null),
                        setBrand(brand.id),
                        setBrandName(brand.name)
                      )}
                      key={brand.id}
                    >
                      {brand.name}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "40px",
                }}
                onClick={() => toggleDropdown("type")}
              >
                <GreyButton
                  text={typeName || "Choose type↓"}
                  width={"200px"}
                  height={"42px"}
                  fontSize={"20px"}
                  fontColor={"black"}
                  bckColor={"white"}
                />
                <div
                  className={`${
                    openDropdown === "type" ? styles.dropMenu : styles.none
                  }`}
                >
                  {product.types.map((type) => (
                    <div
                      className={styles.dropItem}
                      onClick={() => (
                        setOpenDropdown(null),
                        setType(type.id),
                        setTypeName(type.name)
                      )}
                      key={type.id}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "40px",
                }}
                onClick={() => toggleDropdown("size")}
              >
                <GreyButton
                  text={sizeName || "Choose size↓"}
                  width={"200px"}
                  height={"42px"}
                  fontSize={"20px"}
                  fontColor={"black"}
                  bckColor={"white"}
                />
                <div
                  className={`${
                    openDropdown === "size" ? styles.dropMenu : styles.none
                  }`}
                >
                  {product.sizes.map((size) => (
                    <div
                      className={styles.dropItem}
                      onClick={() => (
                        setOpenDropdown(null),
                        setSize(size.id),
                        setSizeName(size.name)
                      )}
                      key={size.id}
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "40px",
                }}
                onClick={() => toggleDropdown("color")}
              >
                <GreyButton
                  text={colorName || "Choose color↓"}
                  width={"200px"}
                  height={"42px"}
                  fontSize={"20px"}
                  fontColor={"black"}
                  bckColor={"white"}
                />
                <div
                  className={`${
                    openDropdown === "color" ? styles.dropMenu : styles.none
                  }`}
                >
                  {product.colors.map((color) => (
                    <div
                      className={styles.dropItem}
                      onClick={() => (
                        setOpenDropdown(null),
                        setColor(color.id),
                        setColorName(color.name)
                      )}
                      key={color.id}
                    >
                      {color.name}
                    </div>
                  ))}
                </div>
              </div>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  className={styles.search}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Write name of product"
                />
                <input
                  className={styles.search}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Write price of product"
                  type="number"
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <H1Medium text={"Add image 1"} />
                  <input
                    className={styles.custi}
                    onChange={selectFile1}
                    placeholder="Add image 1"
                    type="file"
                  />
                  <H1Medium text={"Add image 2"} />
                  <input
                    className={styles.custi}
                    onChange={selectFile2}
                    placeholder="Add image 2"
                    type="file"
                  />
                  <H1Medium text={"Add image 3"} />
                  <input
                    className={styles.custi}
                    onChange={selectFile3}
                    placeholder="Add image 3"
                    type="file"
                  />
                  <H1Medium text={"Add image 4"} />
                  <input
                    className={styles.custi}
                    onChange={selectFile4}
                    placeholder="Add image 4"
                    type="file"
                  />
                  <H1Medium text={"Add image 5"} />
                  <input
                    className={styles.custi}
                    onChange={selectFile5}
                    placeholder="Add image 5"
                    type="file"
                  />
                </div>
                <hr />
              </form>
              <div
                onClick={addInfo}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <GreyButton
                  width={"200px"}
                  height={"42px"}
                  fontSize={"20px"}
                  text={"Add new info"}
                  bckColor={"#c6c6c6"}
                />
              </div>
              {info.map((i) => (
                <div
                  key={i.number}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div>
                    <textarea
                      className={styles.textForm}
                      value={i.tittle}
                      onChange={(e) =>
                        changeInfo("tittle", e.target.value, i.number)
                      }
                      placeholder="Write new title"
                    />

                    <textarea
                      className={styles.textForm}
                      value={i.discription}
                      onChange={(e) =>
                        changeInfo("discription", e.target.value, i.number)
                      }
                      placeholder="Write new info"
                    />

                    <div
                      onClick={() => removeInfo(i.number)}
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <GreyButton
                        width={"200px"}
                        height={"42px"}
                        fontSize={"20px"}
                        text={" Delete"}
                        bckColor={"#ff5454"}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  margin: "60px 0",
                }}
              >
                <div onClick={() => setModalOpen(!isModalOpen)}>
                  <GreyButton
                    width={"200px"}
                    height={"42px"}
                    fontSize={"20px"}
                    text={"Close"}
                    bckColor={"#c6c6c6"}
                  />
                </div>
                <div onClick={addProduct}>
                  <GreyButton
                    width={"200px"}
                    height={"42px"}
                    fontSize={"20px"}
                    text={"Add"}
                    bckColor={"#fff500"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default CreateProduct;
