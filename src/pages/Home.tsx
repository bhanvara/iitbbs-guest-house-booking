import React from 'react'
import RoomFilters from './components/RoomFilters'
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Home() {
  //stores the information about filters applied
  const [filters,setfilters]=useState({});
  const navigate=useNavigate();
  function getFilters(obj:any){
    const choice1=obj.option1;
    const choice2=obj.option2;
    const sDate=obj.startDate.format('DD/MM/YYYY');
    const sTime=obj.startDate.format('HH:mm');
    const eDate=obj.endDate.format('DD/MM/YYYY');
    const eTime=obj.endDate.format('HH:mm');
    setfilters({'choice1':choice1,'choice2':choice2,'sDate':sDate,'sTime':sTime,'eDate':eDate,'eTime':eTime});
    
    navigate('/BookTheRoom'); //if navigate also declared here, it doesn't allow

  }

  return (
    <div>
      <RoomFilters buttonText="Search" passFilters={getFilters} initialised_values={{}} />
    </div>
  )
}
