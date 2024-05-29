import React, { useState } from 'react';
import './Payment.css';
import './Cod.css'

const Cod = () => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleConfirmOrder = () => {
    // Set state to trigger the animation
    setIsOrderConfirmed(true);

    // Simulate sending order confirmation to backend or other actions
    setTimeout(() => {
      // Reset state after some delay to allow the animation to finish
      setIsOrderConfirmed(false);
    }, 1500); // Adjust the delay as needed based on your animation duration
  };

  return (
    <>
      <div className='Cod_Back'>
        <div className='Cod_Container'>
          <h2>Cash On Delivery</h2>
          {/* Add your content for Cash On Delivery here */}
          <button onClick={handleConfirmOrder}>Confirm Order</button>
          {isOrderConfirmed && (
            <div className="confirmation-animation">
              {/* Animation content */}
              <span className="checkmark">&#10003;</span>
              <p>Order Confirmed!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cod;