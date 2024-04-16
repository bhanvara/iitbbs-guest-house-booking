import React, { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ApproveBookings from './pages/ApproveBookings';
import About from './pages/About';
import BookTheRoom from './pages/BookTheRoom';
import Auth from './pages/Auth';
import MyBookings from './pages/MyBookings';
import Header from './pages/components/Header';
import MobileButtonNavigation from './pages/components/MobileButtonNavigation';
import useWindowSize from './pages/functions/windowSize';
import BookingForm from './pages/BookingForm';
import { Navigate } from 'react-router';

import { useAuth0 } from "@auth0/auth0-react";

function AppContent() {
  const location = useLocation();
  const { width } = useWindowSize();
  const { isAuthenticated } = useAuth0();

  const routing = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Auth', element: <Auth /> },
    { path: '/MyBookings', element: isAuthenticated ? <MyBookings /> : <Navigate to="/Auth" /> },
    { path: '/BookTheRoom', element: isAuthenticated ? <BookTheRoom /> : <Navigate to="/Auth" /> },
    { path: '/ApproveBookings', element: isAuthenticated ? <ApproveBookings /> : <Navigate to="/Auth" /> },
    { path: '/BookingForm', element: isAuthenticated ? <BookingForm /> : <Navigate to="/Auth" /> },
    { path: '/About', element: isAuthenticated ? <About /> : <Navigate to="/Auth" /> },
  ]);

  return (
    <>
      {!['/Auth'].includes(location.pathname) && <Header />}
      {routing}
      {isAuthenticated && width <= 640 && <MobileButtonNavigation isSupervisor={true} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;