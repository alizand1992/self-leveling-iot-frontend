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
