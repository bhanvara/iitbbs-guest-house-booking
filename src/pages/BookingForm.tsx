import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  guestNumber: number;
  contact: string;
  setContact: (value: string) => void;
  guestName: string;
  setGuestName: (value: string) => void;
  guest2Open: boolean;
}

interface MyBookingsProps {
    userId: string | null;
  }

const GuestDetails = ({ guestNumber, contact, setContact, guestName, setGuestName, guest2Open }: IProps) => {
  return (
    <div
      className="mt-4"
      style={{
        maxHeight: guestNumber === 1 || (guestNumber === 2 && guest2Open === true) ? '1000px' : '0',
        transition: 'max-height 2s ease-in-out',
        overflow: 'hidden',
      }}
    >
      <div className="w-full">
        <label htmlFor={`guestName${guestNumber}`} className="mb-2 text-sm font-inter text-gray-600 dark:text-gray-300">
          Guest {guestNumber} Name
        </label>
        <input
          type="text"
          id={`guestName${guestNumber}`}
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="font-inter shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Name"
          required
        />
      </div>

      <div className="flex flex-row items-center justify-between mt-1">
        <div className="w-5/12" style={{ minWidth: '160px' }}>
          <label htmlFor="text" className="mb-2 text-sm font-inter text-gray-600 dark:text-gray-300">
            Guest {guestNumber} Contact
          </label>

          <input
            type="tel"
            id="text"
            className="font-inter shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="+91 XXXX XXXX XX"
            value={contact}
            onChange={(e) => {
              // Ensure that +91 is always at the start of the string
              const inputValue = e.target.value;
              if (!inputValue.startsWith('+91 ')) {
                setContact('+91 ');
              } else {
                setContact(inputValue);
              }
            }}
            required
          />
        </div>
        <div className="w-5/12" style={{ minWidth: '160px' }}>
          <label htmlFor="email" className="mb-2 text-sm font-inter text-gray-600 dark:text-gray-300">
            Guest {guestNumber} Email ID
          </label>
          <input
            type="email"
            id="text"
            className="font-inter shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="name@email.com"
            required
          />
        </div>
      </div>
    </div>
  );
};

