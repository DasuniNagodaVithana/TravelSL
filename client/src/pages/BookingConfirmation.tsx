import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';
import { FaCalendarCheck } from 'react-icons/fa';
import '../styles/booking-confirmation.css'; // Import the CSS file

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const details = {
      title: queryParams.get('title') || 'No Title',
      fullName: queryParams.get('fullName') || 'No Name',
      email: queryParams.get('email') || 'No Email',
      phone: queryParams.get('phone') || 'No Phone',
      guestSize: queryParams.get('guestSize') || '0',
      bookAt: queryParams.get('bookAt') || 'No Date',
      totalPrice: queryParams.get('totalPrice') || '0',
    };

    console.log('Extracted Booking Details:', details);

    setBookingDetails(details);

    // Calculate countdown to the starting date
    if (details.bookAt !== 'No Date') {
      const startDate = new Date(details.bookAt);
      const now = new Date();
      const timeDiff = startDate.getTime() - now.getTime();
      setCountdown(Math.max(Math.floor(timeDiff / (1000 * 60 * 60 * 24)), 0)); // days remaining
    }
  }, [location.search]);

  if (!bookingDetails) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <Container className="booking-confirmation-container">
      <h2>Your Trip to {bookingDetails.title} has been Booked!</h2>
      <div>
        <h4>Booking Information:</h4>
        <p>Full Name: {bookingDetails.fullName}</p>
        <p>Email Address: {bookingDetails.email}</p>
        <p>Phone: {bookingDetails.phone}</p>
        <p>Number of People: {bookingDetails.guestSize}</p>
        <p>Tour Date: {bookingDetails.bookAt}</p>
        <p>Total Cost: ${bookingDetails.totalPrice}</p>
        <div className="countdown">
          <p>{countdown} days remaining</p>
          <FaCalendarCheck />
        </div>
      </div>
    </Container>
  );
};

export default BookingConfirmation;
