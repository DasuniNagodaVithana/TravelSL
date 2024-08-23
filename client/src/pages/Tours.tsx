import React, {useState, useEffect} from 'react';
import CommonSection from '../shared/CommonSection';

import "../styles/tour.css";
import tourData from '../assets/data/tours';
import TourCard from './../shared/TourCard';
import SearchBar from './../shared/Searchbar';
import Newsletter from './../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';
//import { useEffect } from 'react';


const Tours: React.FC = () => {


  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
  }, [page]);
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
      {tourData.map((item) => (
        <Col lg='3' md='6' sm='6' className='mb-4' key={item.id}>
          <TourCard tour={item} />
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