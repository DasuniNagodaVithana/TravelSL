import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import 'remixicon/fonts/remixicon.css';

interface SearchbarProps {
  onSearch: (location: string, distance: string, maxGroupSize: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const locationRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  const maxGroupSizeRef = useRef<HTMLInputElement>(null);

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const location = locationRef.current?.value || '';
    const distance = distanceRef.current?.value || '';
    const maxGroupSize = maxGroupSizeRef.current?.value || '';

    onSearch(location, distance, maxGroupSize);
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4" onSubmit={searchHandler}>
          <FormGroup className="d-flex flex-column form__group form__group-fast">
            <div className="d-flex align-items-center gap-2">
              <span>
                <i className="ri-map-pin-line"></i>
              </span>
              <h6>Location</h6>
            </div>
            <input type="text" placeholder="Where are you going?" ref={locationRef} />
          </FormGroup>

          <FormGroup className="d-flex flex-column form__group form__group-fast">
            <div className="d-flex align-items-center gap-2">
              <span>
                <i className="ri-map-pin-time-line"></i>
              </span>
              <h6>Distance</h6>
            </div>
            <input type="number" placeholder="Distance k/m" ref={distanceRef} />
          </FormGroup>

          <FormGroup className="d-flex flex-column form__group form__group-last">
            <div className="d-flex align-items-center gap-2">
              <span>
                <i className="ri-group-line"></i>
              </span>
              <h6>Max People</h6>
            </div>
            <input type="number" placeholder="0" ref={maxGroupSizeRef} />
          </FormGroup>

          <button type="submit" className="search__icon">
            <span>
              <i className="ri-search-line"></i>
            </span>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default Searchbar;
