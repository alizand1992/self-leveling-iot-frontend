import React from 'react';
import { Navbar, Nav, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => {
  const authorization = localStorage.getItem('authorization');
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">IoT Project</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="User" id="basic-nav-dropdown">
        {authorization && (
          <React.Fragment> 
            <NavDropdown.Item as={Link} to="/user/Profile">Profile</NavDropdown.Item>
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
      <NavDropdown title="Notifications" id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/notifications">List Notifications</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/notifications/new">Create Notification</NavDropdown.Item>
      </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Navbar> 
  );
};

export default Menu;
//put sign in sign up under user 
//take out search bar
//sign out under user
//take out about us