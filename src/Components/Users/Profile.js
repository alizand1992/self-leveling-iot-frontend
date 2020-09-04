import React from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

class Profile extends React.Component {
  render() {
    const { first_name, last_name, email, created_at } = this.props.user;

    const joined = new Date(created_at);

    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }} sm={12} xs={12}>
          <Card md={{ span: 6, offset: 3}}>
            <Card.Header>
              Profile
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={6} xs={12}>
                  <b>First Name:</b>
                </Col>
                <Col sm={6} xs={12}>
                  {first_name}
                </Col>
              </Row>
              <Row>
                <Col sm={6} xs={12}>
                  <b>Last Name:</b>
                </Col>
                <Col sm={6} xs={12}>
                  {last_name}
                </Col>
              </Row>
              <Row>
                <Col sm={6} xs={12}>
                  <b>Email:</b>
                </Col>
                <Col sm={6} xs={12}>
                  {email}
                </Col>
              </Row>
              <Row>
                <Col sm={6} xs={12}>
                  <b>Joined:</b>
                </Col>
                <Col sm={6} xs={12}>
                  {joined.getMonth()}/{joined.getDate()}/{joined.getFullYear()}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);
