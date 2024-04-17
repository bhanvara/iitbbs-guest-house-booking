import React, { useEffect, useState } from 'react'
import Logo from '../../Images/logo.png'
import { AppBar, Avatar, IconButton, TextField, Toolbar } from '@mui/material'

import useWindowSize from '../functions/windowSize';

import { PendingActions, Person } from '@mui/icons-material';
import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { useAuth0 } from '@auth0/auth0-react';

interface HeaderProps {
  isSupervisor: boolean;
}

export default function Header({ isSupervisor }: HeaderProps) {
  const StudentDetails = [
    { label: 'Name', value: 'Name of Student', readOnly: true },
    { label: 'Roll no', value: 'Roll number', readOnly: true },
    { label: 'Contact', value: 'Contact number', readOnly: true },
    { label: 'Email', value: 'Email id', readOnly: true },
    { label: 'Batch', value: "2022-2026", readOnly: true },
    { label: 'Department', value: 'Department', readOnly: true },
  ]



  const FacultyDetails = [
    { label: 'Name', value: 'Name of Faculty', readOnly: true },
    { label: 'Contact', value: 'Contact number', readOnly: true },
    { label: 'Email', value: 'Email id', readOnly: true },
  ]

  const [openProfile, setOpenProfile] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenProfile(newOpen);
  };




  let navigate = useNavigate();
  const [hovered, setHovered] = React.useState(null);
  const handleHover = (name: any) => {
    setHovered(name);
  };
  const { width } = useWindowSize();
  const [value, setValue] = React.useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [active, setActive] = React.useState('');

  const { isAuthenticated, logout } = useAuth0();

  type UserType = {
    label: string;
    value: string;
    readOnly: boolean;
  };



  const [userInfo, setUserInfo] = useState<UserType[]>([]);


  //filling the userInfo by fetched data
  useEffect(() => {
    setUserInfo(FacultyDetails);
  }, [])

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>

      <div className='flex flex-row items-end w-1/2 pl-4 justify-start' style={{ maxWidth: '150px' }}>
        <Person />
        <h2 className='pl-4 pt-12 font-semibold font-inter'>My Details</h2>

      </div>

      <hr />

      <List>
        {userInfo.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.label + ':'} />
            <TextField
              variant="outlined"
              value={item.value}
              InputProps={{
                readOnly: true,
                style: { color: 'gray', height: '40px' },

              }}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              sx={{ backgroundColor: 'rgb(244,245,245)', borderRadius: '10px', color: 'gray' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='w-full h-16 mb-1 shadow-md flex flex-row items-center relative text-sm ' style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'white' }}>
      <div className='w-full flex flex-row items-center justify-between p-2'>
        <div className='flex flex-row items-center w-1/2 justify-start cursor-pointer' onClick={() => navigate('/')}>
          <img src={Logo} className='h-8' />
          <p className='ml-2 text-xl font-medium'>Guest House Booking Portal</p>
        </div>
        <div className='flex items-center justify-end'>
          {isAuthenticated && width > 640 &&
            <div className='flex flex-row items-center justify-between w-full font-inter text-gray-700'>
              <div className='flex flex-col items-center hover:bg-primary mx-2 md:mx-3'>
                <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'book' ? 'primary' : 'default'} onClick={() => {
                  navigate('/BookTheRoom');
                  setActive('book');

                }}>
                  <BookIcon />
                </IconButton>
                Book
              </div>
              <div className='flex flex-col items-center px-2 md:mx-3'>
                <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'history' ? 'primary' : 'default'} onClick={() => {
                  navigate('/MyBookings');
                  setActive('history');
                }}>
                  <HistoryIcon />
                </IconButton>
                <div style={{ whiteSpace: 'nowrap' }}>
                  My Bookings
                </div>
              </div>
              {isSupervisor &&
                <div className='flex flex-col items-center mx-2 md:mx-3'>
                  <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'pending' ? 'primary' : 'default'} onClick={() => {
                    navigate('/ApproveBookings');
                    setActive('pending');
                  }}>
                    <PendingActions />
                  </IconButton>
                  Approve
                </div>
              }
              <div className='flex flex-col items-center mx-2 md:mx-3'>
                <IconButton className='transform hover:scale-110 transition duration-300' color={active === 'avatar' ? 'primary' : 'default'} onClick={() => setActive('avatar')}>
                  <PersonIcon onClick={toggleDrawer(true)} />
                </IconButton>
                Me
              </div>
              <Drawer open={openProfile} onClose={toggleDrawer(false)} anchor='right'>
                {DrawerList}
              </Drawer>
            </div>
          }
          <div>
            {isAuthenticated && <Button variant="contained" color="secondary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Logout
            </Button>}
          </div>
        </div>

      </div>
    </div>
  )
}
