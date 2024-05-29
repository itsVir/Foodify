import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import './Menu2.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Menu2 = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuData();
    // Simulating fetching access token, replace with actual logic
    const fakeAccessToken = localStorage.getItem('access_token');
    setAccessToken(fakeAccessToken);
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/food/menu/');
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await response.json();
      setMenuData(data.filter(menu => menu.CategoryName === 'Home'));
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const addToCart = async () => {
    if (selectedMenu !== null) {
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
            Menu: menuData[selectedMenu].MenuID
          })
        });

        if (!response.ok) {
          toast.error('Login First to add item in Cart');
          navigate('/login');

          throw new Error('Failed to add item to cart');
        }
        // Handle success (e.g., show a success message)
        toast.success(menuData[selectedMenu].foodname + " added to cart");

        console.log('Item added to cart successfully');
        closeMenuDetails();

      } catch (error) {
        console.error('Error adding item to cart:', error);
        // Handle error (e.g., show an error message)
      }
    }
  };
  
  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const closeMenuDetails = () => {
    setSelectedMenu(null);
  };

  return (
    <>
      <div className="menu-container">
        {menuData.map((menu, index) => (
          <MenuItem
            key={index}
            menu={menu}
            onClick={() => handleMenuClick(index)}
            selected={selectedMenu === index}
          />
        ))}
      </div>

      {selectedMenu !== null && (
        <div className="menu-details-container">
          <div className="menu-details">
            <img src={`https://res.cloudinary.com/drnj3k06u/${menuData[selectedMenu].image}`} alt="menu-img" />
            <div>
              <h1>{menuData[selectedMenu].foodname}</h1>
              <p>{`${Number.isNaN(parseFloat(menuData[selectedMenu].Discount)) ? menuData[selectedMenu].Discount : parseFloat(menuData[selectedMenu].Discount).toFixed(0)}% Off`}</p>
              <p>{menuData[selectedMenu].Description}</p>
              <p>{`${menuData[selectedMenu].Price} Rs`}</p>

              <button onClick={addToCart}>ADD</button>
              <br></br>
              <br></br>
              <button onClick={closeMenuDetails}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu2;