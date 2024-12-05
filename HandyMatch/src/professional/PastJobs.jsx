import { React, useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import auth from '../authentication/firebase'
import { firestore } from '../authentication/firebase'
import JobCard from './JobCard';
import '../homeOwner/orderHistory/OrderHistory.css'

const PastJobs = ({}) => {

    const [jobs, setJobs] = useState([]);

    const userData = JSON.parse(localStorage.getItem('user'));

    const email = userData.email // Retrieve the value of 'email'
    const firstName = userData.firstName; // Retrieve the value of 'firstname' and 'lastname'
    const lastName = userData.lastName;


    console.log(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        
        const fetchJobs = async () => {
            const usersCollection = collection(firestore, 'AcceptedJobs');
            const querySnapshot = await getDocs(usersCollection)

            querySnapshot.forEach(element => {
                const id = element.id.split('_')
                console.log(id)
                
                if (firstName === id[0] && lastName === id[1]){
                    setJobs(element.data().jobs)
                    console.log("These are the jobs ", element.data().jobs)
                    
                }
                    
            });
        }

        
        fetchJobs();
      }, []);



    return ( 

        

        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Header */}
                <div className="order-history-header">
                <h1 className="profile-name">{firstName} {lastName}</h1>
                <p className="profile-email">{email}</p>
                </div>

                {/* Order History List */}
                <div className="order-history-content">
                <h2 className="order-history-title">My Jobs</h2>
                <div className="order-history-list">
                    {jobs.map((job) => (
                    <JobCard customer = {job.customer} date = {job.date.split('T')[0]} />
                    ))}
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default PastJobs;