import { ArrowDropDown, ArrowDropUp, CalendarMonth, ExpandCircleDown, ExpandCircleDownOutlined, Mail, Person, Phone, ScreenLockLandscape } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import React, { useState } from "react";

function BookingHistoryComponent(){
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="shadow-md w-full rounded-md border-2 flex flex-col p-4">
            <div className="flex flex-col sm:flex-row font-inter justify-between">
                <div className="flex flex-col">
                    <p className="text-xs text-gray-400">#BOOKING ID 818176896543</p>
                    <p className="font-medium sm:text-2xl text-xl mt-1">Mahanadi Hall of Residence</p>
                    <div className="flex flex-row items-center mt-2">
                        <CalendarMonth />
                        <p className="text-sm">14th March-16th March 2024</p>
                    </div>
                    <div className='flex flex-row sm:w-auto mt-4 space-x-3'>
                        <div className='border-2 rounded-2xl border-gray-700 text-gray-700 p-1 px-1 font-inter text-sm '>Non AC</div>
                        <div className='border-2 rounded-2xl border-gray-700 p-1 px-2 font-inter text-sm text-gray-700 '>Single</div>
                        
                    </div>
                    <p className='font-inter text-2xl sm:text-3xl mt-6 mb-2 font-medium text-gray-800'>₹600</p>
                </div>
                <div className="flex flex-row sm:flex-col justify-between items-end">
                    <div className='border-1 rounded-lg border-green-600 bg-green-200 text-green-600 py-2 px-7 font-inter text-lg '>Success</div>
                    <div className="flex flex-row text-sm text-custom-blue underline items-center">
                        <button onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? "View less details" : "View more details"}
                        </button>
                        {showDetails ? <ArrowDropUp /> : <ArrowDropDown />}
                        
                    </div>
                </div>
            </div>
            
            {showDetails &&
            <div className="flex flex-row mt-3 text-sm font-inter justify-between sm:w-1/2 text-gray-800">
                
                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <Person />
                        <p className="ml-1">Guest Name 1</p>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        <Phone />
                        <p className="ml-1">Contact 1</p>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        <Mail />
                        <p className="ml-1">Guest Mail 1</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <Person />
                        <p className="ml-1">Guest Name 2</p>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        <Phone />
                        <p className="ml-1">Contact 2</p>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        <Mail />
                        <p className="ml-1">Guest Mail 2</p>
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}

export default BookingHistoryComponent;