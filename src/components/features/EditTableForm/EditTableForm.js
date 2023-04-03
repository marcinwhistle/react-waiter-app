import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const EditTableForm = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));
  const [status, setStatus] = useState(tableData.status);
  const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    tableData.maxPeopleAmount
  );
  const [bill, setBill] = useState(tableData.bill);

  const handleSubmit = () => {};

  if (!tableData) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='d-flex align-items-center w-25'>
          <Form.Label className='mx-2'>Status:</Form.Label>
          <Form.Select onChange={(e) => setStatus(e.target.value)}>
            <option>{status}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='d-flex align-items-center w-25'>
          <Form.Label className='mx-2'>People:</Form.Label>
          <Form.Control
            value={peopleAmount}
            onChange={(e) => setPeopleAmount(e.target.value)}
          ></Form.Control>{' '}
          /
          <Form.Control
            value={maxPeopleAmount}
            onChange={(e) => setMaxPeopleAmount(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='d-flex align-items-center w-25'>
          <Form.Label className='mx-2'>Bill:</Form.Label>
          <Form.Control
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit'>Update</Button>
      </Form>
    </>
  );
};

export default EditTableForm;
