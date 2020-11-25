import React, { Suspense } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './Components/Common/Loading';
import { getUserData } from './Util/Ajax/Users';
import { bindActionCreators } from 'redux';

import { signUserIn, signUserOut } from './actions/Users';
import { connect } from 'react-redux';
import ProtectedRoute from './Components/Common/ProtectedRoute';
import Menu from './Components/Common/Menu';


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
    const SignIn = React.lazy(() => import('./Components/Users/SignIn'));
    const SignUp = React.lazy(() => import('./Components/Users/SignUp'));
    const SignOut = React.lazy(() => import('./Components/Users/SignOut'));
    const Profile = React.lazy(() => import('./Components/Users/Profile'));

    const Notifications = React.lazy(() => import('./Components/Notifications'));
    const NewNotification = React.lazy(() => import('./Components/Notifications/New'));
    const EditNotification = React.lazy(() => import('./Components/Notifications/Edit'));
    const Devices = React.lazy(() => import('./Components/Devices'));
    const MyDevices = React.lazy(() => import('./Components/Devices/MyDevices'));

    return (
      <Router>
        <Container>
          <Menu /><br />

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
              <ProtectedRoute path="/devices/">
                <Devices />
              </ProtectedRoute>
              <ProtectedRoute path="/my_devices">
                <MyDevices />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUserIn, signUserOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
