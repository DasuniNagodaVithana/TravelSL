import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import axios from 'axios';

import "../styles/tour.css";
import TourCard from './../shared/TourCard';
import SearchBar from './../shared/Searchbar';
import Newsletter from './../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';

interface Tour {
  _id: string;
  title: string;
  city: string;
  address: string;
  distance: number;
  price: number;
  maxGroupSize: number;
  desc: string;
  reviews: { name: string; rating: number }[];
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

const Tours: React.FC = () => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toursPerPage = 12; // Number of tours to display per page

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tours');
        setTours(response.data);

        // Calculate the number of pages based on the toursPerPage value
        const totalTours = response.data.length;
        const pages = Math.ceil(totalTours / toursPerPage);
        setPageCount(pages);
      } catch (err) {
        setError('Failed to fetch tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [toursPerPage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <CommonSection title='All tours' />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {tours.slice(page * toursPerPage, (page + 1) * toursPerPage).map((tour) => (
              <Col lg='3' className='mb-4' key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {Array.from({ length: pageCount }, (_, number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? 'active__page' : ''}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
}

export default Tours;
