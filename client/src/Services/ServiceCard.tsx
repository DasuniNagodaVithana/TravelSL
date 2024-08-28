import React from 'react';
import './service-card.css';

interface ServiceItem {
  imgUrl: string;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
  const { imgUrl, title, desc } = item;

  return (
    <div className='service__item'>
      <div className='service__img'>
        <img src={imgUrl} alt={title} />
      </div>
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  );
};

export default ServiceCard;
