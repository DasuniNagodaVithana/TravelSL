import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import TourCard from '../shared/TourCard';
import { Container, Row, Col } from 'reactstrap';


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

const SearchResultList: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const locationQuery = params.get('location');
        const distanceQuery = params.get('distance');
        const maxGroupSizeQuery = params.get('maxGroupSize');

        const response = await axios.get('http://43.205.195.152:3001/tours/search', {
          params: {
            location: locationQuery || undefined,
            distance: distanceQuery || undefined,
            maxGroupSize: maxGroupSizeQuery || undefined,
          },
        });

        setTours(response.data);
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        {tours.map((tour) => (
          <Col lg="4" md="6" sm="12" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResultList;
