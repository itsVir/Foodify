import React, { useState, useEffect } from "react";
import "./FoodForm.css";
// import axios from "axios";

const FoodForm = ({ addFoodItem, updateFoodItem, editingItem, setShowForm }) => {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  // const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (editingItem) {
      setFoodName(editingItem.foodname);
      setDescription(editingItem.Description);
      setImage(editingItem.image);
      setPrice(editingItem.Price);
      setDiscount(editingItem.Discount);
      setQuantity(editingItem.quantity);
      setImagePreview(editingItem.image);
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const foodItemData = {
        foodname: foodName,
        Description: description,
        Price: price,
        CategoryName: "Home",
        Discount: discount,
        image: image
      };

      if (editingItem) {
        // Update existing food item
        await updateFoodItem({
          ...editingItem,
          ...foodItemData
        });
      } else {
        // Add new food item
        await addFoodItem(foodItemData);
      }

      // Reset form fields
      setFoodName("");
      setDescription("");
      setImage("");
      setPrice("");
      setDiscount("");
      setQuantity("");
      setImagePreview(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="Form_align">
      <form className="food-form" onSubmit={handleSubmit}>
        <i className="bx bx-x" onClick={closeForm}></i>
        <label>Food Image</label>
        <input type="file" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Food Preview"
            style={{ width: 200, height: 200 }}
          />
        )}

        <label>Food Name</label>
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <label>Description</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Discount</label>
        <input
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <button type="submit">{editingItem ? "Save" : "Add"}</button>
      </form>
    </div>
  );
};

export default FoodForm;