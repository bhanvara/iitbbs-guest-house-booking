import React from 'react'
import RoomFilters from './components/RoomFilters';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { Navigate, useNavigate } from 'react-router-dom';
import iitbbshero from '../Images/iitbbshero4.jpg';
import CarouselComponent from './components/ImageCarousel';
import { Footer } from './components/Footer';



export default function Home() {
  //stores the information about filters applied
  const [filters,setfilters]=useState({});
  const navigate=useNavigate();
  function getFilters(obj:any){
    try{
      const choice1=obj.option1;
      const choice2=obj.option2;
      const sDate=obj.startDate.format('DD/MM/YYYY');
      const sTime=obj.startDate.format('HH:mm');
      const eDate=obj.endDate.format('DD/MM/YYYY');
      const eTime=obj.endDate.format('HH:mm');
      setfilters({'choice1':choice1,'choice2':choice2,'sDate':sDate,'sTime':sTime,'eDate':eDate,'eTime':eTime});
      
      navigate('/BookTheRoom'); 
    }
    catch (err) {
      return alert('Error: Please fill in all the details');
    }
  }
  interface HostelComponentProps{
    hostel:string,
    description:string,
    hostelLabel:string,
  }

  function HostelComponent1({hostel,description,hostelLabel}:HostelComponentProps){
    return (<div className='p-4 sm:w-8/12 md:mx-auto mb-8'>
    <h2 className='sm:text-3xl text-2xl mb-4 text-gray-800 font-semibold' style={{textShadow: '2px 2px 4px rgba(0,0,0,0.15)'}}>{hostel}</h2>
    <div className='flex md:flex-row flex-col justify-between items-center '>
      <div className='w-full sm:w-3/4'>
        {/* <img src='https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg' className='rounded-md' style={{width: '700px'}} /> */}
        <CarouselComponent hostelLabel={hostelLabel} />
      </div>
      <div className='md:w-3/4 md:ml-12 mt-4'>
        <p className='font-inter text-gray-500'>{description}</p>
      </div>
    </div>
  </div>);
  }

  function HostelComponent2({hostel,description,hostelLabel}:HostelComponentProps){
    return (<div className='p-4 sm:w-8/12 md:mx-auto mt-4 mb-8'>
    <h2 className='sm:text-3xl text-2xl mb-4 tracking-tight text-gray-800 font-semibold ' style={{textShadow: '2px 2px 4px rgba(0,0,0,0.15)'}} >{hostel}</h2>
    <div className='flex md:flex-row-reverse flex-col justify-between items-center '>
      <div className='w-full sm:w-3/4'>
        {/* <img src='https://www.iitbbs.ac.in/guesth-photos/go-pan-2.jpg' className='rounded-md' style={{width: '700px'}} /> */}
        <CarouselComponent hostelLabel={hostelLabel} />
      </div>
      <div className='sm:w-3/4 sm:mr-12 mt-4'>
        <p className='font-inter text-gray-500'>{description}</p>
      </div>
    </div>
  </div>);
  }
  return (
   
  <div>
  <div className="bg-white h-screen">
  

    <div className="relative isolate px-6 pt-2 lg:px-8 h-full">
        <div className=''>
          <img src={iitbbshero} className="absolute inset-0 w-full h-full object-cover " alt="background" style={{maxHeight: '700px',objectPosition: 'center center'}}  />
          <div className="absolute inset-0 bg-black bg-opacity-65 flex items-center justify-center " style={{maxHeight: '700px'}}>
            <div className='text-center z-40'>
              {/* <h1 className="text-white text-6xl font-bold font-inter m-auto text-center tracking-wide leading-relaxed md:w-3/4 " style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>Welcome to IIT BBS Guest House Booking Portal</h1> */}
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">IIT BBS Guest House Booking Portal</h1>
              <p className="mt-6 text-md sm:text-lg sm:leading-8 w-3/4 mx-auto text-white">Welcome to the IIT Bhubaneswar Guest House Booking Portal</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
              <a className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group"
                onClick={()=>{navigate('/BookTheRoom')}}>
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Book Room</span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white hover:underline transition-all duration-75">Learn more <span aria-hidden="true">→</span></a>

            </div>
          </div>
          <div className={`absolute inset-x-0 bottom-0 z-20 transform-gpu overflow-hidden blur-3xl sm:bottom-0" aria-hidden="true`}>
              <div className={`relative left-0 w-full h-[5rem] bg-gradient-to-t from-[#2230a5] to-[#8b96e8] opacity-100`}></div>
          </div>

        </div>

      </div>
      
    </div>
  </div>
  <div className='mt-5'>
    <h2 className='text-center font-inter text-4xl sm:text-6xl font-bold tracking-tight text-gray-800 mb-8' style={{textShadow: '2px 2px 4px rgba(0,0,0,0.10)'}}>Our Accomodation</h2>
    <div className='flex flex-col'>
      <HostelComponent1 hostel="Guest House" 
      hostelLabel='GH'
      description='
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ad ex nobis incidunt placeat neque consequatur quis odit id cupiditate minus, vel nulla iste tenetur numquam praesentium accusamus reiciendis consectetur?'/>
      <HostelComponent2 hostel="Mahanadi Hall of Residence" 
      hostelLabel='MHR'
      description='
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ad ex nobis incidunt placeat neque consequatur quis odit id cupiditate minus, vel nulla iste tenetur numquam praesentium accusamus reiciendis consectetur?' />
      <HostelComponent1 hostel="Ganga Hall of Residence" 
      hostelLabel='GHR'
      description='
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ad ex nobis incidunt placeat neque consequatur quis odit id cupiditate minus, vel nulla iste tenetur numquam praesentium accusamus reiciendis consectetur?' />
      <HostelComponent2 hostel="Brahmaputra Hall of Residence" 
      hostelLabel='BHR'
      description='
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ad ex nobis incidunt placeat neque consequatur quis odit id cupiditate minus, vel nulla iste tenetur numquam praesentium accusamus reiciendis consectetur?' />
      <HostelComponent1 hostel="Subarnarekha Hall of Residence" 
      hostelLabel='SHR'
      description='
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ad ex nobis incidunt placeat neque consequatur quis odit id cupiditate minus, vel nulla iste tenetur numquam praesentium accusamus reiciendis consectetur?' />
      <HostelComponent2 hostel="Rishikulya Hall of Residence" 
      hostelLabel='RHR'
      description='
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ad ex nobis incidunt placeat neque consequatur quis odit id cupiditate minus, vel nulla iste tenetur numquam praesentium accusamus reiciendis consectetur?' />
    </div>
    
  </div>

  <Footer />

  </div>

  );
}
