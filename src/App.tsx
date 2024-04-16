import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ApproveBookings from './pages/ApproveBookings';
import About from './pages/About';
import BookTheRoom from './pages/BookTheRoom';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import SignUp from './pages/SignUp';
import Header from './pages/components/Header';
import MobileButtonNavigation from './pages/components/MobileButtonNavigation';
import useWindowSize from './pages/functions/windowSize';
import BookingForm from './pages/BookingForm';



function AppContent() {
  const location = useLocation();
  const { width } = useWindowSize();

  return (
    <>
      {!['/Login', '/SignUp'].includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/MyBookings' element={<MyBookings />} />
        <Route path='/BookTheRoom' element={<BookTheRoom />} />
        <Route path='/ApproveBookings' element={<ApproveBookings />} />
        <Route path='/About' element={<About />} />
        <Route path='/BookingForm/:roomID' element={<BookingForm roomID={location.pathname.split('/')[2]} />} />
      </Routes>
      {width <= 640 && <MobileButtonNavigation isSupervisor={true} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent /> {/* Our new component */}
    </BrowserRouter>
  );
}

export default App;
