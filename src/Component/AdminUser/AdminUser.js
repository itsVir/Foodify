import React, { useState, useEffect } from 'react';
import './AdminUser.css';
import axios from 'axios';
import UserDetailsCard from './UserDetailsCard'; // Import the UserDetailsCard component

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [foodOrders, setFoodOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://127.0.0.1:8000/api/user/get-all-user/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchFoodOrders = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await axios.get('http://127.0.0.1:8000/food/orderlist/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        setFoodOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food orders:', error);
      }
    };

    fetchUsers();
    fetchFoodOrders();
  }, []);

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
  };

  const handleGoBackToList = () => {
    setSelectedUser(null);
  };

  return (
    <div className='aduser_back'>
      <h2>User Details</h2>
      {!selectedUser ? (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>
                  <button onClick={() => handleViewUserDetails(user)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <UserDetailsCard user={selectedUser} foodOrders={foodOrders} onGoBack={handleGoBackToList} loading={loading} />
      )}
    </div>
  );
};

export default AdminUser;
