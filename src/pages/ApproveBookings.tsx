import React, { useState } from 'react'
import RequestComponent from './components/RequestComponent'
import ApprovedRejected from './components/ApprovedRejectedComponent';

//My booking info
let pendingRequests = [
  {bookingID: '1356789',name: 'Gouri Verma',rollno: '22CS01074',hostel: 'MHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12456789',name: 'Gouri Verma',rollno: '22CS01074',hostel: 'GHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12567890',name: 'Gouri Verma',rollno: '22CS01074',hostel: 'RHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
];

let approvedRequests = [
  {bookingID: '1356789',name: 'Gouri Verma',rollno: '22CS01074',status: 'Approved',hostel: 'MHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12456789',name: 'Gouri Verma',rollno: '22CS01074',status: 'Approved',hostel: 'GHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12567890',name: 'Gouri Verma',rollno: '22CS01074',status: 'Approved',hostel: 'RHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
];

let rejectedRequests = [
  {bookingID: '1356789',name: 'Gouri Verma',rollno: '22CS01074',status: 'Rejected',hostel: 'MHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12456789',name: 'Gouri Verma',rollno: '22CS01074',status: 'Rejected',hostel: 'GHR',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12567890',name: 'Gouri Verma',rollno: '22CS01074',hostel: 'RHR',status: 'Rejected',type1: 'Single',type2: 'AC',key:1,checkin: '24/04/24',checkout: '28/04/24',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
];

export default function ApproveBookings() {
  const [activeButton, setActiveButton] = useState("pending");
  return (
    <div className="h-full" style={{backgroundColor: '#edeff0'}}>
      <div className="h-full w-full m-auto shadow-md" style={{backgroundColor: '#f6f8fa' ,maxWidth: '1500px'}}>
        <div className="bg-white m-auto h-full shadow-md relative lg:px-2" style={{maxWidth: '900px'}}>
            <div className='flex flex-row justify-between items-center rounded-md border-2 mt-2 font-inter'>
              <button 
                  onClick={() => setActiveButton('pending')}
                  className={`border-r-2 w-full text-center p-2 ${activeButton === 'pending' ? 'inset-0 shadow-inner  bg-slate-200' : ''}`}
              >
                  Pending
              </button>
              <button 
                  onClick={() => setActiveButton('approved')}
                  className={`border-r-2 w-full text-center p-2 ${activeButton === 'approved' ? 'inset-0 shadow-inner  bg-slate-200' : ''}`}
              >
                  Approved
              </button>
              <button 
                  onClick={() => setActiveButton('rejected')}
                  className={`w-full text-center p-2 ${activeButton === 'rejected' ? 'inset-0 shadow-inner bg-slate-200' : ''}`}
              >
                  Rejected
              </button>
            </div>
          
          <div className={`p-2 ${activeButton === 'pending' ? 'max-h-full' : 'max-h-0 opacity-0'}`}>
            {pendingRequests.map((request)=> <RequestComponent bookingID={request.bookingID} name={request.name} rollno={request.rollno} hostel={request.hostel} type1={request.type1} type2={request.type2} checkin={request.checkin} checkout={request.checkout} guest1Name={request.guest1Name} guest1Contact={request.guest1Contact} guest1Email={request.guest1Email} guest2Name={request.guest2Name} guest2Contact={request.guest2Contact} guest2Email={request.guest2Email} />)}
          </div>
          <div className={`p-2 ${activeButton === 'approved' ? 'max-h-full' : 'max-h-0 opacity-0'}`}>
            {approvedRequests.map((request)=> <ApprovedRejected bookingID={request.bookingID} name={request.name} rollno={request.rollno} status={request.status} hostel={request.hostel} type1={request.type1} type2={request.type2} checkin={request.checkin} checkout={request.checkout} guest1Name={request.guest1Name} guest1Contact={request.guest1Contact} guest1Email={request.guest1Email} guest2Name={request.guest2Name} guest2Contact={request.guest2Contact} guest2Email={request.guest2Email} />)}
          </div>
          <div className={`p-2 ${activeButton === 'rejected' ? 'max-h-full' : 'max-h-0 opacity-0'}`}>
            {rejectedRequests.map((request)=> <ApprovedRejected bookingID={request.bookingID} name={request.name} rollno={request.rollno} status={request.status} hostel={request.hostel} type1={request.type1} type2={request.type2} checkin={request.checkin} checkout={request.checkout} guest1Name={request.guest1Name} guest1Contact={request.guest1Contact} guest1Email={request.guest1Email} guest2Name={request.guest2Name} guest2Contact={request.guest2Contact} guest2Email={request.guest2Email} />)}
          </div>
          </div>
        </div>
      
      </div>
  )
}
