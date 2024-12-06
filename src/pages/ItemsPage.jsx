// pages/ItemsPage.jsx
import React from "react";
import ItemsList from "../components/Items/ItemsList";
import AddItem from "../components/Items/AddItem";
import UploadCSV from "../components/Items/UploadCSV";

const ItemsPage = () => (
  <div>
    <h1>Items Management</h1>
    <ItemsList />
    <AddItem />
    <UploadCSV />
  </div>
);

export default ItemsPage;
