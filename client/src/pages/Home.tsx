import React from 'react'
import '../styles/home.css'
import { Container,Row,Col } from 'reactstrap'

import sigiriya from "../assets/images/sigiriya.jpg"
import ella from "../assets/images/ella (2).jpg"
import videoSL from "../assets/images/videoSL.mp4"
import Subtitle from '../shared/Subtitle'
import worldImg from "../assets/images/world.png"

import Searchbar from '../shared/Searchbar'
import ServiceList from '../Services/ServiceList'

const Home = () => {
  return <>
  {/*===========hero section start========*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className='hero__content'>
          <div className='hero__subtitle d-flex align-items-center'>
            <Subtitle Subtitle={'Know before you Go'}/>
            <img src={worldImg} alt=''/>
            
          </div>
          <h1>
            Travelling opens the door to creating{" "}
            <span className='highlight'>memories</span>
          </h1>
          <p>
          Sri Lanka, often referred to as the "Pearl of the Indian Ocean," is a tropical paradise known for its breathtaking landscapes, rich cultural heritage, and warm hospitality. From the pristine beaches and lush tea plantations to the ancient temples and vibrant wildlife, Sri Lanka offers a diverse array of experiences for travelers. Whether you're seeking adventure, relaxation, or a journey through history, this beautiful island nation promises unforgettable memories at every turn.
          </p>
        </div>
        </Col>

        <Col lg='2'>
        <div className='hero__img-box'>
        <img src={sigiriya} alt=''/>
        </div>
        </Col>

        <Col lg='2'>
        <div className='hero__img-box mt-4'>
        <video src={videoSL} controls/>
        </div>
        </Col>

        <Col lg='2'>
        <div className='hero__img-box mt-5'>
        <img src={ella} alt=''/>
        </div>
        </Col>
         <Searchbar/>
      </Row>
    </Container>
  </section>

  <section>
    <Container>
      <Row>
        <Col lg='3'>
        <h5 className='services__subtitle'>What we serve</h5>
        <h2 className='services__title'>We offer our best services</h2>
        </Col>
        <ServiceList/>
      </Row>
    </Container>
  </section>
  </>
}

export default Home
