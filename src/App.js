import React, { Suspense } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Loading from './Components/Common/Loading';
import { getUserData } from './Util/Ajax/Users';
import { bindActionCreators } from 'redux';

import { signUserIn } from './actions/Users';
import { connect } from 'react-redux';
import ProtectedRoute from './Components/Common/ProtectedRoute';

class App extends React.Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = 'http://localhost:5002';
    axios.defaults.headers['Content-Type'] = 'application/json';
  }

  componentDidMount() {
    const authorization = localStorage.getItem('authorization');

    if (authorization && !this.props.authorization) {
      getUserData(authorization, (res) => {
        this.props.signUserIn(res, authorization);
      }, (err) => {
        console.log(err);
      });
    }
  }

  render() {
    const SignIn = React.lazy(() => import('./Components/Users/SignIn'));
    const SignUp = React.lazy(() => import('./Components/Users/SignUp'));
    const SignOut = React.lazy(() => import('./Components/Users/SignOut'));
    const Profile = React.lazy(() => import('./Components/Users/Profile'));

    return (
      <Router>
        <Container>
          <Link to="/user/sign_in">Sign In</Link>
          <Link to="/user/sign_up">Sign Up</Link>
          <Link to="/user/sign_out">Sign Out</Link>
          <Link to="/user/profile">Profile</Link>
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
            </Switch>
          </Suspense>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
  authorization: state.user.authorization,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUserIn }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
