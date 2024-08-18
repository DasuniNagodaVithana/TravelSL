import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData=[
  {
    imgUrl:weatherImg,
    title:"Calculate Weather",
    desc:"Get accurate weather forecasts to plan your perfect trip."
  },
  {
    imgUrl:guideImg,
    title:"Best Tour Guide",
    desc:"Explore with top-rated guides for an unforgettable experience."
  },
  {
    imgUrl:customizationImg,
    title:"Customization",
    desc:"Tailor your travel plans to match your unique preferences"
  },
]
const ServiceList = () => {
  return (
    <>
    {
      servicesData.map((item,index)=>(<Col lg='3' key={index}><ServiceCard item={item}/>
      </Col>
      ))
    }
    </>
  )
}

export default ServiceList