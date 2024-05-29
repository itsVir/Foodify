import React, { useState } from 'react';
import './Payment.css';
import Cod from './Cod';

const PaymentOps = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleBackToPayment = () => {
    setSelectedPaymentMethod('');
  };

  return (
    <div>
      {selectedPaymentMethod === '' ? (
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
            <img src="/Img/Cod.png" alt="Cash on Delivery" />
          </div>
        </div>
      ) : (
        <Cod onBack={handleBackToPayment} />
      )}
    </div>
  );
};

export default PaymentOps;
