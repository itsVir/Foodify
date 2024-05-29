// AdminMenuItem.js
import React, { useState, useEffect } from "react";
import FoodForm from "./FoodItemForm";
import "./AdminMenuItem.css";
import axios from "axios";

const AdminMenuItem = () => {
  const [showForm, setShowForm] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // State to hold the item being edited

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/food/menu/");
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingItem(null);
  };

  const addFoodItem = async (formData) => {
    console.log(formData)

    // Update addFoodItem to accept formData
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/food/menu/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      fetchFoodItems(); // Refresh food items after addition
      toggleForm();
console.log(response);
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/food/menu/delete/${id}/`);
      setFoodItems(foodItems.filter((item) => item.MenuID !== id)); // Update to filter by MenuID
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleEdit = (foodItem) => {
    setEditingItem(foodItem);
    setShowForm(true);
  };

  const updateFoodItem = async (formData) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/food/menu/update/${formData.get("MenuID")}/`,
        formData
      );
      fetchFoodItems();
      toggleForm();
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  const handleserch = async () => {
    try {
      const searchValue = document
        .querySelector(".search-bar input")
        .value.trim();
      if (!searchValue) {
        // If search input is empty, fetch all food items
        fetchFoodItems();
        return;
      }
      const response = await fetch(
        `http://127.0.0.1:8000/food/food/search/${searchValue}/`
      );
      if (!response.ok) {
        throw new Error("Failed to search food items");
      }
      const data = await response.json();
      if (data.foods.length === 0) {
        // If no food items found, display an alert message
        alert("No food items found. Please check the spelling or name again.");
      } else {
        // If food items found, update the state with the search results
        setFoodItems(data.foods);
      }
    } catch (error) {
      console.error("Error searching food items:", error);
    }
  };

  return (
    <div className="Admin_menu">
      <header className="header">
        <div className="search-bar">
          <input type="text" placeholder="Search Here" />
          <button onClick={handleserch}>Search</button>
        </div>
        <button className="food-button" onClick={toggleForm}>
          <i className="bx bx-plus"></i>{" "}
          {editingItem ? "Update Food" : "Add Food"}
        </button>
      </header>

      {showForm && (
        <FoodForm
          addFoodItem={addFoodItem}
          updateFoodItem={updateFoodItem}
          editingItem={editingItem}
          setShowForm={setShowForm}
          propcategory="any"
        />
      )}

      <div className="table_back">
        <table className="food-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {foodItems
              .filter((foodItem) => foodItem.CategoryName !== "Home") // Filter out items with CategoryName "Home"
              .map((foodItem, index) => (
                <tr key={foodItem.MenuID}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`https://res.cloudinary.com/drnj3k06u/${foodItem.image}`}
                      alt="Food"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{foodItem.foodname}</td>
                  <td>{foodItem.Description}</td>
                  <td>{foodItem.Price}</td>
                  <td>{foodItem.Discount}</td>
                  <td>{foodItem.CategoryName}</td>
                  <td>
                    <button onClick={() => handleEdit(foodItem)}>Edit</button>
                    <button onClick={() => handleDelete(foodItem.MenuID)}>
                      Delete
                    </button>
                  </td>
                  <td>{new Date(foodItem.CreatedAt).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMenuItem;