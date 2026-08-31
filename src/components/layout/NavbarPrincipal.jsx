import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarPrincipal = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">Salita Municipal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*Dashboard*/}
                        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>

                        {/*Menu Paciente*/}
                        <NavDropdown title="Pacientes" id="paciente-dropdown">
                            <NavDropdown.Item as={Link} to="/nuevo-paciente">Registrar Paciente</NavDropdown.Item>

                        </NavDropdown>
                        

                        {/*Menu Medico*/}
                        <NavDropdown title="Medicos" id="medico-dropdown">
                            <NavDropdown.Item as={Link} to="/nuevo-medico">Registrar Medico</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarPrincipal