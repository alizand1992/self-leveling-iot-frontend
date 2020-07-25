import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { email, password } = this.state;

    return (
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
                <Button variant="primary">Sign In</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignIn;