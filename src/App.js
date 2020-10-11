import React, { Suspense } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Loading from './Components/Common/Loading';
import { getUserData } from './Util/Ajax/Users';
import { bindActionCreators } from 'redux';

import { signUserIn, signUserOut } from './actions/Users';
import { connect } from 'react-redux';
import ProtectedRoute from './Components/Common/ProtectedRoute';
import 'bootstrap/dist/css/boostrap.min.css';
import Navbar from './Components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = 'http://localhost:5002';
    axios.defaults.headers['Content-Type'] = 'application/json';
    axios.defaults.headers['authorization'] = localStorage.getItem('authorization');
  }

  componentDidMount() {
    const authorization = localStorage.getItem('authorization');

    if (authorization && !this.props.authorization) {
      getUserData(authorization, (res) => {
        this.props.signUserIn(res, authorization);
      }, (err) => {
        console.log(err);
        this.props.signUserOut();
        axios.defaults.headers['authorization'] = '';
        localStorage.clear();
      });
    }
  }

  render() {
    /*const SignIn = React.lazy(() => import('./Components/Users/SignIn'));
    const SignUp = React.lazy(() => import('./Components/Users/SignUp'));
    const SignOut = React.lazy(() => import('./Components/Users/SignOut'));
    const Profile = React.lazy(() => import('./Components/Users/Profile'));

    const Notifications = React.lazy(() => import('./Components/Notifications'));
    const NewNotification = React.lazy(() => import('./Components/Notifications/New'));
    const EditNotification = React.lazy(() => import('./Components/Notifications/Edit'));*/

    return (
     <div className='App'>
       <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
     </div>
      /*<Router>
        <Container>
          <Link to="/user/sign_in">Sign In</Link> <br />
          <Link to="/user/sign_up">Sign Up</Link> <br />
          <Link to="/user/sign_out">Sign Out</Link> <br />
          <Link to="/user/profile">Profile</Link> <br />
          <Link to="/notifications">Notifications</Link> <br />
          <Link to="/notifications/new">Create Notification</Link> <br />

          <Suspense fallback={<Loading/>}>
            <Switch>
              <Route path="/user/sign_out">
                <SignOut />
              </Route>
              <Route path="/user/sign_in">
                <SignIn />
              </Route>
              <Route path="/user/sign_up">
                <SignUp />
              </Route>
              <ProtectedRoute path="/user/profile">
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute path="/notifications/new">
                <NewNotification />
              </ProtectedRoute>
              <ProtectedRoute path="/notifications/edit/:id">
                <EditNotification />
              </ProtectedRoute>
              <ProtectedRoute path="/notifications/">
                <Notifications />
              </ProtectedRoute>
            </Switch>
          </Suspense>
        </Container>
      </Router>*/
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
  authorization: state.user.authorization,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUserIn, signUserOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
