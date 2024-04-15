import { ArrowDropDown, ArrowDropUp, CalendarMonth, ExpandCircleDown, ExpandCircleDownOutlined, Mail, Person, Phone, ScreenLockLandscape } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import React, { useState } from "react";

interface BookingHistoryProps{
    bookingID:string,
    hostel:string,
    checkin:string,
    checkout:string,
    type1:string,
    type2:string,
    price:number,
    status:string,
    stage: number,
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

function BookingHistoryComponent({bookingID,hostel,checkin,checkout,type1,type2,price,status,stage,guest1Name,guest1Contact,guest1Email,guest2Name,guest2Contact,guest2Email}:BookingHistoryProps){
    
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

    //for the timeline
    interface TimelineProps{
        stage:number;
        status: string,
    }
    
    function Timeline( {stage,status}: TimelineProps ) {
        const stages = ['Supervisor 1', 'Supervisor 2', 'Supervisor 3'];
    
        return(
            <div className="mt-4 flex-1">
                <div className="flex flex-row">
    
                    {stages.map((supervisor, index) => (
                        <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <div className={`w-3 h-3 rounded-full ring-4 ring-transparent transition-all duration-200  ${index<stage ? 'bg-green-400 ring-green-200 hover:ring-8':status==='Rejected' ? 'bg-red-300  ring-4 ring-red-200' : 'bg-gray-200 ' } `}></div>
                            {/* <div className={`w-20 sm:w-36 h-1 bg-gray-300  ${index === 2 ? "hidden" : ""} ${index < stage ? "bg-green-300" : '' }`}></div> */}

                            <div className={`w-20 sm:w-36 h-1 ${index === 2 ? "hidden" : ""} ${index < stage-1 ? "bg-green-300" : status==='Rejected' ? 'bg-red-300':" bg-gray-200" }`}></div>

                        </div>

                        <div className="flex flex-row items-center mt-2">
                            <div className="text-sm font-inter sm:text-md text-gray-500">{stages[index]}</div>

                        </div>
                        </div>
                        
                    ))}
    
                </div>
            </div>
            


        );
    }
    
    

    
    


    return (
        <div className="shadow-md w-full rounded-md border-2 flex flex-col p-4">
            <div className="flex flex-col sm:flex-row font-inter justify-between">
                <div className="flex flex-col">
                    <p className="text-xs text-gray-400">#BOOKING ID {bookingID} </p>
                    <p className="font-medium sm:text-2xl text-xl mt-1 text-gray-700">{hostelLabels[hostel]}</p>
                    <div className="flex flex-row items-center mt-2">
                        <CalendarMonth style={{color: '#669eba'}} />
                        <p className="text-sm text-gray-500"> {checkin}-{checkout} </p>
                    </div>
                    <div className='flex flex-row sm:w-auto mt-4 space-x-3'>
                        <div className='border-2 rounded-2xl border-gray-700 text-gray-700 p-1 px-1 font-inter text-sm w-16 text-center '>{type1}</div>
                        <div className='border-2 rounded-2xl border-gray-700 p-1 px-2 font-inter text-sm text-gray-700 w-16 text-center '>{type2}</div>
                        
                    </div>
                    <p className='font-inter text-2xl sm:text-3xl mt-6 mb-2 font-medium text-gray-700'>₹{price}</p>
                </div>
                <div className="flex flex-row sm:flex-col justify-between items-end">
                    <div className={`border-1 rounded-lg py-2 px-7 font-inter text-lg w-32 ${getStatusColor(status)}`}>{status}</div>
                    <div className="flex flex-row text-sm text-custom-blue underline items-center">
                        <button onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? "View less details" : "View more details"}
                        </button>
                        {showDetails ? <ArrowDropUp /> : <ArrowDropDown />}
                        
                    </div>
                </div>
            </div>
            
            {showDetails &&
            <div className="mt-1">
                {status!=='Approved' && 
                <div>
                <hr />
                <p className="font-inter text-lg mt-1 text-gray-700">Status</p>
                
                <Timeline stage={stage} status={status} />
                </div>}
                
                <hr className="mt-4" />
                <p className="font-inter text-lg mt-1 text-gray-700">Guest Details</p>
            <div className={`mt-2 flex flex-col text-sm font-inter justify-between sm:w-1/2 text-gray-700 transition-height duration-1000 ${
                showDetails ? "max-h-full" : "max-h-0"
            }`}>
                <div className="flex flex-row justify-between">
                
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
            </div>
            }
            
        </div>
    )
}

export default BookingHistoryComponent;