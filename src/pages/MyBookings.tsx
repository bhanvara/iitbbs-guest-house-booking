import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingHistoryComponent from './components/BookingHistoryComponent';

interface Booking {
  bookingID: string;
  hostel: string;
  type1: string;
  type2: string;
  price: number;
  key: number;
  status: string;
  stage: number;
  checkin: string;
  checkout: string;
  guest1Name: string;
  guest1Contact: string;
  guest1Email: string;
  guest2Name: string;
  guest2Contact: string;
  guest2Email: string;
}

export default function MyBookings() {
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [approvedBookings, setApprovedBookings] = useState<Booking[]>([]);
  const [rejectedBookings, setRejectedBookings] = useState<Booking[]>([]);
  const [activeButton, setActiveButton] = useState('Pending');

  useEffect(() => {
    async function fetchData() {
      try {
        const pendingResponse = await axios.get('http://localhost:3001/api/bookings/pending');
        setPendingBookings(pendingResponse.data.pendingBookings);

        const approvedResponse = await axios.get('http://localhost:3001/api/bookings/approved');
        setApprovedBookings(approvedResponse.data.approvedBookings);

        const rejectedResponse = await axios.get('http://localhost:3001/api/bookings/rejected');
        setRejectedBookings(rejectedResponse.data.rejectedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#edeff0' }} className='h-lvh'>
      <div className="h-full w-full m-auto shadow-md" style={{ backgroundColor: '#f6f8fa', maxWidth: '1500px' }}>
        <div className="bg-white m-auto h-full shadow-md p-3 flex flex-col" style={{ maxWidth: '900px' }}>
          <div className='flex flex-row justify-between items-center rounded-md border-2 font-inter mb-2'>
            <button
              onClick={() => setActiveButton('Pending')}
              className={`border-r-2 w-full text-center p-2 ${activeButton === 'Pending' ? 'inset-0 shadow-inner  bg-slate-200' : ''}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveButton('Approved')}
              className={`border-r-2 w-full text-center p-2 ${activeButton === 'Approved' ? 'inset-0 shadow-inner  bg-slate-200' : ''}`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveButton('Rejected')}
              className={`w-full text-center p-2 ${activeButton === 'Rejected' ? 'inset-0 shadow-inner bg-slate-200' : ''}`}
            >
              Rejected
            </button>
          </div>
          <div className={`p-2 ${activeButton === 'Pending' ? '' : 'hidden'}`}>
            {pendingBookings.map((booking) =>
              <BookingHistoryComponent
                key={booking.bookingID}
                bookingID={booking.bookingID}
                hostel={booking.hostel}
                type1={booking.type1}
                type2={booking.type2}
                price={booking.price}
                status={booking.status}
                stage={booking.stage}
                checkin={booking.checkin}
                checkout={booking.checkout}
                guest1Name={booking.guest1Name}
                guest1Contact={booking.guest1Contact}
                guest1Email={booking.guest1Email}
                guest2Name={booking.guest2Name}
                guest2Contact={booking.guest2Contact}
                guest2Email={booking.guest2Email}
              />
            )}
          </div>
          <div className={`p-2 ${activeButton === 'Approved' ? '' : 'hidden'}`}>
            {approvedBookings.map((booking) =>
              <BookingHistoryComponent
                key={booking.bookingID}
                bookingID={booking.bookingID}
                hostel={booking.hostel}
                type1={booking.type1}
                type2={booking.type2}
                price={booking.price}
                status={booking.status}
                stage={booking.stage}
                checkin={booking.checkin}
                checkout={booking.checkout}
                guest1Name={booking.guest1Name}
                guest1Contact={booking.guest1Contact}
                guest1Email={booking.guest1Email}
                guest2Name={booking.guest2Name}
                guest2Contact={booking.guest2Contact}
                guest2Email={booking.guest2Email}
              />
            )}
          </div>
          <div className={`p-2 ${activeButton === 'Rejected' ? '' : 'hidden'}`}>
            {rejectedBookings.map((booking) =>
              <BookingHistoryComponent
                key={booking.bookingID}
                bookingID={booking.bookingID}
                hostel={booking.hostel}
                type1={booking.type1}
                type2={booking.type2}
                price={booking.price}
                status={booking.status}
                stage={booking.stage}
                checkin={booking.checkin}
                checkout={booking.checkout}
                guest1Name={booking.guest1Name}
                guest1Contact={booking.guest1Contact}
                guest1Email={booking.guest1Email}
                guest2Name={booking.guest2Name}
                guest2Contact={booking.guest2Contact}
                guest2Email={booking.guest2Email}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
