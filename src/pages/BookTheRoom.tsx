import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomInfo from './components/Room';
import RoomFilters from './components/RoomFilters';
import dayjs from 'dayjs';
import HostelSelection from './components/HostelSelection';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface RoomDetails {
  hostel: string;
  description: string;
  type1: string;
  type2: string;
  price: number;
  roomId: any;
  startDate: any;
  endDate: any;
}

function BookTheRoom() {
  const navigate = useNavigate();

  // Some default initialized values
  const choice1Initial = 'Single';
  const choice2Initial = 'AC';
  const startDateInitial = dayjs();
  const endDateInitial = dayjs().add(1, 'day');
  const initialised_values = {
    choice1: choice1Initial,
    choice2: choice2Initial,
    startDate: startDateInitial,
    endDate: endDateInitial,
    sDate: startDateInitial.format('DD/MM/YYYY'),
    sTime: startDateInitial.format('HH:mm'),
    eDate: endDateInitial.format('DD/MM/YYYY'),
    eTime: endDateInitial.format('HH:mm'),
  };
  const [filters, setFilters] = useState(initialised_values);
  const [rooms, setRooms] = useState<RoomDetails[]>([]);
  const { getAccessTokenSilently } = useAuth0();


  // Function to get room IDS , right now HARDCODED
  const getRoomIDs = async () => {
    const token = await getAccessTokenSilently();
    try {
      // Make a request to your backend API to fetch available room IDs
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bookings/availableRooms`, {
        params: {
          startDate: filters.startDate.format('YYYY-MM-DD'), // Format startDate as required
          endDate: filters.endDate.format('YYYY-MM-DD'), // Format endDate as required
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Room numbers");
      console.log(response);
  
      return response.data; // Return the room IDs from the response
    } catch (error) {
      console.error('Error fetching room IDs:', error);
      return []; // Return an empty array in case of an error
    }
  };

  // Function to fetch room details for multiple room IDs
  const fetchRoomDetails = async () => {
    const roomIDs = await getRoomIDs(); // Room IDs to fetch
    const roomDetailsPromises = roomIDs.map(async (roomID: any) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/bookings/roomDetails/?roomID=${roomID.RoomID}`);
        console.log("Response is");
        console.log(response);
        const roomData = response.data[0];
        console.log(roomData);
        const roomDetails: RoomDetails = {
          hostel: roomData.Location,
          description: roomData.Description || "", // Handle null description
          type1: roomData.Single_Double,
          type2: roomData.AC_Non_AC,
          price: roomData.Price_per_day,
          roomId: roomData.RoomID,
          startDate: filters.startDate,
          endDate: filters.endDate,
        };
        console.log(roomDetails);
        return roomDetails;
      } catch (error) {
        console.error('Error fetching room details:', error);
        return null;
      }
    });
  
    // Wait for all room details requests to resolve
    const roomDetails = await Promise.all(roomDetailsPromises);
    setRooms(roomDetails.filter((room) => room !== null) as RoomDetails[]); // Filter out any null responses
  };

  useEffect(() => {
    fetchRoomDetails();
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  // Function to update filters
  function getFilters(obj: any) {
    const choice1 = obj.option1;
    const choice2 = obj.option2;
    const startDate = obj.startDate;
    const endDate = obj.endDate;
    const sDate = obj.startDate.format('DD/MM/YYYY');
    const sTime = obj.startDate.format('HH:mm');
    const eDate = obj.endDate.format('DD/MM/YYYY');
    const eTime = obj.endDate.format('HH:mm');
    setFilters({ choice1, choice2, startDate, endDate, sDate, sTime, eDate, eTime });
  }

  return (
    <div className="h-full" style={{ backgroundColor: 'rgb(244,245,245)' }}>
      <RoomFilters buttonText="Apply Filters" passFilters={getFilters} initialised_values={initialised_values} />
      <div className="flex lg:flex-row flex-col ">
        <HostelSelection  />
        <div className="flex flex-col justify-center lg:mr-auto w-full lg:w-3/4 ">
          {rooms.map((room) => (
            <RoomInfo
              key={room.roomId}
              hostel={room.hostel}
              description={room.description}
              type1={room.type1}
              type2={room.type2}
              price={room.price}
              roomId={room.roomId}
              startDate={filters.startDate}
              endDate={filters.endDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookTheRoom;
