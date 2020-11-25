import React from 'react';
import { getRegisteredDevicesWithDetails } from '../../Util/Ajax/Devices';
import DeviceCard from './DeviceCard';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class MyDevices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    getRegisteredDevicesWithDetails(({ devices }) => {
      this.setState({ devices });
    });
  }

  render() {
    const { devices } = this.state;
    if (!devices) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <Row>
          <Col className="text-right">
            <Button onClick={this.reload}>Reload</Button>
          </Col>
        </Row>
        <br />
        <Row>
          {this.state.devices.map((device) => {
            return (
              <Col key={device.aws_device_id} md={4}>
                <DeviceCard device={device}/>
              </Col>
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default MyDevices;
