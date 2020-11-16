import React from 'react';

import Loading from '../Common/Loading';

import Alert from 'react-bootstrap/Alert';

import { getRegisteredDevices, getUnregisteredDevices, registerDevice } from '../../Util/Ajax/Devices';
import DeviceTable from './DeviceTable';

class Unregistered extends React.Component {
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
    }
  }

  reloadDevices = () => {
    getUnregisteredDevices((devices) => {
      this.setState(devices);
      this.props.reloadDone();
    });
  }

  registerDevice = (data) => {
    registerDevice(data , () => {
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
          There are no unregestered devices to display.
        </Alert>
      );
    }

    return (
      <DeviceTable devices={devices} registerDevice={this.registerDevice} />
    );
  }
}

export default Unregistered;
