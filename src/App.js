import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Table from './components/pages/Table/Table';
import { fetchTablesRequest } from './components/features/ServerRequests';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';

function App() {

  const dispatch = useDispatch();
  useEffect( () => { dispatch(fetchTablesRequest()) }, [dispatch] );

  return (
    <main>
      <Header/>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:tableId" element={<Table />} />
        </Routes>
      </Container>
      <Footer/>
    </main>
  );
}

export default App;
