import React from 'react';

import Alert from 'react-bootstrap/Alert';

import DeviceTable from './DeviceTable';
import Loading from '../Common/Loading';

import { getRegisteredDevices, unregisterDevice } from '../../Util/Ajax/Devices';

class Registered extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: undefined,
    };
  }

  componentDidMount() {
    this.reloadDevices();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.needsReload === true) {
      this.reloadDevices();
      this.props.reloadDone();
    }
  }

  reloadDevices = () => {
    getRegisteredDevices((devices) => {
      this.setState(devices);
    });
  }

  unregisterDevice = (aws_device_id) => {
    unregisterDevice({ aws_device_id }, () => {
      this.props.reload();
    });
  }

  render() {
    const { devices } = this.state;

    if (devices === undefined) {
      return <Loading />;
    }

    if (devices.length === 0) {
      return (
        <Alert variant="warning">
          There are no devices registered for this user.
        </Alert>
      );
    }

    return (
      <DeviceTable devices={devices} unregisterDevice={this.unregisterDevice}/>
    );
  }
}

export default Registered;
