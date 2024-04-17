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
}

interface MyBookingsProps {
  userId: string | null;
}

function BookTheRoom({userId}: MyBookingsProps) {
  const navigate = useNavigate();

  const hostelSelectionInitialedValues = {
    GH: true,
    GHR: true,
    BHR: true,
    SHR: true,
    RHR: true,
    MHR: true,
  }

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
  const [hosteFilters, setHostelFilters] = useState(hostelSelectionInitialedValues);
  const [rooms, setRooms] = useState<RoomDetails[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  const getRoomIDs = async () => {
    const token = await getAccessTokenSilently();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bookings/availableRooms`, {
        params: {
          startDate: filters.startDate.format('YYYY-MM-DD'),
          endDate: filters.endDate.format('YYYY-MM-DD'),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching room IDs:', error);
      return [];
    }
  };

  const fetchRoomDetails = async () => {
    const roomIDs = await getRoomIDs();
    const roomDetailsPromises = roomIDs.map(async (roomID: any) => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/bookings/roomDetails/?roomID=${roomID.RoomID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const roomData = response.data[0];
        // Filter rooms based on the specified parameters
        if ((filters.choice1 === "Both" || roomData.Single_Double === filters.choice1) && (filters.choice2 === "Both" || roomData.AC_Non_AC === filters.choice2)) 
          {
            for (const [key, value] of Object.entries(hosteFilters)) {
              if (value === false && roomData.Location === key) {
                return null;
              }
            }

            const roomDetails: RoomDetails = {
              hostel: roomData.Location,
              description: roomData.Description || "",
              type1: roomData.Single_Double,
              type2: roomData.AC_Non_AC,
              price: roomData.Price_per_day,
              roomId: roomID.RoomID,
            }
          return roomDetails;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
        return null;
      }
    });
  
    const roomDetails = await Promise.all(roomDetailsPromises);
    setRooms(roomDetails.filter((room) => room !== null) as RoomDetails[]);
  };

  useEffect(() => {
    console.log(hosteFilters);
    fetchRoomDetails();
  }, [filters]);

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

  function getHostelSelectionFilters(obj: any) {
    const GHSelect = obj.GH;
    const GHRSelect = obj.GHR;
    const BHRSelect = obj.BHR;
    const SHRSelect = obj.SHR;
    const RHRSelect = obj.RHR;
    const MHRSelect = obj.MHR;
    setHostelFilters({
      GH: GHSelect,
      GHR: GHRSelect,
      BHR: BHRSelect,
      SHR: SHRSelect,
      RHR: RHRSelect,
      MHR: MHRSelect
    });

  }

  return (
    <div className="h-lvh mt-20" style={{ backgroundColor: 'rgb(244,245,245)' }}>
      <RoomFilters buttonText="Apply Filters" passFilters={getFilters} initialised_values={initialised_values} />
      <div className="flex lg:flex-row flex-col ">
        <HostelSelection passHostelFilters={getHostelSelectionFilters} />
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
              startDate={filters.sDate}
              endDate={filters.eDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookTheRoom;
