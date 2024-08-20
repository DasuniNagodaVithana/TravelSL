import React from 'react';
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import yaka from '../assets/images/yaka.jpg';

const Newsletter: React.FC = () => {
  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="newsletter__content">
              <h2>Subscribe now to get useful travelling information.</h2>

              <div className="newsletter__input">
                <input type='email' placeholder='Enter your email' />
                <button className='btn newsletter__btn'>Subscribe</button>
              </div>
              <p>
                Stay Updated with TravelSL!<br />
                Get the latest updates, travel tips, and special offers straight to your inbox. Explore the best of Sri Lanka with us—don't miss out on any adventure.
              </p>
            </div>
          </Col>
          <Col lg='6'>
            <div className='newsletter__img'>
              <img src={yaka} alt='Male Tourist' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
