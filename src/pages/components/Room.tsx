

import * as React from 'react';
import { Box } from '@mui/system';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageCarousel from './ImageCarousel';
import { useNavigate } from 'react-router-dom';



function RoomInfo(){
  let navigate=useNavigate();
  return (

    <div className='bg-white flex flex-col sm:flex-row w-full mt-8 mx-1 lg:p-6 p-2 rounded-lg' style={{maxWidth: '1050px'}}>
    <div className='w-full sm:w-1/4 lg:w-1/2'>
      <img src="https://www.iitbbs.ac.in/cst/images/campus/MHR.jpg" className='rounded-md w-full' />
      
    </div>
    <div className='flex flex-col sm:flex-row lg:w-full ml-5 mt-4 sm:mt-0' >
      <div className='flex flex-col justify-between w-full sm:w-auto'>
        <div className='flex flex-row space-x-2'>
          <h2 className='font-inter text-xl font-medium '>Mahanadi Hall </h2>
          <a href='https://www.google.com/maps/dir//Dattu+Kumar+B-539,+Mahanadi+Hall+Of+Residence,+IIT+Bhubaneswar+Arugul,+Kansapada,+via,+Jatni,+Odisha+752050/@20.1493339,85.5831291,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a190916ac2437ef:0xd073dbc6624b9982!2m2!1d85.6655323!2d20.1494143?entry=ttu'>
            <LocationOnIcon color='primary' className='hover:text-dark-custom-blue hover:scale-125 hover:shadow-sm focus:scale-125 focus:text-dark-custom-blue transition duration-300 ease-linear '/>
          </a>
        </div>
        
        <p className='text-gray-600 text-inter text-sm'> Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </p>
        <div className='flex flex-row sm:w-auto mt-2 space-x-3'>
          <div className='border-2 rounded-2xl border-gray-800 text-gray-800 p-1 font-inter text-sm '>Non AC</div>
          <div className='border-2 rounded-2xl border-black p-1 font-inter text-sm text-gray-800 '>Single</div>
          
        </div>
        <p className='font-inter text-xl sm:text-4xl mt-4 mb-2'>₹600</p>
      </div>
      <div className='flex flex-col justify-end items-center sm:items-end w-full mt-4 sm:mt-0'>
        <button 
        className='bg-custom-blue text-white rounded-lg shadow-lg py-2 px-4 text-xl hover:shadow-xl hover:bg-dark-custom-blue transform hover:scale-105 transition duration-200 ease-in-out'
        onClick={()=>{navigate('/BookingForm')}}
        >Book Now</button>
      </div>
    </div>
  </div>


  );
}
export default RoomInfo
