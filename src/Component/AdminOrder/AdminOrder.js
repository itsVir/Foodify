import React, { useState } from "react";
import "./AdminOrder.css";
import AllOrder from "./AllOrder";
import OrderDelivered from "./OderDeliver";
import OrderPending from "./OrderPanding";


const AdminOrder = () => {
  

  return (
    <>
      <div className='Admin_order'>
        <div className="order_table">
          <header className="header">
            <div className="search-bar">
              <input type="text" placeholder="Search Here" />
              <button>Search</button>
            </div>
            <button className="food-button" >
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

          <div className="tab-content" id="myTabContent">
            
            <AllOrder />

            <div
              className="tab-pane fade"
              id="delivered"
              role="tabpanel"
              aria-labelledby="delivered-tab"
            >
              <OrderDelivered />
            </div>
            <div
              className="tab-pane fade"
              id="pending"
              role="tabpanel"
              aria-labelledby="pending-tab"
            >
              <OrderPending />
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

            
        </div>
      </div>
    </>
  );
};

export default AdminOrder;
