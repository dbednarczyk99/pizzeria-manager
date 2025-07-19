import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>Waiter.app</Navbar.Brand>
                <Nav className="ms-auto">
                    <Button className="bg-primary border-light"><Nav.Link as={NavLink} to="/">Home</Nav.Link></Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;