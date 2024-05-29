import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';

const Past = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await axios.get('http://127.0.0.1:8000/food/orders/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Filter orders with "Delivered" status
        const filteredOrders = response.data.filter(order => order.OrderStatus === "Delivered");
        setDeliveredOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching delivered orders:', error);
      }
    };

    fetchDeliveredOrders();
  }, []);

  return (
    <div>
      <div className="orderitem_container">
        <div className="orderitem_box Order_Header">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Food Names</th>
                <th>Total Price</th>
                <th>Time</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
          </table>
        </div>

        {deliveredOrders.map(order => (
          <div key={order.OrderID} className="orderitem_box">
            <table>
              <tbody>
                <tr>
                  <td>{order.OrderID}</td>
                  <td>Food Name 1, Food Name 2, ...</td>
                  <td>{order.Total} Rs</td>
                  <td>{order.OrderPlaceDateTime}</td>
                  <td><button>View</button></td>
                  <td>{order.OrderStatus}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Past;
