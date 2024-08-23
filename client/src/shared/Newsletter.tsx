import React, { useState } from 'react';
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import yaka from '../assets/images/yaka.jpg';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('http://localhost:3001/subscribe', { email });
      if (response.data.Status === 'Success') {
        setMessage('Thank you for subscribing! We are excited to share the latest travel tips, updates, and special offers with you.');
      } else {
        setMessage(response.data.message || 'Subscription failed. Please try again.');
      }
      setShowModal(true);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="newsletter__content">
              <h2>Subscribe now to get useful travelling information.</h2>

              <div className="newsletter__input">
                <input
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className='btn newsletter__btn' onClick={handleSubscribe}>
                  Subscribe
                </button>
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
      {showModal && (
        <Modal message={message} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default Newsletter;
