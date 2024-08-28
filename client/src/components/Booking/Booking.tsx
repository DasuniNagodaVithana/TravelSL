import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import './Booking.css';

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

interface BookingProps {
  tour: Tour;
}

const Booking: React.FC<BookingProps> = ({ tour }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { price, title } = tour;

  const [guestSize, setGuestSize] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price + 10);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bookAt: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const maxDateObj = new Date(today);
  maxDateObj.setMonth(today.getMonth() + 3);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === 'guestSize') {
      const guestCount = parseInt(value);
      setGuestSize(guestCount);
      setTotalPrice(guestCount * price + 10);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, phone, bookAt } = formData;
    if (!fullName || !email || !phone || !bookAt) {
      setFormError('Please fill out all fields.');
      return;
    }

    const bookingData = {
      tourId: id,
      fullName,
      email,
      phone,
      bookAt,
      guestSize,
      totalPrice,
    };

    try {
      const response = await fetch('http://localhost:3001/userBookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking.');
      }

      setFormError(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        bookAt: '',
      });
      setGuestSize(1);
      setTotalPrice(price + 10);

      // Navigate to confirmation page
      navigate(`/booking-confirmation?title=${title}&fullName=${fullName}&email=${email}&phone=${phone}&guestSize=${guestSize}&bookAt=${bookAt}&totalPrice=${totalPrice}`);
    } catch (error) {
      setFormError((error as Error).message);
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
        <Form className="booking__info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input type="text" placeholder='Full Name' id="fullName" required onChange={handleChange} value={formData.fullName} />
          </FormGroup>
          <FormGroup>
            <input type="email" placeholder='Email' id="email" required onChange={handleChange} value={formData.email} />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder='Phone' id="phone" required onChange={handleChange} value={formData.phone} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" min={minDate} max={maxDate} required onChange={handleChange} value={formData.bookAt} />
            <input type="number" placeholder='Guest' id="guestSize" value={guestSize} required onChange={handleChange} />
          </FormGroup>
          {formError && <p className="form-error" style={{ color: 'red' }}>{formError}</p>}
          {/* Move the button below the total price */}
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
        <Button type="submit" className="btn primary__btn w-100 mt-4" onClick={handleSubmit}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;
