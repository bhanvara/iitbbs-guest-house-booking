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
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

function AppContent() {
  const location = useLocation();
  const { width } = useWindowSize();

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userId, setUserId] = useState(null);
  const [isSupervisor, setIsSupervisor] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/getuserid/${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setUserId(response.data.id);
          console.log(userId);
        } catch (error) {
          console.error('There was an error!', error);
        }
      }
    };
    fetchUserId();
  }, [isAuthenticated, user]);

  useEffect(() => {
    console.log("from check supervisor",userId);
    const checkIfSupervisor = async () => {
      if (userId) {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/issupervisor/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setIsSupervisor(response.data.isSupervisor);
          console.log(isSupervisor);
        } catch (error) {
          console.error('There was an error!', error);
        }
      }
    };
    checkIfSupervisor();
  }, [userId]);

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
      {isAuthenticated && width <= 640 && <MobileButtonNavigation isSupervisor={isSupervisor} />}
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