import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ApproveBookings from './pages/ApproveBookings';
import About from './pages/About';
import BookTheRoom from './pages/BookTheRoom';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login isStudent={true} />} />
        <Route path='/SignUp' element={<SignUp isStudent={true} />} />
        <Route path='/MyBookings' element={<MyBookings />} />
        <Route path='/BookTheRoom' element={<BookTheRoom />} />
        <Route path='/ApproveBookings' element={<ApproveBookings />} />
        <Route path='/About' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
