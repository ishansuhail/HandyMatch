import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ClientRequestCard from '../components/ClientRequestCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBell } from 'react-icons/fa';
import { auth, firestore } from '../authentication/firebase';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import './ProfessionalDash.css';

const requests = [
  { name: "John D.", role: "Homeowner", dateRequested: "11/1/24", description: "I'd like someone to landscape my garden", isEmergency: false },
  { name: "Amber T.", role: "Homeowner", dateRequested: "10/29/24", description: "I'd like a patio to be installed around my new pool", isEmergency: false },
  { name: "Michael B.", role: "Homeowner", dateRequested: "10/25/24", description: "Need a new roof for my house", isEmergency: true },
  { name: "Sarah W.", role: "Homeowner", dateRequested: "10/20/24", description: "Looking for someone to paint my living room", isEmergency: false },
  { name: "David K.", role: "Homeowner", dateRequested: "10/18/24", description: "Need plumbing work in the kitchen", isEmergency: false },
  { name: "Emma R.", role: "Homeowner", dateRequested: "10/15/24", description: "Want to install new windows in my house", isEmergency: true },
  { name: "Olivia P.", role: "Homeowner", dateRequested: "10/10/24", description: "Looking for someone to build a deck in my backyard", isEmergency: false },
  { name: "Liam N.", role: "Homeowner", dateRequested: "10/05/24", description: "Need electrical work done in the basement", isEmergency: false },
  { name: "Sophia M.", role: "Homeowner", dateRequested: "10/01/24", description: "Want to remodel my bathroom", isEmergency: false },
  { name: "James L.", role: "Homeowner", dateRequested: "09/28/24", description: "Need someone to install a new fence", isEmergency: false },
];

const ProfessionalDash = () => {
  const [professionalName, setProfessionalName] = useState('');

  useEffect(() => {
    const fetchProfessionalName = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const usersCollection = collection(firestore, 'Users');
        const usersSnapshot = await getDocs(usersCollection);
        usersSnapshot.forEach(doc => {
          if (doc.id.endsWith(`_${uid}`)) {
            const data = doc.data();
            setProfessionalName(`${data.firstName} ${data.lastName}`);
          }
        });
      } else {
        console.log('No user is signed in!');
      }
    };

    fetchProfessionalName();
  }, []);

  const sortedRequests = [...requests].sort((a, b) => b.isEmergency - a.isEmergency);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1" style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}> {/* Reduce main content width */}
        {/* Top Header with Icons */}
        <div className="d-flex justify-content-end align-items-center px-4 py-2 bg-light border-bottom">
          <FaBell size={20} className="me-3" />
        </div>

        {/* Title Bar */}
        <div className="bg-dark text-white py-3 px-4">
          <h1 className="mb-0">{professionalName}</h1>
        </div>

        {/* Client Requests Section */}
        <div className="p-4">
          <h4 className="mb-4">Client Requests ({sortedRequests.length})</h4>
          <div className="row row-cols-2 g-4"> {/* Two cards per row */}
            {sortedRequests.map((request, index) => (
              <div className="col" key={index}>
                <ClientRequestCard {...request} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDash;