import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';

import BookIcon from '@mui/icons-material/Book';

import HomeIcon from '@mui/icons-material/Home';
import { PendingActions, Person } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
interface MobileButtonNavigationProps {
    isSupervisor: boolean;
};

export default function MobileButtonNavigation({isSupervisor}:MobileButtonNavigationProps) {
  const StudentDetails=[
    { label: 'Name', value: 'Name of Student', readOnly: true },
    { label: 'Roll no', value: 'Roll number', readOnly: true },
    { label: 'Contact', value: 'Contact number', readOnly: true },
    { label: 'Email', value: 'Email id', readOnly: true },
    { label: 'Batch', value: "2022-2026", readOnly: true },
    { label: 'Department', value: 'Department', readOnly: true },
  ]



  const FacultyDetails=[
    { label: 'Name', value: 'Name of Faculty', readOnly: true },
    { label: 'Contact', value: 'Contact number', readOnly: true },
    { label: 'Email', value: 'Email id', readOnly: true },
  ]

  type UserType = {
    label: string;
    value: string;
    readOnly: boolean;
  };


  const [userInfo, setUserInfo] = useState<UserType[]>([]);
  const [openProfile, setOpenProfile] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname; 

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenProfile(newOpen);
  };


   //filling the userInfo by fetched data
   useEffect(()=>{
    setUserInfo(FacultyDetails);
   },[])
   
   const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
    
    <div className='flex flex-row items-end w-1/2 pl-4 justify-start' style={{maxWidth: '150px'}}>
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
                style: {color:'gray',height: '40px'},
                
              }}
              onClick={(e:any)=>{e.preventDefault();
                e.stopPropagation();
              }}
              sx={{backgroundColor: 'rgb(244,245,245)',borderRadius: '10px',color:'gray'}}
              
            />
        </ListItem>
      ))}
    </List>
    
    

    </Box>
  );

  
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

