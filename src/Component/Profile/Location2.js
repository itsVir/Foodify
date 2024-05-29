import React, { useState } from 'react';

const Location2 = () => {
  const [formData, setFormData] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: ''
  });

  const [showAddressForm, setShowAddressForm] = useState(false); // Define showAddressForm state variable

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/addresses/create/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add address');
      }
      // Optionally, you can reset the form after successful submission
      setFormData({
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: ''
      });
      // You can add further handling here, such as showing a success message
      alert('Address added successfully!');
      window.location.reload(); 

    } catch (error) {
      console.error('Error adding address:', error);
    }
  };
  

  return (
    <>
      <button onClick={() => setShowAddressForm(true)}>
        Add Address
      </button>

      {showAddressForm && (
        <div className='location p_box a_box'>
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange}></textarea>

          <label>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange}></input>

          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange}></input>

          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange}></input>

          <label>Pincode</label>
          <input type="number" name="pincode" value={formData.pincode} onChange={handleChange}></input>

          <button onClick={handleSubmit}>Add</button>
        </div>
      )}
    </>
  );
};

export default Location2;