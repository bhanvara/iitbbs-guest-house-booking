import React, { useState, useEffect } from 'react';
import RequestComponent from './components/RequestComponent';
import { useAuth0 } from '@auth0/auth0-react';

interface Request {
  bookingID: string,
  name: string,
  rollno: string,
  hostel: string,
  type1: string,
  type2: string,
  key: number,
  checkin: string,
  checkout: string,
  guest1Name: string,
  guest1Contact: string,
  guest1Email: string,
  guest2Name: string,
  guest2Contact: string,
  guest2Email: string
}

export default function ApproveBookings() {

  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [activeButton, setActiveButton] = useState("pending");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // Fetching list of booking IDs for a supervisor ID
    const fetchPendingApprovals = async () => {
      const token = await getAccessTokenSilently();
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/pendingApprovals/f1`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        // data.Pending_Bookings contains an array of booking IDs
        // Fetching details for each booking ID
        const requests = await Promise.all(data.Pending_Bookings.map(async (bookingId: number) => {
          const bookingResponse = await fetch(`http://localhost:3001/api/bookings/getDetails/${bookingId}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const bookingData = await bookingResponse.json();

          const checkinDate = new Date(bookingData.details[0].Check_In_Date).toLocaleDateString('en-GB').split('/').join('/');
          const checkoutDate = new Date(bookingData.details[0].Check_Out_Date).toLocaleDateString('en-GB').split('/').join('/');

          // http://localhost:3001/api/bookings/roomDetails/?roomID=4
          const roomDetailsAPI:any = await fetch(`http://localhost:3001/api/bookings/roomDetails/?roomID=${bookingData.details[0].Room_ID}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const roomDetails = await roomDetailsAPI.json();

          console.log("token is:", localStorage.getItem('token'));

          return {
            bookingID: bookingData.details[0].Booking_ID,
            name: bookingData.details[0].guest1_name,
            rollno: bookingData.details[0].Booked_By_User_ID, // Add rollno logic here if needed
            hostel: roomDetails[0].Location,
            type1: roomDetails[0].Single_Double,
            type2: roomDetails[0].AC_Non_AC,
            key: 1,
            checkin: checkinDate,
            checkout: checkoutDate,
            guest1Name: bookingData.details[0].guest1_name,
            guest1Contact: bookingData.details[0].guest1_contact.toString(),
            guest1Email: bookingData.details[0].guest1_email,
            guest2Name: bookingData.details[0].guest2_name,
            guest2Contact: bookingData.details[0].guest2_contact.toString(),
            guest2Email: bookingData.details[0].guest2_email
          };
        }));
        setPendingRequests(requests);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPendingApprovals();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="h-full" style={{ backgroundColor: '#edeff0' }}>
      <div className="h-full w-full m-auto shadow-md" style={{ backgroundColor: '#f6f8fa', maxWidth: '1500px' }}>
        <div className="bg-white m-auto h-full shadow-md relative lg:px-2" style={{ maxWidth: '900px' }}>
          <div className={`p-2 ${activeButton === 'pending' ? 'max-h-full' : 'max-h-0 opacity-0'}`}>
          {pendingRequests.map((request) => 
              <RequestComponent 
                key={request.key} 
                bookingID={request.bookingID} 
                name={request.name} 
                rollno={request.rollno} 
                hostel={request.hostel} 
                type1={request.type1} 
                type2={request.type2} 
                checkin={request.checkin} 
                checkout={request.checkout} 
                guest1Name={request.guest1Name} 
                guest1Contact={request.guest1Contact} 
                guest1Email={request.guest1Email} 
                guest2Name={request.guest2Name} 
                guest2Contact={request.guest2Contact} 
                guest2Email={request.guest2Email} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}