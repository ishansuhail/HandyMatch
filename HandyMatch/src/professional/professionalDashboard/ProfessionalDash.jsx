import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import ClientRequestCard from '../ClientRequestCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBell } from 'react-icons/fa';
import { auth, firestore } from '../../authentication/firebase';
import { collection, getDocs, getDoc, doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore'; // Import Firestore functions
import './ProfessionalDash.css';


const ProfessionalDash = () => {
  const [professionalName, setProfessionalName] = useState('');
  const [requests, setRequests] = useState([]);

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
            

                setRequests(extractedData);
            
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

  const handleAcceptJob = async (name, dateRequested) => {
    const matchedRequest = requests.find(
      (request) => request.name === name && request.dateRequested === dateRequested
    );
  
    if (matchedRequest) {
      console.log("Matched Request:", matchedRequest);
    }
  
    // Update the state to exclude the matched request
    setRequests((prevRequests) =>
      prevRequests.filter(
        (request) => request.name !== name && request.dateRequested !== dateRequested
      )
    );

    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const usersCollection = collection(firestore, 'Jobs');
      const usersSnapshot = await getDocs(usersCollection);

      usersSnapshot.forEach(async _doc => {
        if (_doc.id.endsWith(`_${uid}`)) {
          const data = _doc.data().jobs;
          data.forEach(async (job) => {

            if (job.customer === name && job.date.split('T')[0] === dateRequested) {
              
            
              const newJobRef = doc(firestore, "AcceptedJobs", _doc.id);
            
              try {
                // Check if the document exists
                const docSnap = await getDoc(newJobRef);
            
                if (docSnap.exists()) {
                  // If document exists, update the jobs array
                  await updateDoc(newJobRef, {
                    jobs: arrayUnion(job),
                  });
                  console.log("Job added to existing jobs array in document with ID:", newJobRef.id);
                } else {
                  // If document doesn't exist, create it and add the jobs array
                  await setDoc(newJobRef, {
                    jobs: arrayUnion(job),
                  });
                  console.log("New document created and job added to jobs array with ID:", newJobRef.id);
                }
              } catch (error) {
                console.error("Error updating or creating document:", error);
              }
            }
          })

        }
      })

    }


    
  };

  const handleDeclineJob = (name, dateRequested) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.name !== name && request.dateRequested !== dateRequested)
    );
  };

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
          {sortedRequests.length > 0 ? (
            sortedRequests.map((request, index) => (
              <div className="col" key={index}>
                <ClientRequestCard
                  {...request}
                  onAcceptJob={handleAcceptJob}
                  onDeclineJob={handleDeclineJob}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No records found</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDash;