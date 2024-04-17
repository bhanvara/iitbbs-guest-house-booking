import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageCarousel from './ImageCarousel';
import { useNavigate } from 'react-router-dom';


interface RoomProps {
  hostel: string;
  description: string,
  type1: string,
  type2: string,
  price: number,
  roomId: string,
  startDate: any,
  endDate: any,
}

interface MyBookingsProps {
  userId: string | null;
}

//This is for hostel abbreviations
const images: { [key: string]: string | undefined } = {
  MHR: "https://www.iitbbs.ac.in/cst/images/campus/MHR.jpg",
  GHR: "https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/GH-2/31-01-20.jpg",
  BHR: "https://www.iitbbs.ac.in/images/brahmaputra-hall-of-residence-iit-campus.jpg",
  SHR: "https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/shr/10-12-18.jpg",
  GH: "https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg",
  RHR: "https://www.iitbbs.ac.in/infrastructure-timline/construction-pics/BH-3/rhr-02042022.jpg"
};

//for location icon
const locations: { [key: string]: string | undefined } = {
  MHR: 'https://www.google.com/maps/place/MHR+IIT+BBS/@20.1493531,85.6655308,15z/data=!4m6!3m5!1s0x3a190916ac2437ef:0xd073dbc6624b9982!8m2!3d20.1493531!4d85.6655308!16s%2Fg%2F11td8grfl9?entry=ttu',
  GHR: 'https://www.google.com/maps/search/GHR+IIT+BBS/@20.149978,85.6644602,17z/data=!3m1!4b1?entry=ttu',
  RHR: 'https://www.google.com/maps/place/Rushikulya+Hall+of+Residence+(RHR)/@20.1472637,85.6590147,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19addb3b139241:0x34b4a1b6649073c5!8m2!3d20.1472587!4d85.6615896!16s%2Fg%2F11s9jh71tv?entry=ttu',
  BHR: 'https://www.google.com/maps/place/Brahmaputra+Hall+of+Residence/@20.1490056,85.6609351,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19ad0d5b6a982d:0x4c846c576dc0c48!8m2!3d20.1490006!4d85.66351!16s%2Fg%2F11sry_ybtx?entry=ttu',
  SHR: 'https://www.google.com/maps/place/Subarnarekha+Hall+Of+Residence/@20.1532302,85.6635815,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19addbc6f5b959:0xa81cc09e219c8a8e!8m2!3d20.1532252!4d85.6661564!16s%2Fg%2F11s5m3682f?entry=ttu',
  GH: 'https://www.google.com/maps/place/IIT+Bhubaneswar+Guest+House/@20.1520395,85.6599628,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19ad240f0fdd0b:0x41e99a2b45a09594!8m2!3d20.1520345!4d85.6625377!16s%2Fg%2F11v3fnqt9j?entry=ttu'
};

//for h2
const hostelLabels: {[key:string]:string | undefined}={
  MHR: 'Mahanadi Hall of Residence',
  GHR: 'Ganga Hall of Residence',
  RHR: 'Rishikulaya Hall of Residence',
  BHR: 'Brahmaputra Hall of Residence',
  SHR: 'Subarnarekha Hall of Residence',
  GH: 'Guest House'
}

function RoomInfo({ hostel, description, type1, type2, price, roomId, startDate, endDate }: RoomProps) {
  const navigate = useNavigate();
  
  const handleBookNow = () => {
    const [startDay, startMonth, startYear] = startDate.split('/');
    const [endDay, endMonth, endYear] = endDate.split('/');

    const startDateObject = new Date(`${startYear}-${startMonth}-${startDay}`);
    const endDateObject = new Date(`${endYear}-${endMonth}-${endDay}`);

    const queryParams = new URLSearchParams({
      roomID: roomId,
      startDate: startDateObject.toISOString(),
      endDate: endDateObject.toISOString(),
    });
  
    navigate(`/BookingForm/?${queryParams}`);
};

  return (
    <div className='bg-white flex flex-col sm:flex-row w-full mt-8 mx-1 lg:p-6 p-2 rounded-lg lg:h-64' style={{ maxWidth: '1250px' }}>
      <div className='w-full sm:w-1/2 md:w-5/12 lg:w-1/2'>
        <img src={images[hostel]} className='rounded-md w-full bg-cover h-full' />
      </div>
      <div className='flex flex-col sm:flex-row lg:w-full ml-5 mt-4 sm:mt-0'>
        <div className='flex flex-col justify-between flex-1'>
          <div className='flex flex-row w-full items-center'>
            <h2 className='font-inter text-2xl font-medium '>{hostelLabels[hostel]}</h2>
            <a href={locations[hostel]}>
              <LocationOnIcon color='primary' className='hover:text-dark-custom-blue hover:scale-125 hover:shadow-sm focus:scale-125 focus:text-dark-custom-blue transition duration-300 ease-linear ' />
            </a>
          </div>
          <p className='text-gray-600 text-inter text-sm'>{description}</p>
          <div className='flex flex-row sm:w-auto mt-2 space-x-3'>
            <div className='border-2 rounded-2xl border-gray-800 text-gray-800 p-1 font-inter text-sm w-16 text-center '>{type1}</div>
            <div className='border-2 rounded-2xl border-black p-1 font-inter text-sm text-gray-800  w-16 text-center '>{type2}</div>
          </div>
          <p className='font-inter text-2xl sm:text-4xl mt-4 mb-2'>₹{price}</p>
        </div>
        <div className='flex flex-col justify-end items-center sm:items-end mt-4 sm:mt-0'>
          <button
            className='bg-custom-blue text-white rounded-lg shadow-lg py-2 px-4 text-xl hover:shadow-xl hover:bg-dark-custom-blue transform hover:scale-105 transition duration-200 ease-in-out'
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;
