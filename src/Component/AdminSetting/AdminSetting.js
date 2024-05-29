import React, { useState, useEffect } from 'react';
import './AdminSetting.css';
import { useNavigate } from 'react-router-dom';


const AdminSetting = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch('http://127.0.0.1:8000/api/user/Profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logout=()=>{
    localStorage.removeItem("access_token");
    navigate('/login'); 
    window.location.reload();
}

  return (
    <div className='AdSetting_back'>
      <div className='Admin_box'>
        {userData ? (
          <div>

            <h2>Admin Profile</h2>

            <div className='admin_data'>
            <p><strong>Name:</strong> {userData.user.name}</p>
            <p><strong>Email:</strong> {userData.user.email}</p>
            <p><strong>Phone Number:</strong> {userData.user.phone_number}</p>
            <p><strong>Role:</strong> {userData.user.role}</p>
            </div>
            <center>
            <button onClick={logout}>Log Out</button>
            </center>

          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default AdminSetting;
