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

  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [userId, setUserId] = useState(null);
  const [isSupervisor, setIsSupervisor] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!isLoading && isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          console.log(token);
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/getuserid/${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setUserId(response.data.id);
        } catch (error) {
          console.error('There was an error!', error);
        }
      }
    };
    fetchUserId();
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently]);
  
  useEffect(() => {
    const checkIfSupervisor = async () => {
      if (!isLoading && userId) {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/issupervisor/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setIsSupervisor(response.data.isSupervisor);
        } catch (error) {
          console.error('There was an error!', error);
        }
      }
    };
    checkIfSupervisor();
  }, [isLoading, userId, getAccessTokenSilently]);
  
  const routing = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Auth', element: <Auth /> },
    { path: '/MyBookings', element: !isLoading && isAuthenticated ? <MyBookings userId={userId} /> : <Navigate to="/Auth" /> },
    { path: '/BookTheRoom', element: !isLoading && isAuthenticated ? <BookTheRoom /> : <Navigate to="/Auth" /> },
    { path: '/ApproveBookings', element: !isLoading && isAuthenticated ? <ApproveBookings userId={userId} /> : <Navigate to="/Auth" /> },
    { path: '/BookingForm', element: !isLoading && isAuthenticated ? <BookingForm /> : <Navigate to="/Auth" /> },
    { path: '/About', element:< About />},
  ]);

  return (
    <>
      {!['/Auth'].includes(location.pathname) && <Header isSupervisor={isSupervisor}/>}
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