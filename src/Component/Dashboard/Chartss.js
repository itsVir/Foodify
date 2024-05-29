import React from 'react';
import SalesChart from './SalesChart';

const Chartss = () => {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    sales: [100, 150, 200, 250, 300, 350] // Example sales data
  };

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <SalesChart data={salesData} />
    </div>
  );
};

export default Chartss;
