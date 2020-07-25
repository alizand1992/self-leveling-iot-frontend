import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',

    };
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { first_name, last_name, email, password, confirm_password } = this.state;

    return (
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
                <Button variant="primary">Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignUp;