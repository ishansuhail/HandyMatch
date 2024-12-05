import { React } from 'react'
import Sidebar from './Sidebar';
import { getAuth } from 'firebase/auth';

const PastJobs = () => {

    const userData = JSON.parse(localStorage.getItem('user'));

    const email = userData.email // Retrieve the value of 'email'
    const firstName = userData.firstName; // Retrieve the value of 'firstname' and 'lastname'
    const lastName = userData.lastName;


    console.log(email, firstName, lastName)

    

    return ( 

        <Sidebar/>
     );
}
 
export default PastJobs;