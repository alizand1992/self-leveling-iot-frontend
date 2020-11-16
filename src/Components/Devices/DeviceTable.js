import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



class DeviceTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: props.devices
    };
  }

  unregisterDevice = (id) => {
    const { unregisterDevice } = this.props;

    if (unregisterDevice) {
      unregisterDevice(id);
    }
  }

  registerDevice = (aws_device_id) => {
    const { devices } = this.state;
    let device_name = '';

    devices.forEach((device) => {
      if (device.aws_device_id === aws_device_id) {
        device_name = device.device_name;
      }
    });

    if (device_name.trim() === '') {
      return;
    }

    const { registerDevice } = this.props;

    if (registerDevice) {
      registerDevice({ aws_device_id, device_name });
    }
  }

  updateDeviceName = (e, aws_device_id) => {
    const { devices } = this.state;

    devices.forEach((device, index) => {
      if (device.aws_device_id === aws_device_id) {
        devices[index].device_name = e.target.value;
      }
    });

    this.setState({ devices });
  }

  render() {
    const { devices, registerDevice } = this.props;

    return (
      <Table striped={true} bordered={true} hover={true} size="sm">
        <thead>
        <tr>
          <th>Device ID</th>
          <th>Device Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {devices.map((device) => {
          return (
            <tr key={device.aws_device_id}>
              <td>{device.aws_device_id}</td>
              <td>
                {registerDevice ?
                  (
                    <React.Fragment>
                      <input value={device.device_name} onChange={(e) => this.updateDeviceName(e, device.aws_device_id)} />
                    </React.Fragment>
                  ) :
                  (<React.Fragment>{device.device_name}</React.Fragment>)
                }
              </td>
              <td>
                {device.user_id &&
                  <Button variant="danger" onClick={() => this.unregisterDevice(device.aws_device_id)}>Unregister</Button>
                }
                {!device.user_id &&
                  <Button variant="primary" onClick={() => this.registerDevice(device.aws_device_id)}>Register</Button>
                }
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    );
  }
}

export default DeviceTable;
