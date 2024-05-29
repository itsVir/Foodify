import React, { useState } from 'react';
import './Payment.css';

const PaymentOps = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className='payment_back'>
      <div className='payment_container' onClick={() => handlePaymentMethodChange('cod')}>
        <input 
          type='radio' 
          id='payment_method_cod'
          name='payment_method'
          className='payment_method'
          defaultChecked
          checked={selectedPaymentMethod === 'cod'} 
          onChange={() => handlePaymentMethodChange('cod')}
        />
        <label htmlFor='payment_method_cod' >
          Cash On Delivery
        </label>
        <img src="/Payment/Cod.png" alt="Cash on Delivery" />
      </div>
      <div className='payment_container' onClick={() => handlePaymentMethodChange('stripe')}>
        <input 
          type='radio' 
          id='payment_method_stripe'
          name='payment_method'
          className='payment_method'
          checked={selectedPaymentMethod === 'stripe'} 
          onChange={() => handlePaymentMethodChange('stripe')}
        />
        <label htmlFor='payment_method_stripe' >
          Online Stripe
        </label>
        <img src="/Payment/Stripe.png" alt="Stripe" />
      </div>
    </div>
  );
};

export default PaymentOps;