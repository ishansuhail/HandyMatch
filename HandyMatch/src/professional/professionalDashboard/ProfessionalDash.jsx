import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import ClientRequestCard from '../ClientRequestCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBell } from 'react-icons/fa';
import { auth, firestore } from '../../authentication/firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import './ProfessionalDash.css';


const ProfessionalDash = () => {
  const [professionalName, setProfessionalName] = useState('');
  const [requests, setRequests] = useState([
    { name: "John D.", role: "Homeowner", dateRequested: "11/1/24" , isEmergency: false },
    { name: "Amber T.", role: "Homeowner", dateRequested: "10/29/24", isEmergency: false },
    { name: "Michael B.", role: "Homeowner", dateRequested: "10/25/24",  isEmergency: true },
    { name: "Sarah W.", role: "Homeowner", dateRequested: "10/20/24",  isEmergency: false },
    { name: "David K.", role: "Homeowner", dateRequested: "10/18/24",  isEmergency: false },
    { name: "Emma R.", role: "Homeowner", dateRequested: "10/15/24",  isEmergency: true },
    { name: "Olivia P.", role: "Homeowner", dateRequested: "10/10/24",  isEmergency: false },
    { name: "Liam N.", role: "Homeowner", dateRequested: "10/05/24",  isEmergency: false },
    { name: "Sophia M.", role: "Homeowner", dateRequested: "10/01/24", isEmergency: false },
    { name: "James L.", role: "Homeowner", dateRequested: "09/28/24",  isEmergency: false },
  ]);

  useEffect(() => {
    const fetchProfessionalName = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const usersCollection = collection(firestore, 'Users');
        const usersSnapshot = await getDocs(usersCollection);


        usersSnapshot.forEach(async _doc => {
          if (_doc.id.endsWith(`_${uid}`)) {
            const data = _doc.data();
            console.log(_doc.id);
            const docRef = doc(firestore, "Jobs", _doc.id);

            console.log(docRef);

            const docSnap = await getDoc(docRef);

            
            if (docSnap.exists()) {
              // Document exists, log and save the data
              const documentData = docSnap.data();
              console.log("Document data", docSnap.data());

              if (Array.isArray(documentData.jobs)) {
                const extractedData = documentData.jobs.map((job) => ({
                  name: job.customer,
                  dateRequested: job.date.split("T")[0],
                  isEmergency: job.isEmergency,
                }));
            
                console.log("Extracted Data:", extractedData);

                setRequests(prevRequests => [...prevRequests, ...extractedData]);
            
                // Example: Save to state if using React
                // setJobs(extractedData);
              } else {
                console.log("No jobs field or it is not an array.");
              }
              
            }
            else{
              console.log("No such document!");
              return; // Return early if the document doesn't exist
            }
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