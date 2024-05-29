import React, { useState } from "react";
import Checkout from "./Chackout";
import axios from "axios";

const CartTotal = ({ cartItems }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [C_Total, setC_Total] = useState({});
  const [CartGst, setCartGst] = useState({})

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.menuData.Price * item.Quantity;
  }, 0);

  const handleCheckoutClick = async () => {
    try {
      // Fetch menu items and quantities
      const cartData = await axios.get("http://127.0.0.1:8000/food/carts/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const menuIds = cartData.data.map((item) => item.Menu);
      const quantities = cartData.data.map((item) => item.Quantity);

      // Post menu items and quantities
      const postData = {
        menu_ids: menuIds,
        quantities: quantities,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/food/cart/items/",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("Cart items posted:", response.data);
      setC_Total(response.data);

      // Create order
      const orderResponse = await axios.post(
        "http://127.0.0.1:8000/food/create_order/",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("Order created:", orderResponse.data);
      setCartGst(orderResponse.data)

      // Show Checkout component
      setShowCheckout(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="cart_total">
      <h2>Cart Total</h2>
      <div>
        {cartItems.map((item, index) => (
          <div key={index}>
            <p>
              {item.menuData.foodname}{" "}
              <b>
                {item.menuData.Price} * {item.Quantity} ={" "}
                {item.menuData.Price * item.Quantity} Rs
              </b>
            </p>
          </div>
        ))}
      </div>
      <p>
        Total <b>{cartTotal.toFixed(2)} Rs</b>
      </p>
      {!showCheckout && (
        <button onClick={handleCheckoutClick}>Checkout</button>
      )}
      {showCheckout && <Checkout cartTotal={cartTotal} C_Total={C_Total} CartGst={CartGst}  />}
    </div>
  );
};

export default CartTotal;