import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { getTableById, modifyTableRequest } from '../../../redux/tablesRedux';
import { useDispatch, useSelector } from 'react-redux';

const statuses = ['Free', 'Busy', 'Reserved', 'Cleaning'];

const Table = () => {
  const { tableId } = useParams();
  
  //console.log("Table ID: ", tableId);
  //console.log("Table ID Type: ", typeof tableId);

  const table = useSelector(state => getTableById(state, tableId));
  //console.log("Table Data: ", table);
  //console.log("Table status: ", table.status);

  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
  const [bill, setBill] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (table) {
      setStatus(table.status);
      setPeopleAmount(table.peopleAmount);
      setMaxPeopleAmount(table.maxPeopleAmount);
      setBill(table.bill);
    }
  }, [table]);

  if (!table) {
    return <div>Loading table data...</div>;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyTableRequest(tableId, {status, peopleAmount, maxPeopleAmount, bill}));
    alert('Table updated!');
  };


    
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formStatus">
          <Form.Label column sm={2}><strong>Status:</strong></Form.Label>
          <Col sm={10}>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPeople">
          <Form.Label column sm={2}><strong>People:</strong></Form.Label>
          <Col sm={5}>
            <Form.Control
              type="number"
              min="0"
              max={maxPeopleAmount}
              value={peopleAmount}
              onChange={e => setPeopleAmount(Number(e.target.value))}
            />
          </Col>
          <Col sm={5}>
            <Form.Control
              type="number"
              min="1"
              max="10"
              value={maxPeopleAmount}
              onChange={e => setMaxPeopleAmount(Number(e.target.value))}
            />
          </Col>
        </Form.Group>

        {status === 'Busy' && (
          <Form.Group as={Row} className="mb-3" controlId="formBill">
            <Form.Label column sm={2}><strong>Bill:</strong></Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                min="0"
                value={bill}
                onChange={e => setBill(Number(e.target.value))}
              />
            </Col>
          </Form.Group>
        )}

        <Button type="submit" variant="primary">Update</Button>
      </Form>
    </Container>
  );
};

export default Table;