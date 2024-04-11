import { ArrowDropDown, ArrowDropUp, CalendarMonth, LocationCity, LocationOn, Mail, Person, Phone } from "@mui/icons-material"
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState } from "react";

interface RequestComponentProps{
    bookingID:string,
    name:string,
    rollno:string,
    hostel:string,
    status:string,
    checkin:string,
    checkout:string,
    type1:string,
    type2:string,
    guest1Name:string,
    guest1Contact:string,
    guest1Email:string,
    guest2Name:string,
    guest2Contact:string,
    guest2Email:string,
}

const hostelLabels: {[key:string]:string | undefined}={
    MHR: 'Mahanadi Hall of Residence',
    GHR: 'Ganga Hall of Residence',
    RHR: 'Rishikulaya Hall of Residence',
    BHR: 'Brahmaputra Hall of Residence',
    SHR: 'Subarnarekha Hall of Residence',
    GH: 'Guest House'
}

function ApprovedRejected({bookingID,name,rollno,hostel,status,checkin,checkout,type1,type2,guest1Name,guest1Contact,guest1Email,guest2Name,guest2Contact,guest2Email}:RequestComponentProps){
    
    const [showDetails, setShowDetails] = useState(false);
    const getStatusColor = (status:any) => {
        switch(status){
            case 'Approved':
                return 'text-green-600 bg-green-200';
            case 'Rejected':
                return 'text-red-600 bg-red-200';
            case 'Pending':
                return 'text-orange-600 bg-orange-200';
            default:
                return '';
        }
    }

    
    return (
        <div className=" w-full border-2 rounded-md shadow-sm flex flex-col p-4 font-inter mb-4">
            <p className="text-xs text-gray-400">#BOOKING ID {bookingID} </p>
            <div className="flex flex-row items-end">
                <p className="font-bold sm:text-3xl text-2xl text-gray-700 font-inter">{name}</p>
                <p className="font-inter text-gray-500 sm:text-2xl text-xl ml-1"> ({rollno}) </p>    
            </div>

            <div className="flex flex-row items-center mt-2">
                <LocationOn style={{color: '#669eba'}} />
                <p className="text-md text-gray-600"> {hostelLabels[hostel]} </p>
            </div>
            
            <div className="flex flex-row items-center mt-2">
                <CalendarMonth style={{color: '#669eba'}} />
                <p className="text-md text-gray-600"> {checkin}-{checkout} </p>
            </div>

            <div className="flex flex-col">

                <div className="flex flex-row items-center mt-2">
                    <ViewListIcon style={{color: '#669eba'}} />
                    <p className="text-md text-gray-600"> Booked Room Details </p>
                </div>
                <div className='flex flex-row sm:w-auto mt-2 space-x-3'>
                    
                    <div className='border-2 rounded-2xl border-gray-700 text-gray-700 p-1 px-1 font-inter text-sm w-16 text-center'>{type1}</div>
                    <div className='border-2 rounded-2xl border-gray-700 p-1 px-2 font-inter text-sm text-gray-700 w-16 text-center '>{type2}</div>
                    
                </div>
            </div>
            
            

            <div className="flex flex-row justify-between items-end mt-4">
                
                    <div className={`border-1 rounded-lg py-2 px-7 font-inter text-lg w-32 ${getStatusColor(status)}`}>{status}</div>
                    <div className="flex flex-row text-sm text-custom-blue underline items-center">
                        <button onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? "View less details" : "View more details"}
                        </button>
                        {showDetails ? <ArrowDropUp /> : <ArrowDropDown />}
                        
                    </div>
                
            </div>

            {showDetails &&
            <div className="mt-3">
                <hr />
                <p className="font-inter text-lg mt-1 text-gray-700">Guest Details</p>
                <div className={`flex flex-row mt-3 text-sm font-inter justify-between sm:w-1/2 text-gray-700 transition-height duration-1000 ${
                    showDetails ? "max-h-full" : "max-h-0"
                }`}>
                    
                    <div className="flex flex-col">
                        
                        <div className="flex flex-row items-center">
                            <Person />
                            <p className="ml-1">{guest1Name}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Phone />
                            <p className="ml-1">{guest1Contact}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Mail />
                            <p className="ml-1">{guest1Email}</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <Person />
                            <p className="ml-1">{guest2Name}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Phone />
                            <p className="ml-1">{guest2Contact}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Mail />
                            <p className="ml-1">{guest2Email}</p>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
        
                        

                
        
    )
}

export default ApprovedRejected;