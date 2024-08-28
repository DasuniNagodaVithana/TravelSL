import React from 'react'
import '../styles/home.css'
import { Container,Row,Col } from 'reactstrap'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MansonryImagesGallery from '../components/Image-gallery/MansonryImagesGallery'

import sigiriya from "../assets/images/sigiriya.jpg"
import ella from "../assets/images/ella (2).jpg"
import videoSL from "../assets/images/videoSL.mp4"
import Subtitle from '../shared/Subtitle'
import worldImg from "../assets/images/world.png"
import experirnce from "../assets/images/experience.png"

import Searchbar from '../shared/Searchbar'
import ServiceList from '../Services/ServiceList'
import Testimonial from '../components/Testimonial/Testimonial'
import Newsletter from '../shared/Newsletter'

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
        <img src={'https://tours-s3-images.s3.eu-north-1.amazonaws.com/sigiriya.jpg'} alt=''/>
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
  {/*==========featured tour section start======*/}
  <section>
    <Container>
      <Row>
        <Col lg='12' className='mb-5'>
        <Subtitle Subtitle={'Explore'}/>
        <h2 className='featured__tour-title'>Our featured tours</h2>
        </Col>
        <FeaturedTourList />
      </Row>
    </Container>
  </section>
  {/*==========featured tour section end======*/}

  {/*==========experience section start======*/}
   <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className="experience__content">
          <Subtitle Subtitle={'Experience'}/>
          <h2>
            with our all experience <br/> we will serve you
          </h2>
          <p>Whether it's a luxurious getaway or an adventurous escape, we tailor each experience to your desires.<br/>
            Trust us to craft unforgettable memories, curated just for you.
          </p>
        </div>

        <div className="counter__wrapper d-flex align-items-center gap-5">
        <div className="counter__box">
          <span>12k+</span>
          <h6>Sucessful Trips</h6>
        </div>
        <div className="counter__box">
          <span>2k+</span>
          <h6>Regular clients</h6>
        </div>
        <div className="counter__box">
          <span>10</span>
          <h6>Years of experience</h6>
        </div>
        </div>
        </Col>
        <Col lg='6'>
        <div className="experience__img">
          <img src={experirnce} alt=''/>
        </div>
        </Col>
      </Row>
    </Container>
   </section>
   {/*==========experience section end======*/}

   {/*==========gallery section start======*/}
   <section>
    <Container>
      <Row>
        <Col lg='12'>
        <Subtitle Subtitle={'Gallery'}/>
        <h2 className='gallery__title'>Visit our customers tour gallery</h2>
        </Col>
        <Col lg='12'>
        <MansonryImagesGallery/>
        </Col>
      </Row>
    </Container>
   </section>
   {/*==========gallery section end======*/}

   {/*==========testimonial section start======*/}
   <section>
    <Container>
      <Row>
        <Col lg='12'>      
          <Subtitle Subtitle={'Fans LOve'}/>
          <h2 className='testimonial__title'>
            What our fans say about us
          </h2>
          </Col>
          <Col lg='12'>
          <Testimonial/>
          </Col>
          </Row>
          </Container>
          </section>
   {/*==========testimonial section end======*/}
   <Newsletter/>
   
  </>
}

export default Home
