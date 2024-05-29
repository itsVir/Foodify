import React, { useState, useEffect } from "react";
import axios from "axios";
import Orderform from "./Orderform";

const OrderDelivered = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/food/orderlist/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const deliveredOrders = response.data.filter(order => order.OrderStatus === 'Delivered');
      setOrders(deliveredOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order);
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  return (
    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer's Name</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td>{order.UserID}</td>
                <td>{order.CartID}</td>
                <td>{order.Total}</td>
                <td>{order.OrderStatus}</td>
                <td>
                  {editingOrder && editingOrder.OrderID === order.OrderID ? (
                    <>
                      <button onClick={handleCancelEdit}>Cancel</button>
                      <Orderform order={editingOrder} onCancel={handleCancelEdit} />
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(order)}>Edit</button>
                  )}
                </td>
                <td>{order.OrderPlaceDateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderDelivered;
