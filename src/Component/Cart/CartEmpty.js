import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const CartEmpty = () => {
  return (
    <>
      <div className='cart_back'>
        
        <div className='carte'>
          <img src='./Img/empty.png' alt='cart_empty' />
          <div className='cart_det'>
            <h1>Your food cart is empty</h1>
            <h3>You can go to Food to view your favorite food</h3>
            <Link to="/food2">
              <button>See Our Food Items</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartEmpty;