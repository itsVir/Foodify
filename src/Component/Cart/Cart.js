import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartEmpty from "./CartEmpty";
// import Checkout from "./Checkout";
import CartTotal from "./CartTotal"; // Import the CartTotal component

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [cartTotal, setCartTotal] = useState(0); // State to store total cart value
  const [showCheckout, setShowCheckout] = useState(false); // State to control checkout visibility

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const fetchCartData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/food/carts/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const cartData = await response.json();

      // Fetch data for each item in the cart
      const promises = cartData.map(async (item) => {
        const menuResponse = await fetch(
          `http://127.0.0.1:8000/food/menu/${item.Menu}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!menuResponse.ok) {
          throw new Error(`Failed to fetch menu data for MenuID: ${item.Menu}`);
        }
        const menuData = await menuResponse.json();
        return {
          ...item,
          menuData: menuData,
        };
      });

      // Resolve all promises and set the state with updated cart items
      const updatedCartItems = await Promise.all(promises);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, curr) => acc + curr.Quantity * curr.menuData.Price,
      0
    );
    setCartTotal(total.toFixed(2));
  };

  const deleteCartItem = async (cartID) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/food/cart/delete/${cartID}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete cart item with CartID: ${cartID}`);
      }
      // Refresh cart data after successful deletion
      fetchCartData();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].Quantity += 1;
    setCartItems(updatedCartItems);
    updateCartItem(updatedCartItems[index].CartID, updatedCartItems[index].Quantity);
    calculateTotal();
  };

  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].Quantity > 1) {
      updatedCartItems[index].Quantity -= 1;
      setCartItems(updatedCartItems);
      updateCartItem(updatedCartItems[index].CartID, updatedCartItems[index].Quantity);
      calculateTotal();
    }
  };

  const updateCartItem = async (cartID, quantity) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/food/cart/update/${cartID}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            CartID: cartID,
            Quantity: quantity,
            Cart_Total: (quantity * cartItems.find(item => item.CartID === cartID).menuData.Price).toFixed(2),
            Menu: cartItems.find(item => item.CartID === cartID).Menu
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update cart item with CartID: ${cartID}`);
      }
      // Refresh cart data after successful update
      fetchCartData();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  return (
    <div className="cart_back">
      {cartTotal < 1 && <CartEmpty />}
      <div className="cart">
        {cartTotal > 0 && <h1>Your Cart Items</h1>}
        {cartItems.map((item, index) => (
          <div className="cart_item" key={index}>
            <div className="cart_box">
              <img
                src={`https://res.cloudinary.com/drnj3k06u/${item.menuData.image}`}
                className="img-fluid rounded-top"
                alt=""
              />
              <div className="cart_det">
                <h2>{item.menuData.foodname}</h2>
                <p>{item.menuData.Description}</p>
                <p>{item.menuData.Price} Rs</p>
              </div>
              <div className="cart_exp">
                <div className="cart_exp2">
                  <button onClick={() => handleIncrement(index)}>+</button>
                  <input
                    type="number"
                    value={item.Quantity}
                    id="qn"
                    readOnly
                  />
                  <button onClick={() => handleDecrement(index)}>-</button>
                </div>
                <div className="cart_btn">
                  <p>{item.menuData.Price * item.Quantity} Rs</p>
                  <button onClick={() => deleteCartItem(item.CartID)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartTotal > 0 && <CartTotal cartItems={cartItems} cartTotal={cartTotal} showCheckout={showCheckout} handleCheckoutClick={handleCheckoutClick} />}
    </div>
  );
};

export default Cart;