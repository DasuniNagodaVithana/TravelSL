import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import '../styles/bookings.css';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email') || '';

    if (email) {
      // Fetch the bookings from localStorage using the email
      const userBookings = JSON.parse(localStorage.getItem(email) || '[]');
      setBookings(userBookings);
    } else {
      // Fetch bookings from localStorage when no email is provided
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(storedBookings);
    }
  }, [location.search]);

  return (
    <Container style={{ marginTop: '120px' }}>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <Card key={index} className="mb-3">
            <CardBody>
              <CardTitle>{booking.title}</CardTitle>
              <CardText>
                <strong>Date:</strong> {booking.bookAt}<br />
                <strong>Guests:</strong> {booking.guestSize}<br />
                <strong>Total Cost:</strong> ${booking.totalPrice}
              </CardText>
            </CardBody>
          </Card>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </Container>
  );
};

export default Bookings;
