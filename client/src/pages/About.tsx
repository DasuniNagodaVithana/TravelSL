import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import teamImg from '../assets/images/team.png'; 
import milestoneImg from '../assets/images/achive.jpg'; 
import '../styles/about.css';

const About = () => {
  return (
    <section className='about__section'>
      <Container>
        <Row className='mb-5'>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'>About Us</h2>
            <p className='section__subtitle'>Learn more about our journey and what drives us.</p>
          </Col>
        </Row>
        <Row>
          {/* Company Background and Mission */}
          <Col lg='6' md='12'>
            <h3 className='about__heading'>Our Mission</h3>
            <p>
              Our mission is to provide unforgettable travel experiences in Sri Lanka, offering unique and
              culturally immersive tours that showcase the beauty and diversity of our island. We aim to be the
              leading travel provider, prioritizing sustainability and customer satisfaction.
            </p>
            <h3 className='about__heading'>Our Vision</h3>
            <p>
              We envision a future where Sri Lanka is recognized globally as a top travel destination, known for
              its natural beauty, rich culture, and sustainable tourism practices. Our goal is to contribute to
              this vision by delivering top-notch services that leave lasting memories.
            </p>
          </Col>

          {/* Team Image */}
          <Col lg='6' md='12' className='text-center'>
            <img src={teamImg} alt='Our Team' className='img-fluid rounded team__image'/>
          </Col>
        </Row>

        {/* Core Values */}
        <Row className='mt-5'>
          <Col lg='12'>
            <h3 className='about__heading'>Core Values</h3>
            <ul className='about__list'>
              <li>Customer Satisfaction: Our customers' happiness is our top priority.</li>
              <li>Sustainability: We are committed to eco-friendly practices that protect Sri Lanka's natural beauty.</li>
              <li>Cultural Respect: We honor and respect the rich heritage of the communities we visit.</li>
            </ul>
          </Col>
        </Row>

        {/* Meet the Team */}
        <Row className='mt-5'>
          <Col lg='12'>
            <h3 className='about__heading'>Meet the Team</h3>
          </Col>
          {/* Example team member cards */}
          <Col lg='4' md='6'>
            <Card className='team__card'>
              <CardBody className='text-center'>
                <h5 className='team__name'>Chamath Palihawadana</h5>
                <p className='team__role'>Founder & CEO</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg='4' md='6'>
            <Card className='team__card'>
              <CardBody className='text-center'>
                <h5 className='team__name'>Sakura Perera</h5>
                <p className='team__role'>Chief Travel Officer</p>
              </CardBody>
            </Card>
          </Col>
          {/* Add more team members as needed */}
        </Row>

        {/* Milestones */}
        <Row className='mt-5'>
          <Col lg='6' md='12'>
            <h3 className='about__heading'>Our Journey</h3>
            <p>
              Since our inception, we have reached numerous milestones, including serving thousands of happy
              customers and receiving industry recognition for our efforts in sustainable tourism.
            </p>
            <img src={milestoneImg} alt='Milestone' className='img-fluid rounded achive__image'/>
          </Col>
          <Col lg='6' md='12'>
            <h3 className='about__heading'>Future Goals</h3>
            <p>
              We are continually working to expand our offerings, develop new partnerships, and innovate our
              services to provide even better experiences. Our future is bright, and we are excited for what's
              to come!
            </p>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className='mt-5 text-center'>
          <Col lg='12'>
            <h3 className='about__heading'>Join Us on Our Journey</h3>
            <Button className='btn primary__btn'>
              <Link to='/tours'>Explore Our Tours</Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
