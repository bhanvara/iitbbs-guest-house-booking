import React, { useState, useCallback} from 'react';
import RoomInfo from './components/Room';
import RoomFilters from './components/RoomFilters';
import dayjs, { Dayjs } from 'dayjs';
import HostelSelection from './components/HostelSelection';
import { useNavigate } from 'react-router-dom';


function BookTheRoom(){
  const navigate=useNavigate();
  
  //some default initialised values
  const choice1Initial='Single';
  const choice2Initial='AC';
  const startDateInitial=dayjs();
  const endDateInitial=dayjs().add(1,'day');
  const sDateInitial=startDateInitial.format('DD/MM/YYYY');
  const sTimeInitial=startDateInitial.format('HH:mm');
  const eDateInitial=endDateInitial.format('DD/MM/YYYY');
  const eTimeInitial=endDateInitial.format('HH:mm');
  const initialised_values={'choice1':choice1Initial,'choice2':choice2Initial,'startDate':startDateInitial,'endDate':endDateInitial,'sDate':sDateInitial,'sTime':sTimeInitial,'eDate':eDateInitial,'eTime':eTimeInitial}
  const [filters,setfilters]=useState(initialised_values);

  
  //function from home page to display the same filters being set in home page: can be removed
  function getFilters(obj:any){
    const choice1=obj.option1;
    const choice2=obj.option2;
    const startDate=obj.startDate;
    const endDate=obj.endDate;
    const sDate=obj.startDate.format('DD/MM/YYYY');
    const sTime=obj.startDate.format('HH:mm');
    const eDate=obj.endDate.format('DD/MM/YYYY');
    const eTime=obj.endDate.format('HH:mm');
    setfilters({'choice1':choice1,'choice2':choice2,'startDate':startDate,'endDate':endDate,'sDate':sDate,'sTime':sTime,'eDate':eDate,'eTime':eTime});
    
    

  }

  //Rooms info
  let rooms = [
  { hostel: 'MHR', description: 'lorem epsum lorem epsum', type1: 'Single', type2: 'AC', price:600, key:1 },
  { hostel: 'GHR', description: 'lorem epsum lorem epsum', type1: 'Double', type2: 'AC', price:600, key:2 },
  { hostel: 'SHR', description: 'lorem epsum lorem epsum', type1: 'Single', type2: 'Non AC', price:600, key:3 }
  ];
  

    
    
  return <div className='h-full' style={{backgroundColor: 'rgb(244,245,245)'}}>
    <RoomFilters buttonText='Apply Filters' passFilters={getFilters} initialised_values={initialised_values}  />
    <div className='flex lg:flex-row flex-col '>
      <HostelSelection />
      <div className='flex flex-col justify-center lg:mr-auto w-full lg:w-3/4 '>
      {rooms.map((room)=> <RoomInfo hostel={room.hostel} description={room.description} type1={room.type1} type2={room.type2} price={room.price}/> )}

        
      </div>
    </div>
    
    

  </div>
}    

    
export default BookTheRoom;
