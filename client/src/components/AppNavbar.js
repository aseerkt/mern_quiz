import React, { useState } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Nav,
} from 'reactstrap';
import RegisterModal from './modals/RegisterModal';

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (e) => setIsOpen(!isOpen);
  return (
    <Navbar color='dark' dark expand='sm'>
      <Container>
        <NavbarBrand href='/'>MERN Quiz App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <RegisterModal />
            </NavItem>
            <NavItem>
              <NavLink href='#'>Login x</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
