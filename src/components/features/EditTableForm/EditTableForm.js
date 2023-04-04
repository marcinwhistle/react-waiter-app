import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById, editTableRequest } from '../../../redux/tablesRedux';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const EditTableForm = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));
  const [status, setStatus] = useState(tableData.status);
  const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    tableData.maxPeopleAmount
  );
  const [bill, setBill] = useState(tableData.bill);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTableRequest({ status, peopleAmount, maxPeopleAmount, bill, id })
    );
    navigate('/');
  };

  if (!tableData) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='d-flex align-items-center w-25 mb-3'>
          <Form.Label className='mx-2'>Status:</Form.Label>
          <Form.Select onChange={(e) => setStatus(e.target.value)}>
            <option>{status}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='d-flex align-items-center w-25 mb-3'>
          <Form.Label className='mx-2'>People:</Form.Label>
          <Col>
            <Form.Control
              value={peopleAmount}
              onChange={(e) => setPeopleAmount(e.target.value)}
            ></Form.Control>{' '}
          </Col>
          <span className='mx-2'>/</span>
          <Col>
            <Form.Control
              value={maxPeopleAmount}
              onChange={(e) => setMaxPeopleAmount(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group className='d-flex align-items-center w-25 mb-3'>
          <Form.Label className='mx-2'>Bill:</Form.Label>
          <Col sm={4} className='mx-4'>
            <Form.Control
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button className='mx-2' type='submit'>
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditTableForm;