import axios from 'axios';

export const getUnregisteredDevices = (successCallback) => {
  axios.get('/devices/')
    .then((res) => {
      successCallback(res.data);
    }).catch((err) => {
      console.log(err);
    });
};

export const getRegisteredDevices = (successCallback) => {
  axios.get('/devices/registered_devices/')
    .then((res) => {
      successCallback(res.data);
    }).catch((err) => {
      console.log(err);
    });
};

export const getRegisteredDevicesWithDetails = (successCallback) => {
  axios.get('/devices/registered_devices_with_details')
    .then((res) => {
      successCallback(res.data);
    }).catch((err) => {
      console.log(err);
    });
};

export const sendCommand = (aws_device_id, command) => {
  axios.post(
    '/devices/issue_command',
    {
      aws_device_id,
      command,
    }
  ).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err);
  });
};

export const registerDevice = (data, successCallback) => {
  axios.post(
    '/devices/register',
    {
      ...data,
    }
  ).then(() => {
    successCallback();
  }).catch((err) => {
    console.log(err);
  });
};

export const unregisterDevice = (data, successCallback) => {
  axios.patch(
    '/devices/unregister',
    data
  ).then(() => {
    successCallback();
  }).catch((err) => {
    console.log(err);
  });
};

export const sync = () => {
  axios.get('/devices/sync')
    .then(() => {
      console.log('Success');
    }).catch(() => {
      console.log('error');
    });
}
