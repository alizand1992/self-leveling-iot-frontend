import React from 'react';
import { connect } from 'react-redux';

import Loading from '../Common/Loading';
import { bindActionCreators } from 'redux';
import { signUserOut } from '../../actions/Users';

import { Redirect } from 'react-router-dom';

class SignOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { authorization } = this.props;
    const localAuth = window.localStorage.getItem('authorization');

    if (!authorization && !localAuth) {
      this.setState({ loading: false });
    } else {
      window.localStorage.clear();
      this.props.signUserOut();
    }
  }

  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <React.Fragment>
          <div style={{ top: '45vh', position: 'relative' }}>
            <Loading message="You are being logged out..."/>
          </div>
        </React.Fragment>
      );
    } else {
      return (
      <Redirect to="/" />);
      // return <Redirect to="/user_signout?"
    }
  }
}

const mapStateToProps = (state) => ({
  authorization: state.user.authorization,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUserOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
