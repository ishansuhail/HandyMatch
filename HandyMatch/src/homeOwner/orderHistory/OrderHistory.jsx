import React,{ useEffect, useState }  from 'react';
import HomeownerSidebar from '../HomeownerSidebar';
import './OrderHistory.css';
import OrderHistoryCard from '../../components/OrderHistoryCard';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../authentication/firebase';



const OrderHistory = () => {
  const userData = JSON.parse(localStorage.getItem('user'));

  const email = userData.email // Retrieve the value of 'email'
  const firstName = userData.firstName; // Retrieve the value of 'firstname' and 'lastname'
  const lastName = userData.lastName;

  const [orders, setOrders] = useState([
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
  ]);

  useEffect(() => {
    const fetchOrders = async () =>{
      try {

       
        // Reference the collection dynamically
        const collectionRef = doc(firestore, "UserReviews", email);
    
        // Fetch all documents from the collection
        const querySnapshot = await getDoc(collectionRef);


        if (querySnapshot){
          const documentData = querySnapshot.data();

          const newOrders = documentData.jobs.map((job, index) => ({
            id: orders.length + index + 1, // Generate a unique id based on current length
            service: job.service,
            professional: job.professional,
            date: job.date.split("T")[0], // Extract only the YYYY-MM-DD part
            status: "In Progress", // Default status
          }));

          // Append the new orders to the existing array
          setOrders((prevOrders) => [...prevOrders, ...newOrders]);
          // setOrders(documentData);



          
        }
    
       
       
      } catch (error) {
        console.error("Error fetching collection:", error);
        throw error; // Handle or propagate the error
      }
    }

    fetchOrders();

  }, []);


  return (
    <div className="d-flex">
      {/* Sidebar */}
      <HomeownerSidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="order-history-header">
          <h1 className="profile-name">{firstName} {lastName}</h1>
          <p className="profile-email">{email}</p>
        </div>

        {/* Order History List */}
        <div className="order-history-content">
          <h2 className="order-history-title">My Order History</h2>
          <div className="order-history-list">
            {orders.map((order) => (
              <OrderHistoryCard namekey={order.id} {...order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
