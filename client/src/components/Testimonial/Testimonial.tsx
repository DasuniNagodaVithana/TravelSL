import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import customer1 from '../../assets/images/customer1.jpg';
import customer2 from '../../assets/images/customer2.jpg';
import customer3 from '../../assets/images/customer3.jpg';
import customer4 from '../../assets/images/customer4.jpg'

const Testimonial: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className='testimonial py-4 px-3'>
        <p>
          "From the breathtaking landscapes to the rich cultural heritage, every moment was magical. The accommodations were top-notch, and the service was exceptional. Highly recommend this travel service!"
        </p>
        <div className='d-flex align-items-center gap-4 mt-3'>
          <img src={customer1} className='w-25 h-25 rounded-2' alt="Akila Uyanwatta" />
          <div>
            <h6 className='mb-0 mt-3'>Akila Uyanwatta</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className='testimonial py-4 px-3'>
        <p>
          "Our trip to Sri Lanka was an unforgettable experience! The tour was well-organized, and the guide was knowledgeable and friendly. We can't wait to visit again!"
        </p>
        <div className='d-flex align-items-center gap-4 mt-3'>
          <img src={customer2} className='w-25 h-25 rounded-2' alt="Sayumi Tharumila" />
          <div>
            <h6 className='mb-0 mt-3'>Sayumi Tharumila</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className='testimonial py-4 px-3'>
        <p>
          "Exploring Sri Lanka with this tour was a dream come true. The itinerary was perfect, balancing relaxation and adventure. The memories we made will last a lifetime."
        </p>
        <div className='d-flex align-items-center gap-4 mt-3'>
          <img src={customer3} className='w-25 h-25 rounded-2' alt="Arundathi Roy" />
          <div>
            <h6 className='mb-0 mt-3'>Arundathi Roy</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className='testimonial py-4 px-3'>
        <p>
        "Visiting the Kalutara Temple was a spiritual and serene experience. The architecture was breathtaking, and the atmosphere was peaceful and welcoming. It was a highlight of our trip to Sri Lanka!"
        </p>
        <div className='d-flex align-items-center gap-4 mt-3'>
          <img src={customer4} className='w-25 h-25 rounded-2' alt="Arundathi Roy" />
          <div>
            <h6 className='mb-0 mt-3'>Raveena Liyanage</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
}

export default Testimonial;
