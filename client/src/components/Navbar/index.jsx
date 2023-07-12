import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';

function Header() {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className='py-4'>
      <Container>
        <Navbar.Brand href="/">PMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/client">Client</Nav.Link>          
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </>
  );
}

export default Header;