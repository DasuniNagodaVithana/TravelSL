// src/pages/TourFullDetails.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/TourFullDetails.css";

interface Review {
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
  reviews: Review[];
  avgRating: number;
  file: string;
  featured: boolean;
}

const TourFullDetails: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const [tour, setTour] = useState<ITour | null>(null);
  const [loading, setLoading] = useState(true);
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!tour) {
    return <p>No tour found</p>;
  }

  return (
    <div className="tour-full-details">
      <h1>{tour.title}</h1>
      <img src={tour.file} alt={tour.title} />
      <p><strong>City:</strong> {tour.city}</p>
      <p><strong>Address:</strong> {tour.address}</p>
      <p><strong>Distance:</strong> {tour.distance} km</p>
      <p><strong>Price:</strong> ${tour.price} per person</p>
      <p><strong>Group Size:</strong> {tour.maxGroupSize}</p>
      <p><strong>Description:</strong> {tour.desc}</p>
      <p><strong>Average Rating:</strong> {tour.avgRating}</p>
      <h3>Reviews:</h3>
      <ul>
        {tour.reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.name}:</strong> {review.rating} stars
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourFullDetails;
