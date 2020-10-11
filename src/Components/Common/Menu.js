import React from 'react';
import { Navbar, Nav, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Menu = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/user/sign_in">Sign In</Nav.Link>
        <Nav.Link as={Link} to="/user/sign_out">Sign Out</Nav.Link>
        <NavDropdown title="User" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/user/Profile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Notifications" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/notifications">List Notifications</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/notifications/new">Create Notification</NavDropdown.Item>

        </NavDropdown>

      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
    </Navbar> 
  );
};

export default Menu;

/*
<Link to="/user/sign_in">Sign In</Link> <br />
          <Link to="/user/sign_up">Sign Up</Link> <br />
          <Link to="/user/sign_out">Sign Out</Link> <br />
          <Link to="/user/profile">Profile</Link> <br />
          <Link to="/notifications">Notifications</Link> <br />
          <Link to="/notifications/new">Create Notification</Link> <br />
*/