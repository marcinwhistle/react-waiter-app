import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container>
      <Row className=' text-muted justify-content-center'>
        <Col className='mb-4' md='auto'>
          Waiter-app © 2023
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
