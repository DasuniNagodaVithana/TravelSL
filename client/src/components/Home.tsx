import React from "react";
import { useLocation } from 'react-router-dom';

interface LocationState {
  state: {
    id: string;
  };
}

const Home: React.FC = () => {
  const location = useLocation() as LocationState;

  return (
    <div className="homepage">
      <h1>Hello {location.state.id} and welcome to the home</h1>
    </div>
  );
};

export default Home;
