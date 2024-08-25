

import React from 'react';
import './Booking.css';
import { Form, FormGroup,ListGroup,ListGroupItem,Button } from 'reactstrap';


interface Review {
    name: string;
    rating: number;
  }
  
  interface Tour {
    id: string;
    title: string;
    city: string;
    address:string;
    distance: number;
    price: number;
    maxGroupSize: number;
    desc: string;
    reviews: Review[];
    avgRating: number;
    photo: string;
    featured: boolean;
  }
  



const Booking: React.FC<{ tour: Tour }> = ({ tour }) => {
    

    const { price,reviews } = tour;

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{};


    return (
       <div className="booking" >
          <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>${price}<span> /per person</span></h3>
            </div>



            {/* Booking Form */}
            <div className='booking__form'>
                <h5>Information</h5>
                <Form className="booking__info-form">
                    <FormGroup>
                        <input type="text" placeholder='Full Name' id="fullName" required onChange={handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <input type="number" placeholder='Phone' id="phone" required onChange={handleChange}/>
                    </FormGroup>

                    <FormGroup className="d-flex align-items-center gap-3">
                        <input type="date" placeholder='' id="bookAt" required onChange={handleChange}/>
                        <input type="number" placeholder='Guest' id="guestSize" required onChange={handleChange}/>
                    </FormGroup>
                </Form>
            </div>

            {/* Booking bottom*/}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            ${price}<i className="ri-close-line"></i> 1 person</h5>
                        <span> ${price}</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0">
                        <h5>Service charge</h5>
                        <span> $10</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span> ${price + 10}</span>
                    </ListGroupItem>

                </ListGroup>

                <Button className="btn primary__btn w-100 mt-4">Book Now</Button>
            </div>


        </div>
    );
};

export default Booking;
