import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
} from 'reactstrap';

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (e) => setIsOpen(!isOpen);
  return (
    <Navbar className='app-navbar sticky-top' color='dark' dark expand='sm'>
      <Container>
        <NavLink className='navbar-brand' to='/'>
          MERN Quiz App
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink className='nav-link' to='/login'>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='nav-link' to='/register'>
                Register
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
