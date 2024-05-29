import React from 'react';
// import './UserDetailsCard.css'; // Import CSS file for styling
import './AdminUser.css'

const UserDetailsCard = ({ user, foodOrders, onGoBack, loading }) => {
  // Filter food orders for the selected user
  const userFoodOrders = foodOrders.filter(order => order.UserID === user.id);

  return (
    <div className='user-details-card-background'>
    <div className="user-details-card">
      <button onClick={onGoBack} className="back-button">Go Back</button>
      <div className="user-info">
        <h2>User Details</h2>
        <div>
          <strong>User ID:</strong> {user.id}
        </div>
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Phone Number:</strong> {user.phone_number}
        </div>
        <div>
          <strong>Address:</strong> {user.address ? `${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.country} - ${user.address.pincode}` : 'Address not available'}
        </div>
      </div>
      <div className="food-orders">
        <h3>Food Orders</h3>
        {loading ? (
          <div>Loading food orders...</div>
        ) : (
          <div className="order-cards">
            {userFoodOrders.map(order => (
              <div className="order-card" key={order.OrderID}>
                <div><strong>Order ID:</strong> {order.OrderID}</div>
                <div><strong>Total:</strong> {order.Total}</div>
                <div><strong>Order Status:</strong> {order.OrderStatus}</div>
                <div><strong>Order Place Date Time:</strong> {order.OrderPlaceDateTime}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserDetailsCard;
