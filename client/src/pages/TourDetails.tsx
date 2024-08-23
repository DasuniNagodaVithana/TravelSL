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



  const { photo, title, desc, price, reviews,address, city, distance, maxGroupSize } = tour;

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

                    <span><i className="ri-map-pin-fill"></i> {address}</span>

                  </div >
                              

                  <div className="tour__extra-details">
                  
                    <span><i className= "ri-map-pin-2-line"> </i> {city}</span>
                    <span><i className= "ri-money-dollar-circle-line"> </i> {price} per person</span>
                    <span><i className= "ri-group-line"> </i> {maxGroupSize}</span>



                  </div>

                  
                </div>


                <div className="tour__reviews mt-4"> 
                    <h4> Reviews ({reviews?.length} reviews) </h4>
                    <Form> 
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span>
                          1 <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          2 <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          3 <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          4 <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          5 <i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="reviews__input">
                      <input type="text" placeholder="Share your thoughts"></input>
                      <button 
                      className="btn primary__btn text-white"
                      type="submit">
                      Submit
                      </button>
                      
                      </div>

                    </Form>

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