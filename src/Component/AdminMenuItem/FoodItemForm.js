// FoodForm.js
import React, { useState, useEffect } from "react";
import "./FoodItemForm.css";

const FoodItemForm = ({
  addFoodItem,
  updateFoodItem,
  editingItem,
  setShowForm,
  propcategory,
}) => {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Change to null for proper handling of file upload
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  // const [category, setCategory] = useState(propcategory);
  const [category, setCategory] = useState(propcategory === "Home" ? "Home" : "");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editingItem) {
      setFoodName(editingItem.foodname);
      setDescription(editingItem.Description);
      setPrice(editingItem.Price);
      setDiscount(editingItem.Discount);
      setCategory(editingItem.CategoryName);
      setImage(editingItem.image);
      // No need to set image as it's a file input
    }
  }, [editingItem]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("foodname", foodName);
    formData.append("Description", description);
    formData.append("Price", price); // Ensure the price is properly appended
    formData.append("Discount", discount);
    formData.append("CategoryName", category);
    formData.append("image", image);

    if (editingItem) {
      formData.append("MenuID", editingItem.MenuID);
      updateFoodItem(formData);
    } else {
      addFoodItem(formData);
    }
    setFoodName("");
    setDescription("");
    setImage(null);
    setPrice("");
    setDiscount("");
    setCategory("");
    setImagePreview(null);
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
            style={{ width: 100, height: 100 }}
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

        {propcategory !== "Home" && (
          <>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Chinese">Chinese</option>
              <option value="Rajeshthani">Rajeshthani</option>
              <option value="South Indian">South Indian</option>
              <option value="Drinks">Drinks</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Cacks">Cacks</option>
              <option value="Mexican">Mexican</option>
            </select>
          </>
        )}

        <button type="submit">{editingItem ? "Save" : "Add"}</button>
      </form>
    </div>
  );
};

export default FoodItemForm;
