import React, { useState, useEffect } from 'react';

const Location = () => {
  const [showForm, setShowForm] = useState(false);
  const [updateMode, setUpdateMode] = useState(false); // New state variable to handle update mode
  const [newLocation, setNewLocation] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: ''
  });
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://127.0.0.1:8000/api/user/addresses/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }

        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddNewLocation = () => {
    setShowForm(true);
    setUpdateMode(false); // Set update mode to false when adding a new location
  };

  const handleUpdateLocation = (address) => {
    setShowForm(true);
    setUpdateMode(true); // Set update mode to true when updating a location
    setNewLocation(address); // Set the form fields with the existing address data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLocation(prevLocation => ({
      ...prevLocation,
      [name]: value
    }));
  };

  const handleAddLocation = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error('Access token not found');
      }

      let endpoint = 'http://127.0.0.1:8000/api/user/addresses/create/';
      let method = 'POST';

      if (updateMode) {
        endpoint = `http://127.0.0.1:8000/api/user/addresses/update/${newLocation.id}/`;
        method = 'PUT';
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newLocation)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${updateMode ? 'update' : 'add'} address`);
      }

      // Fetch the updated list of addresses
      const addressesResponse = await fetch('http://127.0.0.1:8000/api/user/addresses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!addressesResponse.ok) {
        throw new Error('Failed to fetch updated addresses');
      }

      const updatedData = await addressesResponse.json();
      setAddresses(updatedData);

      // Clear the form
      setNewLocation({
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: ''
      });
      // Hide the form
      setShowForm(false);
    } catch (error) {
      console.error(`Error ${updateMode ? 'updating' : 'adding'} address:`, error);
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`http://127.0.0.1:8000/api/user/addresses/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      // Remove the deleted address from the addresses state
      setAddresses(addresses.filter(address => address.id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const addAddressToProfile = async (address) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error('Access token not found');
      }

      const profileData = {
        address: address.address,
        country: address.country,
        state: address.state,
        city: address.city,
        pincode: address.pincode
      };

      const response = await fetch('http://127.0.0.1:8000/api/user/Profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Failed to add address to profile');
      }

      console.log('Address added to profile successfully');
    } catch (error) {
      console.error('Error adding address to profile:', error);
    }
  };

  return (
    <div className='loc'>
      <button onClick={handleAddNewLocation}>ADD NEW LOCATION</button>

      {showForm && (
        <div className='location p_box p_ab'>
          <label>Address</label>
          <textarea name="address" value={newLocation.address} onChange={handleChange}></textarea>

          <label>Country</label>
          <input type="text" name="country" value={newLocation.country} onChange={handleChange}></input>

          <label>State</label>
          <input type="text" name="state" value={newLocation.state} onChange={handleChange}></input>

          <label>City</label>
          <input type="text" name="city" value={newLocation.city} onChange={handleChange}></input>

          <label>Pincode</label>
          <input type="number" name="pincode" value={newLocation.pincode} onChange={handleChange}></input>

          <button onClick={handleAddLocation}>{updateMode ? 'Update' : 'Add'} Address</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <div className='location_list'>
        {addresses.map(address => (
          <div key={address.id} className='address'>
            <input type="radio" className='input-radio' name="Address" />
            <div className='location_list1'>
              <label><b>Address: </b>{address.address}</label><br />
              <label><b>Country: </b>{address.country}</label><br />
              <label><b>State: </b>{address.state}</label><br />
              <label><b>City: </b>{address.city}</label><br />
              <label><b>Pincode: </b>{address.pincode}</label><br />
            </div>

            <div className='location_change'>
              
              <button onClick={() => handleUpdateLocation(address)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button onClick={() => addAddressToProfile(address)}>
                <i className="fa-solid fa-user-plus"></i>              
              </button>
              <button onClick={() => handleDeleteLocation(address.id)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
