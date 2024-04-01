

import * as React from 'react';
import { Box } from '@mui/system';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PropertyLabel from './PropertyLabel';


const HotelCard = () => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', p:2 }}>
      <CardMedia
        component="img"
        sx={{ width: '25%', objectFit: 'cover', maxHeight:'200px'}}
        image="https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg"
        alt="hotel"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '75%', maxHeight: '400px' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5">Hostel Name</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <LocationOnIcon color="action" style={{ color: '#0b528bd0' }} />
            <Typography variant="subtitle1" style={{ color: '#0b528bd0', fontSize: '1rem' }}>Location</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <PropertyLabel text="Non AC" />
            <PropertyLabel text="Double" />
          </Box> 
        </CardContent>
        <Box sx={{ px: 2}}>
          <Typography variant="h6" color="text.primary" style={{paddingBottom: '10px' }}>
            Price: $100
          </Typography>
          <Button size="small" variant="contained">
            Book Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default HotelCard;
