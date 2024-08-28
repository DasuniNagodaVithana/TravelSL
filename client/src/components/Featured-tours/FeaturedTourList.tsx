// import React from 'react';
// import TourCard from '../../shared/TourCard';
// import tours from '../../assets/data/tours';
// import { Col } from 'reactstrap';
// import axios from 'axios';



// const FeaturedTourList: React.FC = () => {
//   return (
//     <>
//       {tours.map((tour) => (
//         <Col lg='3' className='mb-4' key={tour.id}>
//           <TourCard tour={tour} />
//         </Col>
//       ))}
//     </>
//   );
// };

// export default FeaturedTourList;

import React, { useEffect, useState } from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';
import axios from 'axios';

interface Tour {
  _id: string;
  title: string;
  city: string;
  file: string;
  price: number;
  featured: boolean;
  avgRating: number;
  reviews: { name: string; rating: number }[];
}

const FeaturedTourList: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        const response = await axios.get('http://43.205.195.152:3001/tours/featured/true');
        setTours(response.data);
      } catch (err) {
        setError('Failed to fetch featured tours');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {tours.map((tour) => (
        <Col lg='3' className='mb-4' key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;

