import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTableById,
  editTableRequest,
  getAllTables,
} from '../../../redux/tablesRedux';
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
  const tables = useSelector(getAllTables);
  const tableData = useSelector((state) => getTableById(state, id));
  const statuses = useSelector(getStatus);

  const [status, setStatus] = useState(null);
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
  const [bill, setBill] = useState(0);

  useEffect(() => {
    if (tableData) {
      setStatus(tableData.status);
      setPeopleAmount(tableData.peopleAmount);
      setMaxPeopleAmount(tableData.maxPeopleAmount);
      setBill(tableData.bill);
    }
  }, [tableData]);

  useEffect(() => {
    if (status === 'Free' || status === 'Cleaning') {
      setPeopleAmount(0);
    }
  }, [status]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTableRequest({
        status,
        peopleAmount,
        maxPeopleAmount,
        bill: status === 'Busy' ? bill : 0,
        id,
      })
    );
    navigate('/');
  };

  useEffect(() => {
    if (peopleAmount > maxPeopleAmount)
      setPeopleAmount(maxPeopleAmount || peopleAmount);
  }, [maxPeopleAmount, peopleAmount]);

  if (!tableData) {
    return <p>Loading...</p>;
  }
  if (tables.length && !tableData) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='d-flex align-items-center w-50 mb-3'>
          <Form.Label className='mx-2'>Status:</Form.Label>
          <Form.Select
            onChange={(e) => setStatus(e.target.value)}
            defaultValue={tableData.status}
          >
            {/* DOkumentacja  zeby dodać defaultową wartość */}
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
              min={0}
              max={maxPeopleAmount}
              value={peopleAmount}
              onChange={(e) => setPeopleAmount(e.target.value)}
            ></Form.Control>{' '}
          </Col>
          <span className='mx-2'>/</span>
          <Col>
            <Form.Control
              type='number'
              min={1}
              max={10}
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
