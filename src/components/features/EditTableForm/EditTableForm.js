import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById, editTableRequest } from '../../../redux/tablesRedux';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getStatus } from '../../../redux/statusRedux';
import { useEffect } from 'react';
import { fetchTables } from '../../../redux/tablesRedux';

const EditTableForm = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));
  const statuses = useSelector((state) => getStatus(state));
  const [status, setStatus] = useState(tableData?.status || '');
  const [peopleAmount, setPeopleAmount] = useState(
    tableData?.peopleAmount || ''
  );
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    tableData?.maxPeopleAmount || ''
  );
  const [bill, setBill] = useState(tableData?.bill || '');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTableRequest({ status, peopleAmount, maxPeopleAmount, bill, id })
    );
    navigate('/');
  };
  if (peopleAmount > 10) setPeopleAmount(10);
  if (peopleAmount < 0) setPeopleAmount(0);
  if (peopleAmount > maxPeopleAmount) setMaxPeopleAmount(peopleAmount);
  if (maxPeopleAmount > 10) setMaxPeopleAmount(10);
  if (maxPeopleAmount < 0) setMaxPeopleAmount(0);

  if (!tableData) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='d-flex align-items-center w-50 mb-3'>
          <Form.Label className='mx-2'>Status:</Form.Label>
          <Form.Select onChange={(e) => setStatus(e.target.value)}>
            <option disabled>{status}</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='d-flex align-items-center w-25 mb-3'>
          <Form.Label className='mx-2'>People:</Form.Label>
          <Col>
            <Form.Control
              type='number'
              value={peopleAmount}
              onChange={(e) => setPeopleAmount(e.target.value)}
            ></Form.Control>{' '}
          </Col>
          <span className='mx-2'>/</span>
          <Col>
            <Form.Control
              type='number'
              value={maxPeopleAmount}
              onChange={(e) => setMaxPeopleAmount(e.target.value)}
            />
          </Col>
        </Form.Group>
        {status === 'Busy' && (
          <Form.Group className='d-flex align-items-center w-25 mb-3'>
            <Form.Label className='mx-2'>Bill:</Form.Label>
            <Col sm={4} className='mx-4'>
              <Form.Control
                type='number'
                value={status === 'Busy' ? bill : 0}
                onChange={(e) => setBill(e.target.value)}
              />
            </Col>
          </Form.Group>
        )}
        <Button className='mx-2' type='submit'>
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditTableForm;
