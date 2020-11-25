import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Level from './Level';
import Health from './Health';
import { sendCommand } from '../../Util/Ajax/Devices';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class DeviceCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leveling: false,
    };
  }

  level = () => {
    this.setState({ leveling: true });
    sendCommand(this.props.device.aws_device_id, 'LEVEL');
    setTimeout(() => {
      this.setState({ leveling: false });
    }, 10000);
  }

  auto_level_on = () => {
    sendCommand(this.props.device.aws_device_id, 'AUTO_LEVEL_ON');
  }

  auto_level_off = () => {
    sendCommand(this.props.device.aws_device_id, 'AUTO_LEVEL_OFF');
  }

  render() {
    const { device_name, level, health, battery } = this.props.device;
    const { leveling } = this.state;

    return (
      <Card>
        <Card.Header>
          {device_name}
        </Card.Header>
        <Card.Body>
          Battery: {battery}% <br />
          Level: {' '} <Level level={level} leveling={leveling} /><br />
          Health: {' '} <Health health={health} /><br />
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col md={9} className="text-left">
              Auto Level:{' '}
              <Button variant="success" onClick={this.auto_level_on}>On</Button>{' '}
              <Button variant="danger" onClick={this.auto_level_off}>Off</Button>{' '}
            </Col>
            <Col className="text-right">
              <Button variant="primary" onClick={this.level}>Level</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}

export default DeviceCard;
