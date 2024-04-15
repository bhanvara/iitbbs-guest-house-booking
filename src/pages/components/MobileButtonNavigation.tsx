import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';

import BookIcon from '@mui/icons-material/Book';
import { Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { PendingActions, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
interface MobileButtonNavigationProps {
    isSupervisor: boolean;
};


export default function MobileButtonNavigation({isSupervisor}:MobileButtonNavigationProps) {
  
  const [value, setValue] = React.useState('home');
  let navigate=useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'sticky', bottom: 0, zIndex: 20, fontSize: '0.5rem' }} elevation={3}>
        <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
            onClick={()=>{navigate('/')}}
        />
        <BottomNavigationAction
            label="Book"
            value="book"
            icon={<BookIcon />}
            onClick={()=>{navigate('/BookTheRoom')}}
        />
        <BottomNavigationAction
            label="Bookings"
            value="history"
            icon={<RestoreIcon />}
            onClick={()=>{navigate('/MyBookings')}}
        />

        
        {isSupervisor===true && <BottomNavigationAction label="Approve" value="pending" icon={<PendingActions />} onClick={()=>{navigate('/ApproveBookings')}}/>}
        <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<Person />}
            
        />
        </BottomNavigation>
        
    </Paper>
  );
}

