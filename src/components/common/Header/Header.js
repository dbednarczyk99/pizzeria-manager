import { Container } from 'react-bootstrap'
import NavBar from '../NavBar/NavBar';
import { useLocation } from 'react-router-dom';

const Header = () => {

    const location = useLocation();
    const path = location.pathname;
    //console.log('Path: ', path);

    let pageTitle = '';
    if (path === '/') {
        pageTitle = 'All tables';
    } 
    else if (path.startsWith('/table/')) {
        const tableId = path.split('/')[2];
        pageTitle = `Table ${tableId}`;
    } 

    return (
        <Container>
            <NavBar/>
            <h1 className="my-4">{pageTitle}</h1>
        </Container>
    );
}

export default Header;