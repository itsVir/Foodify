import React from 'react';
import './Items.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



const ItemMenu = ({ items }) => {
  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/food/cart/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          Quantity: 1,
          Cart_Total: "0",
          Menu: items.MenuID
        })
      });

      if (!response.ok) {

        throw new Error('Failed to add item to cart');
      }
      // Handle success (e.g., show a success message)
      toast.success(items.foodname +  " added to cart successfully");
      console.log('Item added to cart successfully');
    } catch (error) {

       toast.error('Login First to add item in Cart');
          navigate('/login');
      console.error('Error adding item to cart:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="Item_card">
      <div className="Item_img">
        <img src={`https://res.cloudinary.com/drnj3k06u/${items.image}`} alt="Gujarati_Dish" />
      </div>
      <div className="Item_detail">
        <h2>{items.foodname}</h2>
        <p>{items.Description}</p>
        <p>{items.Price} RS</p>
        <button onClick={addToCart}>Add</button>
      </div>
    </div>
  );
}

export default ItemMenu;
