import React from 'react';
import './Menu2.css';

const MenuItem = ({ menu, onClick, selected }) => {
  const discount = parseFloat(menu.Discount); // Convert discount to a number
  const formattedDiscount = discount % 1 === 0 ? discount.toFixed(0) : discount; // Format discount accordingly

  return (
    <div className={`menu-item ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="menu_box">
        <div className="menu_card">
          <img src={`https://res.cloudinary.com/drnj3k06u/${menu.image}`} alt="menu-img" />
          <p>&nbsp; {menu.foodname} &nbsp; <span>{`${formattedDiscount}% Off`}</span></p>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;