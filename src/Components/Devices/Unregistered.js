import React from 'react';

import Loading from '../Common/Loading';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Unregistered extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: undefined,
    };
  }

  componentDidMount() {

  }

  render() {
    const { devices } = this.state;

    if (devices === undefined) {
      return <Loading />;
    }

    if (devices.length === 0) {
      return (
        <Alert variant="warning">
          There are no unregestered devices to display.
        </Alert>
      );
    }

    return (
      <React.Fragment>
        {devices.map((device) => {
          return (
            <Row key={device.aws_device_id}>
              <Col>{device.aws_device_id}</Col>
              <Col>{device.device_name}</Col>
              <Col>
                <Button>Register</Button>
              </Col>
            </Row>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Unregistered;
