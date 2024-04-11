
import React from 'react'
import Logo from '../../Images/logo.png'
import { AppBar, Avatar, IconButton, Toolbar } from '@mui/material'

import useWindowSize from '../functions/windowSize';

import { PendingActions } from '@mui/icons-material';
import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  let navigate=useNavigate();
  const [hovered, setHovered] = React.useState(null);
  const handleHover = (name:any) => {
    setHovered(name);
  };
  const {width}=useWindowSize();
  const [value, setValue] = React.useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [active, setActive] = React.useState('');

  return (
    <div className='w-full h-16 mb-1 shadow-md flex flex-row items-center relative text-sm '  style={{ position: 'sticky', top: 0, zIndex: 100,backgroundColor: 'white' }}>      
      <div className='w-full flex flex-row items-center justify-between p-2' style={{maxWidth: '1064px',margin: '0 auto'}}>
        <div className='flex flex-row items-center w-full cursor-pointer' style={{maxWidth: '370px'}} onClick={()=>navigate('/')}>
            <img src={Logo} className='h-8' />
          <p className='ml-1 text-xl font-medium'>Guest House Booking Portal</p>
        </div>
        { width > 640 &&
          <div className='flex flex-row justify-between w-1/3 font-inter text-gray-700'>
            <div className='flex flex-col items-center hover:bg-primary '>
              <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'book' ? 'primary' : 'default'} onClick={() =>{
                navigate('/BookTheRoom');
                setActive('book');
              
              }}>
                <BookIcon />
              </IconButton>
              Book
            </div>
          <div className='flex flex-col items-center'>
            <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'history' ? 'primary' : 'default'} onClick={() =>{
              navigate('/MyBookings');
              setActive('history');
            }}>
              <HistoryIcon />
            </IconButton>
            History
          </div>
          <div className='flex flex-col items-center'>
          <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'pending' ? 'primary' : 'default'} onClick={() =>{
              navigate('/ApproveBooking');
              setActive('pending');
            }}>
            <PendingActions />
            
          </IconButton>
          Pending
          </div>
          <div className='flex flex-col items-center'>
            <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'avatar' ? 'primary' : 'default'} onClick={() => setActive('avatar')}>
              <PersonIcon />
            </IconButton>
            Avatar
          </div>
        </div>
          
        }
      </div>
    </div>

    

    



        

  )
}