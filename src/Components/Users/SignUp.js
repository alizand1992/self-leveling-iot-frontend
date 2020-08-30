import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { fieldNotEmpty, validateEmail, validatePassword } from '../../Util/Validator';
import { signUp } from '../../Util/Ajax/Users';

import { signUserUp } from '../../actions/Users';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Errors from '../Common/Errors';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: [],
    };
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  }

  signUp = () => {
    let { confirm_password, email, password, first_name, last_name } = this.state;
    let errors = [];

    errors.push(fieldNotEmpty({ first_name, last_name }));
    errors.push(validateEmail(email));
    errors.push(validatePassword(password, confirm_password));
    errors = errors.flat();

    this.setState({ errors: errors });

    if (errors.length !== 0) {
      return;
    }

    signUp({ email, password }, (userData, authorization) => {
      this.props.signUserUp(userData, authorization);
    }, (errors) => {
      this.setState({ errors: [errors] });
    });
  }

  render() {
    const { first_name, last_name, email, password, confirm_password, errors } = this.state;

    return (
      <React.Fragment>
        <Errors errors={errors} />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header style={{ textAlign: 'center' }}>
                <h2>Sign Up</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"
                                  id="first_name"
                                  value={first_name}
                                  placeholder="First Name"
                                  onChange={(e) =>  this.handleChange(e, 'first_name')} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"
                                  id="last_name"
                                  value={last_name}
                                  placeholder="Last Name"
                                  onChange={(e) =>  this.handleChange(e, 'last_name')} />
                  </Form.Group>
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
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"
                                  id="confirm_password"
                                  value={confirm_password}
                                  placeholder="Confirm Password"
                                  onChange={(e) =>  this.handleChange(e, 'confirm_password')} />
                  </Form.Group>
                  <Button onClick={this.signUp} variant="primary">Sign Up</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ signUserUp }, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);
