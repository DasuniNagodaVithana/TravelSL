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
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toursPerPage = 12;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://43.205.195.152:3001/tours');
        setTours(response.data);
        setFilteredTours(response.data);

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

  const handleSearch = (location: string, distance: string, maxGroupSize: string) => {
    let filtered = tours;

    if (location) {
      filtered = filtered.filter(tour => tour.city.toLowerCase().includes(location.toLowerCase()));
    }

    if (distance) {
      const distanceNum = parseInt(distance, 10);
      filtered = filtered.filter(tour => tour.distance <= distanceNum);
    }

    if (maxGroupSize) {
      const maxGroupSizeNum = parseInt(maxGroupSize, 10);
      filtered = filtered.filter(tour => tour.maxGroupSize >= maxGroupSizeNum);
    }

    setFilteredTours(filtered);
    setPage(0); // Reset to the first page
    setPageCount(Math.ceil(filtered.length / toursPerPage));
  };

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
            <SearchBar onSearch={handleSearch} />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {filteredTours.slice(page * toursPerPage, (page + 1) * toursPerPage).map((tour) => (
              <Col lg='3' className='mb-4' key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {Array.from({ length: pageCount }, (_, number) => (
                  <span
                    key={number}
                    onClick={() => {
                      setPage(number);
                      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
                    }}
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