function BookingForm({userId}: MyBookingsProps) {

  const { getAccessTokenSilently } = useAuth0();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Extract startDate and endDate from URL parameters
  const startDate = dayjs(params.get('startDate') || undefined);
  const endDate = dayjs(params.get('endDate') || undefined);
  const roomID = { roomID: params.get('roomID') || undefined };

  const UserID = userId;
  console.log(UserID);
  const RoomID = roomID.roomID;
  let [contact1, setContact1] = useState('+91 ');
  let [contact2, setContact2] = useState('+91 ');
  const [guest1Name, setGuest1Name] = useState('');
  const [guest2Name, setGuest2Name] = useState('');
  const [guest2, setNewGuest2] = useState(false);

  const navigate = useNavigate();

  const [roomPrice, setRoomPrice] = useState<number>(0);

  useEffect(() => {
    const fetchRoomPrice = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/bookings/roomDetails/?roomID=${RoomID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const roomData = response.data[0];
        if (roomData) {
          setRoomPrice(roomData.Price_per_day);
        }
      } catch (error) {
        console.error('Error fetching room price:', error);
      }
    };

    fetchRoomPrice();
  }, []); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Your booking logic goes here
    // For example, you can send a request to a server to book the room

    // Validate contact number before submitting the form
    if (contact1.length !== 14) {
      alert('Please enter a valid contact number for guest 1');
      return; // Prevent form submission
    }

    if (guest2 && contact2.length !== 14) {
      alert('Please enter a valid contact number for guest 2');
      return; // Prevent form submission
    }

    try {
    contact1=contact1.substring(4);
    contact2=contact2.substring(4);
    console.log(UserID, RoomID, startDate.toISOString().substring(0,10), endDate.toISOString().substring(0,10), guest1Name, contact1, guest2Name, contact2);

        
      console.log("Starting Room Booking");

      const token = await getAccessTokenSilently();
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings/apply`,
        {
            uid: UserID,
            roomId: RoomID,
            startDate: startDate.toISOString().substring(0, 10),
            endDate: endDate.toISOString().substring(0, 10),
            guest1_name: guest1Name,
            guest1_contact: contact1,
            guest2_name: guest2Name,
            guest2_contact: contact2,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
      );
      console.log(response.data);
      console.log('Room booked!');
      navigate('/MyBookings');
    } catch (error) {
      console.error('Error booking room:', error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

  return (
    <div className="h-lvh" style={{ backgroundColor: '#edeff0' }}>
      <div className="h-full w-full m-auto shadow-md" style={{ backgroundColor: '#f6f8fa', maxWidth: '1500px' }}>
        <div className="bg-white m-auto h-full shadow-md relative" style={{ maxWidth: '900px' }}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="h-16 pl-6 flex flex-row items-center font-inter text-lg">Booking Details</div>
            <hr></hr>

            <div className="bg-white dark:bg-gray-900">
              <div className="py-8 lg:py-16 px-6">
                <div className="flex flex-row items-center justify-between">
                  <div className="w-5/12" style={{ minWidth: '160px' }}>
                    <label htmlFor="text" className="mb-2 text-sm font-inter text-gray-600 dark:text-gray-300">
                      User ID
                    </label>
                    <input
                      type="text"
                      id="text"
                      className="font-inter shadow-sm bg-gray-200 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      value={UserID || ''} 
                      required
                      disabled
                    />
                  </div>
                  <div className="w-5/12" style={{ minWidth: '160px' }}>
                    <label htmlFor="text" className="mb-2 text-sm font-inter text-gray-600 dark:text-gray-300">
                      Room ID
                    </label>
                    <input
                      type="text"
                      id="text"
                      className="font-inter shadow-sm bg-gray-200 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={RoomID}
                      disabled
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                  <div className="w-5/12" style={{ minWidth: '160px' }}>
                    <label htmlFor="checkinDate" className="mb-2 text-sm font-inter text-gray-600 dark:text-gray-300">
                      Check-in Date
                    </label>
                    <input
                      type="datetime-local"
                      id="checkinDate"
                      value={startDate.toISOString().substring(0, 16)}
                      className="font-inter shadow-sm bg-gray-200 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      required
                      disabled
                    />
                  </div>
                  <div className="w-5/12" style={{ minWidth: '160px' }}>
                    <label htmlFor="checkoutDate" className="mb-2 text-sm font-inter text-gray-600 dark:text-gray-300">
                      Check-out Date
                    </label>
                    <input
                      type="datetime-local"
                      id="checkoutDate"
                      value={endDate.toISOString().substring(0, 16)}
                      className="font-inter shadow-sm bg-gray-200 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light focus:ring-gray-500 focus:border-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      disabled
                    />
                  </div>
                </div>
                <hr></hr>

                <div>
                  <GuestDetails
                    guestNumber={1}
                    contact={contact1}
                    setContact={setContact1}
                    guestName={guest1Name}
                    setGuestName={setGuest1Name}
                    guest2Open={guest2}
                  />
                  {!guest2 && (
                    <button className="text-custom-blue hover:underline text-sm mt-4 s" onClick={() => setNewGuest2(true)}>
                      Add New Guest
                    </button>
                  )}
                  {guest2 && (
                    <GuestDetails
                      guestNumber={2}
                      contact={contact2}
                      setContact={setContact2}
                      guestName={guest2Name}
                      setGuestName={setGuest2Name}
                      guest2Open={guest2}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 w-full h-16 flex flex-row items-center justify-between py-8 px-12 sm:bg-custom-gray">
              <p className="font-inter text-lg text-dark-custom-blue border-2 p-3 rounded-md font-medium">Room Price: ₹{roomPrice}</p>
              <button
                type="submit"
                className="bg-custom-blue hover:bg-dark-custom-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white p-3 w-36 text-lg font-semibold rounded-md transition-colors duration-200 ease-in-out"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
