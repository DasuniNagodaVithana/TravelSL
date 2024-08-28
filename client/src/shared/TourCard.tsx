import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import './tour-card.css';

// Define the interface for Tour
interface Tour {
  _id: string;
  title: string;
  city: string;
  file: string;
  price: number;
  featured: boolean;
  avgRating: number;
  reviews: { name: string; rating: number }[];
}

// Define the interface for TourCardProps
interface TourCardProps {
  tour: Tour;
}

// Define the TourCard component
const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { _id, title, city, file, price, featured, avgRating } = tour;
  const navigate = useNavigate();

  // Function to check if the user is logged in
  const isAuthenticated = () => {
    return !!sessionStorage.getItem('userId');
  };

  // Function to handle "Book Now" button click
  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      navigate(`/tours/${_id}`);
    } else {
      alert("Please log in to view the full tour.");
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top before navigating
      navigate('/login'); // Navigate to the login page
    }
  };

  return (
    <div className='tour__card'>
      <Card>
        <div className='tour__img'>
          <img src={file} alt={`${title} image`} />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className='card__top d-flex align-items-center justify-content-between'>
            <span className='tour__location d-flex align-items-center gap-1'>
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className='tour__rating d-flex align-items-center gap-1'>
              <i className="ri-star-fill"></i> {avgRating === 0 ? 'Not rated' : avgRating}
            </span>
          </div>
          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>${price} <span>/ per person</span></h5>
            <button className='btn booking__btn' onClick={handleBookNowClick}>
              Book Now
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TourCard;
