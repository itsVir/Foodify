import React, { useState } from "react";
import "./AdminOrder.css";

const AdminOrder = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("new"); // "new" or "edit"
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderId, setOrderId] = useState(1); // Initial order ID
  const [orders, setOrders] = useState([]);

  const toggleForm = (type, order) => {
    setShowForm(!showForm);
    setFormType(type);
    setSelectedOrder(order);
  };

  const handleSaveOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const order = {
      id: formType === "new" ? orderId : selectedOrder.id,
      customerName: form.customerName.value,
      location: form.location.value,
      amount: form.amount.value,
      status: form.status.value,
      time: new Date().toLocaleString() // Current time
    };

    if (formType === "new") {
      setOrders([...orders, order]);
      setOrderId(orderId + 1); // Increment order ID
    } else {
      const updatedOrders = orders.map((item) =>
        item.id === order.id ? { ...item, ...order } : item
      );
      setOrders(updatedOrders);
    }

    form.reset(); // Reset form fields
    toggleForm(); // Close the form
  };

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    toggleForm();
  };

  return (
    <>
      <div className={`Admin_order ${showForm ? "blur" : ""}`}>
        <div className="order_table">
          <header className="header">
            <div className="search-bar">
              <input type="text" placeholder="Search Here" />
              <button>Search</button>
            </div>
            <button className="food-button" onClick={() => toggleForm("new", null)}>
              <i className="bx bx-plus"></i> New Order
            </button>
          </header>

          {/* Navigation Links */}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                All Orders
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="delivered-tab"
                data-bs-toggle="tab"
                data-bs-target="#delivered"
                type="button"
                role="tab"
                aria-controls="delivered"
                aria-selected="false"
              >
                Delivered
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pending-tab"
                data-bs-toggle="tab"
                data-bs-target="#pending"
                type="button"
                role="tab"
                aria-controls="pending"
                aria-selected="false"
              >
                Pending
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="canceled-tab"
                data-bs-toggle="tab"
                data-bs-target="#canceled"
                type="button"
                role="tab"
                aria-controls="canceled"
                aria-selected="false"
              >
                Canceled
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
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
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.location}</td>
                      <td>{order.amount}</td>
                      <td>{order.status}</td>
                      <td>
                        <button onClick={() => toggleForm("edit", order)}>Edit</button>
                        <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                      </td>
                      <td>{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Additional tab content goes here */}
            <div
              className="tab-pane fade"
              id="delivered"
              role="tabpanel"
              aria-labelledby="delivered-tab"
            >
              {/* Content for Delivered tab */}
            </div>
            <div
              className="tab-pane fade"
              id="pending"
              role="tabpanel"
              aria-labelledby="pending-tab"
            >
              {/* Content for Pending tab */}
            </div>
            <div
              className="tab-pane fade"
              id="canceled"
              role="tabpanel"
              aria-labelledby="canceled-tab"
            >
              {/* Content for Canceled tab */}
            </div>
          </div>

          {/* New Order Form */}
          {showForm && (
            <form onSubmit={handleSaveOrder} className="new-order-form">
              <div>
                <label htmlFor="customerName">Customer's Name:</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  defaultValue={selectedOrder ? selectedOrder.customerName : ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={selectedOrder ? selectedOrder.location : ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  defaultValue={selectedOrder ? selectedOrder.amount : ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  defaultValue={selectedOrder ? selectedOrder.status : "Pending"}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <button type="submit">{formType === "new" ? "Save" : "Update"}</button>
              <button type="button" onClick={toggleForm}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrder;
