import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
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

interface MyBookingsProps {
  userId: string | null;
}

export default function MyBookings({userId}: MyBookingsProps): JSX.Element {
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [approvedBookings, setApprovedBookings] = useState<Booking[]>([]);
  const [historyBookings, setHistoryBookings] = useState<Booking[]>([]);
  const [activeButton, setActiveButton] = useState<string>('Pending');

  const convertToApprovedBooking = async (response: any): Promise<Booking[]> => {
    const bookings: Booking[] = [];
    for (const key in response) {
      const bookingData = response[key];
      const bookingDetails = bookingData.bookingDetails;
      const roomDetails = bookingData.roomDetails[0];

      const checkinDate = new Date(bookingDetails.Check_In_Date).toLocaleDateString('en-GB').split('/').join('/');
      const checkoutDate = new Date(bookingDetails.Check_Out_Date).toLocaleDateString('en-GB').split('/').join('/');

      bookings.push({
        bookingID: bookingDetails.Booking_ID,
        hostel: roomDetails.Location,
        type1: roomDetails.AC_Non_AC,
        type2: roomDetails.Single_Double,
        price: parseFloat(bookingDetails.Total_Billing),
        status: 'Approved',
        key: 1,
        stage: 3,
        checkin: checkinDate,
        checkout: checkoutDate,
        guest1Name: bookingDetails.guest1_name,
        guest1Contact: bookingDetails.guest1_contact,
        guest1Email: bookingDetails.guest1_email,
        guest2Name: bookingDetails.guest2_name,
        guest2Contact: bookingDetails.guest2_contact,
        guest2Email: bookingDetails.guest2_email,
      });
    }
    return bookings;
  }

  const convertToPendingBooking = async (response: any): Promise<Booking[]> => {
    const bookings: Booking[] = [];
    for (const key in response) {
      const bookingData = response[key];
      const bookingDetails = bookingData.bookingDetails;
      const roomDetails = bookingData.roomDetails[0];
      const approvalStatus = bookingData.approvalStatus[0];
  
      const checkinDate = new Date(bookingDetails.Check_In_Date).toLocaleDateString('en-GB').split('/').join('/');
      const checkoutDate = new Date(bookingDetails.Check_Out_Date).toLocaleDateString('en-GB').split('/').join('/');

      let stageNumber:number = 0;
      if(approvalStatus.sid1!=null)
        stageNumber=1;

      if(approvalStatus.sid2!=null)
        stageNumber=2;

      if(approvalStatus.sid3!=null)
        stageNumber=3;
  
      bookings.push({
        bookingID: bookingDetails.Booking_ID.toString(),
        hostel: roomDetails.Location,
        type1: roomDetails.AC_Non_AC,
        type2: roomDetails.Single_Double,
        price: parseFloat(bookingDetails.Total_Billing),
        status: 'Pending', // Set status to 'Pending' for pending bookings
        key: 1,
        stage: stageNumber,
        checkin: checkinDate,
        checkout: checkoutDate,
        guest1Name: bookingDetails.guest1_name,
        guest1Contact: bookingDetails.guest1_contact.toString(),
        guest1Email: bookingDetails.guest1_email,
        guest2Name: bookingDetails.guest2_name,
        guest2Contact: bookingDetails.guest2_contact.toString(),
        guest2Email: bookingDetails.guest2_email,
      });
    }
    return bookings;
  }


  const convertToHistoryBooking = async (response: any): Promise<Booking[]> => {
    const bookings: Booking[] = [];
    for (const key in response) {
      const bookingData = response[key];
      const bookingDetails = bookingData.bookingDetails;
      const roomDetails = bookingData.roomDetails[0];

      const checkinDate = new Date(bookingDetails.Check_In_Date).toLocaleDateString('en-GB').split('/').join('/');
      const checkoutDate = new Date(bookingDetails.Check_Out_Date).toLocaleDateString('en-GB').split('/').join('/');

      let stageNumber:number = 3;

      if(bookingDetails.Rejected_By_Sid!=null)
        stageNumber=0;

      bookings.push({
        bookingID: bookingDetails.Booking_ID,
        hostel: roomDetails.Location,
        type1: roomDetails.AC_Non_AC,
        type2: roomDetails.Single_Double,
        price: parseFloat(bookingDetails.Total_Billing),
        status: bookingDetails.Booking_Status,
        key: 1,
        stage: stageNumber,
        checkin: checkinDate,
        checkout: checkoutDate,
        guest1Name: bookingDetails.guest1_name,
        guest1Contact: bookingDetails.guest1_contact,
        guest1Email: bookingDetails.guest1_email,
        guest2Name: bookingDetails.guest2_name,
        guest2Contact: bookingDetails.guest2_contact,
        guest2Email: bookingDetails.guest2_email,
      });
    }
    return bookings;
  }

  const { getAccessTokenSilently } = useAuth0();  

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      console.log("token: ", token);

      try {
        const pendingResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users/pending/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const pendingBookingsData = await convertToPendingBooking(pendingResponse.data);
        setPendingBookings(pendingBookingsData);
      } catch (error) {
        console.error('Error fetching pending bookings:', error);
      }
  
      try {
        const approvedResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users/confirmed/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const approvedBookingsData = await convertToApprovedBooking(approvedResponse.data);
        setApprovedBookings(approvedBookingsData);
      } catch (error) {
        console.error('Error fetching approved bookings:', error);
      }
  
      try {
        const historyResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users/history/${userId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const historyBookingsData = await convertToHistoryBooking(historyResponse.data);
        setHistoryBookings(historyBookingsData);
      } catch (error) {
        console.error('Error fetching history bookings:', error);
      }
    }
  
    fetchData();
  }, []);
  

  return (
    <div style={{ backgroundColor: '#edeff0' }} className='h-lvh mt-20 overflow-auto'>
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
              Confirmed
            </button>
            <button
              onClick={() => setActiveButton('History')}
              className={`w-full text-center p-2 ${activeButton === 'History' ? 'inset-0 shadow-inner bg-slate-200' : ''}`}
            >
              History
            </button>
          </div>
          <div className={`p-2 ${activeButton === 'Pending' ? '' : 'hidden'}`}>
            {pendingBookings.map((booking) => (
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
            ))}
          </div>
          <div className={`p-2 ${activeButton === 'Approved' ? '' : 'hidden'}`}>
            {approvedBookings.map((booking) => (
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
            ))}
          </div>
          <div className={`p-2 ${activeButton === 'History' ? '' : 'hidden'}`}>
            {historyBookings.map((booking) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
