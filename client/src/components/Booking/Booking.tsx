import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';

interface Review {
  name: string;
  rating: number;
}

interface Tour {
  _id: string;
  title: string;
  city: string;
  address: string;
  distance: number;
  price: number;
  maxGroupSize: number;
  desc: string;
  reviews: Review[];
  avgRating: number;
  file: string;
  featured: boolean;
}

// Define the props interface for Booking
interface BookingProps {
  tour: Tour;
}

const Booking: React.FC<BookingProps> = ({ tour }) => {
  const { id } = useParams<{ id: string }>();

  const { price } = tour;

  // State for form data
  const [guestSize, setGuestSize] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price + 10);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const maxDateObj = new Date(today);
  maxDateObj.setMonth(today.getMonth() + 3);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'guestSize') {
      const guestCount = parseInt(value);
      setGuestSize(guestCount);
      setTotalPrice(guestCount * price + 10);
    }

  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price}<span> /per person</span></h3>
      </div>
      {/* Booking Form */}
      <div className='booking__form'>
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <input type="text" placeholder='Full Name' id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="email" placeholder='Email' id="email" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder='Phone' id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
          <input type="date" id="bookAt" min={minDate} max={maxDate} required onChange={handleChange} />
            <input type="number" placeholder='Guest' id="guestSize" value={guestSize} required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>
      {/* Booking bottom */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price}<i className="ri-close-line"></i> {guestSize} person(s)
            </h5>
            <span> ${price * guestSize}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span> $10</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span> ${totalPrice}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4">Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;
