import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  render() {
    if (this.props.authorization || localStorage.getItem('authorization')) {
      const { path, children } = this.props;

      return (
        <Route exact path={path}>
          {children}
        </Route>
      );
    }

    return <Redirect to="/user/sign_in" />;
  }
}

const mapStateToProps = (state) => ({
  authorization: state.user.authorization
});

export default connect(mapStateToProps)(ProtectedRoute);
