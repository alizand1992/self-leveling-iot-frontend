import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { signIn } from '../../Util/Ajax/Users';
import { signUserIn } from '../../actions/Users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { validateEmail, validatePassword } from '../../Util/Validator';
import Errors from '../Common/Errors';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorization: props.authorization,
      email: '',
      password: '',
      errors: [],
    };
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  }

  signIn = () => {
    const { email, password } = this.state;
    let errors = [];

    errors.push(validateEmail(email));
    errors.push(validatePassword(password));
    errors = errors.flat();

    this.setState({ errors: errors });

    if (errors.length !== 0) {
      return;
    }

    signIn({ email, password }, (userData, authorization) => {
      window.localStorage.setItem('authorization', authorization);
      this.props.signUserIn(userData, authorization);
    }, (errors) => {
      this.setState({ errors: [errors] });
    });
  }

  render() {
    const { authorization, email, password, errors } = this.state;

    if (authorization) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <Errors errors={errors} />
        <Row>
          <Col md={{ span: 6, offset: 3}}>
            <Card>
              <Card.Header style={{ textAlign: 'center' }}>
                <h2>Sign In</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                                  id="email"
                                  value={email}
                                  placeholder="Email"
                                  onChange={(e) =>  this.handleChange(e, 'email')} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  id="password"
                                  value={password}
                                  placeholder="Password"
                                  onChange={(e) =>  this.handleChange(e, 'password')} />
                  </Form.Group>
                  <Button onClick={this.signIn} variant="primary">Sign In</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authorization: state.user.authorization,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUserIn }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
