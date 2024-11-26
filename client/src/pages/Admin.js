import React from "react";
import CreateBrand from "../components/modals/createBrand";
import CreateType from "../components/modals/createType";
import CreateSize from "../components/modals/createSize";
import CreateColor from "../components/modals/createColor";
import CreatePost from "../components/modals/createPost";
import CreateProduct from "../components/modals/createProduct";
import ManageCerti from "../components/modals/manageCerti";
import ManageBasket from "../components/modals/manageBasket";

const Admin = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
      <CreateType />
      <CreateBrand />
      <CreateSize />
      <CreateColor />
      <CreatePost />
      <CreateProduct />
      <ManageCerti />
      <ManageBasket />
    </div>
  );
};

export default Admin;
