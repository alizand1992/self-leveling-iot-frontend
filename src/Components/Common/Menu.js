import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => {
  const authorization = localStorage.getItem('authorization');
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Self Leveling IoT Device</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {authorization &&
            <React.Fragment>
              <Nav.Link as={Link} to="/devices/">Devices</Nav.Link>

              <NavDropdown title="Notifications" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/notifications">List Notifications</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/notifications/new">Create Notification</NavDropdown.Item>
              </NavDropdown>
            </React.Fragment>
          }
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown title="User" id="basic-nav-dropdown">
            {authorization && (
              <React.Fragment>
                <NavDropdown.Item as={Link} to="/user/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user/sign_out">Sign Out</NavDropdown.Item>
              </React.Fragment>
            )}
            {!authorization && (
              <React.Fragment>
                <NavDropdown.Item as={Link} to="/user/sign_in">Sign In</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user/sign_up">Sign Up</NavDropdown.Item>
              </React.Fragment>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
