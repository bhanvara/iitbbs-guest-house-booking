import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';

import BookIcon from '@mui/icons-material/Book';
import { Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { PendingActions } from '@mui/icons-material';
interface MobileButtonNavigationProps {
    isSupervisor: boolean;
};


export default function MobileButtonNavigation({isSupervisor}:MobileButtonNavigationProps) {
  
  const [value, setValue] = React.useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'sticky', bottom: 0, zIndex: 20 }} elevation={3}>
        <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
        />
        <BottomNavigationAction
            label="Book"
            value="book"
            icon={<BookIcon />}
        />
        <BottomNavigationAction
            label="History"
            value="history"
            icon={<RestoreIcon />}
        />

        
        {isSupervisor===true && <BottomNavigationAction label="Pending" value="pending" icon={<PendingActions />} />}
        </BottomNavigation>
    </Paper>
  );
}
