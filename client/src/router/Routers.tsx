import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import About from '../pages/About';
import UserProfile from '../pages/UserProfile';
import TourFullDetails from '../pages/TourFullDetails';
import BookingConfirmation from '../pages/BookingConfirmation';
import Bookings from '../pages/Bookings';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:_id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/*<Route path="/search-results" element={<SearchResultList />} />*/}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  );
};

export default Routers;
