import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminOrder.css';

const Orderform = ({ order, onCancel }) => {
  const [formData, setFormData] = useState({
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (order) {
      setFormData({
        status: order.OrderStatus,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem('access_token');
      const response = await axios.put(
        `http://127.0.0.1:8000/food/orders/${order.OrderID}/change-status/`,
        { status: formData.status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Order status updated:', response.data);
    } catch (error) {
      setError('Error updating order status. Please try again.');
      console.error('Error updating order status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="new-order-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Orderform;
