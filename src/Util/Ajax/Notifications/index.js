import axios from 'axios';

export const getNotifications = (successCallback) => {
  axios.get('/notifications')
    .then((res) => {
      successCallback(res.data.notifications);
    }).catch((err) => {
      console.log(err);
    });
};

export const saveNotification = (data, successCallback) => {
  axios.post(
    '/notifications',
    data
  ).then(() => {
    successCallback();
  }).catch((err) => {
    console.log({ err });
  });
};
