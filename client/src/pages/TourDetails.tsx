import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Booking from '../components/Booking/Booking';
import avatar from '../assets/images/avatar.png';
import '../styles/tour-details.css';
import axios from 'axios';
import { FaCheck, FaTimes, FaClock, FaUtensils, FaBus, FaMapMarkerAlt, FaCity, FaUser, FaStar } from 'react-icons/fa';

interface IReview {
  name: string;
  rating: number;
}

interface ITour {
  _id: string;
  title: string;
  city: string;
  address: string;
  distance: number;
  price: number;
  maxGroupSize: number;
  desc: string;
  reviews: IReview[];
  avgRating: number;
  file: string;
  featured: boolean;
  startFrom: string;
  startTime: string;
  arrivalTime: string;
  activities: string[];
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  departureCity: string;
  transportMode: string;
  tourGuide: boolean;
}

const TourDetails: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const reviewMsgRef = useRef<HTMLInputElement>(null);
  const [tour, setTour] = useState<ITour | null>(null);
  const [tourRating, setTourRating] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tours/'+_id);
        console.log(response.data)
        setTour(response.data);
        
      } catch (err) {
        setError('Failed to fetch tour details');
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  const { file, title, desc, price, reviews,  city, distance, maxGroupSize, startFrom, startTime, arrivalTime, activities, breakfast, lunch, dinner, departureCity, transportMode, tourGuide } = tour;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current?.value;
    alert(`Rating: ${tourRating}, Review: ${reviewText}`);
  };

  return (
    <section className='tour__section'>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={file} alt={title} />
              <div className="tour__info">
                <h2>{title}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className="d-flex align-items-center gap-1">
                    
                  </span>
                </div>
                <div className="tour__extra-details">
                  <span><i className="ri-map-pin-2-line"></i> {city}</span>
                  <span><i className="ri-money-dollar-circle-line"></i> ${price} per person</span>
                  <span><i className="ri-map-pin-time-line"></i> {distance} km</span>
                  <span><i className="ri-group-line"></i> {maxGroupSize} people</span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>
              
              {/* Tour Full Details */}
              <div className="tour__full-details mt-4">
                <h4>Tour Full Details</h4>
                <Row>
                  <Col md="4">
                    <div className="detail__card">
                      <FaCity />
                      <span>Start From: {startFrom}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaClock />
                      <span>Start Time: {startTime}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaClock />
                      <span>Arrival Time: {arrivalTime}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaUtensils />
                      <span>Breakfast: {breakfast ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaUtensils />
                      <span>Lunch: {lunch ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaUtensils />
                      <span>Dinner: {dinner ? <FaCheck className="text-success" /> : <FaTimes className="text-danger" />}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaMapMarkerAlt />
                      <span>Departure City: {departureCity}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaBus />
                      <span>Transport Mode: {transportMode}</span>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="detail__card">
                      <FaUser />
                      <span>Tour Guide: {tourGuide ? 'Available' : 'Not Available'}</span>
                    </div>
                  </Col>
                </Row>
                <div className="tour__activities">
                  <h5>Activities</h5>
                  <ul>
                    {activities.map((activity, index) => (
                      <li key={index}><FaCheck className="text-success" /> {activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* End of Tour Full Details */}

              <div className="tour__reviews mt-4">
                <h4> Reviews ({reviews.length} reviews) </h4>
                <Form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} onClick={() => setTourRating(index + 1)}>
                        <FaStar
                          color={tourRating && tourRating > index ? '#FFD700' : '#ccc'}
                        />
                      </span>
                    ))}
                  </div>
                  <div className="review__input">
                    <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" />
                    <button className="btn primary__btn text-white" type="submit">
                      Submit
                    </button>
                  </div>
                </Form>
                <ListGroup className="user__reviews">
                  {reviews.map((review, index) => (
                    <div className="review__item" key={index}>
                      <img src={avatar} alt="" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{review.name}</h5>
                            <div className="d-flex align-items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <FaStar color="#FFD700" key={i} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <Booking tour={tour} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;
