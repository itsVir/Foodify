import React, { useState, useEffect } from 'react';
import './Check.css'
import { useNavigate } from 'react-router-dom';

const Checkout = (props) => {
  const [userAddress, setUserAddress] = useState(null); // State to store user's address
  const [cartTotal, setCartTotal] = useState(0); // State to store total cart value
  const [gst, setGST] = useState(0); // State to store GST
  const [deliveryCharge, setDeliveryCharge] = useState(0); // State to store delivery charge
  const [showCheckout, setShowCheckout] = useState(true); // State to control checkout visibility
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch user's address from API or local storage
    const fetchUserAddress = async () => {
      try {
        // Example API call to fetch user's address
        const response = await fetch('http://127.0.0.1:8000/api/user/Profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user address');
        }
  
        const data = await response.json();
        setUserAddress(data.address); // Assuming the address is stored in 'address' field of the response
      } catch (error) {
        console.error('Error fetching user address:', error);
      }
    };
  
    fetchUserAddress();
  }, []);

  useEffect(() => {
    // Calculate total payment, GST, and delivery charge
    const calculateTotalPayment = () => {
      // Example calculation based on cart items
      const cartTotal = parseFloat(props.CartGst.Cart_Total); // Total value of items in the cart
      const gstRate = parseFloat(props.CartGst.GST_rate); // GST rate
      const shippingCharge = parseFloat(props.CartGst.ShippingCharge); // Shipping charge

      const gst = cartTotal * gstRate; // Calculate GST
      const deliveryCharge = shippingCharge; // Set delivery charge

      setCartTotal(cartTotal);
      setGST(gst);
      setDeliveryCharge(deliveryCharge);
    };

    calculateTotalPayment();
  }, [props.C_Total, props.CartGst]);

  // Calculate total amount to pay
  const totalAmountToPay = cartTotal + gst + deliveryCharge;

  const handleBackButtonClick = () => {
    setShowCheckout(false); // Hide checkout component
    window.location.reload();
  };

  // Handle button click based on user address
  const handleButtonClick = () => {
    if (userAddress && Object.keys(userAddress).length === 0) {
      navigate("/profile"); // Redirect to profile to add address if user address doesn't exist
    } else {
      navigate("/payment"); // Redirect to payment if user address exists
    }
  };
  
  return (
    <div className="checkout" style={{ display: showCheckout ? 'block' : 'none' }}>
      <div id='back' onClick={handleBackButtonClick}>
        <img src='./Img/back.png' alt='Back' id='back'></img>
        BACK
      </div>
      <h2>Checkout</h2>
      <div className="user-address">
        <h3>Delivery Address</h3>
        {userAddress && Object.keys(userAddress).length === 0 ? (
          <div>
            <p>No address available</p>
            <button onClick={() => navigate("/profile")}>Add Address</button>
          </div>
        ) : (
          <address>
            {userAddress && (
              <>
                {userAddress.address}<br />
                {userAddress.city}, {userAddress.state}<br />
                {userAddress.country} - {userAddress.pincode}
                <br />
                <br />
                <p>If You Want To Change Address Than Change From Profile</p>
                <button onClick={() => navigate("/profile")}>Change Address</button>
              </>
            )}
          </address>
        )}
      </div>

      <div className="payment-details">
        <h3>Payment Details</h3>
        <p>Subtotal: <b>{cartTotal.toFixed(2)} Rs</b></p>
        <p>GST: <b>{gst.toFixed(2)} Rs</b></p>
        <p>Delivery Charge: <b>{deliveryCharge.toFixed(2)} Rs</b></p>
        <p>Total Amount: <b>{totalAmountToPay.toFixed(2)} Rs</b></p>
      </div>
      <button onClick={handleButtonClick}>
        {userAddress && Object.keys(userAddress).length === 0 ? 'Add Address' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default Checkout;