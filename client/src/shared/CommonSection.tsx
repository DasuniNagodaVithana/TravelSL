import React from 'react';
import './CommonSection.css';
import { Col, Row, Container } from 'reactstrap';

// Define the props type
interface CommonSectionProps {
  title: string;
}

const CommonSection: React.FC<CommonSectionProps> = ({ title }) => {
  return (
    <section className="common__section">
      <Container>
        <Row>
          <Col lg="12" >
            <h1>{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CommonSection;
