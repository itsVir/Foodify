import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './AdminNav.css';

const AdminNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen1, setMenuOpen1] = useState(false);
  const [isMenuOpen2, setMenuOpen2] = useState(false);
  const navigate = useNavigate(); 
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
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
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileName(data.user.name);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const onsidebarclick=()=>{
    setMenuOpen(!isMenuOpen);
  }
  const onsidebarclick1=()=>{
    setMenuOpen1(!isMenuOpen1);
  }
  const onsidebarclick2=()=>{
    setMenuOpen2(!isMenuOpen2);
  }
  const onlogout=()=>{
       localStorage.removeItem("access_token");
       navigate('/login'); 
       window.location.reload();
  }
  return (
    <>
     <div className={`sidebar ${isMenuOpen ? 'showMenu' : 'close'}`}>
      <div className="logo-details">
        <i className="bx bx-laptop"></i>
        <span className="logo_name">Admin</span>
      </div>
      <div className='Navlinks'>
      <ul className="nav-links">

        <li>
          <Link to="/dashboard">
            <i className="bx bxs-dashboard"></i>
            <span className="link_name">Dashbord</span>
          </Link>
          <ul className="sub-menu blank">
            <li><Link className="link_name" to="/dashboard">Home</Link></li>
          </ul>
        </li>

        <li className={`${isMenuOpen1 ? 'showMenu' : ''}`}>
          <div className="icon-link">
            <a href="#">
              <i className="bx bxs-food-menu"></i>
              <span className="link_name" id='ti'>Menu</span>
            </a>
            <i className="bx bxs-chevron-down arrow" onClick={onsidebarclick1}></i>
          </div>

          <ul className="sub-menu">
            <li><a className="link_name" id='ti'>Menu</a></li>
            <li><a href="/adminmenu">Home Menu</a></li>
            <li><a href="/adminmenuitem">Food Items</a></li>
          </ul>
        </li>

        <li>
          <a href="/adminorder">
          <i class='bx bxs-cart-add'></i>            
          <span className="link_name">Order</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="/adminorder">Order</a></li>
          </ul>
        </li>

        <li>
          <a href="/adminpayment">
            <i className="bx bxs-credit-card"></i>
            <span className="link_name">Payment</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="/adminpayment">Payment</a></li>
          </ul>
        </li>

        <li>
          <a href="/adminuser">
          <i class='bx bxs-user-detail'></i>
          <span className="link_name">Users</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="/adminuser">Users</a></li>
          </ul>
        </li>

        <li>
          <a href="/adminreview">
            <i className="bx bx-bar-chart"></i>
            <span className="link_name">Reviews</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="/adminreview">Reviews</a></li>
          </ul>
        </li>
        
        <li>
          <a href="/adminsetting">
            <i className="bx bx-cog"></i>
            <span className="link_name">Setting</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="/adminsetting">Setting</a></li>
          </ul>
        </li>

        <li>
          <div className="profile-details">
            <div className="profile-content">
              <box-icon name="male"></box-icon>
            </div>
            <div className="name-job">
            <div className="profile_name">{profileName}</div>
            </div>
            <i className="bx bx-log-out" onClick={onlogout}></i>
          </div>
        </li>

      </ul>
      </div>
    </div>
    <section className="home-section">
      <div className="home-content">
        <i className="bx bx-menu" onClick={onsidebarclick}></i>
        <span className="text">Foodify</span>
      </div>
    </section>
    </>
  );
}

export default AdminNav;