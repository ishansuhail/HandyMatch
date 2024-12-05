import { React, useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import auth from '../authentication/firebase'
import { firestore } from '../authentication/firebase'

const PastJobs = () => {

    const [jobs, setJobs] = useState(null);

    const userData = JSON.parse(localStorage.getItem('user'));

    const email = userData.email // Retrieve the value of 'email'
    const firstName = userData.firstName; // Retrieve the value of 'firstname' and 'lastname'
    const lastName = userData.lastName;


    console.log(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const findProfessionalJobs = async () => {
            const usersCollection = collection(firestore, 'Jobs');
            const querySnapshot = await getDocs(usersCollection)

            querySnapshot.forEach(element => {
                const id = element.id.split('_')
                
                if (firstName === id[0] && lastName === id[1]){
                    setJobs(element.data().jobs)
                    console.log(jobs)
                    
                }
                    
            });
        }
        findProfessionalJobs();
      }, []);



    return ( 

        <Sidebar/>
     );
}
 
export default PastJobs;