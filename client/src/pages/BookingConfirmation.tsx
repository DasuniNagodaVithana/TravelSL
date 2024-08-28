import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import { FaCalendarCheck } from 'react-icons/fa';
import '../styles/booking-confirmation.css';
import axios from 'axios';  // Import axios for making HTTP requests

const BookingConfirmation: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [emailSent, setEmailSent] = useState<boolean>(false); // New state for email status

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const details = {
      title: queryParams.get('title') || 'No Title',
      fullName: queryParams.get('fullName') || 'No Name',
      email: queryParams.get('email') || 'No Email',
      phone: queryParams.get('phone') || 'No Phone',
      guestSize: queryParams.get('guestSize') || '0',
      bookAt: queryParams.get('bookAt') || 'No Date',
      totalPrice: queryParams.get('totalPrice') || '0',
    };

    setBookingDetails(details);

    // Save booking details to localStorage
    if (details.email && details.email !== 'No Email') {
      const existingBookings = JSON.parse(localStorage.getItem(details.email) || '[]');
      existingBookings.push(details);
      localStorage.setItem(details.email, JSON.stringify(existingBookings));
    }

    // Calculate countdown to the starting date
    if (details.bookAt !== 'No Date') {
      const startDate = new Date(details.bookAt);
      const now = new Date();
      const timeDiff = startDate.getTime() - now.getTime();
      setCountdown(Math.max(Math.floor(timeDiff / (1000 * 60 * 60 * 24)), 0)); // days remaining
    }

    // Send email with booking details
    if (details.email && details.email !== 'No Email') {
      axios.post('http://localhost:3001/send-booking-email', details)
        .then(() => setEmailSent(true))
        .catch(error => console.error('Error sending email:', error));
    }
  }, []);

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
      {emailSent ? (
        <p>Please check your email for confirmation and further details.</p>
      ) : (
        <Button color="primary">Processing...</Button>
      )}
    </Container>
  );
};

export default BookingConfirmation;
