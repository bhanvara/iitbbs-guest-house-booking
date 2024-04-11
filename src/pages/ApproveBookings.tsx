import React, { useState } from 'react'
import RequestComponent from './components/RequestComponent'
import ApprovedRejected from './components/ApprovedRejectedComponent';

//My booking info
let pendingRequests = [
  {bookingID: '1356789',name: 'Gouri Verma',rollno: '22CS01074',hostel: 'MHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12456789',name: 'Gouri Verma',rollno: '22CS01074',hostel: 'GHR',type1: 'Single',type2: 'AC',key:2,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12567890',name: 'Gouri Verma',rollno: '22CS01074',hostel: 'RHR',type1: 'Single',type2: 'AC',key:3,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
];



export default function ApproveBookings() {
  const [activeButton, setActiveButton] = useState("pending");
  return (
    <div className="h-full" style={{backgroundColor: '#edeff0'}}>
      <div className="h-full w-full m-auto shadow-md" style={{backgroundColor: '#f6f8fa' ,maxWidth: '1500px'}}>
        <div className="bg-white m-auto h-full shadow-md relative lg:px-2" style={{maxWidth: '900px'}}>
          
          
          <div className={`p-2 ${activeButton === 'pending' ? 'max-h-full' : 'max-h-0 opacity-0'}`}>
            {pendingRequests.map((request)=> <RequestComponent key={request.key} bookingID={request.bookingID} name={request.name} rollno={request.rollno} hostel={request.hostel} type1={request.type1} type2={request.type2} checkin={request.checkin} checkout={request.checkout} guest1Name={request.guest1Name} guest1Contact={request.guest1Contact} guest1Email={request.guest1Email} guest2Name={request.guest2Name} guest2Contact={request.guest2Contact} guest2Email={request.guest2Email} />)}
          </div>
          
          </div>
        </div>
      
      </div>
  )
}
