import React from 'react';
import HomeownerSidebar from '../components/HomeownerSidebar';
import '../OrderHistory/OrderHistory.css';
import OrderHistoryCard from '../components/OrderHistoryCard';

const mockOrders = [
  {
    id: 1,
    service: 'Plumbing',
    professional: 'John Doe',
    date: '2024-11-01',
    status: 'Completed',
  },
  {
    id: 2,
    service: 'Roofing',
    professional: 'Emily Clark',
    date: '2024-10-20',
    status: 'In Progress',
  },
  {
    id: 3,
    service: 'Gardening',
    professional: 'Tom Hanks',
    date: '2024-09-15',
    status: 'Completed',
  },
];

const OrderHistory = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <HomeownerSidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="order-history-header">
          <h1 className="profile-name">Jane Doe</h1>
          <p className="profile-email">jane.doe@example.com</p>
        </div>

        {/* Order History List */}
        <div className="order-history-content">
          <h2 className="order-history-title">My Order History</h2>
          <div className="order-history-list">
            {mockOrders.map((order) => (
              <OrderHistoryCard key={order.id} {...order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
