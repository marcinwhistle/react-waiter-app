import { Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import { fetchTables } from '../../../redux/tablesRedux';
// import { useDispatch } from 'react-redux';

const Table = ({ status, id }) => {
  // const dispatch = useDispatch();
  // useEffect(() => dispatch(fetchTables()), [dispatch]);
  return (
    <Row>
      <Row className='align-items-end mb-3'>
        <Col className='col-2 d-flex align-items-end justify-content-between'>
          <h2 className='mb-0'>Table {id}</h2>
        </Col>
        <Col className='col-4'>
          <strong>Status:</strong> {status}
        </Col>
        <Col className='col-6 d-flex justify-content-end'>
          <Link to={'/tables/' + id}>
            <Button variant='primary' size='sm'>
              Show more
            </Button>
          </Link>
        </Col>
      </Row>
      <hr />
    </Row>
  );
};

export default Table;
