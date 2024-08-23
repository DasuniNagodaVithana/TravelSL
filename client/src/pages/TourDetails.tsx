import React from 'react';
import "../styles/tour-details.css";
import {Container,Row,Col,Form,ListGroup} from 'reactstrap' ;
import {useParams} from "react-router-dom";
import tourData from "../assets/data/tours";
// import Booking from '../components/Booking/Booking';

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const tour = tourData.find(tour => tour.id === id);

if (!tour) {
  return <div>Tour not found</div>;
}



  const { photo, title, desc, price, reviews, city, distance, maxGroupSize } = tour;

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt={title} />
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className= "d-flex align-items-center gap-5">

                    <span className="d-flex align-items-center gap-1">

                    </span>

                  </div>
                </div>
              </div>
            </Col>

           
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TourDetails