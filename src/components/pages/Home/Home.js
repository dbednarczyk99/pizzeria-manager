import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';



const Home = () => {

    const tables = useSelector(state => state.tables);
    const table1 = useSelector(state => getTableById(state, '1'))
    console.log("Tables: ", tables);
    console.log("Table1: ", table1);

  return (
    <Container>
      {tables.map(table => (
        <Row key={table.id} className="align-items-center py-3 border-bottom">
          <Col xs={6}>
            <strong>Table {table.id}</strong>{' '}
            <span><strong>Status:</strong> {table.status}</span>
          </Col>
          <Col xs={6} className="text-end">
            <Link to={`/table/${table.id}`}>
              <Button variant="primary">Show more</Button>
            </Link>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Home;
