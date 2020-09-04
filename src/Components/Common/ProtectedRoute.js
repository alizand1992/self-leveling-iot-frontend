import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  render() {
    if (this.props.authorization || localStorage.getItem('authorization')) {
      return this.props.children;
    }

    return <Redirect to="/user/sign_in" />;
  }
}

const mapStateToProps = (state) => ({
  authorization: state.user.authorization
});

export default connect(mapStateToProps)(ProtectedRoute);
