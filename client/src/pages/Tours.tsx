import React, {useState, useEffect} from 'react';
import CommonSection from '../shared/CommonSection';
import axios from 'axios';

import "../styles/tour.css";
import tourData from '../assets/data/tours';
import TourCard from './../shared/TourCard';
import SearchBar from './../shared/Searchbar';
import Newsletter from './../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';
//import { useEffect } from 'react';


interface Tour {
  id: string;
  title: string;
  city: string;
  file: string;
  price: number;
  featured: boolean;
  avgRating: number;
  reviews: { name: string; rating: number }[];
}

const Tours: React.FC = () => {


  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
  }, [page]);

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tours/featured/true');
        setTours(response.data);
      } catch (err) {
        setError('Failed to fetch featured tours');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <CommonSection title='All tours'/> 
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
      {tours.map((tour) => (
        <Col lg='3' className='mb-4' key={tour.id}>
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
  )
}

export default Tours;