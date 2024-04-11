import React from 'react'
import BookingHistoryComponent from './components/BookingHistoryComponent'

export default function MyBookings() {

  //My booking info
  let bookings = [
  {bookingID: '1356789',hostel: 'MHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Approved',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12456789',hostel: 'GHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Rejected',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  {bookingID: '12567890',hostel: 'RHR',type1: 'Single',type2: 'AC',price:600,key:1,checkin: '24/04/24',checkout: '28/04/24',status: 'Pending',guest1Name: 'Abc',guest1Contact: '9800998',guest1Email: 'abc@gmail.com',guest2Name: 'def',guest2Contact: '7826783',guest2Email: 'def@gmail.com'},
  ];
  



  return (
    <div style={{backgroundColor: '#edeff0'}} className='h-lvh'>
      <div className="h-full w-full m-auto shadow-md" style={{backgroundColor: '#f6f8fa' ,maxWidth: '1500px'}}>
      <div className="bg-white m-auto h-full shadow-md p-3 flex flex-col" style={{maxWidth: '900px'}}>
        {bookings.map((booking)=> <BookingHistoryComponent bookingID={booking.bookingID} hostel={booking.hostel} type1={booking.type1} type2={booking.type2} price={booking.price} status={booking.status} checkin={booking.checkin} checkout={booking.checkout} guest1Name={booking.guest1Name} guest1Contact={booking.guest1Contact} guest1Email={booking.guest1Email} guest2Name={booking.guest2Name} guest2Contact={booking.guest2Contact} guest2Email={booking.guest2Email} />)}
      </div>
      </div>
    </div>
  )
}
