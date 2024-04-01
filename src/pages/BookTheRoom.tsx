import React, { useState, useCallback} from 'react';
import RoomInfo from './components/Room';
import RoomFilters from './components/RoomFilters';
import { Dayjs } from 'dayjs';
import './BookTheRoom.css'
import HostelSelection from './components/HostelSelection';

function BookTheRoom(){
    
  

    
    
    return <div style={{ marginTop: '20px' }}>
      <RoomFilters/>
      <div className='main-band-with-hostel-selection'>
        <HostelSelection />
        <div className='room-band'>
          <RoomInfo />
        </div>
      </div>
        
      

    </div>
}    

    
export default BookTheRoom;
