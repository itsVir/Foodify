import React, { useState, useEffect } from 'react';
import './Profile.css';
import Location from './Location'
import Location2 from './Location2';

const Profile = () => {
  const [userData, setUserData] = useState({
    user: {
      name: '',
      email: '',
      phone_number: ''
    },
    address: {
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: ''
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch('http://127.0.0.1:8000/api/user/Profile/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const data = await response.json();
        setUserData(data);
        setFormData({
          address: data.address.address,
          country: data.address.country,
          state: data.address.state,
          city: data.address.city,
          pincode: data.address.pincode
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch('http://127.0.0.1:8000/api/user/Profile/', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      setEditMode(false);
      setUserData(prevUserData => ({
        ...prevUserData,
        address: formData // Update only the address data in user data
      }));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
<div className='profile_back'>
  <div className='profile'>
    <h1>Hello, {userData.user.name}</h1>
    <div className='p_box'>
      <label>Email</label>
      <input type='email' value={userData.user.email} readOnly={!editMode} name="email"></input>

      <label>Phone</label>
      <input type='tel' value={userData.user.phone_number} readOnly={!editMode} name="phone_number"></input>

      {formData.address && ( // Conditionally render the address form if address data exists
      <div className='location p_box'>
        <label>Address</label>
        <textarea name="address" value={formData.address} readOnly={!editMode} onChange={handleChange}></textarea>

        <label>Country</label>
        <input type="text" name="country" value={formData.country} readOnly={!editMode} onChange={handleChange}></input>

        <label>State</label>
        <input type="text" name="state" value={formData.state} readOnly={!editMode} onChange={handleChange}></input>

        <label>City</label>
        <input type="text" name="city" value={formData.city} readOnly={!editMode} onChange={handleChange}></input>

        <label>Pincode</label>
        <input type="number" name="pincode" value={formData.pincode} readOnly={!editMode} onChange={handleChange}></input>

        {!editMode ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
      </div>
      )}

      {!formData.address && ( // Conditionally render the "Add Address" button if address data is empty or null
    <Location2 />
  )}
    </div>
    <Location />

  </div>
</div>

  );
};

export default Profile;
